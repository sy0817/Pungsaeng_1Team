package com.likelion.pungsaeng.domain.auth.dto;

/**
 * 서비스 -> 컨트롤러 전달용. response 는 body 로, refreshToken 은 쿠키로 내려간다.
 */
public record LoginResult(
        LoginResponse response,
        String refreshToken,
        long refreshTokenExpirationMs
) {
}
