import Auth_Field from "../../components/Auth_Field";
import { UserIcon, DupCheckIcon, PillCheckIcon, StarIcon } from "../../components/Auth_Icons";
import Status_Pill from "./Status_Pill";
import { RED, ID_MESSAGES } from "./signupRules";

// 아이디 입력 + 중복 확인 버튼 + 결과 배지
function Signup_IdField({ value, onChange, status, onCheck }) {
  const message = status ? ID_MESSAGES[status] : null;

  return (
    <Auth_Field
      variant="signup"
      icon={<UserIcon />}
      label="아이디"
      hint="영문, 숫자 조합 6~12자"
      placeholder="아이디를 입력하세요"
      value={value}
      onChange={onChange}
      action={
        <div
          onClick={onCheck}
          style={{
            display: "flex",
            height: "44px",
            alignItems: "center",
            gap: "4px",
            padding: "0 16px",
            borderRadius: "4px",
            background: "#36314C",
            filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))",
            cursor: "pointer",
          }}
        >
          <DupCheckIcon />
          <span style={{ color: "#FFC174", fontFamily: "Pretendard", fontSize: "13px", fontWeight: 500, lineHeight: "18px", letterSpacing: "0.26px", textAlign: "center", whiteSpace: "nowrap" }}>
            중복 확인
          </span>
        </div>
      }
    >
      {message && (
        <Status_Pill color={message.ok ? "#FFC174" : RED} icon={message.ok ? <PillCheckIcon /> : <StarIcon color={RED} />}>
          {message.text}
        </Status_Pill>
      )}
    </Auth_Field>
  );
}

export default Signup_IdField;
