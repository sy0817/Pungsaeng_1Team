// 로그인/회원가입 입력 필드 (상태는 페이지에서 관리)
const VARIANTS = {
  login: {
    height: "48px",
    radius: "8px",
    padding: "15px 16px",
    paddingWithRight: "15px 48px 15px 16px",
    labelColor: "#D8C3AD",
    hintColor: "rgba(160, 142, 122, 0.8)",
    labelIconGap: "4px", // 아이콘-라벨 간격(패딩)
    inputPadding: "1px 0 2px",
  },
  signup: {
    height: "44px",
    radius: "4px",
    padding: "14px 16px",
    paddingWithRight: "14px 44px 14px 16px",
    labelColor: "#E6DEFF",
    hintColor: "#D8C3AD",
    labelIconGap: "6px",
    inputPadding: "0 0 1px",
  },
};

function Auth_Field({
  variant = "login", // "login" | "signup"
  icon,
  label,
  hint,
  hintType = "text", // "text" | "link"
  hintFont, // "serif" | "sans" (기본: text=serif, link=sans)
  hintColor, // 힌트 색 직접 지정 (예: 오류 시 빨강)
  onHintClick,
  type = "text",
  value,
  placeholder,
  onChange,
  onKeyDown,
  right,
  rightOffset = "14px",
  hasRightPadding = false,
  action, // 인풋 옆 버튼 (예: 중복 확인)
  children, // 인풋 아래 영역 (예: 상태 배지)
}) {
  const v = VARIANTS[variant] ?? VARIANTS.login;
  const serifHint = (hintFont ?? (hintType === "link" ? "sans" : "serif")) === "serif";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px", alignSelf: "stretch" }}>
      {/* 라벨 행 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch" }}>
        <div style={{ display: "flex", alignItems: "center", gap: variant === "signup" ? v.labelIconGap : 0 }}>
          {icon}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingLeft: variant === "signup" ? 0 : v.labelIconGap,
            }}
          >
            <span
              style={{
                color: v.labelColor,
                fontFamily: "Pretendard",
                fontSize: "13px",
                fontWeight: 500,
                lineHeight: "18px",
                letterSpacing: "0.26px",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </div>
        </div>

        {hint && (
          <div
            onClick={hintType === "link" ? onHintClick : undefined}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              cursor: hintType === "link" ? "pointer" : "default",
            }}
          >
            <span
              style={{
                color: hintColor ?? (hintType === "link" ? "#BDC2FF" : v.hintColor),
                fontFamily: serifHint ? '"Liberation Serif"' : "Pretendard",
                fontSize: "11px",
                fontWeight: serifHint ? 700 : 500,
                lineHeight: "16px",
                letterSpacing: "0.44px",
                whiteSpace: "nowrap",
              }}
            >
              {hint}
            </span>
          </div>
        )}
      </div>

      {/* 인풋 (+ 옆 버튼) */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", alignSelf: "stretch" }}>
        <div style={{ position: "relative", display: "flex", flex: "1 0 0", minWidth: 0, flexDirection: "column", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              height: v.height,
              width: "100%",
              padding: hasRightPadding ? v.paddingWithRight : v.padding,
              alignItems: "flex-start",
              borderRadius: v.radius,
              background: "#0E0A23",
              boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
              overflow: "hidden",
            }}
          >
            <input
              className="auth-input"
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              onKeyDown={onKeyDown}
              style={{ padding: v.inputPadding }}
            />
          </div>

          {right && (
            <div style={{ position: "absolute", right: rightOffset, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
              {right}
            </div>
          )}
        </div>

        {action}
      </div>

      {children}
    </div>
  );
}

export default Auth_Field;
