import { DecoIcon } from "../../components/Auth_Icons";

const blur = (style) => ({ position: "absolute", borderRadius: "9999px", pointerEvents: "none", ...style });

const centerX = { position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" };

// 배경 블러 + 상/하단 장식 문구
function Login_Background() {
  return (
    <>
      <div
        style={blur({
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "768px",
          height: "768px",
          background: "rgba(28, 24, 49, 0.6)",
          filter: "blur(60px)",
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
          left: "-96px",
          top: "-128px",
          width: "640px",
          height: "640px",
          background: "rgba(47, 58, 163, 0.20)",
          filter: "blur(65px)",
        })}
      />

      {/* 상단 문구 */}
      <div style={{ ...centerX, top: "48px" }}>
        <DecoIcon />
        <span
          style={{
            color: "rgba(189, 194, 255, 0.4)",
            fontFamily: '"Liberation Serif"',
            fontSize: "11px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: "1.1px",
            textTransform: "uppercase",
          }}
        >
          ARCANA ACADEMIC GUIDANCE SYSTEM
        </span>
      </div>

      {/* 하단 문구 */}
      <div
        style={{
          ...centerX,
          bottom: "40.5px",
          color: "rgba(160, 142, 122, 0.5)",
          fontFamily: '"Liberation Serif"',
          fontSize: "11px",
          fontWeight: 700,
          lineHeight: "16px",
          letterSpacing: "0.55px",
        }}
      >
        <span>CONSTELLATION v2.4</span>
        <span style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#FFC174" }} />
        <span>SECURITY SECURED</span>
      </div>
    </>
  );
}

export default Login_Background;
