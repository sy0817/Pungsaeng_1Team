import cardImage from "../../assets/photo/도전과 극복.png";

// 처방전 더미 데이터 - 추후 API 응답으로 교체
export const PRESCRIPTION = {
  keyword: "돌파와 뼈대 재건",
  card: {
    no: "NO. 07",
    label: "도전과 극복",
    english: "Challenge & Overcome",
    orientation: "정방향 (Upright)",
    image: cardImage,
    advice:
      "“지금 느끼는 두려움은 실패가 아니라 성장의 벼랑 끝에서 날개를 펼치기 직전의 자연스러운 저항입니다. 기초를 단단히 다지면 돌파구가 열립니다.”",
    focusTime: "21:00 ~ 23:00",
    environment: "조용한 1인 독서대",
  },
  subject: "수학 (공통수학 1)",
  problem: "개념 공백 & 집중력 저하",
  core: "💡 핵심 처방: 성급하게 심화 문제를 풀지 말고, 교과서 기본 정의와 예제 증명에 대한 3회독 복습이 시급합니다.",
  actions: [
    {
      title: "1. 25분 뽀모도로 타이머 켜고 개념서 2쪽 정독하기",
      tag: "25분 집중",
      tagBg: "rgba(255, 193, 116, 0.2)",
      tagColor: "#FFC174",
      tagBold: true,
      description: "휴대폰 알림을 완전히 끄고 문제 풀이 없이 공식 유도와 논리적 흐름만을 2쪽 온전히 정독합니다.",
    },
    {
      title: "2. 심화 중단, 대표 예제 3문항 백지 풀이 3회 반복",
      tag: "3회독 복습",
      tagBg: "#2B2741",
      tagColor: "#FFC32D",
      tagBold: false,
      description: "가장 대표적인 필수 예제 3문항을 선정해 풀이 풀이과정을 백지에 손으로 막힘없이 써내려갈 때까지 반복합니다.",
    },
    {
      title: "3. 학습 시작 전 책상 위 불필요한 물건 모두 치우기",
      tag: "시각적 정돈",
      tagBg: "#2B2741",
      tagColor: "#BDC2FF",
      tagBold: false,
      description: "교재 1권, 풀이용 스프링 노트 1권, 펜 1자루를 제외한 간식과 스마트폰을 책상 아래로 격리합니다.",
    },
  ],
};
