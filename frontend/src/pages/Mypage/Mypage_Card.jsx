const serif = { fontFamily: '"Liberation Serif"' };

// 마이페이지 공통 카드 (섹션 제목 + 우측 태그 + 내용)
function Mypage_Card({ accent, title, tag, tagBg, tagColor = "#D8C3AD", children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
        padding: "24px",
        borderRadius: "12px",
        background: "rgba(28, 24, 49, 0.8)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", alignSelf: "stretch" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "6px", height: "16px", borderRadius: "9999px", background: accent }} />
          <span style={{ ...serif, color: "#E6DEFF", fontSize: "18px", lineHeight: "26px", letterSpacing: "-0.09px", whiteSpace: "nowrap" }}>{title}</span>
        </div>
        {tag && (
          <span
            style={{
              ...serif,
              padding: tagBg ? "2px 4px" : 0,
              borderRadius: "4px",
              background: tagBg,
              color: tagColor,
              fontSize: "11px",
              lineHeight: "16px",
              letterSpacing: "0.44px",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default Mypage_Card;
