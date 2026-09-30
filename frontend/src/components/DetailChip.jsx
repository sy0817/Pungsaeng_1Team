// 세부 칩 컴포넌트 (세로 비율 기준 반응형)
//  - 비선택: 100x40, 얇은 반투명 테두리 + 어두운 반투명 배경, 흐린 흰 글자
//  - selected: 노란 반투명(#FFC159 50%) 배경, 어두운 글자
function DetailChip({ label, selected = false, onClick, style, ...rest }) {
  const baseStyle = {
    display: "flex",
    width: "100px",
    height: "clamp(30px, 3.9vh, 40px)",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    cursor: "pointer",
    borderRadius: "clamp(9px, 1.17vh, 12px)",
    fontFamily: '"Sacheon Uju"',
    fontSize: "clamp(15px, 2.34vh, 24px)",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    whiteSpace: "nowrap",
    transition: "all 0.15s ease",
  };

  const unselectedStyle = {
    border: "1px solid rgba(255, 255, 255, 0.20)",
    background: "rgba(30, 41, 59, 0.30)",
    color: "rgba(255, 255, 255, 0.70)",
  };

  const selectedStyle = {
    border: "1px solid rgba(255, 255, 255, 0.40)",
    background: "rgba(255, 193, 89, 0.50)",
    color: "rgba(0, 0, 0, 0.70)",
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

export default DetailChip;
