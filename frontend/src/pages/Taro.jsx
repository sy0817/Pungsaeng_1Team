import Title from "../components/Title";

function Taro() {
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    fontSize: "18px",
  };

  return (
    <div style={pageStyle}>
      <Title />
      <main style={contentStyle}>타로 콘텐츠 영역</main>
    </div>
  );
}

export default Taro;
