package com.likelion.pungsaeng.domain.prescription.controller;

import com.likelion.pungsaeng.domain.prescription.dto.PrescriptionCreateRequest;
import com.likelion.pungsaeng.domain.prescription.dto.PrescriptionResponse;
import com.likelion.pungsaeng.domain.prescription.service.PrescriptionService;
import com.likelion.pungsaeng.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Prescription", description = "처방전")
@RestController
@RequestMapping("/api/v1/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @Operation(summary = "처방전 생성",
            description = "과목·고민·타로 카드로 처방전을 생성한다. 카드 방향은 서버가 랜덤으로 정한다.")
    @PostMapping
    public ResponseEntity<ApiResponse<PrescriptionResponse>> create(
            @Parameter(hidden = true) @AuthenticationPrincipal Long userId,
            @Valid @RequestBody PrescriptionCreateRequest request) {
        PrescriptionResponse response = prescriptionService.create(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("S201", "처방전이 성공적으로 생성되었습니다.", response));
    }

    @Operation(summary = "처방전 삭제", description = "본인 처방전만 삭제할 수 있다. (Hard Delete)")
    @DeleteMapping("/{prescriptionId}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @Parameter(hidden = true) @AuthenticationPrincipal Long userId,
            @PathVariable Long prescriptionId) {
        prescriptionService.delete(userId, prescriptionId);
        return ResponseEntity.ok(ApiResponse.success("S200", "처방전 삭제 성공", null));
    }
}
