import {
  MathIcon,
  KoreanIcon,
  EnglishIcon,
  ScienceIcon,
  SocialIcon,
  EtcIcon,
  ConceptIcon,
  ProblemIcon,
  FocusIcon,
  PlanIcon,
  PhoneIcon,
  AnxietyIcon,
} from "./Check_Icons";

// 1. 과목 선택 (시안 순서)
export const SUBJECTS = [
  { label: "수학", icon: MathIcon },
  { label: "국어", icon: KoreanIcon },
  { label: "영어", icon: EnglishIcon },
  { label: "과학", icon: ScienceIcon },
  { label: "사회", icon: SocialIcon },
  { label: "기타", icon: EtcIcon, height: "76px" },
];

// 과목별 세부 과목 - 시안에는 수학만 있어서 나머지는 확정되면 채움
export const SUBJECT_DETAILS = {
  수학: ["공통수학 1", "공통수학 2", "대수", "미적분"],
  국어: ["국어1", "국어2", "문학", "언매", "화작", "독서"],
};

// 선택된 과목이 없을 때 세부 과목 목록으로 보여줄 과목 (시안 기준)
export const DEFAULT_DETAIL_SUBJECT = "수학";

// 2. 현재 겪는 고민 증상 (복수 선택)
export const SYMPTOMS = [
  { id: "concept", title: "개념이 부족해요", description: "기본 원리가 막막해요", short: "개념 부족", icon: ConceptIcon },
  { id: "problem", title: "문제가 안 풀려요", description: "응용·킬러 문항에서 막혀요", short: "문제 풀이 막힘", icon: ProblemIcon },
  { id: "focus", title: "집중이 오래 안 돼요", description: "30분만 앉아도 피로해요", short: "집중력 저하", icon: FocusIcon },
  { id: "plan", title: "계획을 못 지켜요", description: "매일 미루다가 자책해요", short: "계획 실천 부족", icon: PlanIcon },
  { id: "phone", title: "스마트폰을 자주 봐요", description: "숏폼 때문에 손이 계속 가요", short: "스마트폰 과다 사용", icon: PhoneIcon },
  { id: "anxiety", title: "시험이 너무 불안해요", description: "시험날 머리가 백지가 돼요", short: "시험 불안", icon: AnxietyIcon },
];
