package com.likelion.pungsaeng.domain.prescription.dto;

import com.likelion.pungsaeng.global.common.enums.SubjectType;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

class PrescriptionCreateRequestValidationTest {

    private static ValidatorFactory factory;
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

    private Set<String> invalidFields(List<Long> symptomIds, Long primaryId) {
        return validator.validate(new PrescriptionCreateRequest(SubjectType.MATH, "공통수학 1", "CHALLENGE", symptomIds, primaryId))
                .stream()
                .map(ConstraintViolation::getPropertyPath)
                .map(Object::toString)
                .collect(Collectors.toSet());
    }

    @Test
    void 올바른_요청은_통과() {
        assertThat(invalidFields(List.of(1L, 3L), 3L)).isEmpty();
    }

    @Test
    void 대표_고민이_목록에_없으면_실패() {
        assertThat(invalidFields(List.of(1L, 3L), 2L)).contains("primarySymptomIncluded");
    }

    @Test
    void 고민이_중복되면_실패() {
        assertThat(invalidFields(List.of(1L, 1L), 1L)).contains("symptomIdsUnique");
    }

    @Test
    void 고민이_비어_있으면_실패() {
        assertThat(invalidFields(List.of(), 1L)).contains("symptomIds");
    }

    @Test
    void 고민_ID에_null이_있으면_실패() {
        assertThat(invalidFields(Arrays.asList(1L, null), 1L)).anyMatch(field -> field.startsWith("symptomIds"));
    }

    @Test
    void 필수값이_없으면_실패() {
        Set<String> fields = validator.validate(new PrescriptionCreateRequest(null, " ", "", List.of(1L), null))
                .stream().map(v -> v.getPropertyPath().toString()).collect(Collectors.toSet());

        assertThat(fields).contains("subject", "subSubject", "tarotCardId", "primarySymptomId");
    }
}
