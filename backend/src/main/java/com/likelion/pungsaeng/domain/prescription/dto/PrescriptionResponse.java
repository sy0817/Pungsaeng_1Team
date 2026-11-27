package com.likelion.pungsaeng.domain.prescription.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.likelion.pungsaeng.global.common.enums.CardDirection;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 처방전 응답 (생성 / 조회 공통) - PrescriptionAssembler 가 만든다
 */
public record PrescriptionResponse(
        Long prescriptionId,

        @Schema(description = "처방 키워드", example = "돌파와 뼈대 재건")
        String prescriptionKeyword,

        CardInfo card,

        DiagnosisSummary diagnosisSummary,

        @Schema(description = "실천 지침 (최대 3개, 없으면 빈 배열)")
        List<ActionGuide> actionGuides,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime createdAt
) {

    public record CardInfo(
            @Schema(example = "CHALLENGE")
            String cardId,
            @Schema(example = "도전과 극복")
            String name,
            String imageUrl,
            @Schema(example = "UPRIGHT")
            CardDirection direction,
            String quote,
            String advice,
            @Schema(description = "추천 집중 시간", example = "20:30 ~ 22:00")
            String recommendedTime,
            @Schema(description = "추천 학습 환경", example = "조용한 1인 독서대")
            String recommendedEnv
    ) {
    }

    public record DiagnosisSummary(
            @Schema(example = "수학 (공통수학 1)")
            String subject,
            @Schema(description = "고민 키워드 (대표 고민이 맨 앞)", example = "[\"개념 부족\", \"집중력 저하\"]")
            List<String> symptoms,
            @Schema(description = "카드 + 대표 고민 조합의 종합 조언 (조합 규칙이 없으면 null)")
            String comprehensiveAdvice
    ) {
    }

    public record ActionGuide(
            Long actionId,
            String title,
            String description,
            String tag
    ) {
    }
}
