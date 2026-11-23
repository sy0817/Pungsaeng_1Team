package com.likelion.pungsaeng.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // 공통
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "E400", "요청 값이 유효하지 않습니다"),

    // 공통 리소스
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "E404", "요청한 리소스를 찾을 수 없습니다"),

    // 인증 / 인가
    LOGIN_FAILED(HttpStatus.UNAUTHORIZED, "AUTH001", "아이디 또는 비밀번호가 일치하지 않습니다"),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "AUTH002", "로그인이 필요합니다"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "AUTH003", "유효하지 않은 토큰입니다"),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "AUTH004", "토큰이 만료되었습니다"),
    FORBIDDEN(HttpStatus.FORBIDDEN, "AUTH005", "접근 권한이 없습니다"),

    // 유저
    DUPLICATE_LOGIN_ID(HttpStatus.CONFLICT, "USER001", "이미 사용 중인 아이디입니다"),

    // 타로 / 고민
    TAROT_CARD_NOT_FOUND(HttpStatus.NOT_FOUND, "TAROT001", "존재하지 않는 타로 카드입니다"),
    SYMPTOM_NOT_FOUND(HttpStatus.BAD_REQUEST, "SYMPTOM001", "존재하지 않는 고민이 포함되어 있습니다"),

    // 처방전
    PRESCRIPTION_NOT_FOUND(HttpStatus.NOT_FOUND, "PRESCRIPTION001", "존재하지 않는 처방전입니다"),
    PRESCRIPTION_FORBIDDEN(HttpStatus.FORBIDDEN, "PRESCRIPTION002", "해당 처방전에 접근할 권한이 없습니다"),

    // 서버
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E500", "서버 내부 오류가 발생했습니다");

    private final HttpStatus status;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
}
}
