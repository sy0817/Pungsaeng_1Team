package com.likelion.pungsaeng.global.filter;

import com.likelion.pungsaeng.global.exception.CustomException;
import com.likelion.pungsaeng.global.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Authorization: Bearer {accessToken} 헤더를 검증해 SecurityContext 에 인증 정보를 등록한다.
 * - principal 은 userId(Long) -> 컨트롤러에서 @AuthenticationPrincipal Long userId 로 사용
 * - 토큰이 없거나 잘못돼도 여기서 응답하지 않고 다음 필터로 넘긴다.
 *   인증이 필요한 경로라면 JwtAuthenticationEntryPoint 가 401 을 내려주고,
 *   이때 어떤 오류였는지(만료/위조)를 request attribute 로 전달한다.
 *
 * SecurityConfig 에서 직접 생성해 등록한다 (@Component 로 만들면 서블릿 필터로 한 번 더 등록되므로 X)
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String JWT_ERROR_ATTRIBUTE = "jwtError";
    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header != null && header.startsWith(BEARER_PREFIX)) {
            String token = header.substring(BEARER_PREFIX.length());
            try {
                Long userId = jwtUtil.validateAndGetUserId(token, JwtUtil.TokenType.ACCESS);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userId, null, List.of(new SimpleGrantedAuthority("ROLE_USER")));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (CustomException e) {
                SecurityContextHolder.clearContext();
                request.setAttribute(JWT_ERROR_ATTRIBUTE, e.getErrorCode());
            }
        }

        filterChain.doFilter(request, response);
    }
}
