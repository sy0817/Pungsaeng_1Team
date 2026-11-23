package com.likelion.pungsaeng.domain.user.controller;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import com.likelion.pungsaeng.domain.prescription.repository.ConsultationRepository;
import com.likelion.pungsaeng.domain.symptom.repository.SymptomRepository;
import com.likelion.pungsaeng.domain.tarot.repository.TarotCardRepository;
import com.likelion.pungsaeng.domain.user.entity.User;
import com.likelion.pungsaeng.domain.user.repository.UserRepository;
import com.likelion.pungsaeng.global.common.enums.CardDirection;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
import com.likelion.pungsaeng.global.util.JwtUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import org.hibernate.SessionFactory;
import org.hibernate.stat.Statistics;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.nullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * 로컬 MySQL + data.sql 정적 데이터 기준. 테스트마다 트랜잭션 롤백 -> DB 에 데이터가 남지 않는다.
 * (CHALLENGE x 개념 부족 조합 규칙: 키워드 "돌파와 뼈대 재건")
 */
@SpringBootTest(properties = "spring.jpa.properties.hibernate.generate_statistics=true")
@AutoConfigureMockMvc
@Transactional
class MyPageControllerIntegrationTest {

    private static final String RULE_KEYWORD = "돌파와 뼈대 재건";
    private static final String RULE_ADVICE_PREFIX = "성급하게 심화 문제를 풀지 말고";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConsultationRepository consultationRepository;
    @Autowired
    private TarotCardRepository tarotCardRepository;
    @Autowired
    private SymptomRepository symptomRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private EntityManagerFactory entityManagerFactory;

    private final LocalDateTime now = LocalDateTime.now();
    private User me;
    private User other;
    private String myToken;

    @BeforeEach
    void setUp() {
        me = userRepository.save(User.builder().loginId(uniqueId()).password("hash").build());
        other = userRepository.save(User.builder().loginId(uniqueId()).password("hash").build());
        myToken = jwtUtil.createAccessToken(me.getId());
    }

    private String uniqueId() {
        return "it" + UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    }

    private Consultation save(User user, String cardId, SubjectType subject, long primaryId,
                              List<Long> symptomIds, LocalDateTime createdAt) {
        Consultation consultation = Consultation.builder()
                .user(user)
                .card(tarotCardRepository.getReferenceById(cardId))
                .primarySymptom(symptomRepository.getReferenceById(primaryId))
                .subjectType(subject)
                .subSubject("세부")
                .cardDirection(CardDirection.UPRIGHT)
                .build();
        symptomIds.forEach(id -> consultation.addSymptom(symptomRepository.getReferenceById(id)));
        consultationRepository.saveAndFlush(consultation);
        // created_at 은 Auditing 이 현재 시각으로 넣으므로 테스트용으로 직접 바꾼다
        jdbcTemplate.update("update consultation set created_at = ? where consultation_id = ?",
                Timestamp.valueOf(createdAt), consultation.getId());
        return consultation;
    }

    // 직접 바꾼 created_at 을 다시 읽도록 영속성 컨텍스트를 비운다
    private void flushAndClear() {
        entityManager.flush();
        entityManager.clear();
    }

    private ResultActions getAsMe(String url) throws Exception {
        return mockMvc.perform(get(url).header("Authorization", "Bearer " + myToken));
    }

    // ===== 과거 처방 목록 =====

    @Test
    void 처방_목록은_최신순으로_페이징되고_다른_유저_처방은_빠진다() throws Exception {
        Consultation oldest = save(me, "CHALLENGE", SubjectType.MATH, 1, List.of(1L), now.minusDays(3));
        Consultation newest = save(me, "CHALLENGE", SubjectType.MATH, 1, List.of(1L), now.minusDays(1));
        Consultation middle = save(me, "CHALLENGE", SubjectType.MATH, 1, List.of(1L), now.minusDays(2));
        save(other, "CHALLENGE", SubjectType.MATH, 1, List.of(1L), now);
        flushAndClear();

        getAsMe("/api/v1/users/me/prescriptions?page=0&size=2")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("S200"))
                .andExpect(jsonPath("$.data.content.length()").value(2))
                .andExpect(jsonPath("$.data.content[0].prescriptionId").value(newest.getId()))
                .andExpect(jsonPath("$.data.content[1].prescriptionId").value(middle.getId()))
                .andExpect(jsonPath("$.data.page").value(0))
                .andExpect(jsonPath("$.data.size").value(2))
                .andExpect(jsonPath("$.data.totalElements").value(3))
                .andExpect(jsonPath("$.data.totalPages").value(2))
                .andExpect(jsonPath("$.data.last").value(false));

