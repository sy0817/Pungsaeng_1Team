import logoImg from "../../assets/logo/logo.png";
import { PortalStarIcon } from "../../components/Auth_Icons";

const center = { position: "absolute", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" };

function Signup_Brand() {
  return (
    <div style={{ position: "relative", height: "172px", width: "100%", flexShrink: 0 }}>
      {/* 로고 */}
      <div style={{ ...center, top: 0, width: "117px", height: "64px" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            background: "rgba(255, 193, 116, 0.2)",
            filter: "blur(6px)",
          }}
        />
        <img
          src={logoImg}
          alt="PSH TAROT 로고"
          style={{ position: "relative", width: "117px", height: "64px", objectFit: "contain" }}
        />
      </div>

      {/* ACADEMY ARCANA PORTAL 배지 */}
      <div
        style={{
          ...center,
          top: "76px",
          display: "flex",
          alignItems: "center",
          gap: "5.99px",
          padding: "2px 12px",
          borderRadius: "9999px",
          background: "#36314C",
        }}
      >
        <PortalStarIcon />
        <span
          style={{
            color: "#FFC174",
            fontFamily: '"Liberation Serif"',
            fontSize: "11px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: "0.55px",
            textTransform: "uppercase",
          }}
        >
          ACADEMY ARCANA PORTAL
        </span>
      </div>

      {/* 타이틀 */}
      <div
        style={{
          ...center,
          top: "108px",
          color: "#E6DEFF",
          fontFamily: '"Liberation Serif"',
          fontSize: "30px",
          fontWeight: 700,
          lineHeight: "38px",
          letterSpacing: "-0.75px",
        }}
      >
        PSH TAROT 회원가입
      </div>

      {/* 서브 타이틀 */}
      <div
        style={{
          ...center,
          top: "150px",
          color: "#D8C3AD",
          fontFamily: "Pretendard",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "22px",
        }}
      >
        풍생고 학생을 위한 맞춤형 학습 타로 솔루션
      </div>
    </div>
  );
}

export default Signup_Brand;
