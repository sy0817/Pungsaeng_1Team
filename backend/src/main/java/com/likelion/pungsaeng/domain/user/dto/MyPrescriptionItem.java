package com.likelion.pungsaeng.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.likelion.pungsaeng.global.common.enums.CardDirection;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 과거 처방 목록의 한 항목
 */
public record MyPrescriptionItem(
        Long prescriptionId,

        @Schema(description = "처방 제목 (= 처방 키워드)", example = "돌파와 뼈대 재건")
        String title,

        @Schema(description = "처방 요약 (= 종합 조언, 없으면 카드 조언)")
        String summary,

        @Schema(description = "과목 표시 문구", example = "수학 (공통수학 1)")
        String subject,

        @Schema(example = "MATH")
        SubjectType subjectType,

        Card card,

        @Schema(description = "고민 키워드 (대표 고민이 맨 앞)", example = "[\"개념 부족\", \"집중력 저하\"]")
        List<String> symptoms,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime createdAt
) {

    public record Card(
            @Schema(example = "CHALLENGE")
            String cardId,
            @Schema(example = "도전과 극복")
            String name,
            String imageUrl,
            @Schema(example = "UPRIGHT")
            CardDirection direction
    ) {
    }
}
