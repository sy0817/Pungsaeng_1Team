package com.likelion.pungsaeng.domain.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record CheckIdRequest(
        @Schema(description = "중복 확인할 아이디", example = "tarot123")
        @NotBlank(message = "아이디를 입력해주세요.")
        @Pattern(regexp = AuthValidation.LOGIN_ID_REGEX, message = AuthValidation.LOGIN_ID_MESSAGE)
        String loginId
) {
}
