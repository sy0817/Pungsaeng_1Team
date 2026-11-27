import logoImg from "../../assets/logo/logo.png";
import { StarIcon } from "../../components/Auth_Icons";

const center = { position: "absolute", left: "50%", transform: "translateX(-50%)" };

function Login_Brand() {
  return (
    <div style={{ position: "relative", height: "172px", width: "100%", flexShrink: 0 }}>
      {/* 로고 */}
      <div style={{ ...center, top: 0 }}>
        <div style={{ position: "relative", width: "112px", height: "64px" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              background: "rgba(255, 193, 116, 0.2)",
              filter: "blur(8px)",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              width: "112px",
              height: "64px",
              padding: "4px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              background: "rgba(14, 10, 35, 0.8)",
              boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <img src={logoImg} alt="PSH TAROT 로고" style={{ maxWidth: "102px", maxHeight: "56px", objectFit: "contain" }} />
          </div>
        </div>
      </div>

      {/* COSMIC GUIDANCE */}
      <div style={{ ...center, top: "76px", display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
        <StarIcon />
        <span
          style={{
            color: "#FFC174",
            fontFamily: '"Liberation Serif"',
            fontSize: "12px",
            lineHeight: "16px",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}
        >
          COSMIC GUIDANCE
        </span>
        <StarIcon />
      </div>

      {/* 타이틀 */}
      <div
        style={{
          ...center,
          top: "100px",
          color: "#E6DEFF",
          fontFamily: '"Liberation Serif"',
          fontSize: "30px",
          fontWeight: 700,
          lineHeight: "38px",
          letterSpacing: "-0.75px",
          whiteSpace: "nowrap",
        }}
      >
        PSH TAROT
      </div>

      {/* 서브 타이틀 */}
      <div
        style={{
          ...center,
          top: "142px",
          color: "#BDC2FF",
          fontFamily: "Pretendard",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "22px",
          whiteSpace: "nowrap",
        }}
      >
        풍생고 학습 고민 솔루션
      </div>
    </div>
  );
}

export default Login_Brand;
