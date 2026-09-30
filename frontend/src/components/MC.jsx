// MC 컴포넌트 - 메시지 카드 (세로 비율 기준 반응형)
// 컨테이너: 670x117, radius 10, 반투명 회색 배경
// 안에 두 줄 텍스트 (line1: 흰색 / line2: 연한 회색)
function MC({ line1, line2, style, ...rest }) {
  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "clamp(2px, 0.5vh, 6px)",
    width: "670px",
    maxWidth: "100%",
    height: "clamp(85px, 11.4vh, 117px)",
    padding: "0 clamp(24px, 2.5vw, 37px)",
    boxSizing: "border-box",
    borderRadius: "clamp(7px, 0.98vh, 10px)",
    background: "rgba(82, 88, 96, 0.50)",
  };

  const line1Style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "494px",
    maxWidth: "100%",
    color: "#FFF",
    fontFamily: '"Sacheon Uju"',
    fontSize: "clamp(14px, 1.95vh, 20px)",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  };

  const line2Style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "596px",
    maxWidth: "100%",
    color: "#E2E8F0",
    fontFamily: '"Sacheon Uju"',
    fontSize: "clamp(14px, 1.95vh, 20px)",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  };

  return (
    <div style={{ ...boxStyle, ...style }} {...rest}>
      <span style={line1Style}>{line1}</span>
      <span style={line2Style}>{line2}</span>
    </div>
  );
}

export default MC;
