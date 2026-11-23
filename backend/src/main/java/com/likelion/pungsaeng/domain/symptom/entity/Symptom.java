package com.likelion.pungsaeng.domain.symptom.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 고민(증상)
 */
@Getter
@Entity
@Table(name = "symptom")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Symptom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "symptom_id")
    private Long id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "keyword_suffix", nullable = false, length = 50)
    private String keywordSuffix;

    @Builder
    public Symptom(String title, String description, String keywordSuffix) {
        this.title = title;
        this.description = description;
        this.keywordSuffix = keywordSuffix;
    }
}
