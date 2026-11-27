package com.likelion.pungsaeng.domain.user.repository;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import com.likelion.pungsaeng.global.common.enums.RecommendedTime;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 마이페이지 통계용 집계 쿼리 (조회 전용).
 * 모두 [값, 횟수, 마지막으로 나온 시각] 을 돌려준다 -> 동점이면 최근에 나온 값을 우선하기 위함
 */
public interface MyStatisticsRepository extends Repository<Consultation, Long> {

    record SubjectCount(SubjectType subjectType, Long count, LocalDateTime lastAt) {
    }

    record SymptomCount(Long symptomId, Long count, LocalDateTime lastAt) {
    }

    record CardCount(String cardId, Long count, LocalDateTime lastAt) {
    }

    record TimeCount(RecommendedTime recommendedTime, Long count, LocalDateTime lastAt) {
    }

    @Query("""
            select new com.likelion.pungsaeng.domain.user.repository.MyStatisticsRepository$SubjectCount(
                c.subjectType, count(c), max(c.createdAt))
            from Consultation c
            where c.user.id = :userId and c.createdAt >= :since
            group by c.subjectType
            """)
    List<SubjectCount> countBySubject(@Param("userId") Long userId, @Param("since") LocalDateTime since);

    // 선택한 고민 전부(대표 + 보조) 기준
    @Query("""
            select new com.likelion.pungsaeng.domain.user.repository.MyStatisticsRepository$SymptomCount(
                cs.symptom.id, count(cs), max(c.createdAt))
            from ConsultationSymptom cs
            join cs.consultation c
            where c.user.id = :userId and c.createdAt >= :since
            group by cs.symptom.id
            """)
    List<SymptomCount> countBySymptom(@Param("userId") Long userId, @Param("since") LocalDateTime since);

    @Query("""
            select new com.likelion.pungsaeng.domain.user.repository.MyStatisticsRepository$CardCount(
                c.card.id, count(c), max(c.createdAt))
            from Consultation c
            where c.user.id = :userId and c.createdAt >= :since
            group by c.card.id
            """)
    List<CardCount> countByCard(@Param("userId") Long userId, @Param("since") LocalDateTime since);

    @Query("""
            select new com.likelion.pungsaeng.domain.user.repository.MyStatisticsRepository$TimeCount(
                card.recommendedTime, count(c), max(c.createdAt))
            from Consultation c
            join c.card card
            where c.user.id = :userId and c.createdAt >= :since
            group by card.recommendedTime
            """)
    List<TimeCount> countByRecommendedTime(@Param("userId") Long userId, @Param("since") LocalDateTime since);
}
