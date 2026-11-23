package com.likelion.pungsaeng.domain.auth.service;

import com.likelion.pungsaeng.domain.auth.dto.AuthValidation;
import com.likelion.pungsaeng.domain.auth.dto.CheckIdResponse;
import com.likelion.pungsaeng.domain.auth.dto.LoginRequest;
import com.likelion.pungsaeng.domain.auth.dto.LoginResponse;
import com.likelion.pungsaeng.domain.auth.dto.LoginResult;
import com.likelion.pungsaeng.domain.auth.dto.SignupRequest;
import com.likelion.pungsaeng.domain.auth.dto.SignupResponse;
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
        long refreshExpirationMs = jwtUtil.getRefreshTokenExpirationMs();

        refreshTokenRepository.upsert(
                user.getId(),
                JwtUtil.hashToken(refreshToken),
                LocalDateTime.now().plus(Duration.ofMillis(refreshExpirationMs))
        );

        LoginResponse response = new LoginResponse(
                accessToken,
                "Bearer",
                jwtUtil.getAccessTokenExpirationMs() / 1000,
                user.getLoginId(),
                user.getTitle().getLabel()
        );
        return new LoginResult(response, refreshToken, refreshExpirationMs);
    }

    // 72바이트 초과 비밀번호는 BCrypt 가 처리하지 못하므로(Spring Security 는 예외 발생) 바로 실패 처리
    private boolean isWithinBcryptLimit(String password) {
        return password.getBytes(StandardCharsets.UTF_8).length <= AuthValidation.PASSWORD_MAX_BYTES;
    }
}
