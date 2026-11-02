import Header from "../components/Header";

function Prescription() {
  const pageStyle = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const contentStyle = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "56px",
  };

  return (
    <div style={pageStyle}>
      <div style={{ ...contentStyle, position: "relative", zIndex: 1 }}>
        <Header />
        <main>처방전 콘텐츠 영역</main>
      </div>
    </div>
  );
}

export default Prescription;
