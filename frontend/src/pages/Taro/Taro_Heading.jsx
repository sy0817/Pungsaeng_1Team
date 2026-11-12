const dot = { width: "6px", height: "6px", borderRadius: "9999px", background: "#FFC174" };

// 타이틀 + 안내 문구
function Taro_Heading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "768px", paddingBottom: "36px" }}>
      {/* 라벨 */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", paddingBottom: "4px" }}>
        <span style={dot} />
        <span
          style={{
            color: "#FFDDB8",
            fontFamily: '"Liberation Serif"',
            fontSize: "11px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: "1.1px",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          PSH ARCANA SANCTUARY
        </span>
        <span style={dot} />
      </div>

      {/* 타이틀 */}
      <div
        style={{
          color: "#E6DEFF",
          fontFamily: '"Liberation Serif"',
          fontSize: "40px",
          lineHeight: "50px",
          letterSpacing: "-1px",
          textAlign: "center",
          wordBreak: "keep-all",
        }}
      >
        “마음을 가다듬고,{" "}
        <span style={{ color: "#FFC174", textShadow: "0 0 12px rgba(255, 193, 116, 0.45)" }}>오늘의 타로 카드</span>를 1장
        선택하세요”
      </div>

      {/* 서브 문구 */}
      <div style={{ maxWidth: "576px", paddingTop: "8px" }}>
        <div
          style={{
            color: "#D8C3AD",
            fontFamily: '"Liberation Serif"',
            fontSize: "16px",
            lineHeight: "26px",
            textAlign: "center",
            wordBreak: "keep-all",
          }}
        >
          풍생고 학생을 위한 10장의 아르카나 카드가 당신의 학업 운명과 막막했던 과목 슬럼프의 명쾌한 해결책을 비춥니다.
        </div>
      </div>
    </div>
  );
}

export default Taro_Heading;
