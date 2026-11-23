package com.likelion.pungsaeng.domain.prescription.dto;

import com.likelion.pungsaeng.global.common.enums.SubjectType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.List;

public record PrescriptionCreateRequest(
        @Schema(description = "대과목", example = "MATH")
        @NotNull(message = "과목을 선택해주세요.")
        SubjectType subject,

        @Schema(description = "세부 과목", example = "공통수학 1")
        @NotBlank(message = "세부 과목을 입력해주세요.")
        @Size(max = 20, message = "세부 과목은 20자 이하로 입력해주세요.")
        String subSubject,

        @Schema(description = "타로 카드 ID", example = "CHALLENGE")
        @NotBlank(message = "타로 카드를 선택해주세요.")
        @Size(max = 50, message = "존재하지 않는 타로 카드입니다.")
        String tarotCardId,

        @Schema(description = "선택한 고민 ID 목록 (선택한 순서대로)", example = "[1, 3]")
        @NotEmpty(message = "고민을 1개 이상 선택해주세요.")
        @Size(max = 6, message = "고민은 최대 6개까지 선택할 수 있습니다.")
        List<@NotNull(message = "고민 ID가 비어 있습니다.") Long> symptomIds,

        @Schema(description = "대표 고민 ID (symptomIds 중 하나)", example = "1")
        @NotNull(message = "핵심 고민을 선택해주세요.")
        Long primarySymptomId
) {

    @Schema(hidden = true)
    @AssertTrue(message = "고민이 중복으로 선택되었습니다.")
    public boolean isSymptomIdsUnique() {
        return symptomIds == null || new HashSet<>(symptomIds).size() == symptomIds.size();
    }

    @Schema(hidden = true)
    @AssertTrue(message = "핵심 고민 ID는 symptomIds 배열에 포함된 값이어야 합니다.")
    public boolean isPrimarySymptomIncluded() {
        return symptomIds == null || primarySymptomId == null || symptomIds.contains(primarySymptomId);
    }
}
