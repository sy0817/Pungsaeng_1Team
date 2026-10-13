// 작은 버튼 컴포넌트 (세로 비율 기준 반응형)
// 350x40, radius 10, 반투명 테두리 + 어두운 배경(#1E293B), 흰 글자 Pretendard 24px
function S_Button({ children, onClick, type = "button", style, ...rest }) {
  const baseStyle = {
    display: "flex",
    width: "350px",
    maxWidth: "100%",
    height: "clamp(30px, 3.9vh, 40px)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "clamp(7px, 0.98vh, 10px)",
    border: "1px solid rgba(255, 255, 255, 0.20)",
    background: "#1E293B",
    boxSizing: "border-box",
    cursor: "pointer",
    color: "#FFF",
    textAlign: "center",
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    fontSize: "clamp(15px, 2.34vh, 24px)",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    whiteSpace: "nowrap",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default S_Button;
