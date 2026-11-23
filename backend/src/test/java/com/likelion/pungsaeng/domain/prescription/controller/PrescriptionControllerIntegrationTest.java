package com.likelion.pungsaeng.domain.prescription.controller;

import com.jayway.jsonpath.JsonPath;
import com.likelion.pungsaeng.domain.prescription.repository.ConsultationRepository;
import com.likelion.pungsaeng.domain.user.entity.User;
import com.likelion.pungsaeng.domain.user.repository.UserRepository;
import com.likelion.pungsaeng.global.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * 로컬 MySQL + data.sql 정적 데이터(CHALLENGE 카드, 고민 1~6, 지침 1~6) 기준 통합 테스트.
 * 테스트마다 트랜잭션을 롤백하므로 DB 에 데이터가 남지 않는다.
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class PrescriptionControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConsultationRepository consultationRepository;
    @Autowired
    private JwtUtil jwtUtil;

    private User me;
    private String myToken;
    private String otherToken;

    @BeforeEach
    void setUp() {
        me = userRepository.save(User.builder().loginId(uniqueId()).password("hash").build());
        User other = userRepository.save(User.builder().loginId(uniqueId()).password("hash").build());
        myToken = jwtUtil.createAccessToken(me.getId());
        otherToken = jwtUtil.createAccessToken(other.getId());
    }

    private String uniqueId() {
        return "it" + UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    }

    private ResultActions create(String token, String body) throws Exception {
        return mockMvc.perform(post("/api/v1/prescriptions")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body));
    }

    private static final String VALID_BODY = """
            {"subject":"MATH","subSubject":"공통수학 1","tarotCardId":"CHALLENGE","symptomIds":[1,3],"primarySymptomId":1}
            """;

    @Test
    void 처방전_생성_성공() throws Exception {
        create(myToken, VALID_BODY)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.code").value("S201"))
                .andExpect(jsonPath("$.data.prescriptionKeyword").value("돌파와 뼈대 재건"))
                .andExpect(jsonPath("$.data.card.cardId").value("CHALLENGE"))
                .andExpect(jsonPath("$.data.card.recommendedTime").value("20:30 ~ 22:00"))
                .andExpect(jsonPath("$.data.diagnosisSummary.subject").value("수학 (공통수학 1)"))
                .andExpect(jsonPath("$.data.diagnosisSummary.symptoms[0]").value("개념 부족"))
                .andExpect(jsonPath("$.data.diagnosisSummary.symptoms[1]").value("집중력 저하"))
                // 대표 고민 지침 2개 + 보조 고민(집중력) 지침 1개
                .andExpect(jsonPath("$.data.actionGuides.length()").value(3))
                .andExpect(jsonPath("$.data.actionGuides[2].actionId").value(org.hamcrest.Matchers.anyOf(
                        org.hamcrest.Matchers.is(5), org.hamcrest.Matchers.is(6))));

        assertThat(userRepository.findById(me.getId()).orElseThrow().getTotalDiagnosisCount()).isEqualTo(1);
    }

    @Test
    void 대표_고민이_목록에_없으면_400() throws Exception {
        create(myToken, """
                {"subject":"MATH","subSubject":"대수","tarotCardId":"CHALLENGE","symptomIds":[1,3],"primarySymptomId":2}
                """)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("E400"))
                .andExpect(jsonPath("$.errors[0].field").value("primarySymptomIncluded"));
    }

    @Test
    void 없는_카드면_404() throws Exception {
        create(myToken, """
                {"subject":"MATH","subSubject":"대수","tarotCardId":"arcana_07","symptomIds":[1],"primarySymptomId":1}
                """)
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("TAROT001"));
    }

    @Test
    void 없는_고민이면_400() throws Exception {
        create(myToken, """
                {"subject":"MATH","subSubject":"대수","tarotCardId":"CHALLENGE","symptomIds":[1,99],"primarySymptomId":1}
                """)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("SYMPTOM001"));
    }

    @Test
    void 토큰_없이_생성하면_401() throws Exception {
        mockMvc.perform(post("/api/v1/prescriptions").contentType(MediaType.APPLICATION_JSON).content(VALID_BODY))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("AUTH002"));
    }

    @Test
    void 본인_처방전_삭제_후_다시_삭제하면_404() throws Exception {
        String response = create(myToken, VALID_BODY).andReturn().getResponse().getContentAsString();
        long id = ((Number) JsonPath.read(response, "$.data.prescriptionId")).longValue();

        mockMvc.perform(delete("/api/v1/prescriptions/{id}", id).header("Authorization", "Bearer " + myToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("S200"));
        assertThat(consultationRepository.findById(id)).isEmpty();
        // 삭제해도 누적 진단 횟수는 그대로
        assertThat(userRepository.findById(me.getId()).orElseThrow().getTotalDiagnosisCount()).isEqualTo(1);

        mockMvc.perform(delete("/api/v1/prescriptions/{id}", id).header("Authorization", "Bearer " + myToken))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("PRESCRIPTION001"));
    }

    @Test
    void 다른_사람_처방전을_삭제하면_403() throws Exception {
        String response = create(myToken, VALID_BODY).andReturn().getResponse().getContentAsString();
        long id = ((Number) JsonPath.read(response, "$.data.prescriptionId")).longValue();

        mockMvc.perform(delete("/api/v1/prescriptions/{id}", id).header("Authorization", "Bearer " + otherToken))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value("PRESCRIPTION002"));
        assertThat(consultationRepository.findById(id)).isPresent();
    }
}
