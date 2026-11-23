package com.likelion.pungsaeng.domain.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.nio.charset.StandardCharsets;

public record SignupRequest(
        @Schema(description = "아이디 (영문+숫자 6~12자)", example = "tarot123")
        @NotBlank(message = "아이디를 입력해주세요.")
        @Pattern(regexp = AuthValidation.LOGIN_ID_REGEX, message = AuthValidation.LOGIN_ID_MESSAGE)
        String loginId,

        @Schema(description = "비밀번호 (영문+숫자+특수문자 8자 이상)", example = "password1!")
        @NotBlank(message = "비밀번호를 입력해주세요.")
        @Pattern(regexp = AuthValidation.PASSWORD_REGEX, message = AuthValidation.PASSWORD_MESSAGE)
        String password,

        @Schema(description = "비밀번호 확인", example = "password1!")
        @NotBlank(message = "비밀번호 확인을 입력해주세요.")
        String passwordConfirm
) {

    @Schema(hidden = true)
    @AssertTrue(message = "비밀번호가 일치하지 않습니다.")
    public boolean isPasswordConfirmed() {
        return password == null || password.equals(passwordConfirm);
    }

    @Schema(hidden = true)
    @AssertTrue(message = "비밀번호가 너무 깁니다.")
    public boolean isPasswordWithinMaxBytes() {
        return password == null || password.getBytes(StandardCharsets.UTF_8).length <= AuthValidation.PASSWORD_MAX_BYTES;
    }
}
