package com.likelion.pungsaeng.domain.tarot.repository;

import com.likelion.pungsaeng.domain.tarot.entity.TarotActionMaster;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface TarotActionMasterRepository extends JpaRepository<TarotActionMaster, Long> {

    // 처방전 지침 후보를 한 번에 조회 (카드 1장, 선택한 고민 전부, 과목 + ETC)
    List<TarotActionMaster> findByCard_IdAndSymptom_IdInAndSubjectTypeIn(
            String cardId, Collection<Long> symptomIds, Collection<SubjectType> subjectTypes);
}
