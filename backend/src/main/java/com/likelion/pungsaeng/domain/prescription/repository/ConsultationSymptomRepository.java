package com.likelion.pungsaeng.domain.prescription.repository;

import com.likelion.pungsaeng.domain.consultation.entity.ConsultationSymptom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface ConsultationSymptomRepository extends JpaRepository<ConsultationSymptom, Long> {

    // 여러 처방전의 복수 고민을 한 번에 조회 (선택한 순서 = id 순)
    @Query("""
            select cs from ConsultationSymptom cs
            join fetch cs.symptom
            where cs.consultation.id in :consultationIds
            order by cs.id
            """)
    List<ConsultationSymptom> findAllWithSymptomByConsultationIdIn(
            @Param("consultationIds") Collection<Long> consultationIds);
}
