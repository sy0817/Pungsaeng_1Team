import Mypage_Card from "./Mypage_Card";
import { MatrixIcon } from "./Mypage_Icons";

const serif = { fontFamily: '"Liberation Serif"' };

function TroubleBar({ rank, label, percent, count, color, badgeBg }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignSelf: "stretch" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "20px", height: "20px", borderRadius: "9999px", background: badgeBg }}>
            <span style={{ ...serif, color, fontSize: "12px", fontWeight: 700, lineHeight: "16px", letterSpacing: "0.26px" }}>{rank}</span>
          </div>
          <span style={{ ...serif, color: "#E6DEFF", fontSize: "13px", lineHeight: "18px", letterSpacing: "0.26px", whiteSpace: "nowrap" }}>{label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", whiteSpace: "nowrap" }}>
          <span style={{ ...serif, color, fontSize: "13px", fontWeight: 700, lineHeight: "18px", letterSpacing: "0.26px" }}>{percent}%</span>
          <span style={{ ...serif, color: "#D8C3AD", fontSize: "12px", lineHeight: "16px", letterSpacing: "0.26px" }}>({count}회)</span>
        </div>
      </div>
      <div style={{ height: "12px", overflow: "hidden", borderRadius: "9999px", background: "#0E0A23" }}>
        <div style={{ width: `${percent}%`, height: "100%", borderRadius: "9999px", background: color }} />
      </div>
    </div>
  );
}

// 좌측 상단: 학업 고민 유형 통계
function Mypage_Troubles({ data }) {
  return (
    <Mypage_Card accent="#FFC174" title={data.title} tag={data.tag} tagBg="#2B2741">
      <span style={{ ...serif, color: "#D8C3AD", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px" }}>{data.description}</span>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignSelf: "stretch", paddingTop: "4px" }}>
        {data.items.map((item) => (
          <TroubleBar key={item.rank} {...item} />
        ))}
      </div>

      <div style={{ alignSelf: "stretch", paddingTop: "8px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            padding: "16px",
            borderRadius: "8px",
            background: "rgba(14, 10, 35, 0.6)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ ...serif, color: "#D8C3AD", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px" }}>{data.coachingLabel}</span>
            <span style={{ ...serif, color: "#E6DEFF", fontSize: "14px", fontWeight: 700, lineHeight: "22px" }}>{data.coachingValue}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MatrixIcon />
            <span style={{ ...serif, color: "#FFC174", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px", whiteSpace: "nowrap" }}>{data.coachingTip}</span>
          </div>
        </div>
      </div>
    </Mypage_Card>
  );
}

export default Mypage_Troubles;
