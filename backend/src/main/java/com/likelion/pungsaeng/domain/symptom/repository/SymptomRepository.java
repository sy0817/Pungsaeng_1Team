package com.likelion.pungsaeng.domain.symptom.repository;

import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SymptomRepository extends JpaRepository<Symptom, Long> {
}
