package com.likelion.pungsaeng.domain.tarot.repository;

import com.likelion.pungsaeng.domain.tarot.entity.CombinationRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CombinationRuleRepository extends JpaRepository<CombinationRule, Long> {

    // (card_id, symptom_id) 유니크
    Optional<CombinationRule> findByCard_IdAndSymptom_Id(String cardId, Long symptomId);
}
