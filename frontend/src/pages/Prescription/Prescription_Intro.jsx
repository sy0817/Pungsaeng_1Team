import { HeadSparkIcon, KeywordIcon } from "./Prescription_Icons";

const serif = { fontFamily: '"Liberation Serif"', whiteSpace: "nowrap" };

// 상단 소개 카드 (제목 + 처방 키워드)
function Prescription_Intro({ userId, keyword }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid rgba(83, 68, 52, 0.3)",
        background: "#1C1831",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <HeadSparkIcon />
          <span style={{ ...serif, color: "#FFC32D", fontSize: "16px", lineHeight: "24px" }}>풍생고 학업상담실 | 아르카나 학습 처방전</span>
        </div>

        <div style={{ ...serif, color: "#E6DEFF", fontSize: "22px", fontWeight: 700, lineHeight: "30px", letterSpacing: "-0.22px" }}>
          🎓 <span style={{ color: "#FFC174" }}>{userId} </span>학생의 맞춤 학습 처방전
        </div>

        <span style={{ ...serif, color: "#D8C3AD", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px" }}>
          선택한 타로 카드의 조언과 인지심리학적 학업 솔루션을 결합한 오늘의 실천 계획입니다.
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "9px 17px",
          borderRadius: "8px",
          border: "1px solid rgba(83, 68, 52, 0.2)",
          background: "#201C36",
        }}
      >
        <KeywordIcon />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ ...serif, color: "#D8C3AD", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px" }}>처방 키워드</span>
          <span style={{ ...serif, color: "#FFC32D", fontSize: "16px", lineHeight: "24px" }}>{keyword}</span>
        </div>
      </div>
    </div>
  );
}

export default Prescription_Intro;
