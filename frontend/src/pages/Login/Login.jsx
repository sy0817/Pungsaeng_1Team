import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CTA from "../../components/CTA";
import Auth_Field from "../../components/Auth_Field";
import { UserIcon, KeyIcon, EyeIcon, IdCardIcon } from "../../components/Auth_Icons";
import Login_Background from "./Login_Background";
import Login_Brand from "./Login_Brand";
import Login_Options from "./Login_Options";
import Login_SignupPrompt from "./Login_SignupPrompt";
import Error_Banner from "./Error_Banner";
import { saveUserId } from "../../utils/auth";

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!userId.trim() || !password) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    setError("");
    // TODO: 로그인 API 연동 (성공 시에만 아래 저장/이동 실행)
    saveUserId(userId.trim());
    navigate("/check");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleLogin();
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
      <Login_Background />

      {/* 카드 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "calc(50% + 0.5px)",
          transform: "translate(-50%, -50%)",
          width: "448px",
          maxWidth: "448px",
          zIndex: 1,
        }}
      >
        {/* 상단 별빛 */}
        <div
          style={{
            position: "absolute",
            top: "-24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "144px",
            height: "48px",
            borderRadius: "9999px",
            background: "rgba(255, 193, 116, 0.2)",
            filter: "blur(12px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            padding: "40px",
            borderRadius: "12px",
            background: "rgba(28, 24, 49, 0.9)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* 상단 골드 라인 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "32px",
              right: "32px",
              height: "2px",
              background: "linear-gradient(90deg, rgba(255,193,116,0) 0%, rgba(255,193,116,0.6) 50%, rgba(255,193,116,0) 100%)",
            }}
          />

          <Login_Brand />

          {error && <Error_Banner message={error} onClose={() => setError("")} />}

          {/* 폼 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", alignSelf: "stretch" }}>
            <Auth_Field
              icon={<UserIcon />}
              label="아이디"
              hint="영문, 숫자 4~16자"
              placeholder="아이디를 입력하세요 (영문, 숫자)"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={handleEnter}
              right={<IdCardIcon />}
            />

            <Auth_Field
              icon={<KeyIcon />}
              label="비밀번호"
              hint="비밀번호 찾기"
              hintType="link"
              placeholder="비밀번호를 입력하세요"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleEnter}
              hasRightPadding
              rightOffset="8px"
              right={
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ display: "flex", width: "32px", height: "32px", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer" }}
                >
                  <EyeIcon />
                </div>
              }
            />

            <Login_Options remember={remember} onRememberChange={setRemember} />

            <CTA label="로그인" width="100%" onClick={handleLogin} />
          </div>

          <Login_SignupPrompt onSignup={() => navigate("/signup")} />
        </div>
      </div>
    </div>
  );
}

export default Login;
