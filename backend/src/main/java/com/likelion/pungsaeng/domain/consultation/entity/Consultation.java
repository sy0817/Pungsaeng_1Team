package com.likelion.pungsaeng.domain.consultation.entity;

import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.domain.tarot.entity.TarotCard;
import com.likelion.pungsaeng.domain.user.entity.User;
import com.likelion.pungsaeng.global.common.BaseTimeEntity;
import com.likelion.pungsaeng.global.common.enums.CardDirection;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

/**
 * 진단(처방전)
 */
@Getter
@Entity
@Table(
        name = "consultation",
        // 마이페이지 처방 목록(최신순) · 기간 통계 조회용
        indexes = @Index(name = "idx_consultation_user_created", columnList = "user_id, created_at")
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Consultation extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consultation_id")
    private Long id;

    // 회원 탈퇴 시 DB 에서 진단도 함께 삭제
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "card_id", nullable = false)
    private TarotCard card;

    // 대표 고민
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "primary_symptom_id", nullable = false)
    private Symptom primarySymptom;

    @Enumerated(EnumType.STRING)
    @Column(name = "subject_type", nullable = false, length = 20)
    private SubjectType subjectType;

    @Column(name = "sub_subject", nullable = false, length = 20)
    private String subSubject;

    @Enumerated(EnumType.STRING)
    @Column(name = "card_direction", nullable = false, length = 20)
    private CardDirection cardDirection;

    // 선택한 복수 고민 - 진단과 생명주기를 같이 함. 저장 순서(= 사용자가 고른 순서)대로 조회
    @OneToMany(mappedBy = "consultation", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<ConsultationSymptom> consultationSymptoms = new ArrayList<>();

    @Builder
    public Consultation(User user, TarotCard card, Symptom primarySymptom, SubjectType subjectType,
                        String subSubject, CardDirection cardDirection) {
        this.user = user;
        this.card = card;
        this.primarySymptom = primarySymptom;
        this.subjectType = subjectType;
        this.subSubject = subSubject;
        this.cardDirection = cardDirection;
    }

    public void addSymptom(Symptom symptom) {
        this.consultationSymptoms.add(ConsultationSymptom.builder()
                .consultation(this)
                .symptom(symptom)
                .build());
    }
}
