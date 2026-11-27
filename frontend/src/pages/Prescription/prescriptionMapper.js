import { CARD_IMAGES } from "../Taro/taroData";

// 실천 지침 태그 색 (순서대로 돌려 씀)
const TAG_STYLES = [
  { tagBg: "rgba(255, 193, 116, 0.2)", tagColor: "#FFC174", tagBold: true },
  { tagBg: "#2B2741", tagColor: "#FFC32D", tagBold: false },
  { tagBg: "#2B2741", tagColor: "#BDC2FF", tagBold: false },
];

/**
 * 백엔드 PrescriptionResponse -> 처방전 화면에서 쓰는 모양
 * (처방전 생성 응답과 "처방 결과 조회" 응답이 같은 모양이므로 둘 다 이 함수를 쓰면 된다)
 */
export const toViewModel = (prescription) => {
  const { prescriptionId, prescriptionKeyword, card, diagnosisSummary, actionGuides = [] } = prescription;

  return {
    prescriptionId,
    keyword: prescriptionKeyword,
    card: {
      label: card.name,
      image: CARD_IMAGES[card.cardId],
      orientation: card.direction === "REVERSED" ? "역방향 (Reversed)" : "정방향 (Upright)",
      subtitle: card.quote ? `"${card.quote}"` : "",
      advice: card.advice,
      focusTime: card.recommendedTime,
      environment: card.recommendedEnv,
    },
    subject: diagnosisSummary.subject,
    problem: diagnosisSummary.symptoms.join(" & "),
    core: diagnosisSummary.comprehensiveAdvice, // 없으면 null -> 화면에서 숨김
    actions: actionGuides.map((guide, index) => ({
      id: guide.actionId,
      title: `${index + 1}. ${guide.title}`,
      tag: guide.tag,
      description: guide.description,
      ...TAG_STYLES[index % TAG_STYLES.length],
    })),
  };
};
