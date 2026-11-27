import { SparkleIcon } from "../../components/Auth_Icons";

function Signup_Divider({ label = "STUDENT REGISTRATION" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "24px 0", alignSelf: "stretch" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "stretch" }}>
        <div
          style={{
            flex: "1 0 0",
            height: "1px",
            background: "linear-gradient(90deg, rgba(83,68,52,0) 0%, rgba(83,68,52,0.6) 50%, rgba(83,68,52,0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "0 12px",
            background: "#1C1831",
          }}
        >
          <SparkleIcon />
          <span style={{ color: "#FFC174", fontFamily: '"Liberation Serif"', fontSize: "12px", lineHeight: "16px", whiteSpace: "nowrap" }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup_Divider;
