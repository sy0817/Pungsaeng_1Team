package com.likelion.pungsaeng.domain.prescription.service;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import com.likelion.pungsaeng.domain.consultation.entity.ConsultationSymptom;
import com.likelion.pungsaeng.domain.prescription.dto.PrescriptionResponse;
import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.domain.tarot.entity.CombinationRule;
import com.likelion.pungsaeng.domain.tarot.entity.TarotActionMaster;
import com.likelion.pungsaeng.domain.tarot.entity.TarotCard;
import com.likelion.pungsaeng.domain.tarot.repository.CombinationRuleRepository;
import com.likelion.pungsaeng.domain.tarot.repository.TarotActionMasterRepository;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

/**
 * 저장된 진단(Consultation)으로 처방전 응답을 조립한다. (생성 / 조회 API 공통)
 *
 * - 처방 키워드 : 카드+대표 고민 조합 규칙의 custom_keyword, 없으면 "카드.keyword_prefix 대표고민.keyword_suffix"
 * - 종합 조언   : 카드+대표 고민 조합 규칙의 comprehensive_advice (규칙이 없으면 null)
 * - 카드 문구   : 역방향이면 역방향 문구, 없으면 정방향 문구
 * - 실천 지침   : 최대 3개. 대표 고민 2개 + 보조 고민 1개 (보조 고민이 없거나 지침이 모자라면 서로 채움)
 *                각 고민 안에서는 과목별 지침을 먼저, 모자라면 ETC 공통 지침으로 채운다.
 *                후보가 많으면 처방전 ID 를 시드로 섞어서 고른다
 *                -> 처방전마다 다른 지침이 나오지만, 같은 처방전은 다시 조회해도 항상 같은 결과
 *
 * consultation 의 card / primarySymptom / consultationSymptoms(symptom) 가 로딩돼 있어야 한다
 * (ConsultationRepository.findDetailById 로 조회하거나, 방금 생성한 엔티티)
 */
@Component
@RequiredArgsConstructor
public class PrescriptionAssembler {

    static final int MAX_ACTION_GUIDES = 3;
    // 보조 고민이 있을 때 보조 고민 몫으로 남겨두는 지침 수
    static final int SECONDARY_SLOTS = 1;

    private final CombinationRuleRepository combinationRuleRepository;
    private final TarotActionMasterRepository tarotActionMasterRepository;

    public PrescriptionResponse assemble(Consultation consultation) {
        TarotCard card = consultation.getCard();
        Symptom primary = consultation.getPrimarySymptom();

        Optional<CombinationRule> rule = combinationRuleRepository
                .findByCard_IdAndSymptom_Id(card.getId(), primary.getId());

        return new PrescriptionResponse(
                consultation.getId(),
                PrescriptionTexts.keyword(card, primary, rule.orElse(null)),
                cardInfo(consultation),
                new PrescriptionResponse.DiagnosisSummary(
                        PrescriptionTexts.subjectLabel(consultation),
                        symptomKeywords(consultation),
                        rule.map(CombinationRule::getComprehensiveAdvice).orElse(null)
                ),
                actionGuides(consultation),
                consultation.getCreatedAt()
        );
    }

    private PrescriptionResponse.CardInfo cardInfo(Consultation consultation) {
        TarotCard card = consultation.getCard();
        return new PrescriptionResponse.CardInfo(
                card.getId(),
                card.getName(),
                card.getImageUrl(),
                consultation.getCardDirection(),
                card.getQuote(consultation.getCardDirection()),
                card.getAdvice(consultation.getCardDirection()),
                card.getRecommendedTime().getTimeRange(),
                card.getRecommendedEnv()
        );
    }

    // 대표 고민을 맨 앞에, 나머지는 선택한 순서대로
    private List<String> symptomKeywords(Consultation consultation) {
        List<String> keywords = new ArrayList<>();
        keywords.add(consultation.getPrimarySymptom().getKeywordSuffix());
        secondarySymptoms(consultation).forEach(symptom -> keywords.add(symptom.getKeywordSuffix()));
        return keywords;
    }

