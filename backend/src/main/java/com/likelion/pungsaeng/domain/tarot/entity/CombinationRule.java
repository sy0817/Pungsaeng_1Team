package com.likelion.pungsaeng.domain.tarot.entity;

import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 카드 + 고민 조합 규칙 (카드 1장 x 고민 1개 = 규칙 1개)
 */
@Getter
@Entity
@Table(
        name = "combination_rule",
        uniqueConstraints = @UniqueConstraint(name = "uk_combination_card_symptom", columnNames = {"card_id", "symptom_id"})
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CombinationRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rule_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "card_id", nullable = false)
    private TarotCard card;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "symptom_id", nullable = false)
    private Symptom symptom;

    @Column(name = "custom_keyword", length = 100)
    private String customKeyword;

    @Column(name = "comprehensive_advice", nullable = false, columnDefinition = "TEXT")
    private String comprehensiveAdvice;

    @Builder
    public CombinationRule(TarotCard card, Symptom symptom, String customKeyword, String comprehensiveAdvice) {
        this.card = card;
        this.symptom = symptom;
        this.customKeyword = customKeyword;
        this.comprehensiveAdvice = comprehensiveAdvice;
    }
}
