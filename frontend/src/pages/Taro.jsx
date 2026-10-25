function Taro() {
  const pageStyle = {
    display: "flex",
    width: "100%",
    height: "1376px",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(0deg, #141029 0%, #141029 100%), #FFF",
  };

  const innerStyle = {
    display: "flex",
    width: "1376px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "56px",
  };

  const containerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    height: "1376px",
  };

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>
        <div style={containerStyle}>
          {/* 상단 중앙 그라디언트 블러 */}
          <div
            style={{
              position: "absolute",
              left: "238px",
              top: "-128px",
              width: "900px",
              height: "550px",
              borderRadius: "9999px",
              background:
                "linear-gradient(180deg, rgba(47, 58, 163, 0.25) 0%, rgba(245, 158, 11, 0.10) 50%, rgba(245, 158, 11, 0.00) 100%)",
              filter: "blur(32px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* 좌측 amber 블러 */}
          <div
            style={{
              position: "absolute",
              left: "-128px",
              top: "522.981px",
              width: "320px",
              height: "309.926px",
              borderRadius: "9999px",
              background: "rgba(255, 193, 116, 0.10)",
              filter: "blur(20px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* 우측 lavender 블러 */}
          <div
            style={{
              position: "absolute",
              right: "-112px",
              bottom: "151.108px",
              width: "384px",
              height: "371.911px",
              borderRadius: "9999px",
              background: "rgba(189, 194, 255, 0.15)",
              filter: "blur(32px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <main style={{ position: "relative", zIndex: 1 }}>타로 콘텐츠 영역</main>
        </div>
      </div>
    </div>
  );
}

export default Taro;
