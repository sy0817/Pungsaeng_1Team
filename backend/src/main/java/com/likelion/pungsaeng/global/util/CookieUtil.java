package com.likelion.pungsaeng.global.util;

import org.springframework.http.ResponseCookie;

import java.time.Duration;

/**
 * Refresh Token 쿠키 생성 / 삭제 (로그인, 재발급, 로그아웃에서 공통 사용)
 *
 * - HttpOnly : JS(XSS)에서 읽을 수 없음
 * - Secure   : HTTPS 에서만 전송 (Chrome 등은 http://localhost 를 예외로 허용)
 * - SameSite=Strict : 다른 사이트에서 시작된 요청에는 쿠키가 붙지 않음 (CSRF 방지)
 * - Path=/api/v1/auth : 인증 API 호출 때만 전송
 *
 * 프론트는 로그인/재발급/로그아웃 요청 시 fetch 의 credentials: "include" (axios 는 withCredentials: true) 필요
 */
public final class CookieUtil {

    public static final String REFRESH_TOKEN_COOKIE = "refreshToken";
    private static final String REFRESH_TOKEN_PATH = "/api/v1/auth";

    private CookieUtil() {
    }

    public static ResponseCookie createRefreshTokenCookie(String refreshToken, long maxAgeMs) {
        return baseCookie(refreshToken)
                .maxAge(Duration.ofMillis(maxAgeMs))
                .build();
    }

    public static ResponseCookie deleteRefreshTokenCookie() {
        return baseCookie("")
                .maxAge(0)
                .build();
    }

    private static ResponseCookie.ResponseCookieBuilder baseCookie(String value) {
        return ResponseCookie.from(REFRESH_TOKEN_COOKIE, value)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path(REFRESH_TOKEN_PATH);
    }
}