    // 대표 고민을 뺀 나머지 고민 (선택한 순서)
    private List<Symptom> secondarySymptoms(Consultation consultation) {
        Long primaryId = consultation.getPrimarySymptom().getId();
        return consultation.getConsultationSymptoms().stream()
                .map(ConsultationSymptom::getSymptom)
                .filter(symptom -> !symptom.getId().equals(primaryId))
                .toList();
    }

    private List<PrescriptionResponse.ActionGuide> actionGuides(Consultation consultation) {
        Long primaryId = consultation.getPrimarySymptom().getId();
        List<Long> secondaryIds = secondarySymptoms(consultation).stream().map(Symptom::getId).toList();
        SubjectType subject = consultation.getSubjectType();

        List<Long> symptomIds = new ArrayList<>();
        symptomIds.add(primaryId);
        symptomIds.addAll(secondaryIds);

        // symptom 은 프록시 id 만 꺼내므로 추가 쿼리 없음
        Map<Long, List<TarotActionMaster>> actionsBySymptom = tarotActionMasterRepository
                .findByCard_IdAndSymptom_IdInAndSubjectTypeIn(
                        consultation.getCard().getId(), symptomIds, EnumSet.of(subject, SubjectType.ETC))
                .stream()
                .collect(Collectors.groupingBy(action -> action.getSymptom().getId()));

        Random random = new Random(consultation.getId());
        List<TarotActionMaster> primaryCandidates =
                candidates(actionsBySymptom.getOrDefault(primaryId, List.of()), subject, random);
        List<TarotActionMaster> secondaryCandidates = new ArrayList<>();
        for (Long secondaryId : secondaryIds) {
            secondaryCandidates.addAll(candidates(actionsBySymptom.getOrDefault(secondaryId, List.of()), subject, random));
        }

        int primarySlots = secondaryIds.isEmpty() ? MAX_ACTION_GUIDES : MAX_ACTION_GUIDES - SECONDARY_SLOTS;
        Map<Long, TarotActionMaster> picked = new LinkedHashMap<>();
        addUntil(picked, primaryCandidates, primarySlots);
        addUntil(picked, secondaryCandidates, MAX_ACTION_GUIDES);
        // 보조 고민 지침이 모자라면 대표 고민 지침으로 다시 채움
        addUntil(picked, primaryCandidates, MAX_ACTION_GUIDES);

        return picked.values().stream()
                .map(action -> new PrescriptionResponse.ActionGuide(
                        action.getId(), action.getTitle(), action.getDescription(), action.getTag()))
                .toList();
    }

    // 한 고민의 지침 후보: 과목별 지침(섞음) 다음에 ETC 공통 지침(섞음)
    private List<TarotActionMaster> candidates(List<TarotActionMaster> actions, SubjectType subject, Random random) {
        List<TarotActionMaster> subjectActions = shuffled(actions, subject, random);
        if (subject == SubjectType.ETC) {
            return subjectActions;
        }
        List<TarotActionMaster> result = new ArrayList<>(subjectActions);
        result.addAll(shuffled(actions, SubjectType.ETC, random));
        return result;
    }

    // DB 조회 순서와 상관없이 같은 시드면 같은 결과가 나오도록 id 로 정렬한 뒤 섞는다
    private List<TarotActionMaster> shuffled(List<TarotActionMaster> actions, SubjectType subject, Random random) {
        List<TarotActionMaster> result = actions.stream()
                .filter(action -> action.getSubjectType() == subject)
                .sorted(Comparator.comparing(TarotActionMaster::getId))
                .collect(Collectors.toCollection(ArrayList::new));
        Collections.shuffle(result, random);
        return result;
    }

    private void addUntil(Map<Long, TarotActionMaster> picked, List<TarotActionMaster> candidates, int limit) {
        for (TarotActionMaster candidate : candidates) {
            if (picked.size() >= limit) {
                return;
            }
            picked.putIfAbsent(candidate.getId(), candidate);
        }
    }
}
