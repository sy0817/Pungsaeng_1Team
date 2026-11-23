package com.likelion.pungsaeng.global.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 타로 카드별 추천 집중 시간대.
 *
 * 여러 카드가 같은 시간대를 공유하도록 고정 Enum으로 둔다.
 * -> 마이페이지 "가장 심층적인 코칭이 필요한 시간대"를 유저 진단 기록의 최빈 시간대로 집계(GROUP BY)할 수 있음.
 *
 * 프론트 응답 형식(문자열)에 맞춰 두 가지로 내려준다.
 * - 처방전 "추천 집중 시간"(card.focusTime)      : {@link #getTimeRange()}   예) "20:30 ~ 22:00"
 * - 마이페이지 코칭 시간대(coachingValue)        : {@link #getDisplayName()} 예) "야간 자율학습 2타임 (20:30 ~ 22:00)"
 *
 * 일반적인 고등학교 일과 기준:
 * 아침 자습(~08:30) -> 정규 수업 1~7교시(08:40 ~ 16:30) -> 방과 후 -> 석식(18:00 ~ 18:50)
 * -> 야자 1·2타임(~22:00) -> 귀가
 */
@Getter
@RequiredArgsConstructor
public enum RecommendedTime {
    MORNING_STUDY("아침 자율학습", "07:50 ~ 08:30"),
    AFTER_SCHOOL("방과 후", "16:40 ~ 18:00"),
    NIGHT_STUDY_1("야간 자율학습 1타임", "18:50 ~ 20:20"),
    NIGHT_STUDY_2("야간 자율학습 2타임", "20:30 ~ 22:00"),
    LATE_NIGHT("귀가 후 심야", "22:40 ~ 23:40");

    private final String label;
    private final String timeRange;

    public String getDisplayName() {
        return label + " (" + timeRange + ")";
    }
}
