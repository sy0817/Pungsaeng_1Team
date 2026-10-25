function Login() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "934px",
        padding: "0.25px 96px 144px 96px",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 우하단 amber 블러 */}
      <div
        style={{
          position: "absolute",
          right: "-64px",
          bottom: "-96px",
          width: "520px",
          height: "520px",
          borderRadius: "9999px",
          background: "rgba(245, 158, 11, 0.15)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      {/* 좌상단 indigo 블러 */}
      <div
        style={{
          position: "absolute",
          left: "-96px",
          top: "-128px",
          width: "640px",
          height: "640px",
          borderRadius: "9999px",
          background: "rgba(47, 58, 163, 0.20)",
          filter: "blur(65px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default Login;
