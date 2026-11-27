import img새로운시작 from "../../assets/photo/새로운 시작.png";
import img꿈과목표 from "../../assets/photo/꿈과 목표.png";
import img노력과꾸준함 from "../../assets/photo/노력과 꾸준함.png";
import img올바른방향 from "../../assets/photo/올바른 방향.png";
import img성과와보상 from "../../assets/photo/성과와 보상.png";
import img도움과인연 from "../../assets/photo/도움과 인연.png";
import img도전과극복 from "../../assets/photo/도전과 극복.png";
import img성장과발전 from "../../assets/photo/성장과 발전.png";
import img휴식과재충전 from "../../assets/photo/휴식과 재충전.png";
import img밝은미래 from "../../assets/photo/밝은 미래.png";

// 시안 순서 (5열 x 2행)
// id 는 백엔드 tarotCardId 와 같다. (POST /api/v1/prescriptions 에 그대로 전송)
// quote / advice / keyword 는 카드를 눌렀을 때 보여주는 "미리보기"이고, 백엔드 data.sql 의 정방향 문구를 옮겨 둔 것이다.
// 실제 정/역방향과 문구는 처방전 생성 응답(card.direction, card.quote ...)이 기준이다.
export const CARDS = [
  {
    id: "NEW_START",
    label: "새로운 시작",
    image: img새로운시작,
    keyword: "첫걸음 · 리셋",
    quote: "모든 처음은 서툴지만, 오늘 펼친 첫 페이지가 내일의 기준이 됩니다.",
    advice: "완벽한 계획을 세우려 하지 말고, 오늘 아침 15분 동안 가장 쉬운 단원 하나를 끝까지 읽는 것으로 시작하세요.",
  },
  {
    id: "DREAM_GOAL",
    label: "꿈과 목표",
    image: img꿈과목표,
    keyword: "목표 설정 · 동기 부여",
    quote: "가고 싶은 곳이 선명할수록 오늘 해야 할 일도 선명해집니다.",
    advice: "목표 대학이나 점수를 한 줄로 적어 책상에 붙이고, 그 목표까지 이번 주에 할 일 3가지만 정하세요.",
  },
  {
    id: "EFFORT",
    label: "노력과 꾸준함",
    image: img노력과꾸준함,
    keyword: "루틴 성립 · 번아웃 방지",
    quote: "일정한 시간에 책상에 앉는 성실성이 최고의 무기입니다.",
    advice: "하루 공부량을 늘리기보다 매일 같은 시간에 같은 양을 하는 루틴을 2주 동안 지켜 보세요.",
  },
  {
    id: "RIGHT_DIRECTION",
    label: "올바른 방향",
    image: img올바른방향,
    keyword: "방향 점검 · 전략 수정",
    quote: "빨리 가는 것보다 맞는 길로 가는 것이 결국 더 빠릅니다.",
    advice: "최근 시험지를 펼쳐 틀린 문제를 유형별로 나누고, 가장 많이 틀린 유형 하나부터 다시 공부하세요.",
  },
  {
    id: "REWARD",
    label: "성과와 보상",
    image: img성과와보상,
    keyword: "성취 · 보상 설계",
    quote: "쌓아 온 시간은 사라지지 않고, 결과로 돌아올 때를 기다리고 있습니다.",
    advice: "공부한 만큼 작은 보상을 정해 두세요. 오늘 목표를 끝내면 좋아하는 일 하나를 허락하는 식입니다.",
  },
  {
    id: "HELP_BOND",
    label: "도움과 인연",
    image: img도움과인연,
    keyword: "협력 · 질문하기",
    quote: "혼자 풀리지 않는 문제도 함께 보면 길이 보입니다.",
    advice: "막힌 문제를 3개만 골라 친구나 선생님께 질문하고, 들은 풀이를 내 말로 다시 설명해 보세요.",
  },
  {
    id: "CHALLENGE",
    label: "도전과 극복",
    image: img도전과극복,
    keyword: "한계 돌파 · 압박 극복",
    quote: "가파른 오르막길은 정상이 가까워졌다는 징조입니다.",
    advice: "모든 단원을 한꺼번에 복습하려 하지 말고, 취약 유형 1개를 정해 3일 동안 풀이 과정을 말로 설명하는 '메타인지 루틴'을 권장합니다.",
  },
  {
    id: "GROWTH",
    label: "성장과 발전",
    image: img성장과발전,
    keyword: "실력 향상 · 자기 성찰",
    quote: "어제보다 한 문제 더 풀 수 있다면, 당신은 이미 자라고 있습니다.",
    advice: "한 달 전 풀었던 문제를 다시 풀어 보고 달라진 점을 확인하세요. 성장을 눈으로 보면 계속할 힘이 생깁니다.",
  },
  {
    id: "REST",
    label: "휴식과 재충전",
    image: img휴식과재충전,
    keyword: "휴식 · 컨디션 회복",
    quote: "잘 쉬는 것도 실력입니다. 멈춤은 다음 질주를 위한 준비입니다.",
    advice: "오늘은 공부 시간을 30분 줄이고, 그 시간에 충분히 자거나 가볍게 걸으며 머리를 비워 보세요.",
  },
  {
    id: "BRIGHT_FUTURE",
    label: "밝은 미래",
    image: img밝은미래,
    keyword: "희망 · 자신감",
    quote: "지금의 노력은 아직 보이지 않는 내일을 밝히는 불빛입니다.",
    advice: "시험이 끝난 뒤의 내 모습을 구체적으로 적어 보고, 그 모습에 가까워지는 오늘의 할 일 하나를 정하세요.",
  },
];

// 카드 id -> 이미지 (처방전/마이페이지에서 백엔드 cardId 로 이미지를 찾을 때 사용)
export const CARD_IMAGES = Object.fromEntries(CARDS.map((card) => [card.id, card.image]));