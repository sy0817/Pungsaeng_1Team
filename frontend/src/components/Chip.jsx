// 칩 컴포넌트 (세로 비율 기준 반응형)
//  - 비선택: 150x60, 반투명 테두리 + 어두운 반투명 배경, 흰 글자
//  - selected: 160x70, 노란(#FFC159) 배경, 어두운 글자(#1E293B)
function Chip({ label, selected = false, onClick, style, ...rest }) {
  const baseStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    cursor: "pointer",
    borderRadius: "clamp(9px, 1.17vh, 12px)",
    fontFamily: '"Sacheon Uju"',
    fontSize: "clamp(20px, 3.13vh, 32px)",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    whiteSpace: "nowrap",
    transition: "all 0.15s ease",
  };

  const unselectedStyle = {
    width: "150px",
    height: "clamp(44px, 5.86vh, 60px)",
    padding: "2px clamp(16px, 1.7vw, 25px)",
    border: "2px solid rgba(255, 255, 255, 0.20)",
    background: "rgba(30, 41, 59, 0.50)",
    color: "#FFF",
  };

  const selectedStyle = {
    width: "160px",
    height: "clamp(51px, 6.84vh, 70px)",
    padding: "clamp(13px, 1.76vh, 18px) clamp(20px, 2vw, 30px)",
    border: "3px solid rgba(255, 255, 255, 0.20)",
    background: "#FFC159",
    color: "#1E293B",
  };

  const merged = selected
    ? { ...baseStyle, ...selectedStyle, ...style }
    : { ...baseStyle, ...unselectedStyle, ...style };

  return (
    <button
      type="button"
      onClick={onClick}
      data-selected={selected}
      style={merged}
      {...rest}
    >
      {label}
    </button>
  );
}

export default Chip;
