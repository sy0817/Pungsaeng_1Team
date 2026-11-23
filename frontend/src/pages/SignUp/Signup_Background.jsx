const blur = (style) => ({ position: "absolute", borderRadius: "9999px", pointerEvents: "none", ...style });

// 배경 블러 + 장식용 기울어진 카드 그림자
function Signup_Background() {
  return (
    <>
      <div
        style={blur({
          left: "-96px",
          top: "-128px",
          width: "640px",
          height: "640px",
          background: "rgba(47, 58, 163, 0.20)",
          filter: "blur(65px)",
        })}
      />
      <div
        style={blur({
          right: "-64px",
          bottom: "-96px",
          width: "520px",
          height: "520px",
          background: "rgba(245, 158, 11, 0.15)",
          filter: "blur(60px)",
        })}
      />
      <div
        style={blur({
          right: "-75.94px",
          top: "35.67%",
          bottom: "35.67%",
          width: "311.881px",
          transform: "rotate(5.91deg) skewX(-0.18deg)",
          borderRadius: "12px",
          opacity: 0.2,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        })}
      />
    </>
  );
}

export default Signup_Background;
