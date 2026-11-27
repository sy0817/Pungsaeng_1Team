package com.likelion.pungsaeng.domain.auth.service;

import com.likelion.pungsaeng.domain.auth.dto.AuthValidation;
import com.likelion.pungsaeng.domain.auth.dto.CheckIdResponse;
import com.likelion.pungsaeng.domain.auth.dto.LoginRequest;
import com.likelion.pungsaeng.domain.auth.dto.LoginResponse;
import com.likelion.pungsaeng.domain.auth.dto.LoginResult;
import com.likelion.pungsaeng.domain.auth.dto.SignupRequest;
import com.likelion.pungsaeng.domain.auth.dto.SignupResponse;
import com.likelion.pungsaeng.domain.auth.entity.RefreshToken;
import com.likelion.pungsaeng.domain.auth.repository.RefreshTokenRepository;
import com.likelion.pungsaeng.domain.user.entity.User;
import com.likelion.pungsaeng.domain.user.repository.UserRepository;
import com.likelion.pungsaeng.global.exception.CustomException;
import com.likelion.pungsaeng.global.exception.ErrorCode;
import com.likelion.pungsaeng.global.util.JwtUtil;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 없는 아이디로 로그인해도 BCrypt 비교를 한 번 수행해, 응답 시간 차이로 아이디 존재 여부를 알 수 없게 한다
    private final String dummyPasswordHash;

    public AuthService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.dummyPasswordHash = passwordEncoder.encode("dummy-password-for-timing");
    }

    public CheckIdResponse checkLoginId(String loginId) {
        return new CheckIdResponse(!userRepository.existsByLoginId(loginId));
    }

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        if (userRepository.existsByLoginId(request.loginId())) {
            throw new CustomException(ErrorCode.DUPLICATE_LOGIN_ID);
        }

        User user = User.builder()
                .loginId(request.loginId())
                .password(passwordEncoder.encode(request.password()))
                .build();

        try {
            // 중복 확인 후 저장 전에 같은 아이디로 동시에 가입하면 DB 유니크 제약에서 걸림
            userRepository.saveAndFlush(user);
        } catch (DataIntegrityViolationException e) {
            throw new CustomException(ErrorCode.DUPLICATE_LOGIN_ID);
        }

        return new SignupResponse(user.getId(), user.getLoginId());
    }

    @Transactional
    public LoginResult login(LoginRequest request) {
        Optional<User> found = userRepository.findByLoginId(request.loginId());
        String passwordHash = found.map(User::getPassword).orElse(dummyPasswordHash);

        boolean passwordMatches = isWithinBcryptLimit(request.password())
                && passwordEncoder.matches(request.password(), passwordHash);

        // 아이디가 없을 때와 비밀번호가 틀렸을 때 같은 에러 -> 아이디 존재 여부 노출 방지
        if (found.isEmpty() || !passwordMatches) {
            throw new CustomException(ErrorCode.LOGIN_FAILED);
        }
        User user = found.get();

        String accessToken = jwtUtil.createAccessToken(user.getId());
        String refreshToken = jwtUtil.createRefreshToken(user.getId());

        refreshTokenRepository.upsert(user.getId(), JwtUtil.hashToken(refreshToken), newRefreshExpiresAt());

        return loginResult(user, accessToken, refreshToken);
    }

    /**
     * 토큰 재발급 (Refresh Token rotation)
     *
     * - 서명·만료·타입(REFRESH) 검증 후, DB 에 저장된 해시와 일치해야 재발급한다
     * - 성공하면 Access / Refresh Token 을 모두 새로 발급하고, 만료는 지금부터 다시 14일 (슬라이딩)
     * - 서명은 유효한데 DB 에 없는 토큰(이미 교체됨) = 탈취로 보고 그 유저의 Refresh Token 을 삭제 (강제 로그아웃)
     * - 실패해도 강제 로그아웃(삭제)은 반영돼야 하므로 CustomException 으로는 롤백하지 않는다
     *
     * @param refreshToken 쿠키의 Refresh Token (없으면 null)
     * @throws CustomException 쿠키 없음 AUTH002, 위조·재사용·Access Token 사용 AUTH003, 만료 AUTH004
     */
    @Transactional(noRollbackFor = CustomException.class)
    public LoginResult reissue(String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank()) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        Long userId = jwtUtil.validateAndGetUserId(refreshToken, JwtUtil.TokenType.REFRESH);
        String oldTokenHash = JwtUtil.hashToken(refreshToken);

        RefreshToken stored = refreshTokenRepository.findByTokenHash(oldTokenHash)
                .filter(token -> token.getUser().getId().equals(userId))
                .orElseThrow(() -> forceLogout(userId, ErrorCode.INVALID_TOKEN));

        if (stored.isExpired(LocalDateTime.now())) {
            throw forceLogout(userId, ErrorCode.EXPIRED_TOKEN);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> forceLogout(userId, ErrorCode.UNAUTHORIZED));

        String newAccessToken = jwtUtil.createAccessToken(userId);
        String newRefreshToken = jwtUtil.createRefreshToken(userId);

        // 그 사이 다른 요청이 먼저 교체했다면 0 -> 같은 토큰이 두 번 쓰인 것이므로 재사용으로 처리
        int rotated = refreshTokenRepository.rotate(
                userId, oldTokenHash, JwtUtil.hashToken(newRefreshToken), newRefreshExpiresAt());
        if (rotated == 0) {
            throw forceLogout(userId, ErrorCode.INVALID_TOKEN);
        }

        return loginResult(user, newAccessToken, newRefreshToken);
    }

    private CustomException forceLogout(Long userId, ErrorCode errorCode) {
        refreshTokenRepository.deleteByUserId(userId);
        return new CustomException(errorCode);
    }

    private LocalDateTime newRefreshExpiresAt() {
        return LocalDateTime.now().plus(Duration.ofMillis(jwtUtil.getRefreshTokenExpirationMs()));
    }

    private LoginResult loginResult(User user, String accessToken, String refreshToken) {
        LoginResponse response = new LoginResponse(
                accessToken,
                "Bearer",
                jwtUtil.getAccessTokenExpirationMs() / 1000,
                user.getLoginId(),
                user.getTitle().getLabel()
        );
        return new LoginResult(response, refreshToken, jwtUtil.getRefreshTokenExpirationMs());
    }

    // 72바이트 초과 비밀번호는 BCrypt 가 처리하지 못하므로(Spring Security 는 예외 발생) 바로 실패 처리
    private boolean isWithinBcryptLimit(String password) {
        return password.getBytes(StandardCharsets.UTF_8).length <= AuthValidation.PASSWORD_MAX_BYTES;
    }
}
