import { CardLabelIcon, AdviceIcon } from "./Prescription_Icons";

const serif = { fontFamily: '"Liberation Serif"' };
const mono = { fontFamily: '"Liberation Mono", monospace', color: "#FFC32D", fontSize: "11px", fontWeight: 700, lineHeight: "16px", letterSpacing: "0.44px" };

function InfoBox({ label, value, valueColor, bold }) {
  return (
    <div style={{ display: "flex", flex: "1 0 0", minWidth: 0, flexDirection: "column", alignItems: "center", padding: "8px", borderRadius: "8px", background: "#0E0A23" }}>
      <span style={{ ...serif, color: "#D8C3AD", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px" }}>{label}</span>
      <span style={{ ...serif, color: valueColor, fontSize: "12px", fontWeight: bold ? 700 : 400, lineHeight: "18px", letterSpacing: "0.12px", textAlign: "center" }}>
        {value}
      </span>
    </div>
  );
}

// 좌측: 뽑은 카드 패널
function Prescription_Card({ card }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid rgba(83, 68, 52, 0.3)",
        background: "#1C1831",
      }}
    >
      {/* 헤더 */}
      <div style={{ alignSelf: "stretch", paddingBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "9px",
            borderBottom: "1px solid rgba(83, 68, 52, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <CardLabelIcon />
            <span style={{ ...serif, color: "#FFC174", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px", whiteSpace: "nowrap" }}>뽑은 카드</span>
          </div>
          <div style={{ padding: "2px 4px", borderRadius: "4px", background: "#201C36" }}>
            <span style={{ ...serif, color: "#FFC32D", fontSize: "11px", fontWeight: 700, lineHeight: "16px", letterSpacing: "0.44px", whiteSpace: "nowrap" }}>
              {card.orientation}
            </span>
          </div>
        </div>
      </div>

      {/* 카드 그래픽 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "280px",
          maxWidth: "100%",
          padding: "17px",
          borderRadius: "12px",
          border: "1px solid rgba(255, 195, 45, 0.2)",
          background: "#0E0A23",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", alignSelf: "stretch", paddingBottom: "4px" }}>
          <span style={mono}>{card.no}</span>
          <span style={mono}>ARCANA</span>
        </div>
        <img src={card.image} alt={card.label} style={{ display: "block", width: "170px", height: "250px", borderRadius: "10px", objectFit: "cover" }} />
        <span style={{ ...serif, color: "#FFC174", fontSize: "18px", lineHeight: "26px", letterSpacing: "-0.09px", paddingTop: "8px" }}>{card.label}</span>
        <span style={{ ...serif, color: "#FFDF9F", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px" }}>{card.english}</span>
      </div>

      {/* 카드의 조언 */}
      <div style={{ alignSelf: "stretch", paddingTop: "16px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3.25px",
            padding: "17px",
            borderRadius: "8px",
            border: "1px solid rgba(83, 68, 52, 0.2)",
            background: "#201C36",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <AdviceIcon />
            <span style={{ ...serif, color: "#FFC174", fontSize: "13px", lineHeight: "18px", letterSpacing: "0.26px" }}>카드의 조언</span>
          </div>
          <span style={{ ...serif, color: "#E6DEFF", fontSize: "12px", lineHeight: "19.5px", letterSpacing: "0.12px", wordBreak: "keep-all" }}>{card.advice}</span>
        </div>
      </div>

      {/* 추가 정보 */}
      <div style={{ display: "flex", alignSelf: "stretch", gap: "4px", paddingTop: "8px" }}>
        <InfoBox label="추천 집중 시간" value={card.focusTime} valueColor="#FFC32D" bold />
        <InfoBox label="최적 학습 환경" value={card.environment} valueColor="#BDC2FF" />
      </div>
    </div>
  );
}

export default Prescription_Card;
