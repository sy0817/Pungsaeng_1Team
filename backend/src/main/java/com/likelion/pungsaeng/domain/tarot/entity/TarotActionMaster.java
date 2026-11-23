package com.likelion.pungsaeng.domain.tarot.entity;

import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
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
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 타로 지침 - 카드 + 대과목 + 고민 3가지 조합으로 매핑되는 실천 지침
 * (한 조합에 여러 지침이 있을 수 있어 유니크 대신 조회용 인덱스만 둔다)
 */
@Getter
@Entity
@Table(
        name = "tarot_action_master",
        indexes = @Index(name = "idx_action_card_symptom_subject", columnList = "card_id, symptom_id, subject_type")
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TarotActionMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "action_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "card_id", nullable = false)
    private TarotCard card;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "symptom_id", nullable = false)
    private Symptom symptom;

    @Enumerated(EnumType.STRING)
    @Column(name = "subject_type", nullable = false, length = 20)
    private SubjectType subjectType;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "tag", nullable = false, length = 50)
    private String tag;

    @Builder
    public TarotActionMaster(TarotCard card, Symptom symptom, SubjectType subjectType,
                             String title, String description, String tag) {
        this.card = card;
        this.symptom = symptom;
        this.subjectType = subjectType;
        this.title = title;
        this.description = description;
        this.tag = tag;
    }
}
