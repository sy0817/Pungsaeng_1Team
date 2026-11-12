import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup_Background from "./Signup_Background";
import Signup_Brand from "./Signup_Brand";
import Signup_Divider from "./Signup_Divider";
import Signup_IdField from "./Signup_IdField";
import Signup_PasswordField from "./Signup_PasswordField";
import Signup_ConfirmField from "./Signup_ConfirmField";
import Signup_Button from "./Signup_Button";
import Signup_Footer from "./Signup_Footer";
import { ID_RULE, PW_RULE } from "./signupRules";

function Signup() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [idStatus, setIdStatus] = useState(null); // null | "available" | "invalid" | "unchecked"
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const matchState = confirm ? (password === confirm ? "match" : "mismatch") : null;

  const handleIdChange = (e) => {
    setUserId(e.target.value);
    setIdStatus(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleCheckId = () => {
    // TODO: 아이디 중복 확인 API 연동
    setIdStatus(ID_RULE.test(userId) ? "available" : "invalid");
  };

  const handleSubmit = () => {
    if (idStatus !== "available") {
      setIdStatus(ID_RULE.test(userId) ? "unchecked" : "invalid");
      return;
    }
    if (!PW_RULE.test(password)) {
      setPasswordError(true);
      return;
    }
    if (password !== confirm) return;
    // TODO: 회원가입 API 연동
  };

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
      <Signup_Background />

      {/* 카드 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "448px",
          maxWidth: "448px",
          padding: "40px",
          borderRadius: "12px",
          background: "rgba(28, 24, 49, 0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Signup_Brand />
        <Signup_Divider />

        {/* 폼 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px", alignSelf: "stretch" }}>
          <Signup_IdField value={userId} onChange={handleIdChange} status={idStatus} onCheck={handleCheckId} />

          <Signup_PasswordField
            value={password}
            onChange={handlePasswordChange}
            show={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
            hasError={passwordError}
          />

          <Signup_ConfirmField
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            show={showConfirm}
            onToggle={() => setShowConfirm((prev) => !prev)}
            matchState={matchState}
          />

          <Signup_Button label="회원가입 완료" onClick={handleSubmit} />
        </div>

        <Signup_Footer onLogin={() => navigate("/login")} />
      </div>
    </div>
  );
}

export default Signup;
