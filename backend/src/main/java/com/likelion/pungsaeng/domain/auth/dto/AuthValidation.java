package com.likelion.pungsaeng.domain.auth.dto;

/**
 * 아이디 / 비밀번호 검증 규칙 - 프론트 frontend/src/pages/SignUp/signupRules.js 와 동일하게 유지할 것
 */
public final class AuthValidation {

    // 영문 + 숫자 조합 6~12자
    public static final String LOGIN_ID_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,12}$";
    public static final String LOGIN_ID_MESSAGE = "아이디는 영문, 숫자 조합 6~12자로 입력해주세요.";

    // 8자 이상 + 영문, 숫자, 특수문자 포함
    public static final String PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$";
    public static final String PASSWORD_MESSAGE = "비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.";

    // BCrypt 는 72바이트를 넘는 부분을 무시하므로 상한을 둔다 (한글 등은 1자에 3바이트)
    public static final int PASSWORD_MAX_BYTES = 72;

    private AuthValidation() {
    }
}
