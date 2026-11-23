package com.likelion.pungsaeng.domain.user.service;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import com.likelion.pungsaeng.domain.consultation.entity.ConsultationSymptom;
import com.likelion.pungsaeng.domain.prescription.repository.ConsultationRepository;
import com.likelion.pungsaeng.domain.prescription.repository.ConsultationSymptomRepository;
import com.likelion.pungsaeng.domain.prescription.service.PrescriptionTexts;
import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.domain.tarot.entity.CombinationRule;
import com.likelion.pungsaeng.domain.tarot.entity.TarotCard;
import com.likelion.pungsaeng.domain.tarot.repository.CombinationRuleRepository;
import com.likelion.pungsaeng.domain.user.dto.MyPrescriptionItem;
import com.likelion.pungsaeng.global.common.PageQuery;
import com.likelion.pungsaeng.global.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 과거 처방 목록 - 한 페이지를 쿼리 3번으로 조회한다 (항목 수와 무관)
 * 1) 처방전 + 카드 + 대표 고민 (페이징)  2) 페이지 처방전들의 복수 고민  3) 페이지의 (카드, 대표 고민) 조합 규칙
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyPrescriptionService {

    private static final Sort LATEST_FIRST = Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));

    private final ConsultationRepository consultationRepository;
    private final ConsultationSymptomRepository consultationSymptomRepository;
    private final CombinationRuleRepository combinationRuleRepository;

    public PageResponse<MyPrescriptionItem> getMyPrescriptions(Long userId, PageQuery query) {
        Page<Consultation> page = consultationRepository.findPageByUserId(
                userId, PageRequest.of(query.page(), query.size(), LATEST_FIRST));
        List<Consultation> consultations = page.getContent();
        if (consultations.isEmpty()) {
            return PageResponse.of(page, List.of());
        }

        Map<Long, List<Symptom>> symptomsByConsultation = consultationSymptomRepository
                .findAllWithSymptomByConsultationIdIn(consultations.stream().map(Consultation::getId).toList())
                .stream()
                .collect(Collectors.groupingBy(cs -> cs.getConsultation().getId(),
                        Collectors.mapping(ConsultationSymptom::getSymptom, Collectors.toList())));

        Map<String, CombinationRule> rules = combinationRuleRepository
                .findAllByCardIdInAndSymptomIdIn(
                        consultations.stream().map(c -> c.getCard().getId()).distinct().toList(),
                        consultations.stream().map(c -> c.getPrimarySymptom().getId()).distinct().toList())
                .stream()
                .collect(Collectors.toMap(rule -> ruleKey(rule.getCard().getId(), rule.getSymptom().getId()),
                        Function.identity()));

        return PageResponse.of(page, consultation -> toItem(
                consultation,
                symptomsByConsultation.getOrDefault(consultation.getId(), List.of()),
                rules.get(ruleKey(consultation.getCard().getId(), consultation.getPrimarySymptom().getId()))));
    }

    private MyPrescriptionItem toItem(Consultation consultation, List<Symptom> symptoms, CombinationRule rule) {
        TarotCard card = consultation.getCard();
        Symptom primary = consultation.getPrimarySymptom();

        // 제목 = 처방 키워드, 요약 = 종합 조언 (없으면 카드 조언)
        String summary = rule != null ? rule.getComprehensiveAdvice() : card.getAdvice(consultation.getCardDirection());

        return new MyPrescriptionItem(
                consultation.getId(),
                PrescriptionTexts.keyword(card, primary, rule),
                summary,
                PrescriptionTexts.subjectLabel(consultation),
                consultation.getSubjectType(),
                new MyPrescriptionItem.Card(card.getId(), card.getName(), card.getImageUrl(), consultation.getCardDirection()),
                symptomKeywords(primary, symptoms),
                consultation.getCreatedAt()
        );
    }

    // 대표 고민을 맨 앞에, 나머지는 선택한 순서대로
    private List<String> symptomKeywords(Symptom primary, List<Symptom> symptoms) {
        List<String> keywords = new ArrayList<>();
        keywords.add(primary.getKeywordSuffix());
        symptoms.stream()
                .filter(symptom -> !symptom.getId().equals(primary.getId()))
                .forEach(symptom -> keywords.add(symptom.getKeywordSuffix()));
        return keywords;
    }

    private String ruleKey(String cardId, Long symptomId) {
        return cardId + ":" + symptomId;
    }
}
