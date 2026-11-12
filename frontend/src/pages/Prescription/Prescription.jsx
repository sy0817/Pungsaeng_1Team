import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Prescription_Intro from "./Prescription_Intro";
import Prescription_Card from "./Prescription_Card";
import Prescription_Summary from "./Prescription_Summary";
import Prescription_Plan from "./Prescription_Plan";
import Prescription_Toolbar from "./Prescription_Toolbar";
import { PRESCRIPTION } from "./prescriptionData";
import { getUserId } from "../../utils/auth";

function Prescription() {
  const navigate = useNavigate();
  const data = PRESCRIPTION;
  const userId = getUserId() || "게스트";

  const handleSave = () => {
    // TODO: 처방전 이미지(PNG) 저장 기능 연동
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "56px", width: "100%", minHeight: "100vh", background: "#141029" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingBottom: "219px" }}>
        {/* 헤더 */}
        <div style={{ width: "100%", maxWidth: "1376px", padding: "20px 40px 0" }}>
          <Header />
        </div>

        {/* 본문 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "36px",
            width: "100%",
            maxWidth: "1376px",
            padding: "36px 40px",
          }}
        >
          <Prescription_Intro userId={userId} keyword={data.keyword} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: "24px", alignItems: "start" }}>
            <div style={{ gridColumn: "1 / span 5" }}>
              <Prescription_Card card={data.card} />
            </div>
            <div style={{ gridColumn: "6 / span 7", display: "flex", flexDirection: "column", gap: "16px" }}>
              <Prescription_Summary subject={data.subject} problem={data.problem} core={data.core} />
              <Prescription_Plan actions={data.actions} />
            </div>
          </div>

          <Prescription_Toolbar
            onSave={handleSave}
            onRetry={() => navigate("/check")}
            onMypage={() => navigate("/mypage")}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Prescription;
