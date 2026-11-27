package com.likelion.pungsaeng.domain.prescription.service;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.domain.tarot.entity.CombinationRule;
import com.likelion.pungsaeng.domain.tarot.entity.TarotCard;
import com.likelion.pungsaeng.global.common.enums.SubjectType;

/**
 * 처방전 화면과 마이페이지가 같은 규칙으로 문구를 만들도록 모아둔 함수들
 */
public final class PrescriptionTexts {

    private PrescriptionTexts() {
    }

    /**
     * 처방 키워드: 조합 규칙의 custom_keyword, 없거나 비어 있으면 "카드.keyword_prefix 대표고민.keyword_suffix"
     *
     * @param rule (카드, 대표 고민) 조합 규칙. 없으면 null
     */
    public static String keyword(TarotCard card, Symptom primary, CombinationRule rule) {
        if (rule != null && rule.getCustomKeyword() != null && !rule.getCustomKeyword().isBlank()) {
            return rule.getCustomKeyword();
        }
        return card.getKeywordPrefix() + " " + primary.getKeywordSuffix();
    }

    // 예) "수학 (공통수학 1)"
    public static String subjectLabel(SubjectType subjectType, String subSubject) {
        return subjectType.getDescription() + " (" + subSubject + ")";
    }

    public static String subjectLabel(Consultation consultation) {
        return subjectLabel(consultation.getSubjectType(), consultation.getSubSubject());
    }
}
