import img도전과극복 from "../../assets/photo/도전과 극복.png";
import img노력과꾸준함 from "../../assets/photo/노력과 꾸준함.png";

// 마이페이지 더미 데이터 - 추후 API 응답으로 교체
export const PROFILE = {
  classInfo: "풍생고 2학년 3반",
  track: "이과 트랙",
  archetype: "성실한 탐구자 아키타입",
  lastDiagnosis: "2025.02.26",
};

export const STATS = [
  { id: "total", label: "총 진단 횟수", value: "12", unit: "회 완료", unitColor: "#FFC174", icon: "chart" },
  { id: "subject", label: "최다 고민 과목", value: "수학", unit: "(5회)", unitColor: "#FFC32D", icon: "book" },
  { id: "tarot", label: "가장 많이 뽑은 타로", value: "도전과 극복", unit: "(4회)", unitColor: "#FFC174", icon: "sparkle" },
];

export const TROUBLES = {
  title: "나의 학업 고민 유형 통계",
  tag: "최근 90일 누적",
  description: "풍생고 내신 및 모의고사 대비 과정에서 누적된 고민 카테고리 분석 리포트입니다.",
  items: [
    { rank: 1, label: "개념 이해 부족 & 공식 암기", percent: 45, count: 6, color: "#FFC174", badgeBg: "rgba(255, 193, 116, 0.2)" },
    { rank: 2, label: "자습 집중력 저하 & 잡념", percent: 30, count: 4, color: "#FFC32D", badgeBg: "rgba(255, 195, 45, 0.2)" },
    { rank: 3, label: "벼락치기 & 수면 부족", percent: 15, count: 2, color: "#BDC2FF", badgeBg: "rgba(189, 194, 255, 0.2)" },
  ],
  coachingLabel: "가장 심층적인 코칭이 필요한 시간대",
  coachingValue: "야간 자율학습 2타임 (20:30 ~ 22:00)",
  coachingTip: "풍생고 맞춤형 오답노트 처방 권장",
};

export const ARCANA = {
  title: "자주 점지된 타로 아르카나 성향",
  tag: "누적 점성 패턴",
  top: [
    {
      rank: 1,
      count: 4,
      label: "도전과 극복",
      keywords: "키워드: 한계 돌파 · 압박 극복",
      quote: "\"어려운 수학 킬러 문항 앞에서 두려움이 앞서지만, 차분히 풀이 뼈대를 나누어 잡으면 반드시 승리할 운명입니다.\"",
      image: img도전과극복,
      accent: "#FFC174",
      glow: "rgba(245, 158, 11, 0.25)",
    },
    {
      rank: 2,
      count: 3,
      label: "노력과 꾸준함",
      keywords: "키워드: 루틴 성립 · 번아웃 방지",
      quote: "\"일정한 시간에 책상에 앉는 성실성이 최고의 무기입니다. 단, 주말 2시간의 충전 시간을 반드시 남겨두세요.\"",
      image: img노력과꾸준함,
      accent: "#FFC32D",
      glow: "rgba(255, 195, 45, 0.25)",
    },
  ],
  advice: "자신의 노력량을 의심하지 마세요. 방대한 범위보다는 하루 3개 필수 개념 집중 공략이 성적 도약의 열쇠입니다.",
};

export const HISTORY = {
  title: "과거 처방전 히스토리",
  tag: "최신순 3건",
  description: "풍생고 학업상담실에서 발급된 타로 맞춤형 솔루션 기록입니다.",
  page: 1,
  totalPages: 3,
  total: 12,
  items: [
    {
      id: 1,
      date: "2025.02.26",
      dateBold: true,
      subject: "수학",
      subjectBg: "rgba(255, 193, 116, 0.2)",
      subjectColor: "#FFC174",
      symptom: "개념 부족",
      title: "수학 미적분 수열의 극한 오답 정복 루틴",
      arcana: "도전과 극복",
      arcanaIcon: "sparkle",
      arcanaColor: "#FFC174",
      summary: "처방 요약: 미적분 1일 3문항 수열의 극한 정의 백지 복습. 풍생고 부교재 34p 오답 재풀이 집중.",
    },
    {
      id: 2,
      date: "2025.02.20",
      subject: "영어",
      subjectBg: "rgba(47, 58, 163, 0.4)",
      subjectColor: "#BDC2FF",
      symptom: "단어 암기",
      title: "수능특강 영단어 누적 회독 및 문맥 독해",
      arcana: "올바른 방향",
      arcanaIcon: "compass",
      arcanaColor: "#BDC2FF",
      summary: "처방 요약: 어원 중심 30개 일일 암기 후 취약 동의어 군집 정리. 등하굣길 15분 미니 퀴즈 반복.",
    },
    {
      id: 3,
      date: "2025.02.14",
      subject: "과학",
      subjectBg: "rgba(224, 168, 0, 0.3)",
      subjectColor: "#FFC32D",
      symptom: "집중력 저하",
      title: "물리학 1 역학적 에너지 보존 포모도로 설계",
      arcana: "휴식과 재충전",
      arcanaIcon: "moon",
      arcanaColor: "#FFC32D",
      summary: "처방 요약: 25분 집중 5분 이완 룰 적용. 수면 패턴 6시간 반 고정으로 주간 집중력 복원.",
    },
  ],
};
