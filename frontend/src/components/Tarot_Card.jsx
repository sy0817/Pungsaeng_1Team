function Tarot_Card({ image = null, label = "꿈과 목표", selected = false, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        padding: "12px",
        flexDirection: "column",
        alignItems: "center",
        gap: selected ? "1px" : "0px",
        borderRadius: "12px",
        border: selected ? "2px solid #FFC174" : "1px solid #36314C",
        background: "#2B2741",
        cursor: "pointer",
        width: "192px",
        boxShadow: selected
          ? "0 0 0 2px rgba(255, 193, 116, 0.60), 0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -2px rgba(0, 0, 0, 0.10)",
      }}
    >
      {/* 카드 이미지 */}
      <div
        style={{
          width: "170px",
          height: "250px",
          borderRadius: "10px",
          background: image
            ? `url(${image}) lightgray center / cover no-repeat`
            : "#3D3758",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!image && (
          <span style={{ color: "#6B6480", fontSize: "12px" }}>이미지</span>
        )}
      </div>

      {/* 텍스트 마진 */}
      <div
        style={{
          display: "flex",
          paddingTop: "8px",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: selected ? "#FFC174" : "#E6DEFF",
              textAlign: "center",
              fontFamily: '"Liberation Serif"',
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "18px",
              letterSpacing: "0.26px",
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Tarot_Card;
