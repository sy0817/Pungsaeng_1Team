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
export const CARDS = [
  { label: "새로운 시작", image: img새로운시작 },
  { label: "꿈과 목표", image: img꿈과목표 },
  { label: "노력과 꾸준함", image: img노력과꾸준함 },
  { label: "올바른 방향", image: img올바른방향 },
  { label: "성과와 보상", image: img성과와보상 },
  { label: "도움과 인연", image: img도움과인연 },
  { label: "도전과 극복", image: img도전과극복 },
  { label: "성장과 발전", image: img성장과발전 },
  { label: "휴식과 재충전", image: img휴식과재충전 },
  { label: "밝은 미래", image: img밝은미래 },
];

export const DEFAULT_CARD = "도전과 극복";

// 이전 단계(고민 진단)에서 선택한 내용 - 추후 라우터 state / API 값으로 교체
export const DIAGNOSIS_SUMMARY = "수학 (대수) · 개념 부족 / 집중력 저하";

// 카드별 해석 - 시안에 있는 "도전과 극복"만 채워져 있고, 나머지는 API 연동 시 채움
export const CARD_DETAILS = {
  "도전과 극복": {
    arcana: "ARCANA VII",
    description: "어려움이나 성적 압박을 극복하는 단계",
    match: "98.4%",
    quote: "\"가파른 오르막길은 정상이 가까워졌다는 징조입니다.\"",
    status:
      "수학 대수 영역에서 겪는 막힘은 기초 역량의 부족이 아니라, 복합 문제 적용 과정에서의 심리적 압박감에서 비롯되었습니다.",
    advice:
      "모든 단원을 한꺼번에 복습하려 하지 말고, 취약 유형 1개를 정해 3일 동안 풀이 과정을 말로 설명하는 '메타인지 루틴'을 권장합니다.",
  },
};
