package com.likelion.pungsaeng.domain.user.dto;

import com.likelion.pungsaeng.global.common.enums.SubjectType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

/**
 * 마이페이지 통계. totalDiagnosisCount 만 전체 기간(누적), 나머지는 최근 periodDays 일 기준
 */
public record MyStatisticsResponse(
        @Schema(description = "통계 집계 기간(일)", example = "90")
        int periodDays,

        Summary summary,

        @Schema(description = "가장 많이 나온 추천 집중 시간대 (기록 없으면 null)", example = "야간 자율학습 2타임 (20:30 ~ 22:00)")
        String mostNeededCoachingTime,

        @Schema(description = "종합 아르카나 조언 (기록 없으면 null)")
        String comprehensiveAdvice,

        @Schema(description = "고민 유형 통계 상위 3개")
        List<SymptomStatistic> symptomStatistics,

        @Schema(description = "타로 카드 통계 상위 2개")
        List<TarotCardStatistic> tarotCardStatistics
) {

    public record Summary(
            @Schema(description = "누적 진단 횟수 (전체 기간, 기록을 삭제해도 줄지 않음)", example = "12")
            int totalDiagnosisCount,

            @Schema(description = "최다 고민 과목 (기록 없으면 null)")
            MostFrequentSubject mostFrequentSubject
    ) {
    }

    public record MostFrequentSubject(
            @Schema(example = "수학")
            String subject,
            @Schema(example = "MATH")
            SubjectType subjectType,
            @Schema(example = "5")
            long count
    ) {
    }

    public record SymptomStatistic(
            Long symptomId,
            @Schema(example = "개념이 부족해요")
            String title,
            @Schema(example = "개념 부족")
            String keyword,
            @Schema(example = "6")
            long count,
            @Schema(description = "기간 내 전체 고민 선택 수 대비 비율(%, 정수 반올림)", example = "45")
            int percentage
    ) {
    }

    public record TarotCardStatistic(
            @Schema(example = "CHALLENGE")
            String cardId,
            @Schema(example = "도전과 극복")
            String name,
            String imageUrl,
            @Schema(example = "4")
            long count,
            @Schema(description = "카드 표시 키워드 (없으면 카드 이름)", example = "한계 돌파 · 압박 극복")
            String keyword,
            String quote
    ) {
    }
}
