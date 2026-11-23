package com.likelion.pungsaeng.domain.tarot;

import com.likelion.pungsaeng.domain.tarot.entity.TarotCard;
import com.likelion.pungsaeng.domain.tarot.repository.TarotCardRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * data.sql 로 들어간 타로 카드 정적 데이터 점검 (로컬 MySQL 기준).
 * 임시 값(TODO)이나 빈 문구가 남은 채로 배포되는 것을 막는다.
 */
@SpringBootTest
@Transactional
class TarotCardStaticDataIntegrationTest {

    private static final List<String> CARD_IDS = List.of(
            "NEW_START", "DREAM_GOAL", "EFFORT", "RIGHT_DIRECTION", "REWARD",
            "HELP_BOND", "CHALLENGE", "GROWTH", "REST", "BRIGHT_FUTURE");

    @Autowired
    private TarotCardRepository tarotCardRepository;

    @Test
    void 카드_10장이_모두_있다() {
        assertThat(tarotCardRepository.findAllById(CARD_IDS)).hasSize(CARD_IDS.size());
    }

    @Test
    void 모든_카드의_문구가_채워져_있고_임시값이_없다() {
        for (TarotCard card : tarotCardRepository.findAllById(CARD_IDS)) {
            List<String> texts = Stream.of(
                    card.getName(), card.getImageUrl(),
                    card.getQuote(), card.getAdvice(),
                    card.getReversedQuote(), card.getReversedAdvice(),
                    card.getKeywordPrefix(), card.getDisplayKeyword(),
                    card.getRecommendedEnv()
            ).toList();

            assertThat(texts)
                    .as("카드 %s 의 문구", card.getId())
                    .allSatisfy(text -> {
                        assertThat(text).isNotBlank();
                        assertThat(text).doesNotContainIgnoringCase("TODO");
                    });
            assertThat(card.getRecommendedTime()).as("카드 %s 의 추천 시간대", card.getId()).isNotNull();
        }
    }
}
