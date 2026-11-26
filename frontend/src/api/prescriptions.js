import { api } from "./client";

// ───────── 이미 연동 완료 ─────────

/**
 * 처방전 생성 (고민 진단 -> 타로 카드 선택 -> 생성)
 * body: { subject: "MATH", subSubject: "공통수학 1", tarotCardId: "CHALLENGE", symptomIds: [1, 3], primarySymptomId: 1 }
 * 응답: PrescriptionResponse (처방전 페이지에서 쓰는 모든 정보가 들어 있음)
 *   { prescriptionId, prescriptionKeyword, card, diagnosisSummary, actionGuides, createdAt }
 */
export const createPrescription = async (body) => {
  const res = await api.post("/api/v1/prescriptions", body);
  return res.data.data;
};

// 처방전 삭제 (본인 것만 가능)
export const deletePrescription = async (prescriptionId) => {
  await api.delete(`/api/v1/prescriptions/${prescriptionId}`);
};

// ───────── 아직 연동 안 함: "처방 결과 조회 API" 담당자가 채우는 부분 ─────────
//
// 1) 백엔드에 처방전 단건 조회 API 가 배포되면 아래 주석을 풀고, 주소(URL)만 실제 명세서에 맞게 고치세요.
//    응답 모양은 "처방전 생성" 과 같은 PrescriptionResponse 라고 백엔드 주석에 적혀 있어요.
//
// export const getPrescription = async (prescriptionId) => {
//   const res = await api.get(`/api/v1/prescriptions/${prescriptionId}`); // ← 명세서의 URL 로 수정
//   return res.data.data;
// };
//
// 2) 그 다음 src/pages/Prescription/Prescription.jsx 의 "처방 결과 조회 API 연결" 주석을 따라가세요.
