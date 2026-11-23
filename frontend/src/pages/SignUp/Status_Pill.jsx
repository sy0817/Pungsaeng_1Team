// 입력 검증 결과 배지 (성공: #FFC174 / 오류: #FB5541)
function Status_Pill({ icon, color = "#FFC174", children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        alignSelf: "stretch",
        borderRadius: "4px",
        background: "#201C36",
        filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))",
      }}
    >
      <div style={{ display: "flex", flexShrink: 0 }}>{icon}</div>
      <span
        style={{
          color,
          fontFamily: "Pretendard",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "18px",
          letterSpacing: "0.12px",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default Status_Pill;
