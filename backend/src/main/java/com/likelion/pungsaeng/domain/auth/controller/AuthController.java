package com.likelion.pungsaeng.domain.auth.controller;

import com.likelion.pungsaeng.domain.auth.dto.CheckIdRequest;
import com.likelion.pungsaeng.domain.auth.dto.CheckIdResponse;
import com.likelion.pungsaeng.domain.auth.dto.LoginRequest;
import com.likelion.pungsaeng.domain.auth.dto.LoginResponse;
import com.likelion.pungsaeng.domain.auth.dto.LoginResult;
import com.likelion.pungsaeng.domain.auth.dto.SignupRequest;
import com.likelion.pungsaeng.domain.auth.dto.SignupResponse;
import com.likelion.pungsaeng.domain.auth.service.AuthService;
import com.likelion.pungsaeng.global.exception.CustomException;
import com.likelion.pungsaeng.global.exception.ErrorCode;
import com.likelion.pungsaeng.global.response.ApiResponse;
import com.likelion.pungsaeng.global.util.CookieUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "Auth", description = "회원가입 / 로그인 / 토큰 재발급")
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

    @Operation(summary = "토큰 재발급",
            description = """
                    쿠키(refreshToken)의 Refresh Token 으로 Access / Refresh Token 을 모두 새로 발급한다.
                    Access Token 은 body 로, 새 Refresh Token 은 쿠키로 내려간다. 이전 Refresh Token 은 즉시 무효.
                    이미 교체된 Refresh Token 을 다시 쓰면 탈취로 보고 강제 로그아웃(401 AUTH003)한다.
                    프론트는 동시에 여러 요청이 401 을 받아도 재발급을 한 번만 호출해야 한다.
                    (쿠키 기반이라 Swagger UI 에서는 로그인 직후 같은 브라우저에서만 테스트 가능)""")
    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<LoginResponse>> reissue(
            @Parameter(hidden = true) @CookieValue(name = CookieUtil.REFRESH_TOKEN_COOKIE, required = false)
            String refreshToken) {
        try {
            LoginResult result = authService.reissue(refreshToken);
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE,
                            CookieUtil.createRefreshTokenCookie(result.refreshToken(), result.refreshTokenExpirationMs()).toString())
                    .body(ApiResponse.success("S200", "토큰이 재발급되었습니다.", result.response()));
        } catch (CustomException e) {
            // 재발급 실패 시 브라우저에 남은 Refresh Token 쿠키도 지운다 (토큰 값은 로그에 남기지 않음)
            ErrorCode errorCode = e.getErrorCode();
            log.warn("토큰 재발급 실패: {}", errorCode.getCode());
            return ResponseEntity.status(errorCode.getStatus())
                    .header(HttpHeaders.SET_COOKIE, CookieUtil.deleteRefreshTokenCookie().toString())
                    .body(ApiResponse.error(errorCode.getCode(), errorCode.getMessage(), null));
        }
    }
}
