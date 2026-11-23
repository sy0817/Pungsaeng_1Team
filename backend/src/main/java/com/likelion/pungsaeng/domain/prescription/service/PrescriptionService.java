package com.likelion.pungsaeng.domain.prescription.service;

import com.likelion.pungsaeng.domain.consultation.entity.Consultation;
import com.likelion.pungsaeng.domain.prescription.dto.PrescriptionCreateRequest;
import com.likelion.pungsaeng.domain.prescription.dto.PrescriptionResponse;
import com.likelion.pungsaeng.domain.prescription.repository.ConsultationRepository;
import com.likelion.pungsaeng.domain.symptom.entity.Symptom;
import com.likelion.pungsaeng.domain.symptom.repository.SymptomRepository;
import com.likelion.pungsaeng.domain.tarot.entity.TarotCard;
import com.likelion.pungsaeng.domain.tarot.repository.TarotCardRepository;
import com.likelion.pungsaeng.domain.user.repository.UserRepository;
import com.likelion.pungsaeng.global.common.enums.CardDirection;
import com.likelion.pungsaeng.global.exception.CustomException;
import com.likelion.pungsaeng.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PrescriptionService {

    private final ConsultationRepository consultationRepository;
    private final TarotCardRepository tarotCardRepository;
    private final SymptomRepository symptomRepository;
    private final UserRepository userRepository;
    private final PrescriptionAssembler prescriptionAssembler;

    @Transactional
    public PrescriptionResponse create(Long userId, PrescriptionCreateRequest request) {
        // 토큰은 유효하지만 탈퇴한 유저인 경우
        if (!userRepository.existsById(userId)) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        TarotCard card = tarotCardRepository.findById(request.tarotCardId())
                .orElseThrow(() -> new CustomException(ErrorCode.TAROT_CARD_NOT_FOUND));

        Map<Long, Symptom> symptomsById = symptomRepository.findAllById(request.symptomIds()).stream()
                .collect(Collectors.toMap(Symptom::getId, Function.identity()));
        if (symptomsById.size() != request.symptomIds().size()) {
            throw new CustomException(ErrorCode.SYMPTOM_NOT_FOUND);
        }

        Consultation consultation = Consultation.builder()
                .user(userRepository.getReferenceById(userId))
                .card(card)
                .primarySymptom(symptomsById.get(request.primarySymptomId()))
                .subjectType(request.subject())
                .subSubject(request.subSubject())
                .cardDirection(randomDirection())
                .build();
        // 사용자가 고른 순서대로 저장
        request.symptomIds().forEach(symptomId -> consultation.addSymptom(symptomsById.get(symptomId)));

        consultationRepository.save(consultation);

        // 저장 후에 호출: DB 에서 바로 +1 하고 영속성 컨텍스트를 비우므로, 그 전에 진단 INSERT 가 끝나 있어야 함
        userRepository.increaseDiagnosisCount(userId);

        return prescriptionAssembler.assemble(consultation);
    }

    @Transactional
    public void delete(Long userId, Long prescriptionId) {
        Consultation consultation = getOwnedConsultation(userId, prescriptionId);
        // 복수 고민 매핑은 cascade 로 함께 삭제. 누적 진단 횟수는 줄이지 않는다
        consultationRepository.delete(consultation);
    }

    /**
     * 처방전을 상세 조회하고 본인 것인지 확인한다. (조회 / 삭제 API 공통)
     *
     * @throws CustomException 없으면 PRESCRIPTION_NOT_FOUND(404), 다른 사람 것이면 PRESCRIPTION_FORBIDDEN(403)
     */
    public Consultation getOwnedConsultation(Long userId, Long prescriptionId) {
        Consultation consultation = consultationRepository.findDetailById(prescriptionId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRESCRIPTION_NOT_FOUND));

        if (!consultation.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.PRESCRIPTION_FORBIDDEN);
        }
        return consultation;
    }

    private CardDirection randomDirection() {
        return ThreadLocalRandom.current().nextBoolean() ? CardDirection.UPRIGHT : CardDirection.REVERSED;
    }
}
