package com.likelion.pungsaeng.global.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SubjectType {
    KOREAN("국어"),
    ENGLISH("영어"),
    MATH("수학"),
    SCIENCE("과학"),
    SOCIAL("사회"),
    /**
     * 기타 과목 + 과목 무관 공통 지침용.
     * TarotActionMaster 조회 시 (카드, 과목, 고민)으로 못 찾으면 (카드, ETC, 고민)으로 fallback.
     */
    ETC("기타");

    private final String description;
}
