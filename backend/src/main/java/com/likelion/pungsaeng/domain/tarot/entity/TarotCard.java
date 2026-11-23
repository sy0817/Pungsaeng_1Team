package com.likelion.pungsaeng.domain.tarot.entity;

import com.likelion.pungsaeng.global.common.enums.RecommendedTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "tarot_card")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TarotCard {

    // 정적 데이터라 자동 생성 없이 직접 지정 (예: "CHALLENGE")
    @Id
    @Column(name = "card_id", length = 50)
    private String id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "quote", nullable = false)
    private String quote;

    @Column(name = "advice", nullable = false, columnDefinition = "TEXT")
    private String advice;

    @Column(name = "keyword_prefix", nullable = false, length = 50)
    private String keywordPrefix;

    // 고정 시간대 Enum -> 유저별 최빈 시간대 집계용
    @Enumerated(EnumType.STRING)
    @Column(name = "recommended_time", nullable = false, length = 30)
    private RecommendedTime recommendedTime;

    @Column(name = "recommended_env", nullable = false, length = 100)
    private String recommendedEnv;

    @Builder
    public TarotCard(String id, String name, String imageUrl, String quote, String advice,
                     String keywordPrefix, RecommendedTime recommendedTime, String recommendedEnv) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.quote = quote;
        this.advice = advice;
        this.keywordPrefix = keywordPrefix;
        this.recommendedTime = recommendedTime;
        this.recommendedEnv = recommendedEnv;
    }
}
