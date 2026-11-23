package com.likelion.pungsaeng.global.response;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;

/**
 * 페이징 공통 응답. Spring 의 Page 를 그대로 직렬화하지 않는다 (버전마다 형식이 다르고 경고가 발생함)
 *
 * @param page 현재 페이지 (0부터)
 */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {

    public static <E, T> PageResponse<T> of(Page<E> page, List<T> content) {
        return new PageResponse<>(content, page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages(), page.isLast());
    }

    public static <E, T> PageResponse<T> of(Page<E> page, Function<E, T> mapper) {
        return of(page, page.getContent().stream().map(mapper).toList());
    }
}
