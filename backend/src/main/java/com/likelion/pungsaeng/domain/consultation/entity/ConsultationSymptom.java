package com.likelion.pungsaeng.domain.consultation.entity;

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
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * 진단 ↔ 고민 N:M 중간 테이블 (복수 고민 매핑)
 */
@Getter
@Entity
@Table(
        name = "consultation_symptom",
        uniqueConstraints = @UniqueConstraint(name = "uk_consultation_symptom", columnNames = {"consultation_id", "symptom_id"})
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultationSymptom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "consultation_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Consultation consultation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "symptom_id", nullable = false)
    private Symptom symptom;

    @Builder
    public ConsultationSymptom(Consultation consultation, Symptom symptom) {
        this.consultation = consultation;
        this.symptom = symptom;
    }
}
