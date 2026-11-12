import Mypage_Card from "./Mypage_Card";
import { QuestionHeadIcon } from "./Mypage_Icons";

const serif = { fontFamily: '"Liberation Serif"' };

function ArcanaWidget({ rank, count, label, keywords, quote, image, accent, glow }) {
  return (
    <div
      style={{
        display: "flex",
        flex: "1 0 0",
        minWidth: 0,
        flexDirection: "column",
        gap: "8px",
        padding: "16px",
        borderRadius: "8px",
        background: "rgba(14, 10, 35, 0.9)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <div style={{ flexShrink: 0, width: "64px", height: "96px", overflow: "hidden", borderRadius: "6px", boxShadow: `0 0 12px 0 ${glow}` }}>
          <img src={image} alt={label} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ display: "flex", minWidth: 0, flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ ...serif, color: accent, fontSize: "11px", fontWeight: 700, lineHeight: "16px", letterSpacing: "0.44px", whiteSpace: "nowrap" }}>
            {rank}위 아르카나 ({count}회)
          </span>
          <span style={{ ...serif, color: "#E6DEFF", fontSize: "16px", lineHeight: "24px", whiteSpace: "nowrap" }}>{label}</span>
          <span style={{ ...serif, color: "#D8C3AD", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px", paddingTop: "2px", wordBreak: "keep-all" }}>{keywords}</span>
        </div>
      </div>

      <div style={{ alignSelf: "stretch", padding: "4px", borderRadius: "4px", background: "rgba(43, 39, 65, 0.4)" }}>
        <span style={{ ...serif, display: "block", color: "#D8C3AD", fontSize: "12px", lineHeight: "19.5px", letterSpacing: "0.12px", wordBreak: "keep-all" }}>{quote}</span>
      </div>
    </div>
  );
}

// 좌측 하단: 자주 뽑은 아르카나 + 종합 조언
function Mypage_Arcana({ userId, data }) {
  return (
    <Mypage_Card accent="#FFC32D" title={data.title} tag={data.tag} tagBg="rgba(224, 168, 0, 0.2)" tagColor="#FFC32D">
      <div style={{ display: "flex", alignItems: "stretch", gap: "16px", alignSelf: "stretch" }}>
        {data.top.map((item) => (
          <ArcanaWidget key={item.rank} {...item} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          alignSelf: "stretch",
          padding: "16px",
          borderRadius: "8px",
          background: "rgba(54, 49, 76, 0.5)",
        }}
      >
        <div style={{ display: "flex", flexShrink: 0 }}>
          <QuestionHeadIcon />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ ...serif, color: "#E6DEFF", fontSize: "13px", lineHeight: "18px", letterSpacing: "0.26px" }}>{userId} 학생의 종합 아르카나 조언</span>
          <span style={{ ...serif, color: "#D8C3AD", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px", wordBreak: "keep-all" }}>{data.advice}</span>
        </div>
      </div>
    </Mypage_Card>
  );
}

export default Mypage_Arcana;
