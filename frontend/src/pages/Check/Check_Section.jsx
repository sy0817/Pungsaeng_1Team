const serif = { fontFamily: '"Liberation Serif"' };

// 폼 섹션 공통 틀 (제목 + 보조 문구 + 내용)
function Check_Section({ icon, title, bold = false, hint, hintColor, sideText, children }) {
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
        background: "#0E0A23",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "stretch",
          paddingBottom: "9px",
          borderBottom: "1px solid #201C36",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {icon}
          <span
            style={{
              ...serif,
              color: "#E6DEFF",
              fontSize: "18px",
              fontWeight: bold ? 700 : 400,
              lineHeight: "26px",
              letterSpacing: "-0.09px",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
          {hint && (
            <span
              style={{
                ...serif,
                paddingLeft: "8px",
                color: hintColor,
                fontSize: "11px",
                fontWeight: bold ? 700 : 400,
                lineHeight: "16px",
                letterSpacing: "0.44px",
                whiteSpace: "nowrap",
              }}
            >
              {hint}
            </span>
          )}
        </div>
        <span style={{ ...serif, color: "#D8C3AD", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px", whiteSpace: "nowrap" }}>
          {sideText}
        </span>
      </div>

      {children}
    </div>
  );
}

export default Check_Section;
