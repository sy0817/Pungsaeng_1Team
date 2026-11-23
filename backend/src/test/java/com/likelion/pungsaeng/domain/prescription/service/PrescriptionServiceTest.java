package com.likelion.pungsaeng.domain.prescription.service;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import com.likelion.pungsaeng.domain.prescription.dto.PrescriptionCreateRequest;
import com.likelion.pungsaeng.domain.prescription.repository.ConsultationRepository;
import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.domain.symptom.repository.SymptomRepository;
import com.likelion.pungsaeng.domain.tarot.repository.TarotCardRepository;
import com.likelion.pungsaeng.domain.user.repository.UserRepository;
import com.likelion.pungsaeng.global.common.enums.SubjectType;
import com.likelion.pungsaeng.global.exception.CustomException;
import com.likelion.pungsaeng.global.exception.ErrorCode;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InOrder;

import java.util.List;
import java.util.Optional;

import static com.likelion.pungsaeng.domain.prescription.PrescriptionFixtures.card;
import static com.likelion.pungsaeng.domain.prescription.PrescriptionFixtures.consultation;
import static com.likelion.pungsaeng.domain.prescription.PrescriptionFixtures.symptom;
import static com.likelion.pungsaeng.domain.prescription.PrescriptionFixtures.user;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class PrescriptionServiceTest {

    private final ConsultationRepository consultationRepository = mock(ConsultationRepository.class);
    private final TarotCardRepository tarotCardRepository = mock(TarotCardRepository.class);
    private final SymptomRepository symptomRepository = mock(SymptomRepository.class);
    private final UserRepository userRepository = mock(UserRepository.class);
    private final PrescriptionAssembler assembler = mock(PrescriptionAssembler.class);
    private final PrescriptionService service = new PrescriptionService(
            consultationRepository, tarotCardRepository, symptomRepository, userRepository, assembler);

    private final Symptom concept = symptom(1L, "개념 부족");
    private final Symptom focus = symptom(3L, "집중력 저하");

    private PrescriptionCreateRequest request(List<Long> symptomIds, Long primaryId) {
        return new PrescriptionCreateRequest(SubjectType.MATH, "공통수학 1", "CHALLENGE", symptomIds, primaryId);
    }

    @Test
    void 처방전을_저장하고_진단_횟수를_저장_후에_증가시킨다() {
        when(userRepository.existsById(1L)).thenReturn(true);
        when(userRepository.getReferenceById(1L)).thenReturn(user(1L));
        when(tarotCardRepository.findById("CHALLENGE")).thenReturn(Optional.of(card()));
        when(symptomRepository.findAllById(List.of(3L, 1L))).thenReturn(List.of(concept, focus));

        service.create(1L, request(List.of(3L, 1L), 1L));

        ArgumentCaptor<Consultation> captor = ArgumentCaptor.forClass(Consultation.class);
        InOrder order = inOrder(consultationRepository, userRepository, assembler);
        order.verify(consultationRepository).save(captor.capture());
        order.verify(userRepository).increaseDiagnosisCount(1L);
        order.verify(assembler).assemble(any());

        Consultation saved = captor.getValue();
        assertThat(saved.getPrimarySymptom()).isSameAs(concept);
        assertThat(saved.getCardDirection()).isNotNull();
        // 사용자가 고른 순서대로 저장
        assertThat(saved.getConsultationSymptoms()).extracting(cs -> cs.getSymptom().getId()).containsExactly(3L, 1L);
    }

    @Test
    void 없는_타로_카드면_TAROT_CARD_NOT_FOUND() {
        when(userRepository.existsById(1L)).thenReturn(true);
        when(tarotCardRepository.findById("CHALLENGE")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.create(1L, request(List.of(1L), 1L)))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.TAROT_CARD_NOT_FOUND);
        verify(userRepository, never()).increaseDiagnosisCount(anyLong());
    }

    @Test
    void 없는_고민_ID가_있으면_SYMPTOM_NOT_FOUND() {
        when(userRepository.existsById(1L)).thenReturn(true);
        when(tarotCardRepository.findById("CHALLENGE")).thenReturn(Optional.of(card()));
        when(symptomRepository.findAllById(List.of(1L, 99L))).thenReturn(List.of(concept));

        assertThatThrownBy(() -> service.create(1L, request(List.of(1L, 99L), 1L)))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.SYMPTOM_NOT_FOUND);
        verify(consultationRepository, never()).save(any());
    }

    @Test
    void 탈퇴한_유저의_토큰이면_UNAUTHORIZED() {
        when(userRepository.existsById(1L)).thenReturn(false);

        assertThatThrownBy(() -> service.create(1L, request(List.of(1L), 1L)))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.UNAUTHORIZED);
    }

    @Test
    void 본인_처방전은_삭제된다() {
        Consultation mine = consultation(10L, user(1L), SubjectType.MATH, concept, List.of(concept));
        when(consultationRepository.findDetailById(10L)).thenReturn(Optional.of(mine));

        service.delete(1L, 10L);

        verify(consultationRepository).delete(mine);
        verify(userRepository, never()).increaseDiagnosisCount(anyLong());
    }

    @Test
    void 다른_사람_처방전은_PRESCRIPTION_FORBIDDEN() {
        Consultation others = consultation(10L, user(2L), SubjectType.MATH, concept, List.of(concept));
        when(consultationRepository.findDetailById(10L)).thenReturn(Optional.of(others));

        assertThatThrownBy(() -> service.delete(1L, 10L))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.PRESCRIPTION_FORBIDDEN);
        verify(consultationRepository, never()).delete(any());
    }

    @Test
    void 없는_처방전은_PRESCRIPTION_NOT_FOUND() {
        when(consultationRepository.findDetailById(10L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.delete(1L, 10L))
                .isInstanceOf(CustomException.class)
                .extracting("errorCode").isEqualTo(ErrorCode.PRESCRIPTION_NOT_FOUND);
    }
}
