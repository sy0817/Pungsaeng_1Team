import { ErrorIcon, CloseIcon } from "../../components/Auth_Icons";

function Error_Banner({ title = "인증 오류", message, onClose }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "12px",
        alignSelf: "stretch",
        borderRadius: "8px",
        background: "rgba(147, 0, 10, 0.8)",
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <ErrorIcon />
      </div>

      <div style={{ display: "flex", flex: "1 0 0", minWidth: 0, flexDirection: "column", gap: "1px", paddingLeft: "12px" }}>
        <span style={{ color: "#FFB4AB", fontFamily: "Pretendard", fontSize: "12px", fontWeight: 500, lineHeight: "15px" }}>
          {title}
        </span>
        <span
          style={{
            color: "#E6DEFF",
            fontFamily: "Pretendard",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "19.5px",
            letterSpacing: "0.12px",
          }}
        >
          {message}
        </span>
      </div>

      <div style={{ paddingLeft: "12px" }}>
        <div
          onClick={onClose}
          style={{
            display: "flex",
            padding: "4px 4px 8px 4px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

export default Error_Banner;
