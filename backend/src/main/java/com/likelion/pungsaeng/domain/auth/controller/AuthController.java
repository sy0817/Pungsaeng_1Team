package com.likelion.pungsaeng.domain.auth.controller;

import com.likelion.pungsaeng.domain.auth.dto.CheckIdRequest;
import com.likelion.pungsaeng.domain.auth.dto.CheckIdResponse;
import com.likelion.pungsaeng.domain.auth.dto.LoginRequest;
import com.likelion.pungsaeng.domain.auth.dto.LoginResponse;
import com.likelion.pungsaeng.domain.auth.dto.LoginResult;
import com.likelion.pungsaeng.domain.auth.dto.SignupRequest;
import com.likelion.pungsaeng.domain.auth.dto.SignupResponse;
import com.likelion.pungsaeng.domain.auth.service.AuthService;
import com.likelion.pungsaeng.global.response.ApiResponse;
import com.likelion.pungsaeng.global.util.CookieUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Auth", description = "회원가입 / 로그인")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@SecurityRequirements // 인증 불필요 API - Swagger 자물쇠 표시 제거
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "아이디 중복 확인", description = "available 이 true 면 사용 가능한 아이디")
    @GetMapping("/check-id")
    public ResponseEntity<ApiResponse<CheckIdResponse>> checkLoginId(
            @Valid @ParameterObject @ModelAttribute CheckIdRequest request) {
        CheckIdResponse response = authService.checkLoginId(request.loginId());
        String message = response.available() ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다.";
        return ResponseEntity.ok(ApiResponse.success("S200", message, response));
    }

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignupResponse>> signup(@Valid @RequestBody SignupRequest request) {
        SignupResponse response = authService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("S201", "회원가입이 완료되었습니다.", response));
    }

    @Operation(summary = "로그인",
            description = "Access Token 은 응답 body 로, Refresh Token 은 HttpOnly 쿠키(refreshToken)로 발급")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResult result = authService.login(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,
                        CookieUtil.createRefreshTokenCookie(result.refreshToken(), result.refreshTokenExpirationMs()).toString())
                .body(ApiResponse.success("S200", "로그인에 성공했습니다.", result.response()));
    }
}
