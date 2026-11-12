import { SummaryIcon } from "./Prescription_Icons";

const serif = { fontFamily: '"Liberation Serif"' };

function Field({ label, value, color }) {
  return (
    <div style={{ display: "flex", flex: "1 0 0", minWidth: 0, flexDirection: "column", alignItems: "flex-start", padding: "8px", borderRadius: "8px", background: "#201C36" }}>
      <span style={{ ...serif, color: "#D8C3AD", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px" }}>{label}</span>
      <span style={{ ...serif, color, fontSize: "16px", lineHeight: "24px", whiteSpace: "nowrap" }}>{value}</span>
    </div>
  );
}

// 우측 상단: 고민 진단 요약
function Prescription_Summary({ subject, problem, core }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        alignSelf: "stretch",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid rgba(83, 68, 52, 0.3)",
        background: "#1C1831",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "4px", alignSelf: "stretch", paddingBottom: "5px", borderBottom: "1px solid rgba(83, 68, 52, 0.2)" }}>
        <SummaryIcon />
        <span style={{ ...serif, color: "#FFC174", fontSize: "16px", lineHeight: "24px", whiteSpace: "nowrap" }}>고민 진단 요약</span>
      </div>

      <div style={{ display: "flex", gap: "8px", alignSelf: "stretch", paddingTop: "4px" }}>
        <Field label="선택 과목" value={subject} color="#FFC174" />
        <Field label="진단된 문제 상태" value={problem} color="#FFC32D" />
      </div>

      <div style={{ alignSelf: "stretch", paddingTop: "4px" }}>
        <div style={{ padding: "8px", borderRadius: "8px", background: "#0E0A23" }}>
          <span style={{ ...serif, color: "#D8C3AD", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px", wordBreak: "keep-all" }}>{core}</span>
        </div>
      </div>
    </div>
  );
}

export default Prescription_Summary;
