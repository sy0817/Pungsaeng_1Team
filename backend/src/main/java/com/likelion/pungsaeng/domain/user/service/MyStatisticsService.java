package com.likelion.pungsaeng.domain.user.service;

import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.domain.symptom.repository.SymptomRepository;
import com.likelion.pungsaeng.domain.tarot.entity.CombinationRule;
import com.likelion.pungsaeng.domain.tarot.entity.TarotCard;
import com.likelion.pungsaeng.domain.tarot.repository.CombinationRuleRepository;
import com.likelion.pungsaeng.domain.tarot.repository.TarotCardRepository;
import com.likelion.pungsaeng.domain.user.dto.MyStatisticsResponse;
import com.likelion.pungsaeng.domain.user.entity.User;
import com.likelion.pungsaeng.domain.user.repository.MyStatisticsRepository;
import com.likelion.pungsaeng.domain.user.repository.MyStatisticsRepository.CardCount;
import com.likelion.pungsaeng.domain.user.repository.MyStatisticsRepository.SubjectCount;
import com.likelion.pungsaeng.domain.user.repository.MyStatisticsRepository.SymptomCount;
import com.likelion.pungsaeng.domain.user.repository.MyStatisticsRepository.TimeCount;
import com.likelion.pungsaeng.domain.user.repository.UserRepository;
import com.likelion.pungsaeng.global.exception.CustomException;
import com.likelion.pungsaeng.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.function.ToLongFunction;
import java.util.stream.Collectors;

/**
 * 마이페이지 통계
 *
 * - 기간: 최근 90일 (누적 진단 횟수만 전체 기간)
 * - 고민 통계: 선택한 고민 전부 기준, 비율 분모 = 기간 내 전체 고민 선택 수 (정수 반올림)
 * - 최다 값이 동점이면 가장 최근에 나온 값을 우선
 * - 종합 조언: (최다 카드, 최다 고민) 조합 규칙의 조언 -> 없으면 최다 카드의 조언
 * - 기록이 없으면 목록은 빈 배열, 최다 값은 null
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyStatisticsService {

    public static final int PERIOD_DAYS = 90;
    static final int TOP_SYMPTOMS = 3;
    static final int TOP_CARDS = 2;

    private final UserRepository userRepository;
    private final MyStatisticsRepository statisticsRepository;
    private final SymptomRepository symptomRepository;
    private final TarotCardRepository tarotCardRepository;
    private final CombinationRuleRepository combinationRuleRepository;
    private final Clock clock;

    public MyStatisticsResponse getMyStatistics(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.UNAUTHORIZED));
        LocalDateTime since = LocalDateTime.now(clock).minusDays(PERIOD_DAYS);

        List<SubjectCount> subjects = statisticsRepository.countBySubject(userId, since);
        List<SymptomCount> symptoms = sortByCountThenLatest(
                statisticsRepository.countBySymptom(userId, since), SymptomCount::count, SymptomCount::lastAt);
        List<CardCount> cards = sortByCountThenLatest(
                statisticsRepository.countByCard(userId, since), CardCount::count, CardCount::lastAt);
        List<TimeCount> times = statisticsRepository.countByRecommendedTime(userId, since);

        List<MyStatisticsResponse.SymptomStatistic> symptomStatistics = symptomStatistics(symptoms);
        List<MyStatisticsResponse.TarotCardStatistic> cardStatistics = cardStatistics(cards);

        return new MyStatisticsResponse(
                PERIOD_DAYS,
                new MyStatisticsResponse.Summary(user.getTotalDiagnosisCount(), mostFrequentSubject(subjects)),
                mostNeededCoachingTime(times),
                comprehensiveAdvice(cards, symptoms),
                symptomStatistics,
                cardStatistics
        );
    }

    private MyStatisticsResponse.MostFrequentSubject mostFrequentSubject(List<SubjectCount> subjects) {
        return sortByCountThenLatest(subjects, SubjectCount::count, SubjectCount::lastAt).stream()
                .findFirst()
                .map(top -> new MyStatisticsResponse.MostFrequentSubject(
                        top.subjectType().getDescription(), top.subjectType(), top.count()))
                .orElse(null);
    }

    private String mostNeededCoachingTime(List<TimeCount> times) {
        return sortByCountThenLatest(times, TimeCount::count, TimeCount::lastAt).stream()
                .findFirst()
                .map(top -> top.recommendedTime().getDisplayName())
                .orElse(null);
    }

    private List<MyStatisticsResponse.SymptomStatistic> symptomStatistics(List<SymptomCount> sorted) {
        long totalSelections = sorted.stream().mapToLong(SymptomCount::count).sum();
        List<SymptomCount> top = sorted.stream().limit(TOP_SYMPTOMS).toList();
        Map<Long, Symptom> symptomsById = symptomRepository.findAllById(top.stream().map(SymptomCount::symptomId).toList())
                .stream().collect(Collectors.toMap(Symptom::getId, Function.identity()));

        return top.stream()
                .map(count -> {
                    Symptom symptom = symptomsById.get(count.symptomId());
                    return new MyStatisticsResponse.SymptomStatistic(
                            symptom.getId(), symptom.getTitle(), symptom.getKeywordSuffix(),
                            count.count(), percentage(count.count(), totalSelections));
                })
                .toList();
    }

    private List<MyStatisticsResponse.TarotCardStatistic> cardStatistics(List<CardCount> sorted) {
        List<CardCount> top = sorted.stream().limit(TOP_CARDS).toList();
        Map<String, TarotCard> cardsById = tarotCardRepository.findAllById(top.stream().map(CardCount::cardId).toList())
                .stream().collect(Collectors.toMap(TarotCard::getId, Function.identity()));

        return top.stream()
                .map(count -> {
                    TarotCard card = cardsById.get(count.cardId());
                    return new MyStatisticsResponse.TarotCardStatistic(
                            card.getId(), card.getName(), card.getImageUrl(), count.count(),
                            card.getDisplayKeywordOrName(), card.getQuote());
                })
                .toList();
    }

    // (최다 카드, 최다 고민) 조합 규칙의 조언 -> 없으면 최다 카드의 조언
    private String comprehensiveAdvice(List<CardCount> sortedCards, List<SymptomCount> sortedSymptoms) {
        if (sortedCards.isEmpty()) {
            return null;
        }
        String topCardId = sortedCards.get(0).cardId();
        if (!sortedSymptoms.isEmpty()) {
            String ruleAdvice = combinationRuleRepository
                    .findByCard_IdAndSymptom_Id(topCardId, sortedSymptoms.get(0).symptomId())
                    .map(CombinationRule::getComprehensiveAdvice)
                    .orElse(null);
            if (ruleAdvice != null) {
                return ruleAdvice;
            }
        }
        return tarotCardRepository.findById(topCardId).map(TarotCard::getAdvice).orElse(null);
    }

    private static int percentage(long count, long total) {
        return total == 0 ? 0 : (int) Math.round(count * 100.0 / total);
    }

    // 횟수 내림차순, 같으면 마지막으로 나온 시각 내림차순
    private static <T> List<T> sortByCountThenLatest(List<T> rows, ToLongFunction<T> count,
                                                     Function<T, LocalDateTime> lastAt) {
        return rows.stream()
                .sorted(Comparator.comparingLong(count).reversed()
                        .thenComparing(lastAt, Comparator.reverseOrder()))
                .toList();
    }
}
