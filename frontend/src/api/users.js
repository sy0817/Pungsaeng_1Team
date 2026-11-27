import { api } from "./client";

// ───────── 이미 연동 완료 ─────────

/**
 * 마이페이지 통계
 * -> { periodDays, summary: { totalDiagnosisCount, mostFrequentSubject },
 *      mostNeededCoachingTime, comprehensiveAdvice, symptomStatistics[], tarotCardStatistics[] }
 */
export const getMyStatistics = async () => {
  const res = await api.get("/api/v1/users/me/statistics");
  return res.data.data;
};

/**
 * 과거 처방 목록 (최신순, page 는 0부터)
 * -> { content: [...], page, size, totalElements, totalPages, last }
 */
export const getMyPrescriptions = async ({ page = 0, size = 3 } = {}) => {
  const res = await api.get("/api/v1/users/me/prescriptions", { params: { page, size } });
  return res.data.data;
};

// ───────── 아직 연동 안 함: "내 정보 조회 API" 담당자가 채우는 부분 ─────────
//
// 1) 백엔드에 내 정보 조회 API 가 배포되면 아래 주석을 풀고, 주소(URL)만 실제 명세서에 맞게 고치세요.
//
// export const getMyInfo = async () => {
//   const res = await api.get("/api/v1/users/me"); // ← 명세서의 URL 로 수정
//   return res.data.data;
// };
//
// 2) 그 다음 src/pages/Mypage/Mypage.jsx 의 "내 정보 조회 API 연결" 주석을 따라가세요.
