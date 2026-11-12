import Auth_Field from "../../components/Auth_Field";
import { ConfirmIcon, StarIcon } from "../../components/Auth_Icons";
import Signup_EyeToggle from "./Signup_EyeToggle";
import Status_Pill from "./Status_Pill";
import { RED } from "./signupRules";

// 비밀번호 확인 + 일치 여부 배지 (matchState: null | "match" | "mismatch")
function Signup_ConfirmField({ value, onChange, show, onToggle, matchState }) {
  const isMatch = matchState === "match";
  const color = isMatch ? "#FFC174" : RED;

  return (
    <Auth_Field
      variant="signup"
      icon={<ConfirmIcon />}
      label="비밀번호 확인"
      placeholder="비밀번호를 다시 입력하세요"
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      hasRightPadding
      rightOffset="9.5px"
      right={<Signup_EyeToggle onToggle={onToggle} />}
    >
      {matchState && (
        <Status_Pill color={color} icon={<StarIcon color={color} />}>
          {isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
        </Status_Pill>
      )}
    </Auth_Field>
  );
}

export default Signup_ConfirmField;
