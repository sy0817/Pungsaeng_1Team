function Detail_Tab({ label = "공통수학 1", selected = false, onClick, width = "84px" }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        paddingTop: "1px",
        flexDirection: "column",
        alignItems: "flex-start",
        width,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "4px 16px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          background: selected ? "#36314C" : "#201C36",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            color: selected ? "#FFC32D" : "#D8C3AD",
            fontFamily: '"Liberation Serif"',
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "16px",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default Detail_Tab;
