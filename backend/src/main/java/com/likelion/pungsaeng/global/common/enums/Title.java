package com.likelion.pungsaeng.global.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 칭호 - 누적 진단 횟수로 계산되는 값이라 DB에 저장하지 않는다.
 * 반드시 minRequiredCount 오름차순으로 선언할 것 (of()가 순서에 의존)
 */
@Getter
@RequiredArgsConstructor
public enum Title {
    BEGINNER(0, "새내기 수험생"),
    DILIGENT(5, "성실한 탐구자"),
    VETERAN(10, "노련한 학업 여행자"),
    REGULAR(20, "타로 의원 단골");

    private final int minRequiredCount;
    private final String label;

    public static Title of(int diagnosisCount) {
        Title result = BEGINNER;
        for (Title title : values()) {
            if (diagnosisCount >= title.minRequiredCount) {
                result = title;
            }
        }
        return result;
    }
}