        getAsMe("/api/v1/users/me/prescriptions?page=1&size=2")
                .andExpect(jsonPath("$.data.content.length()").value(1))
                .andExpect(jsonPath("$.data.content[0].prescriptionId").value(oldest.getId()))
                .andExpect(jsonPath("$.data.last").value(true));
    }

    @Test
    void 처방_목록_항목은_처방_키워드와_종합_조언을_제목_요약으로_쓴다() throws Exception {
        save(me, "CHALLENGE", SubjectType.MATH, 1, List.of(3L, 1L), now.minusDays(1));
        flushAndClear();

        getAsMe("/api/v1/users/me/prescriptions")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].title").value(RULE_KEYWORD))
                .andExpect(jsonPath("$.data.content[0].summary").value(org.hamcrest.Matchers.startsWith(RULE_ADVICE_PREFIX)))
                .andExpect(jsonPath("$.data.content[0].subject").value("수학 (세부)"))
                .andExpect(jsonPath("$.data.content[0].subjectType").value("MATH"))
                .andExpect(jsonPath("$.data.content[0].card.cardId").value("CHALLENGE"))
                .andExpect(jsonPath("$.data.content[0].card.direction").value("UPRIGHT"))
                // 대표 고민이 맨 앞
                .andExpect(jsonPath("$.data.content[0].symptoms[0]").value("개념 부족"))
                .andExpect(jsonPath("$.data.content[0].symptoms[1]").value("집중력 저하"));
    }

    @Test
    void 조합_규칙이_없으면_요약은_카드_조언() throws Exception {
        save(me, "EFFORT", SubjectType.ENGLISH, 3, List.of(3L), now.minusDays(1));
        flushAndClear();
        String effortAdvice = tarotCardRepository.findById("EFFORT").orElseThrow().getAdvice();

        getAsMe("/api/v1/users/me/prescriptions")
                .andExpect(jsonPath("$.data.content[0].summary").value(effortAdvice));
    }

    @Test
    void 처방전이_없으면_빈_목록() throws Exception {
        getAsMe("/api/v1/users/me/prescriptions")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content.length()").value(0))
                .andExpect(jsonPath("$.data.totalElements").value(0))
                .andExpect(jsonPath("$.data.last").value(true));
    }

    @Test
    void 페이지_파라미터가_범위를_벗어나면_400() throws Exception {
        getAsMe("/api/v1/users/me/prescriptions?size=51")
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors[0].field").value("size"));
        getAsMe("/api/v1/users/me/prescriptions?page=-1")
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors[0].field").value("page"));
    }

    @Test
    void 토큰_없이_조회하면_401() throws Exception {
        mockMvc.perform(get("/api/v1/users/me/prescriptions"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH002"));
        mockMvc.perform(get("/api/v1/users/me/statistics"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void 처방_목록_쿼리_수는_항목_수와_상관없다() throws Exception {
        for (int i = 0; i < 8; i++) {
            save(me, i % 2 == 0 ? "CHALLENGE" : "EFFORT", SubjectType.MATH, 1, List.of(1L, 3L), now.minusDays(i + 1));
        }
        flushAndClear();
        Statistics statistics = entityManagerFactory.unwrap(SessionFactory.class).getStatistics();
        statistics.clear();

        getAsMe("/api/v1/users/me/prescriptions?size=5").andExpect(status().isOk());

        // 처방전 페이지 + count + 복수 고민 + 조합 규칙 (+ 인증 단계 조회 없음)
        assertThat(statistics.getPrepareStatementCount()).isLessThanOrEqualTo(4);
    }

    // ===== 통계 =====

    @Test
    void 통계는_최근_90일_기준으로_집계하고_동점이면_최근_값을_우선한다() throws Exception {
        save(me, "CHALLENGE", SubjectType.MATH, 1, List.of(1L), now.minusDays(1));
        save(me, "CHALLENGE", SubjectType.MATH, 1, List.of(1L, 2L), now.minusDays(2));
        save(me, "EFFORT", SubjectType.ENGLISH, 3, List.of(3L, 2L), now.minusDays(3));
        // 90일 밖 - 통계에서 제외
        save(me, "REST", SubjectType.SCIENCE, 4, List.of(4L), now.minusDays(100));
        // 다른 유저 - 제외
        save(other, "REST", SubjectType.SCIENCE, 4, List.of(4L), now.minusDays(1));
        for (int i = 0; i < 4; i++) {
            userRepository.increaseDiagnosisCount(me.getId());
        }
        flushAndClear();

        getAsMe("/api/v1/users/me/statistics")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("S200"))
                .andExpect(jsonPath("$.data.periodDays").value(90))
                // 누적 진단 횟수는 전체 기간
                .andExpect(jsonPath("$.data.summary.totalDiagnosisCount").value(4))
                .andExpect(jsonPath("$.data.summary.mostFrequentSubject.subject").value("수학"))
                .andExpect(jsonPath("$.data.summary.mostFrequentSubject.subjectType").value("MATH"))
                .andExpect(jsonPath("$.data.summary.mostFrequentSubject.count").value(2))
                // 고민 선택 5회: 개념 부족 2(최근 1일 전), 계획 2(최근 2일 전), 집중력 1 -> 동점은 최근 값 우선
                .andExpect(jsonPath("$.data.symptomStatistics.length()").value(3))
                .andExpect(jsonPath("$.data.symptomStatistics[0].symptomId").value(1))
                .andExpect(jsonPath("$.data.symptomStatistics[0].keyword").value("개념 부족"))
                .andExpect(jsonPath("$.data.symptomStatistics[0].count").value(2))
                .andExpect(jsonPath("$.data.symptomStatistics[0].percentage").value(40))
                .andExpect(jsonPath("$.data.symptomStatistics[1].symptomId").value(2))
                .andExpect(jsonPath("$.data.symptomStatistics[2].symptomId").value(3))
                .andExpect(jsonPath("$.data.symptomStatistics[2].percentage").value(20))
                // 카드 상위 2개
                .andExpect(jsonPath("$.data.tarotCardStatistics.length()").value(2))
                .andExpect(jsonPath("$.data.tarotCardStatistics[0].cardId").value("CHALLENGE"))
                .andExpect(jsonPath("$.data.tarotCardStatistics[0].count").value(2))
                .andExpect(jsonPath("$.data.tarotCardStatistics[0].keyword").value("한계 돌파 · 압박 극복"))
                .andExpect(jsonPath("$.data.tarotCardStatistics[1].cardId").value("EFFORT"))
                // CHALLENGE(야자 2타임) 2회 > EFFORT(야자 1타임) 1회
                .andExpect(jsonPath("$.data.mostNeededCoachingTime").value("야간 자율학습 2타임 (20:30 ~ 22:00)"))
                // (CHALLENGE, 개념 부족) 조합 규칙의 조언
                .andExpect(jsonPath("$.data.comprehensiveAdvice").value(org.hamcrest.Matchers.startsWith(RULE_ADVICE_PREFIX)));
    }

    @Test
    void 조합_규칙이_없으면_종합_조언은_최다_카드의_조언() throws Exception {
        save(me, "EFFORT", SubjectType.ENGLISH, 3, List.of(3L), now.minusDays(1));
        flushAndClear();
        String effortAdvice = tarotCardRepository.findById("EFFORT").orElseThrow().getAdvice();

        getAsMe("/api/v1/users/me/statistics")
                .andExpect(jsonPath("$.data.comprehensiveAdvice").value(effortAdvice))
                .andExpect(jsonPath("$.data.symptomStatistics[0].percentage").value(100));
    }

    @Test
    void 기록이_없으면_빈_통계() throws Exception {
        getAsMe("/api/v1/users/me/statistics")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.summary.totalDiagnosisCount").value(0))
                .andExpect(jsonPath("$.data.summary.mostFrequentSubject").value(nullValue()))
                .andExpect(jsonPath("$.data.mostNeededCoachingTime").value(nullValue()))
                .andExpect(jsonPath("$.data.comprehensiveAdvice").value(nullValue()))
                .andExpect(jsonPath("$.data.symptomStatistics.length()").value(0))
                .andExpect(jsonPath("$.data.tarotCardStatistics.length()").value(0));
    }
}
