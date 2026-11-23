package com.likelion.pungsaeng.domain.tarot.repository;

import com.likelion.pungsaeng.domain.tarot.entity.TarotCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarotCardRepository extends JpaRepository<TarotCard, String> {
}
