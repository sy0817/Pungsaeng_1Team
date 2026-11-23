package com.likelion.pungsaeng.domain.user.controller;

import com.likelion.pungsaeng.domain.user.dto.MyPrescriptionItem;
import com.likelion.pungsaeng.domain.user.dto.MyStatisticsResponse;
import com.likelion.pungsaeng.domain.user.service.MyPrescriptionService;
import com.likelion.pungsaeng.domain.user.service.MyStatisticsService;
import com.likelion.pungsaeng.global.common.PageQuery;
import com.likelion.pungsaeng.global.response.ApiResponse;
import com.likelion.pungsaeng.global.response.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 마이페이지 - 로그인한 사용자 본인의 데이터만 다룬다 (경로에 사용자 id 를 받지 않음)
 */
@Tag(name = "MyPage", description = "마이페이지")
@RestController
@RequestMapping("/api/v1/users/me")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPrescriptionService myPrescriptionService;
    private final MyStatisticsService myStatisticsService;

    @Operation(summary = "과거 처방 목록 조회", description = "최신순 페이징 (page 0부터, size 1~50, 기본 10)")
    @GetMapping("/prescriptions")
    public ResponseEntity<ApiResponse<PageResponse<MyPrescriptionItem>>> getMyPrescriptions(
            @Parameter(hidden = true) @AuthenticationPrincipal Long userId,
            @Valid @ParameterObject @ModelAttribute PageQuery query) {
        PageResponse<MyPrescriptionItem> response = myPrescriptionService.getMyPrescriptions(userId, query);
        return ResponseEntity.ok(ApiResponse.success("S200", "과거 처방 목록 조회 성공", response));
    }

    @Operation(summary = "마이페이지 통계 조회",
            description = "누적 진단 횟수는 전체 기간, 나머지 통계는 최근 90일 기준")
    @GetMapping("/statistics")
    public ResponseEntity<ApiResponse<MyStatisticsResponse>> getMyStatistics(
            @Parameter(hidden = true) @AuthenticationPrincipal Long userId) {
        MyStatisticsResponse response = myStatisticsService.getMyStatistics(userId);
        return ResponseEntity.ok(ApiResponse.success("S200", "통계 조회가 성공적으로 완료되었습니다.", response));
    }
}
