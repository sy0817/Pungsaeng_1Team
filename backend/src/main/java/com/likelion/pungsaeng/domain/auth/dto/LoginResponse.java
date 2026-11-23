package com.likelion.pungsaeng.domain.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Refresh Token 은 body 가 아니라 HttpOnly 쿠키로 내려간다.
 */
public record LoginResponse(
        @Schema(description = "Access Token - 이후 요청 헤더에 Authorization: Bearer {accessToken}")
        String accessToken,

        @Schema(example = "Bearer")
        String tokenType,

        @Schema(description = "Access Token 만료까지 남은 시간(초)", example = "1800")
        long expiresIn,

        String loginId,

        @Schema(description = "현재 칭호", example = "새내기 수험생")
        String title
) {
}
