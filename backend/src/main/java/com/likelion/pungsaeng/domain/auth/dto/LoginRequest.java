package com.likelion.pungsaeng.domain.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * 로그인은 형식 규칙(@Pattern)을 검사하지 않는다 -> 틀린 이유를 구분해 알려주지 않기 위함.
 * 길이 상한만 둬서 비정상적으로 긴 입력을 막는다.
 */
public record LoginRequest(
        @Schema(description = "아이디", example = "tarot123")
        @NotBlank(message = "아이디를 입력해주세요.")
        @Size(max = 50, message = "아이디 또는 비밀번호가 일치하지 않습니다.")
        String loginId,

        @Schema(description = "비밀번호", example = "password1!")
        @NotBlank(message = "비밀번호를 입력해주세요.")
        @Size(max = 100, message = "아이디 또는 비밀번호가 일치하지 않습니다.")
        String password
) {
}
