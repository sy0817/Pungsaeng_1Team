const text = { fontFamily: "Pretendard", fontWeight: 500, fontSize: "12px", whiteSpace: "nowrap" };

// 아이디 저장 체크박스 + 보안 안내
function Login_Options({ remember, onRememberChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch", padding: "4px 0 12px" }}>
      <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => onRememberChange(e.target.checked)}
          style={{ width: "16px", height: "16px", margin: 0, accentColor: "#F59E0B" }}
        />
        <span style={{ ...text, paddingLeft: "8px", color: "#D8C3AD", lineHeight: "18px", letterSpacing: "0.12px" }}>아이디 저장</span>
      </label>

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "9999px", background: "rgba(255, 193, 116, 0.7)" }} />
        <span style={{ ...text, color: "rgba(160, 142, 122, 0.6)", lineHeight: "16px" }}>학생 전용 보안 암호화</span>
      </div>
    </div>
  );
}

export default Login_Options;
