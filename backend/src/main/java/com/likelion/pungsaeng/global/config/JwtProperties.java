package com.likelion.pungsaeng.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * application.yaml 의 jwt.* 설정 (secret 은 application-secret.yaml)
 *
 * @param secret                 Base64 인코딩된 HMAC 서명 키 (256bit 이상)
 * @param accessTokenExpiration  Access Token 만료 시간 (ms)
 * @param refreshTokenExpiration Refresh Token 만료 시간 (ms)
 */
@ConfigurationProperties(prefix = "jwt")
public record JwtProperties(
        String secret,
        long accessTokenExpiration,
        long refreshTokenExpiration
) {
}
