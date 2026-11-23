const defaultPrimaryIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1.33333 12C0.966667 12 0.652778 11.8694 0.391667 11.6083C0.130556 11.3472 0 11.0333 0 10.6667V1.33333C0 0.966667 0.130556 0.652778 0.391667 0.391667C0.652778 0.130556 0.966667 0 1.33333 0H10.6667C11.0333 0 11.3472 0.130556 11.6083 0.391667C11.8694 0.652778 12 0.966667 12 1.33333V10.6667C12 11.0333 11.8694 11.3472 11.6083 11.6083C11.3472 11.8694 11.0333 12 10.6667 12H1.33333ZM1.33333 10.6667H10.6667V1.33333H1.33333V10.6667ZM2 9.33333H10L7.5 6L5.5 8.66667L4 6.66667L2 9.33333Z" fill="#613B00"/>
  </svg>
);

const defaultLinkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none">
    <path d="M4.66667 12.3C3.32222 12.1333 2.20833 11.5472 1.325 10.5417C0.441667 9.53611 0 8.35556 0 7C0 6.26667 0.144444 5.56389 0.433333 4.89167C0.722222 4.21944 1.13333 3.63333 1.66667 3.13333L2.61667 4.08333C2.19444 4.46111 1.875 4.9 1.65833 5.4C1.44167 5.9 1.33333 6.43333 1.33333 7C1.33333 7.97778 1.64444 8.84167 2.26667 9.59167C2.88889 10.3417 3.68889 10.8 4.66667 10.9667V12.3ZM6 12.3V10.9667C6.96667 10.7889 7.76389 10.3278 8.39167 9.58333C9.01944 8.83889 9.33333 7.97778 9.33333 7C9.33333 5.88889 8.94444 4.94444 8.16667 4.16667C7.38889 3.38889 6.44444 3 5.33333 3H5.28333L6.01667 3.73333L5.08333 4.66667L2.75 2.33333L5.08333 0L6.01667 0.933333L5.28333 1.66667H5.33333C6.82222 1.66667 8.08333 2.18333 9.11667 3.21667C10.15 4.25 10.6667 5.51111 10.6667 7C10.6667 8.34444 10.225 9.51944 9.34167 10.525C8.45833 11.5306 7.34444 12.1222 6 12.3Z" fill="#FFC174"/>
  </svg>
);

function Button({ type = "primary", icon = null, label = "버튼", onClick }) {
  const isPrimary = type === "primary";
  const resolvedIcon = icon ?? (isPrimary ? defaultPrimaryIcon : defaultLinkIcon);

  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex",
        padding: "8px 16px",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        borderRadius: "8px",
        background: isPrimary ? "#F59E0B" : "#201C36",
        cursor: "pointer",
      }}
    >
      {/* 아이콘 컨테이너 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isPrimary ? "center" : "flex-start",
          width: isPrimary ? "12px" : "10.667px",
          height: isPrimary ? "12px" : "12.3px",
        }}
      >
        {resolvedIcon}
      </div>

      {/* 텍스트 컨테이너 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isPrimary ? "center" : "flex-start",
        }}
      >
        <span
          style={{
            color: isPrimary ? "#613B00" : "#E6DEFF",
            textAlign: "center",
            fontFamily: '"Liberation Serif"',
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: isPrimary ? 700 : 400,
            lineHeight: "24px",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default Button;
