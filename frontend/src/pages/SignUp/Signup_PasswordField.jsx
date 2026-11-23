import Auth_Field from "../../components/Auth_Field";
import { LockIcon } from "../../components/Auth_Icons";
import Signup_EyeToggle from "./Signup_EyeToggle";
import { RED } from "./signupRules";

// 비밀번호 입력
function Signup_PasswordField({ value, onChange, show, onToggle, hasError }) {
  return (
    <Auth_Field
      variant="signup"
      icon={<LockIcon />}
      label="비밀번호"
      hint="8자 이상 + 영문, 숫자, 특수문자 조합"
      hintFont="sans"
      hintColor={hasError ? RED : undefined}
      placeholder="비밀번호를 입력하세요"
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      hasRightPadding
      rightOffset="9.5px"
      right={<Signup_EyeToggle onToggle={onToggle} />}
    />
  );
}

export default Signup_PasswordField;
