package com.likelion.pungsaeng.domain.auth.controller;

import com.likelion.pungsaeng.domain.auth.entity.RefreshToken;
import com.likelion.pungsaeng.domain.auth.repository.RefreshTokenRepository;
import com.likelion.pungsaeng.domain.user.entity.User;
import com.likelion.pungsaeng.domain.user.repository.UserRepository;
import com.likelion.pungsaeng.global.config.JwtProperties;
import com.likelion.pungsaeng.global.util.CookieUtil;
import com.likelion.pungsaeng.global.util.JwtUtil;
import com.jayway.jsonpath.JsonPath;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * 토큰 재발급 통합 테스트 (로컬 MySQL, 테스트마다 롤백)
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthReissueIntegrationTest {

    private static final String PASSWORD = "password1!";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private JwtProperties jwtProperties;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private EntityManager entityManager;

    private User user;
    private String refreshToken;

    @BeforeEach
    void setUp() throws Exception {
        String loginId = "it" + UUID.randomUUID().toString().replace("-", "").substring(0, 10);
        user = userRepository.save(User.builder().loginId(loginId).password(passwordEncoder.encode(PASSWORD)).build());

        MockHttpServletResponse login = mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"loginId\":\"" + loginId + "\",\"password\":\"" + PASSWORD + "\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse();
        refreshToken = login.getCookie(CookieUtil.REFRESH_TOKEN_COOKIE).getValue();
    }

    private ResultActions reissue(String token) throws Exception {
        return mockMvc.perform(post("/api/v1/auth/reissue")
                .cookie(new Cookie(CookieUtil.REFRESH_TOKEN_COOKIE, token)));
    }

    private void assertCookieDeleted(MockHttpServletResponse response) {
        Cookie cookie = response.getCookie(CookieUtil.REFRESH_TOKEN_COOKIE);
        assertThat(cookie).isNotNull();
        assertThat(cookie.getMaxAge()).isZero();
    }

    @Test
    void 재발급하면_새_토큰을_주고_DB_토큰을_교체하며_만료를_14일로_연장한다() throws Exception {
        MockHttpServletResponse response = reissue(refreshToken)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("S200"))
                .andExpect(jsonPath("$.data.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.data.expiresIn").value(1800))
                .andExpect(jsonPath("$.data.loginId").value(user.getLoginId()))
                .andReturn().getResponse();

        Cookie newCookie = response.getCookie(CookieUtil.REFRESH_TOKEN_COOKIE);
        assertThat(newCookie.getValue()).isNotEqualTo(refreshToken);
        assertThat(newCookie.isHttpOnly()).isTrue();
        assertThat(newCookie.getPath()).isEqualTo("/api/v1/auth");

        RefreshToken stored = refreshTokenRepository.findByUserId(user.getId()).orElseThrow();
        assertThat(stored.getTokenHash()).isEqualTo(JwtUtil.hashToken(newCookie.getValue()));
        assertThat(stored.getExpiresAt()).isCloseTo(LocalDateTime.now().plusDays(14), within(1, java.time.temporal.ChronoUnit.MINUTES));

        // 새 Access Token 으로 인증 API 호출 가능
        String accessToken = JsonPath.read(response.getContentAsString(), "$.data.accessToken");
        mockMvc.perform(get("/api/v1/users/me/statistics").header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk());
    }

    @Test
    void 이미_교체된_토큰을_다시_쓰면_탈취로_보고_강제_로그아웃() throws Exception {
        String newToken = reissue(refreshToken).andExpect(status().isOk())
                .andReturn().getResponse().getCookie(CookieUtil.REFRESH_TOKEN_COOKIE).getValue();

        // 같은(이전) 토큰으로 두 번째 재발급
        MockHttpServletResponse response = reissue(refreshToken)
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH003"))
                .andReturn().getResponse();
        assertCookieDeleted(response);
        assertThat(refreshTokenRepository.findByUserId(user.getId())).isEmpty();

        // 정상 사용자가 갖고 있던 새 토큰도 함께 무효
        reissue(newToken)
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH003"));
    }

    @Test
    void 쿠키가_없으면_AUTH002() throws Exception {
        MockHttpServletResponse response = mockMvc.perform(post("/api/v1/auth/reissue"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH002"))
                .andReturn().getResponse();
        assertCookieDeleted(response);
    }

    @Test
    void 위조된_토큰이면_AUTH003() throws Exception {
        reissue("not-a-jwt")
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH003"));
        // 위조 토큰으로는 누구인지 알 수 없으므로 기존 토큰은 그대로
        assertThat(refreshTokenRepository.findByUserId(user.getId())).isPresent();
    }

    @Test
    void Access_Token을_넣으면_AUTH003() throws Exception {
        reissue(jwtUtil.createAccessToken(user.getId()))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH003"));
    }

    @Test
    void JWT가_만료된_토큰이면_AUTH004() throws Exception {
        String expired = new JwtUtil(new JwtProperties(jwtProperties.secret(), -1_000, -1_000))
                .createRefreshToken(user.getId());

        reissue(expired)
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH004"));
    }

    @Test
    void DB에서_만료된_토큰이면_AUTH004_그리고_삭제() throws Exception {
        jdbcTemplate.update("update refresh_token set expires_at = ? where user_id = ?",
                java.sql.Timestamp.valueOf(LocalDateTime.now().minusMinutes(1)), user.getId());
        entityManager.clear();

        reissue(refreshToken)
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH004"));
        assertThat(refreshTokenRepository.findByUserId(user.getId())).isEmpty();
    }
}
