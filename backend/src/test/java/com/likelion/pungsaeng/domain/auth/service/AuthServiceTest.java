package com.likelion.pungsaeng.domain.auth.service;

import com.likelion.pungsaeng.domain.auth.dto.LoginRequest;
import com.likelion.pungsaeng.domain.auth.dto.LoginResult;
import com.likelion.pungsaeng.domain.auth.dto.SignupRequest;
import com.likelion.pungsaeng.domain.auth.repository.RefreshTokenRepository;
import com.likelion.pungsaeng.domain.user.entity.User;
import com.likelion.pungsaeng.domain.user.repository.UserRepository;
import com.likelion.pungsaeng.global.config.JwtProperties;
import com.likelion.pungsaeng.global.exception.CustomException;
import com.likelion.pungsaeng.global.exception.ErrorCode;
import com.likelion.pungsaeng.global.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuthServiceTest {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final RefreshTokenRepository refreshTokenRepository = mock(RefreshTokenRepository.class);
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(4);
    private final JwtUtil jwtUtil = new JwtUtil(new JwtProperties(
            Base64.getEncoder().encodeToString(new byte[32]), 1_800_000, 1_209_600_000));

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(userRepository, refreshTokenRepository, passwordEncoder, jwtUtil);
    }

    private User savedUser(String loginId, String rawPassword) {
        User user = User.builder().loginId(loginId).password(passwordEncoder.encode(rawPassword)).build();
        ReflectionTestUtils.setField(user, "id", 1L);
        return user;
    }

    @Test
    void 회원가입시_비밀번호는_BCrypt로_암호화되어_저장된다() {
        when(userRepository.existsByLoginId("tarot123")).thenReturn(false);
        when(userRepository.saveAndFlush(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            ReflectionTestUtils.setField(user, "id", 1L);
            return user;
        });

        var response = authService.signup(new SignupRequest("tarot123", "password1!", "password1!"));

        assertThat(response.userId()).isEqualTo(1L);
        verify(userRepository).saveAndFlush(org.mockito.ArgumentMatchers.argThat(user ->
                !user.getPassword().equals("password1!") && passwordEncoder.matches("password1!", user.getPassword())));
    }

    @Test
    void 이미_있는_아이디로_가입하면_DUPLICATE_LOGIN_ID() {
        when(userRepository.existsByLoginId("tarot123")).thenReturn(true);

        assertThatThrownBy(() -> authService.signup(new SignupRequest("tarot123", "password1!", "password1!")))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.DUPLICATE_LOGIN_ID);
        verify(userRepository, never()).saveAndFlush(any());
    }

    @Test
    void 동시_가입으로_유니크_제약에_걸려도_DUPLICATE_LOGIN_ID() {
        when(userRepository.existsByLoginId("tarot123")).thenReturn(false);
        when(userRepository.saveAndFlush(any(User.class))).thenThrow(new DataIntegrityViolationException("dup"));

        assertThatThrownBy(() -> authService.signup(new SignupRequest("tarot123", "password1!", "password1!")))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.DUPLICATE_LOGIN_ID);
    }

    @Test
    void 로그인_성공시_토큰을_발급하고_refresh_토큰은_해시로_저장한다() {
        when(userRepository.findByLoginId("tarot123")).thenReturn(Optional.of(savedUser("tarot123", "password1!")));

        LoginResult result = authService.login(new LoginRequest("tarot123", "password1!"));

        assertThat(jwtUtil.validateAndGetUserId(result.response().accessToken(), JwtUtil.TokenType.ACCESS)).isEqualTo(1L);
        assertThat(jwtUtil.validateAndGetUserId(result.refreshToken(), JwtUtil.TokenType.REFRESH)).isEqualTo(1L);
        assertThat(result.response().expiresIn()).isEqualTo(1800);
        assertThat(result.response().title()).isEqualTo("새내기 수험생");
        verify(refreshTokenRepository).upsert(eq(1L), eq(JwtUtil.hashToken(result.refreshToken())), any(LocalDateTime.class));
    }

    @Test
    void 비밀번호가_틀리면_LOGIN_FAILED() {
        when(userRepository.findByLoginId("tarot123")).thenReturn(Optional.of(savedUser("tarot123", "password1!")));

        assertThatThrownBy(() -> authService.login(new LoginRequest("tarot123", "wrong1!!")))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.LOGIN_FAILED);
        verify(refreshTokenRepository, never()).upsert(any(), anyString(), any());
    }

    @Test
    void 없는_아이디도_같은_LOGIN_FAILED() {
        when(userRepository.findByLoginId("nobody123")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(new LoginRequest("nobody123", "password1!")))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.LOGIN_FAILED);
    }

    @Test
    void BCrypt_한도를_넘는_비밀번호는_예외없이_LOGIN_FAILED() {
        when(userRepository.findByLoginId("tarot123")).thenReturn(Optional.of(savedUser("tarot123", "password1!")));

        assertThatThrownBy(() -> authService.login(new LoginRequest("tarot123", "가".repeat(30))))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.LOGIN_FAILED);
    }
}
