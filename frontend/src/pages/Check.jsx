function Check() {
  const pageStyle = {
    position: "relative",
    width: "100%",
    height: "1410px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const contentStyle = {
    display: "flex",
    width: "1376px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "56px",
  };

  return (
    <div style={pageStyle}>
      {/* 우측 lavender 블러 */}
      <div
        style={{
          position: "absolute",
          right: "-200px",
          top: "140px",
          width: "566px",
          height: "555px",
          borderRadius: "9999px",
          background: "rgba(189, 194, 255, 0.15)",
          filter: "blur(32px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 좌측 amber 블러 */}
      <div
        style={{
          position: "absolute",
          left: "-126px",
          bottom: "141px",
          width: "447px",
          height: "462px",
          borderRadius: "9999px",
          background: "rgba(255, 193, 116, 0.10)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <main style={{ ...contentStyle, position: "relative", zIndex: 1 }}>
        고민 진단 콘텐츠 영역
      </main>
    </div>
  );
}

export default Check;
