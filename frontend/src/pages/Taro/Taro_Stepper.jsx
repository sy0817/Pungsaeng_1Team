import { PortalStarIcon } from "../../components/Auth_Icons";
import { PencilIcon } from "./Taro_Icons";

const serif = { fontFamily: '"Liberation Serif"', whiteSpace: "nowrap" };

// 단계 안내 + 선택한 진단 요약
function Taro_Stepper({ step = "2단계 : 운명의 아르카나 조우", diagnosis, onEdit }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "16px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px 7.99px" }}>
        {/* 단계 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3.99px",
            padding: "4px 16px",
            borderRadius: "9999px",
            background: "rgba(43, 39, 65, 0.8)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <PortalStarIcon />
          <span style={{ ...serif, color: "#FFC174", fontSize: "13px", lineHeight: "18px", letterSpacing: "0.26px" }}>{step}</span>
        </div>

        {/* 선택한 진단 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 16px",
            borderRadius: "9999px",
            background: "#1C1831",
            filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))",
          }}
        >
          <span style={{ ...serif, color: "#D8C3AD", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px" }}>선택한 진단:</span>
          <span style={{ ...serif, color: "#E0E0FF", fontSize: "13px", lineHeight: "18px", letterSpacing: "-0.325px" }}>{diagnosis}</span>
          <div onClick={onEdit} style={{ display: "flex", alignItems: "center", paddingLeft: "4px", cursor: "pointer" }}>
            <PencilIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Taro_Stepper;
