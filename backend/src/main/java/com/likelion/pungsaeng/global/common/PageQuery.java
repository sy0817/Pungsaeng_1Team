package com.likelion.pungsaeng.global.common;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

/**
 * 페이징 쿼리 파라미터 (?page=0&size=10). 값이 없으면 기본값 사용
 */
public record PageQuery(
        @Schema(description = "페이지 번호 (0부터)", example = "0")
        @Min(value = 0, message = "page 는 0 이상이어야 합니다.")
        Integer page,

        @Schema(description = "페이지 크기 (1~50)", example = "10")
        @Min(value = 1, message = "size 는 1 이상이어야 합니다.")
        @Max(value = 50, message = "size 는 50 이하여야 합니다.")
        Integer size
) {

    public static final int DEFAULT_PAGE = 0;
    public static final int DEFAULT_SIZE = 10;

    public PageQuery {
        page = page == null ? DEFAULT_PAGE : page;
        size = size == null ? DEFAULT_SIZE : size;
    }
}
