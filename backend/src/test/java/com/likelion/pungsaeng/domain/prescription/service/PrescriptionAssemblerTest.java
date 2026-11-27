package com.likelion.pungsaeng.domain.prescription.service;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import com.likelion.pungsaeng.domain.prescription.dto.PrescriptionResponse;
import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.domain.tarot.entity.CombinationRule;
import com.likelion.pungsaeng.domain.tarot.entity.TarotActionMaster;
import com.likelion.pungsaeng.domain.tarot.repository.CombinationRuleRepository;
import com.likelion.pungsaeng.domain.tarot.repository.TarotActionMasterRepository;
import com.likelion.pungsaeng.global.common.enums.CardDirection;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.likelion.pungsaeng.domain.prescription.PrescriptionFixtures.card;
import static com.likelion.pungsaeng.domain.prescription.PrescriptionFixtures.consultation;
import static com.likelion.pungsaeng.domain.prescription.PrescriptionFixtures.symptom;
import static com.likelion.pungsaeng.domain.prescription.PrescriptionFixtures.user;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PrescriptionAssemblerTest {

    private final CombinationRuleRepository combinationRuleRepository = mock(CombinationRuleRepository.class);
    private final TarotActionMasterRepository actionRepository = mock(TarotActionMasterRepository.class);
    private final PrescriptionAssembler assembler = new PrescriptionAssembler(combinationRuleRepository, actionRepository);

    private final Symptom concept = symptom(1L, "개념 부족");
    private final Symptom focus = symptom(3L, "집중력 저하");
    private final Symptom phone = symptom(5L, "스마트폰 과다 사용");

    private TarotActionMaster action(Long id, Symptom symptom, SubjectType subjectType) {
        TarotActionMaster action = TarotActionMaster.builder()
                .card(card()).symptom(symptom).subjectType(subjectType)
                .title("지침" + id).description("설명").tag("태그").build();
        ReflectionTestUtils.setField(action, "id", id);
        return action;
    }

    private void givenActions(TarotActionMaster... actions) {
        when(actionRepository.findByCard_IdAndSymptom_IdInAndSubjectTypeIn(anyString(), any(), any()))
                .thenReturn(List.of(actions));
    }

    private List<Long> actionIds(Consultation consultation) {
        return assembler.assemble(consultation).actionGuides().stream()
                .map(PrescriptionResponse.ActionGuide::actionId).toList();
    }

    // ===== 키워드 / 종합 조언 / 고민 목록 =====

    @Test
    void 조합_규칙이_있으면_custom_keyword와_종합_조언을_쓴다() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, focus, List.of(concept, focus));
        when(combinationRuleRepository.findByCard_IdAndSymptom_Id("CHALLENGE", 3L)).thenReturn(Optional.of(
                CombinationRule.builder().card(card()).symptom(focus)
                        .customKeyword("돌파와 뼈대 재건").comprehensiveAdvice("종합 조언").build()));
        givenActions();

        PrescriptionResponse response = assembler.assemble(consultation);

        assertThat(response.prescriptionKeyword()).isEqualTo("돌파와 뼈대 재건");
        assertThat(response.diagnosisSummary().comprehensiveAdvice()).isEqualTo("종합 조언");
        assertThat(response.diagnosisSummary().subject()).isEqualTo("수학 (공통수학 1)");
        // 대표 고민이 맨 앞
        assertThat(response.diagnosisSummary().symptoms()).containsExactly("집중력 저하", "개념 부족");
        assertThat(response.card().recommendedTime()).isEqualTo("20:30 ~ 22:00");
    }

    @Test
    void 조합_규칙이_없으면_prefix_suffix로_키워드를_만들고_조언은_null() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept));
        when(combinationRuleRepository.findByCard_IdAndSymptom_Id(anyString(), anyLong())).thenReturn(Optional.empty());
        givenActions();

        PrescriptionResponse response = assembler.assemble(consultation);

        assertThat(response.prescriptionKeyword()).isEqualTo("돌파와 개념 부족");
        assertThat(response.diagnosisSummary().comprehensiveAdvice()).isNull();
    }

    @Test
    void 조합_규칙의_custom_keyword가_비어_있으면_키워드는_prefix_suffix_조언은_규칙_것() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept));
        when(combinationRuleRepository.findByCard_IdAndSymptom_Id("CHALLENGE", 1L)).thenReturn(Optional.of(
                CombinationRule.builder().card(card()).symptom(concept)
                        .customKeyword(" ").comprehensiveAdvice("종합 조언").build()));
        givenActions();

        PrescriptionResponse response = assembler.assemble(consultation);

        assertThat(response.prescriptionKeyword()).isEqualTo("돌파와 개념 부족");
        assertThat(response.diagnosisSummary().comprehensiveAdvice()).isEqualTo("종합 조언");
    }

    // ===== 카드 방향 =====

    @Test
    void 역방향이면_역방향_문구를_쓴다() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, CardDirection.REVERSED,
                card("역방향 명언", "역방향 조언"), concept, List.of(concept));
        givenActions();

        PrescriptionResponse.CardInfo card = assembler.assemble(consultation).card();

        assertThat(card.direction()).isEqualTo(CardDirection.REVERSED);
        assertThat(card.quote()).isEqualTo("역방향 명언");
        assertThat(card.advice()).isEqualTo("역방향 조언");
    }

    @Test
    void 역방향_문구가_없으면_정방향_문구를_쓴다() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, CardDirection.REVERSED,
                card(null, " "), concept, List.of(concept));
        givenActions();

        PrescriptionResponse.CardInfo card = assembler.assemble(consultation).card();

        assertThat(card.quote()).isEqualTo("명언");
        assertThat(card.advice()).isEqualTo("조언");
    }

    @Test
    void 정방향이면_역방향_문구가_있어도_정방향_문구를_쓴다() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, CardDirection.UPRIGHT,
                card("역방향 명언", "역방향 조언"), concept, List.of(concept));
        givenActions();

        assertThat(assembler.assemble(consultation).card().quote()).isEqualTo("명언");
    }

    // ===== 실천 지침 =====

    @Test
    void 대표_고민만_있으면_대표_고민_지침_3개() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept));
        givenActions(action(1L, concept, SubjectType.MATH), action(2L, concept, SubjectType.MATH),
                action(3L, concept, SubjectType.MATH), action(4L, concept, SubjectType.MATH));

        List<Long> ids = actionIds(consultation);

        assertThat(ids).hasSize(3).doesNotHaveDuplicates().allMatch(id -> id >= 1 && id <= 4);
    }

    @Test
    void 보조_고민이_있으면_대표_2개_보조_1개() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept, focus));
        givenActions(action(1L, concept, SubjectType.MATH), action(2L, concept, SubjectType.MATH),
                action(3L, concept, SubjectType.MATH),
                action(31L, focus, SubjectType.ETC), action(32L, focus, SubjectType.ETC));

        List<Long> ids = actionIds(consultation);

        assertThat(ids).hasSize(3);
        assertThat(ids.subList(0, 2)).allMatch(id -> id <= 3);
        assertThat(ids.get(2)).isIn(31L, 32L);
    }

    @Test
    void 보조_고민이_여러_개면_먼저_고른_보조_고민이_자리를_갖는다() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(phone, concept, focus));
        givenActions(action(1L, concept, SubjectType.MATH), action(2L, concept, SubjectType.MATH),
                action(31L, focus, SubjectType.ETC), action(51L, phone, SubjectType.ETC));

        assertThat(actionIds(consultation)).containsExactlyInAnyOrder(1L, 2L, 51L);
    }

    @Test
    void 보조_고민_지침이_없으면_대표_고민_지침으로_채운다() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept, focus));
        givenActions(action(1L, concept, SubjectType.MATH), action(2L, concept, SubjectType.MATH),
                action(3L, concept, SubjectType.MATH));

        assertThat(actionIds(consultation)).containsExactlyInAnyOrder(1L, 2L, 3L);
    }

    @Test
    void 대표_고민_지침이_없으면_보조_고민_지침으로_채운다() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept, focus));
        givenActions(action(31L, focus, SubjectType.ETC), action(32L, focus, SubjectType.ETC));

        assertThat(actionIds(consultation)).containsExactlyInAnyOrder(31L, 32L);
    }

    @Test
    void 과목별_지침을_먼저_쓰고_모자라면_ETC로_채운다() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept));
        givenActions(action(1L, concept, SubjectType.MATH), action(11L, concept, SubjectType.ETC),
                action(12L, concept, SubjectType.ETC), action(13L, concept, SubjectType.ETC));

        List<Long> ids = actionIds(consultation);

        assertThat(ids).hasSize(3);
        assertThat(ids.get(0)).isEqualTo(1L);
        assertThat(ids.subList(1, 3)).allMatch(id -> id >= 11);
    }

    @Test
    void 과목별_지침이_없으면_ETC_공통_지침만_쓴다() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.ENGLISH, concept, List.of(concept));
        givenActions(action(11L, concept, SubjectType.ETC));

        assertThat(actionIds(consultation)).containsExactly(11L);
    }

    @Test
    void 지침이_하나도_없으면_빈_배열() {
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept));
        givenActions();

        assertThat(actionIds(consultation)).isEmpty();
    }

    @Test
    void 같은_처방전은_다시_조립해도_같은_지침() {
        TarotActionMaster[] actions = new TarotActionMaster[6];
        for (int i = 0; i < 6; i++) {
            actions[i] = action((long) i + 1, concept, SubjectType.MATH);
        }
        givenActions(actions);
        Consultation consultation = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept));

        assertThat(actionIds(consultation)).isEqualTo(actionIds(consultation));
    }

    @Test
    void 처방전마다_다른_지침이_나올_수_있다() {
        TarotActionMaster[] actions = new TarotActionMaster[6];
        for (int i = 0; i < 6; i++) {
            actions[i] = action((long) i + 1, concept, SubjectType.MATH);
        }
        givenActions(actions);

        Set<List<Long>> selections = new HashSet<>();
        for (long id = 1; id <= 20; id++) {
            List<Long> picked = new ArrayList<>(actionIds(consultation(id, user(1L), SubjectType.MATH, concept, List.of(concept))));
            picked.sort(Long::compare);
            selections.add(picked);
        }

        assertThat(selections).hasSizeGreaterThan(1);
    }
}
