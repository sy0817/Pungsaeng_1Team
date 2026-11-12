import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Taro_Stepper from "./Taro_Stepper";
import Taro_Heading from "./Taro_Heading";
import Taro_CardGrid from "./Taro_CardGrid";
import Taro_Result from "./Taro_Result";
import { CARDS, CARD_DETAILS, DEFAULT_CARD, DIAGNOSIS_SUMMARY } from "./taroData";

const blur = (style) => ({ position: "absolute", borderRadius: "9999px", pointerEvents: "none", ...style });

function Taro() {
  const navigate = useNavigate();
  const location = useLocation();
  const diagnosis = location.state?.diagnosis ?? DIAGNOSIS_SUMMARY; // 고민 진단 페이지에서 넘어온 선택 내용
  const [selectedLabel, setSelectedLabel] = useState(DEFAULT_CARD);
  const selectedCard = CARDS.find((card) => card.label === selectedLabel) ?? CARDS[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "56px", width: "100%", minHeight: "100vh", background: "#141029" }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", overflow: "hidden" }}>
        {/* 배경 블러 */}
        <div
          style={blur({
            left: "50%",
            top: "-128px",
            transform: "translateX(-50%)",
            width: "900px",
            height: "550px",
            background:
              "linear-gradient(180deg, rgba(47, 58, 163, 0.25) 0%, rgba(245, 158, 11, 0.10) 50%, rgba(245, 158, 11, 0) 100%)",
            filter: "blur(32px)",
          })}
        />
        <div
          style={blur({
            left: "-128px",
            top: "33.33%",
            bottom: "46.91%",
            width: "320px",
            background: "rgba(255, 193, 116, 0.10)",
            filter: "blur(20px)",
          })}
        />
        <div
          style={blur({
            right: "-112px",
            top: "66.67%",
            bottom: "9.63%",
            width: "384px",
            background: "rgba(189, 194, 255, 0.15)",
            filter: "blur(32px)",
          })}
        />

        {/* 헤더 */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1376px", padding: "20px 40px 0" }}>
          <Header />
        </div>

        {/* 본문 */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "1376px",
            padding: "36px 40px",
          }}
        >
          <Taro_Stepper diagnosis={diagnosis} onEdit={() => navigate("/check")} />
          <Taro_Heading />
          <Taro_CardGrid cards={CARDS} selected={selectedLabel} onSelect={setSelectedLabel} />
          <Taro_Result
            card={selectedCard}
            detail={CARD_DETAILS[selectedCard.label]}
            onPrescription={() => navigate("/prescription")}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Taro;
