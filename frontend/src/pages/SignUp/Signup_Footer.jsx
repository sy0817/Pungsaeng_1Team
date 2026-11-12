import { ArrowIcon } from "../../components/Auth_Icons";

function Signup_Footer({ onLogin }) {
  return (
    <>
      {/* 로그인 이동 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: "32px", alignSelf: "stretch" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "21px",
            alignSelf: "stretch",
            borderTop: "1px solid rgba(83, 68, 52, 0.3)",
          }}
        >
          <span style={{ color: "#D8C3AD", fontFamily: "Pretendard", fontSize: "12px", fontWeight: 500, lineHeight: "18px", letterSpacing: "0.12px", whiteSpace: "nowrap" }}>
            이미 계정이 있으신가요?
          </span>

          <div onClick={onLogin} style={{ display: "flex", alignItems: "center", gap: "3.99px", cursor: "pointer" }}>
            <span
              style={{
                color: "#FFC174",
                fontFamily: "Pretendard",
                fontSize: "13px",
                fontWeight: 500,
                lineHeight: "18px",
                letterSpacing: "0.26px",
                whiteSpace: "nowrap",
                textDecoration: "underline",
                textDecorationColor: "rgba(255, 193, 116, 0.4)",
                textDecorationThickness: "1px",
              }}
            >
              로그인 화면으로 이동
            </span>
            <ArrowIcon />
          </div>
        </div>
      </div>

      {/* 하단 문구 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: "16px", alignSelf: "stretch" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "5px 0 3px", alignSelf: "stretch" }}>
          <span
            style={{
              color: "#A08E7A",
              fontFamily: '"Liberation Serif"',
              fontSize: "11px",
              fontWeight: 700,
              lineHeight: "16px",
              letterSpacing: "0.55px",
              textAlign: "center",
            }}
          >
            POONGSAENG HIGH SCHOOL • TAROT COUNSELING SYSTEM
          </span>
        </div>
      </div>
    </>
  );
}

export default Signup_Footer;
