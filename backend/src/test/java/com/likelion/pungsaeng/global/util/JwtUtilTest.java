package com.likelion.pungsaeng.global.util;

import com.likelion.pungsaeng.global.config.JwtProperties;
import com.likelion.pungsaeng.global.exception.CustomException;
import com.likelion.pungsaeng.global.exception.ErrorCode;
import org.junit.jupiter.api.Test;

import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtUtilTest {

    private static final String SECRET = Base64.getEncoder().encodeToString(new byte[32]);
    private static final String OTHER_SECRET = Base64.getEncoder().encodeToString("another-secret-key-32bytes-long!".getBytes());

    private final JwtUtil jwtUtil = new JwtUtil(new JwtProperties(SECRET, 60_000, 120_000));

    @Test
    void access_토큰을_검증하면_userId를_반환한다() {
        String token = jwtUtil.createAccessToken(7L);

        assertThat(jwtUtil.validateAndGetUserId(token, JwtUtil.TokenType.ACCESS)).isEqualTo(7L);
    }

    @Test
    void refresh_토큰은_access_토큰으로_사용할_수_없다() {
        String refreshToken = jwtUtil.createRefreshToken(7L);

        assertThatThrownBy(() -> jwtUtil.validateAndGetUserId(refreshToken, JwtUtil.TokenType.ACCESS))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.INVALID_TOKEN);
    }

    @Test
    void 만료된_토큰은_EXPIRED_TOKEN() {
        JwtUtil expiredUtil = new JwtUtil(new JwtProperties(SECRET, -1_000, -1_000));
        String token = expiredUtil.createAccessToken(7L);

        assertThatThrownBy(() -> jwtUtil.validateAndGetUserId(token, JwtUtil.TokenType.ACCESS))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.EXPIRED_TOKEN);
    }

    @Test
    void 다른_키로_서명된_토큰은_INVALID_TOKEN() {
        String forged = new JwtUtil(new JwtProperties(OTHER_SECRET, 60_000, 60_000)).createAccessToken(7L);

        assertThatThrownBy(() -> jwtUtil.validateAndGetUserId(forged, JwtUtil.TokenType.ACCESS))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.INVALID_TOKEN);
    }

    @Test
    void 형식이_잘못된_토큰은_INVALID_TOKEN() {
        assertThatThrownBy(() -> jwtUtil.validateAndGetUserId("not-a-jwt", JwtUtil.TokenType.ACCESS))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.INVALID_TOKEN);
    }

    @Test
    void 같은_유저라도_발급할_때마다_토큰이_다르다() {
        assertThat(jwtUtil.createRefreshToken(7L)).isNotEqualTo(jwtUtil.createRefreshToken(7L));
    }

    @Test
    void 토큰_해시는_SHA256_hex_64자() {
        assertThat(JwtUtil.hashToken("token")).hasSize(64).matches("[0-9a-f]+");
    }

    @Test
    void secret이_없으면_기동_실패() {
        assertThatThrownBy(() -> new JwtUtil(new JwtProperties(null, 1, 1)))
                .isInstanceOf(IllegalStateException.class);
    }
}
