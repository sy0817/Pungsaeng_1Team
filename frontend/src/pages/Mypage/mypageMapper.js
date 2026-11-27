import { CARD_IMAGES } from "../Taro/taroData";

// 백엔드 응답 -> 마이페이지 화면에서 쓰는 모양으로 바꿔 주는 함수 모음

const SUBJECT_LABELS = { MATH: "수학", KOREAN: "국어", ENGLISH: "영어", SCIENCE: "과학", SOCIAL: "사회", ETC: "기타" };

const GOLD = { subjectBg: "rgba(255, 193, 116, 0.2)", subjectColor: "#FFC174" };
const LAVENDER = { subjectBg: "rgba(47, 58, 163, 0.4)", subjectColor: "#BDC2FF" };
const AMBER = { subjectBg: "rgba(224, 168, 0, 0.3)", subjectColor: "#FFC32D" };
const SUBJECT_PALETTE = { MATH: GOLD, KOREAN: GOLD, ENGLISH: LAVENDER, SOCIAL: LAVENDER, SCIENCE: AMBER, ETC: AMBER };

// 카드별 아이콘/색 (Mypage_History 의 ARCANA_ICONS 키: sparkle | compass | moon)
const SPARKLE = { arcanaIcon: "sparkle", arcanaColor: "#FFC174" };
const COMPASS = { arcanaIcon: "compass", arcanaColor: "#BDC2FF" };
const MOON = { arcanaIcon: "moon", arcanaColor: "#FFC32D" };
const ARCANA_STYLE = {
  CHALLENGE: SPARKLE,
  NEW_START: SPARKLE,
  GROWTH: SPARKLE,
  REWARD: SPARKLE,
  BRIGHT_FUTURE: SPARKLE,
  RIGHT_DIRECTION: COMPASS,
  DREAM_GOAL: COMPASS,
  EFFORT: COMPASS,
  HELP_BOND: COMPASS,
  REST: MOON,
};

const TROUBLE_COLORS = [
  { color: "#FFC174", badgeBg: "rgba(255, 193, 116, 0.2)" },
  { color: "#FFC32D", badgeBg: "rgba(255, 195, 45, 0.2)" },
  { color: "#BDC2FF", badgeBg: "rgba(189, 194, 255, 0.2)" },
];

const ARCANA_COLORS = [
  { accent: "#FFC174", glow: "rgba(245, 158, 11, 0.25)" },
  { accent: "#FFC32D", glow: "rgba(255, 195, 45, 0.25)" },
];

// "2025-02-26T10:20:30" -> "2025.02.26"
export const formatDate = (iso) => (iso ? iso.slice(0, 10).replaceAll("-", ".") : "");

// 상단 프로필 배너
// title: 로그인 응답의 칭호, myInfo: (고1 담당) 내 정보 조회 API 응답, lastDiagnosis: 가장 최근 처방 날짜
export const toProfile = ({ title, myInfo, lastDiagnosis }) => ({
  classInfo: myInfo?.classInfo ?? "", // 예) "풍생고 2학년 3반" - 내 정보 조회 API 연결 후 채워짐
  track: myInfo?.track ?? "", // 예) "이과 트랙"
  archetype: title ? `${title} 아키타입` : "새내기 수험생 아키타입",
  lastDiagnosis,
});

// 상단 요약 통계 3개
export const toStats = (statistics) => {
  const mostSubject = statistics?.summary?.mostFrequentSubject;
  const topCard = statistics?.tarotCardStatistics?.[0];
  return [
    { id: "total", label: "총 진단 횟수", value: String(statistics?.summary?.totalDiagnosisCount ?? 0), unit: "회 완료", unitColor: "#FFC174", icon: "chart" },
    {
      id: "subject",
      label: "최다 고민 과목",
      value: mostSubject?.subject ?? "-",
      unit: mostSubject ? `(${mostSubject.count}회)` : "",
      unitColor: "#FFC32D",
      icon: "book",
    },
    {
      id: "tarot",
      label: "가장 많이 뽑은 타로",
      value: topCard?.name ?? "-",
      unit: topCard ? `(${topCard.count}회)` : "",
      unitColor: "#FFC174",
      icon: "sparkle",
    },
  ];
};

// 학업 고민 유형 통계 (상위 3개)
export const toTroubles = (statistics) => ({
  title: "나의 학업 고민 유형 통계",
  tag: `최근 ${statistics?.periodDays ?? 90}일 누적`,
  description: "풍생고 내신 및 모의고사 대비 과정에서 누적된 고민 카테고리 분석 리포트입니다.",
  items: (statistics?.symptomStatistics ?? []).map((item, index) => ({
    rank: index + 1,
    label: item.title,
    percent: Math.round(item.percentage),
    count: item.count,
    ...TROUBLE_COLORS[index % TROUBLE_COLORS.length],
  })),
  coachingLabel: "가장 심층적인 코칭이 필요한 시간대",
  coachingValue: statistics?.mostNeededCoachingTime ?? "아직 데이터가 없어요",
  coachingTip: "풍생고 맞춤형 오답노트 처방 권장",
});

// 자주 뽑은 타로 카드 (상위 2개) + 종합 조언
export const toArcana = (statistics) => ({
  title: "자주 점지된 타로 아르카나 성향",
  tag: "누적 점성 패턴",
  top: (statistics?.tarotCardStatistics ?? []).slice(0, 2).map((card, index) => ({
    rank: index + 1,
    count: card.count,
    label: card.name,
    keywords: `키워드: ${card.keyword}`,
    quote: `"${card.quote}"`,
    image: CARD_IMAGES[card.cardId],
    ...ARCANA_COLORS[index % ARCANA_COLORS.length],
  })),
  advice: statistics?.comprehensiveAdvice ?? "진단 기록이 쌓이면 종합 아르카나 조언이 표시돼요.",
});

// 과거 처방전 히스토리 (pageData: PageResponse, page 는 0부터)
export const toHistory = (pageData, size) => {
  const page = pageData?.page ?? 0;
  const content = pageData?.content ?? [];
  return {
    title: "과거 처방전 히스토리",
    tag: `최신순 ${size}건`,
    description: "풍생고 학업상담실에서 발급된 타로 맞춤형 솔루션 기록입니다.",
    page: page + 1, // 화면에는 1부터 보여줌
    totalPages: Math.max(pageData?.totalPages ?? 1, 1),
    total: pageData?.totalElements ?? 0,
    items: content.map((item, index) => ({
      id: item.prescriptionId,
      date: formatDate(item.createdAt),
      dateBold: page === 0 && index === 0, // 가장 최근 처방전만 강조
      subject: SUBJECT_LABELS[item.subjectType] ?? item.subject,
      ...(SUBJECT_PALETTE[item.subjectType] ?? AMBER),
      symptom: item.symptoms?.[0] ?? "",
      title: item.title,
      arcana: item.card.name,
      ...(ARCANA_STYLE[item.card.cardId] ?? SPARKLE),
      summary: item.summary?.startsWith("처방 요약") ? item.summary : `처방 요약: ${item.summary}`,
    })),
  };
};
