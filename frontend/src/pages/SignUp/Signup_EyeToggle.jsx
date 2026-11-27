import { EyeLargeIcon } from "../../components/Auth_Icons";

// 비밀번호 표시/숨김 버튼
function Signup_EyeToggle({ onToggle }) {
  return (
    <div onClick={onToggle} style={{ display: "flex", padding: "4px", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      <EyeLargeIcon />
    </div>
  );
}

export default Signup_EyeToggle;
