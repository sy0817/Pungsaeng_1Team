// 공통 버튼 컴포넌트 (세로 비율 기준 반응형)
// 디자인: 485x60, radius 16
//  - 기본(비활성): 반투명 테두리 + 어두운 반투명 배경, 흰 글자 / 클릭 무시
//  - active=true(모든 선택 완료): 노란색(#FFC159) 배경, 어두운 글자 / 클릭 동작
function Button({
  children,
  onClick,
  type = "button",
  active = false,
  style,
  ...rest
}) {
  const baseStyle = {
    display: "flex",
    width: "100%",
    maxWidth: "485px",
    height: "clamp(44px, 5.86vh, 60px)",
    padding: "1px clamp(40px, 6.4vw, 93px)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "clamp(11px, 1.56vh, 16px)",
    boxSizing: "border-box",
    cursor: active ? "pointer" : "default",
    border: active
      ? "2px solid transparent"
      : "2px solid rgba(255, 255, 255, 0.20)",
    background: active ? "#FFC159" : "rgba(30, 41, 59, 0.50)",
  };

  const labelStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0,
    color: active ? "#1E293B" : "#FFF",
    textAlign: "center",
    fontFamily: '"Sacheon Uju"',
    fontSize: "clamp(20px, 3vh, 32px)",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    whiteSpace: "nowrap",
  };

  // 비활성 상태에서는 클릭해도 onClick을 실행하지 않는다
  const handleClick = (e) => {
    if (!active) return;
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      aria-disabled={!active}
      style={{ ...baseStyle, ...style }}
      {...rest}
    >
      <span style={labelStyle}>{children}</span>
    </button>
  );
}

export default Button;
