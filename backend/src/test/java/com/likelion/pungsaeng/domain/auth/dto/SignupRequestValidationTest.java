package com.likelion.pungsaeng.domain.auth.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

class SignupRequestValidationTest {

    private static jakarta.validation.ValidatorFactory factory;
    private static Validator validator;

    @BeforeAll
    static void setUp() {
        factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @AfterAll
    static void tearDown() {
        factory.close();
    }

    private Set<String> invalidFields(SignupRequest request) {
        return validator.validate(request).stream()
                .map(ConstraintViolation::getPropertyPath)
                .map(Object::toString)
                .collect(Collectors.toSet());
    }

    @Test
    void 올바른_요청은_통과() {
        assertThat(invalidFields(new SignupRequest("tarot123", "password1!", "password1!"))).isEmpty();
    }

    @ParameterizedTest
    @ValueSource(strings = {"abc12", "abcdefghij123", "abcdefg", "1234567", "abc_123", "아이디123"})
    void 아이디_규칙_위반(String loginId) {
        assertThat(invalidFields(new SignupRequest(loginId, "password1!", "password1!"))).contains("loginId");
    }

    @ParameterizedTest
    @ValueSource(strings = {"pass1!", "password1", "password!!", "12345678!"})
    void 비밀번호_규칙_위반(String password) {
        assertThat(invalidFields(new SignupRequest("tarot123", password, password))).contains("password");
    }

    @Test
    void 비밀번호_확인_불일치() {
        assertThat(invalidFields(new SignupRequest("tarot123", "password1!", "password2!"))).contains("passwordConfirmed");
    }

    @Test
    void 비밀번호가_72바이트를_넘으면_실패() {
        String password = "a1!" + "가".repeat(24); // 3 + 72 바이트
        assertThat(invalidFields(new SignupRequest("tarot123", password, password))).contains("passwordWithinMaxBytes");
    }
}
