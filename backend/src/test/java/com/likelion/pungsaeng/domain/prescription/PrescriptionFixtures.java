package com.likelion.pungsaeng.domain.prescription;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.domain.tarot.entity.TarotCard;
import com.likelion.pungsaeng.domain.user.entity.User;
import com.likelion.pungsaeng.global.common.enums.CardDirection;
import com.likelion.pungsaeng.global.common.enums.RecommendedTime;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.List;

public final class PrescriptionFixtures {

    private PrescriptionFixtures() {
    }

    public static User user(Long id) {
        User user = User.builder().loginId("tarot" + id).password("hash").build();
        ReflectionTestUtils.setField(user, "id", id);
        return user;
    }

    public static TarotCard card() {
        return card(null, null);
    }

    public static TarotCard card(String reversedQuote, String reversedAdvice) {
        return TarotCard.builder()
                .id("CHALLENGE").name("도전과 극복").imageUrl("/images/tarot/CHALLENGE.png")
                .quote("명언").advice("조언").reversedQuote(reversedQuote).reversedAdvice(reversedAdvice)
                .keywordPrefix("돌파와")
                .recommendedTime(RecommendedTime.NIGHT_STUDY_2).recommendedEnv("조용한 1인 독서대")
                .build();
    }

    public static Consultation consultation(Long id, User user, SubjectType subjectType, CardDirection direction,
                                            TarotCard card, Symptom primary, List<Symptom> symptoms) {
        Consultation consultation = Consultation.builder()
                .user(user).card(card).primarySymptom(primary)
                .subjectType(subjectType).subSubject("공통수학 1").cardDirection(direction)
                .build();
        symptoms.forEach(consultation::addSymptom);
        ReflectionTestUtils.setField(consultation, "id", id);
        ReflectionTestUtils.setField(consultation, "createdAt", LocalDateTime.of(2026, 11, 23, 12, 0));
        return consultation;
    }

    public static Symptom symptom(Long id, String keywordSuffix) {
        Symptom symptom = Symptom.builder().title("고민" + id).description("설명").keywordSuffix(keywordSuffix).build();
        ReflectionTestUtils.setField(symptom, "id", id);
        return symptom;
    }

    public static Consultation consultation(Long id, User user, SubjectType subjectType,
                                            Symptom primary, List<Symptom> symptoms) {
        return consultation(id, user, subjectType, CardDirection.UPRIGHT, card(), primary, symptoms);
    }
}
