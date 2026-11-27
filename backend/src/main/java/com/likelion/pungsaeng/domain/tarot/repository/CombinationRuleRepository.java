package com.likelion.pungsaeng.domain.tarot.repository;

import com.likelion.pungsaeng.domain.tarot.entity.CombinationRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CombinationRuleRepository extends JpaRepository<CombinationRule, Long> {

    // (card_id, symptom_id) 유니크
    Optional<CombinationRule> findByCard_IdAndSymptom_Id(String cardId, Long symptomId);

    /**
     * 여러 (카드, 고민) 조합의 규칙을 한 번에 조회 (목록 화면용).
     * 카드 목록 x 고민 목록 범위로 가져오므로 필요한 조합보다 많을 수 있다 -> 호출하는 쪽에서 (카드, 고민) 으로 골라 쓴다
     */
    @Query("select r from CombinationRule r where r.card.id in :cardIds and r.symptom.id in :symptomIds")
    List<CombinationRule> findAllByCardIdInAndSymptomIdIn(@Param("cardIds") Collection<String> cardIds,
                                                          @Param("symptomIds") Collection<Long> symptomIds);
}
