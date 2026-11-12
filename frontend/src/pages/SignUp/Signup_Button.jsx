import { WandIcon } from "../../components/Auth_Icons";

function Signup_Button({ label = "회원가입 완료", onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        height: "48px",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        alignSelf: "stretch",
        borderRadius: "4px",
        background: "linear-gradient(90deg, #F59E0B 0%, #FFC174 50%, #F59E0B 100%)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
    >
      <WandIcon />
      <span
        style={{
          color: "#472A00",
          textAlign: "center",
          fontFamily: "Pretendard",
          fontSize: "22px",
          fontWeight: 500,
          lineHeight: "30px",
          letterSpacing: "-0.55px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default Signup_Button;
