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
import Status_Pill from "./Status_Pill";
import { StarIcon } from "../../components/Auth_Icons";
import { ID_RULE, PW_RULE, RED } from "./signupRules";
import { checkLoginId, signup } from "../../api/auth";
import { getErrorCode, getErrorMessage } from "../../api/client";

function Signup() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [idStatus, setIdStatus] = useState(null); // null | "available" | "invalid" | "unchecked" | "taken" | "error"
  const [submitError, setSubmitError] = useState(""); // 회원가입 요청이 실패했을 때 서버가 준 문구
  const [loading, setLoading] = useState(false);
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

  const handleCheckId = async () => {
    if (!ID_RULE.test(userId)) {
      setIdStatus("invalid");
      return;
    }
    try {
      const { available } = await checkLoginId(userId);
      setIdStatus(available ? "available" : "taken");
    } catch {
      setIdStatus("error");
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    setSubmitError("");

    if (idStatus !== "available") {
      setIdStatus(ID_RULE.test(userId) ? "unchecked" : "invalid");
      return;
    }
    if (!PW_RULE.test(password)) {
      setPasswordError(true);
      return;
    }
    if (password !== confirm) return;

    setLoading(true);
    try {
      await signup({ loginId: userId, password, passwordConfirm: confirm });
      navigate("/login"); // 가입 완료 -> 로그인 화면으로
    } catch (e) {
      if (getErrorCode(e) === "USER001") setIdStatus("taken"); // 그 사이 다른 사람이 같은 아이디로 가입
      else setSubmitError(getErrorMessage(e, "회원가입에 실패했어요. 잠시 후 다시 시도해주세요."));
    } finally {
      setLoading(false);
    }
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

          {submitError && (
            <Status_Pill color={RED} icon={<StarIcon color={RED} />}>
              {submitError}
            </Status_Pill>
          )}

          <Signup_Button label={loading ? "가입 중..." : "회원가입 완료"} onClick={handleSubmit} />
        </div>

        <Signup_Footer onLogin={() => navigate("/login")} />
      </div>
    </div>
  );
}

export default Signup;
