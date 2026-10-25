function Mypage() {
  const pageStyle = {
    position: "relative",
    width: "100%",
    height: "1648px",
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
      {/* 우측 amber 블러 */}
      <div
        style={{
          position: "absolute",
          right: "344px",
          top: "-160px",
          width: "384px",
          height: "384px",
          borderRadius: "9999px",
          background: "rgba(255, 193, 116, 0.10)",
          filter: "blur(65px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 좌측 indigo 블러 */}
      <div
        style={{
          position: "absolute",
          left: "-80px",
          top: "320px",
          width: "320px",
          height: "320px",
          borderRadius: "9999px",
          background: "rgba(47, 58, 163, 0.20)",
          filter: "blur(55px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <main style={{ ...contentStyle, position: "relative", zIndex: 1 }}>
        마이페이지 콘텐츠 영역
      </main>
    </div>
  );
}

export default Mypage;
