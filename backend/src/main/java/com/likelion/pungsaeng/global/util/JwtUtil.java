package com.likelion.pungsaeng.global.util;

import com.likelion.pungsaeng.global.config.JwtProperties;
import com.likelion.pungsaeng.global.exception.CustomException;
import com.likelion.pungsaeng.global.exception.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HexFormat;
import java.util.UUID;

/**
 * JWT 생성 / 검증
 * - subject: userId
 * - type 클레임으로 Access / Refresh 를 구분 (Refresh Token 을 Access Token 처럼 쓰는 것 방지)
 * - jti(UUID)를 넣어 같은 시각에 발급해도 토큰이 항상 달라지게 함
 */
@Component
public class JwtUtil {

    public enum TokenType { ACCESS, REFRESH }

    private static final String TOKEN_TYPE_CLAIM = "type";

    private final SecretKey key;
    private final JwtProperties properties;

    public JwtUtil(JwtProperties properties) {
        if (properties.secret() == null || properties.secret().isBlank()) {
            throw new IllegalStateException("jwt.secret 이 설정되지 않았습니다. application-secret.yaml 을 확인하세요.");
        }
        // 256bit 미만 키는 Keys.hmacShaKeyFor 에서 예외 발생 -> 약한 키로 기동되는 것 방지
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(properties.secret()));
        this.properties = properties;
    }

    public String createAccessToken(Long userId) {
        return createToken(userId, TokenType.ACCESS, properties.accessTokenExpiration());
    }

    public String createRefreshToken(Long userId) {
        return createToken(userId, TokenType.REFRESH, properties.refreshTokenExpiration());
    }

    private String createToken(Long userId, TokenType type, long expirationMs) {
        Date now = new Date();
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim(TOKEN_TYPE_CLAIM, type.name())
                .id(UUID.randomUUID().toString())
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expirationMs))
                .signWith(key)
                .compact();
    }

    /**
     * 서명 / 만료 / 토큰 타입을 검증하고 userId 를 반환한다.
     *
     * @throws CustomException 만료 시 EXPIRED_TOKEN, 그 외 위조·형식 오류·타입 불일치 시 INVALID_TOKEN
     */
    public Long validateAndGetUserId(String token, TokenType expectedType) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            if (!expectedType.name().equals(claims.get(TOKEN_TYPE_CLAIM, String.class))) {
                throw new CustomException(ErrorCode.INVALID_TOKEN);
            }
            return Long.valueOf(claims.getSubject());
        } catch (ExpiredJwtException e) {
            throw new CustomException(ErrorCode.EXPIRED_TOKEN);
        } catch (JwtException | IllegalArgumentException e) {
            // IllegalArgumentException: 빈 토큰, subject 가 숫자가 아닌 경우 등
            throw new CustomException(ErrorCode.INVALID_TOKEN);
        }
    }

    public long getAccessTokenExpirationMs() {
        return properties.accessTokenExpiration();
    }

    public long getRefreshTokenExpirationMs() {
        return properties.refreshTokenExpiration();
    }

    /**
     * Refresh Token DB 저장용 SHA-256 해시 (hex 64자).
     * 토큰 자체가 충분히 무작위라 salt 없이 단방향 해시만으로 충분하다.
     */
    public static String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(digest.digest(token.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 을 사용할 수 없습니다.", e);
        }
    }
}
