package com.likelion.pungsaeng.global.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CardDirection {
    UPRIGHT("정방향"),
    REVERSED("역방향");

    private final String description;
}
