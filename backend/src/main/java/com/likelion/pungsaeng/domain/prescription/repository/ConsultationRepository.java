package com.likelion.pungsaeng.domain.prescription.repository;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {

    /**
     * 처방전 상세 조회 - 카드, 대표 고민, 복수 고민까지 한 번에 가져온다 (N+1 방지).
     * user 는 fetch 하지 않는다 (본인 확인은 user.id 만 비교하므로 프록시 초기화 없음)
     */
    @Query("""
            select distinct c from Consultation c
            join fetch c.card
            join fetch c.primarySymptom
            left join fetch c.consultationSymptoms cs
            left join fetch cs.symptom
            where c.id = :id
            """)
    Optional<Consultation> findDetailById(@Param("id") Long id);

    /**
     * 유저의 처방전 페이지 조회 - 카드와 대표 고민(ManyToOne)만 fetch join.
     * 복수 고민(컬렉션)을 여기서 fetch join 하면 Hibernate 가 전체를 메모리에 올려 페이징하므로,
     * 복수 고민은 ConsultationSymptomRepository 로 페이지 단위로 따로 조회한다.
     */
    @Query(value = """
            select c from Consultation c
            join fetch c.card
            join fetch c.primarySymptom
            where c.user.id = :userId
            """,
            countQuery = "select count(c) from Consultation c where c.user.id = :userId")
    Page<Consultation> findPageByUserId(@Param("userId") Long userId, Pageable pageable);
}
