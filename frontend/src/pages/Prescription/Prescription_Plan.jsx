import { CheckCircleIcon } from "./Prescription_Icons";

const serif = { fontFamily: '"Liberation Serif"' };

function ActionItem({ title, tag, tagBg, tagColor, tagBold, description }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        alignSelf: "stretch",
        padding: "17px",
        borderRadius: "8px",
        border: "1px solid rgba(83, 68, 52, 0.2)",
        background: "#201C36",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "4px 8px" }}>
        <span style={{ ...serif, color: "#E6DEFF", fontSize: "16px", lineHeight: "24px" }}>{title}</span>
        <span
          style={{
            ...serif,
            padding: "2px 4px",
            borderRadius: "4px",
            background: tagBg,
            color: tagColor,
            fontSize: "11px",
            fontWeight: tagBold ? 700 : 400,
            lineHeight: "16px",
            letterSpacing: "0.44px",
            whiteSpace: "nowrap",
          }}
        >
          {tag}
        </span>
      </div>
      <span style={{ ...serif, color: "#D8C3AD", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px", paddingTop: "4px" }}>{description}</span>
    </div>
  );
}

// 우측 하단: 오늘의 실천 지침
function Prescription_Plan({ actions }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid rgba(83, 68, 52, 0.3)",
        background: "#1C1831",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "4px", alignSelf: "stretch", paddingBottom: "5px", borderBottom: "1px solid rgba(83, 68, 52, 0.2)" }}>
        <CheckCircleIcon />
        <span style={{ ...serif, color: "#FFC174", fontSize: "16px", lineHeight: "24px", whiteSpace: "nowrap" }}>오늘의 실천 지침 {actions.length}가지</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignSelf: "stretch" }}>
        {actions.map((action) => (
          <ActionItem key={action.title} {...action} />
        ))}
      </div>
    </div>
  );
}

export default Prescription_Plan;
