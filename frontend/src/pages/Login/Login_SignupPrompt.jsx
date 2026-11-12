import { ArrowIcon } from "../../components/Auth_Icons";

const text = { fontFamily: "Pretendard", fontWeight: 500, whiteSpace: "nowrap" };

// 하단 회원가입 안내
function Login_SignupPrompt({ onSignup }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        paddingTop: "32px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "40px",
          right: "40px",
          height: "1px",
          background: "linear-gradient(90deg, rgba(83,68,52,0) 0%, rgba(83,68,52,0.5) 50%, rgba(83,68,52,0) 100%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "5.99px" }}>
        <span style={{ ...text, color: "#D8C3AD", fontSize: "14px", lineHeight: "22px" }}>아직 계정이 없으신가요?</span>
        <div onClick={onSignup} style={{ display: "flex", alignItems: "center", gap: "2px", cursor: "pointer" }}>
          <span style={{ ...text, color: "#FFC174", fontSize: "16px", lineHeight: "24px" }}>회원가입 하러가기</span>
          <ArrowIcon />
        </div>
      </div>

      <div style={{ paddingTop: "8px" }}>
        <span style={{ ...text, color: "rgba(160, 142, 122, 0.7)", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px" }}>
          풍생고등학교 재학생은 학번 인증을 통해 가입할 수 있습니다.
        </span>
      </div>
    </div>
  );
}

export default Login_SignupPrompt;
