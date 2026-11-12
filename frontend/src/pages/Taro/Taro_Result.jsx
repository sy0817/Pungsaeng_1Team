import { StarIcon } from "../../components/Auth_Icons";
import { BulbIcon, IdeaIcon, ClipboardIcon, ArrowRightIcon } from "./Taro_Icons";

const serif = { fontFamily: '"Liberation Serif"' };

function Insight({ icon, label, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        padding: "8px",
        alignSelf: "stretch",
        borderRadius: "12px",
        background: "rgba(28, 24, 49, 0.7)",
      }}
    >
      <div style={{ display: "flex", flexShrink: 0 }}>{icon}</div>
      <div style={{ ...serif, fontSize: "14px", lineHeight: "22px", color: "#D8C3AD", paddingRight: "10px" }}>
        <span style={{ color: "#E6DEFF" }}>{label}</span> {children}
      </div>
    </div>
  );
}

// 선택된 카드의 해석 패널
function Taro_Result({ card, detail = {}, onPrescription }) {
  const { arcana = "ARCANA", description, match, quote, status, advice } = detail;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "36px",
        width: "100%",
        maxWidth: "1024px",
        boxSizing: "border-box",
        padding: "25px",
        borderRadius: "16px",
        border: "1px solid #2B2741",
        background: "rgba(32, 28, 54, 0.6)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* 좌측: 카드 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "288px" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "1px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 193, 116, 0.3)",
            background: "#0E0A23",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
          }}
        >
          <img src={card.image} alt={card.label} style={{ display: "block", width: "100%", height: "387px", borderRadius: "10px", objectFit: "cover" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "17px" }}>
          <span style={{ ...serif, color: "#FFC174", fontSize: "11px", fontWeight: 700, lineHeight: "16px", letterSpacing: "1.1px", textTransform: "uppercase" }}>
            {arcana}
          </span>
          <span style={{ ...serif, color: "#E6DEFF", fontSize: "18px", lineHeight: "26px", letterSpacing: "-0.09px", paddingTop: "3px" }}>
            {card.label}
          </span>
          {description && (
            <span style={{ ...serif, color: "#D8C3AD", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px", textAlign: "center" }}>
              {description}
            </span>
          )}
        </div>
      </div>

      {/* 우측: 해석 */}
      <div style={{ display: "flex", flex: "1 0 0", minWidth: 0, flexDirection: "column", alignItems: "flex-start" }}>
        {/* 배지 + 일치율 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", alignSelf: "stretch", paddingBottom: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 16px",
              borderRadius: "9999px",
              background: "#F59E0B",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
            }}
          >
            <StarIcon color="#613B00" />
            <span style={{ ...serif, color: "#613B00", fontSize: "13px", lineHeight: "18px", letterSpacing: "0.26px", whiteSpace: "nowrap" }}>
              오늘의 선택된 통찰
            </span>
          </div>
          {match && (
            <span style={{ ...serif, color: "#D8C3AD", fontSize: "11px", fontWeight: 700, lineHeight: "16px", letterSpacing: "0.44px", whiteSpace: "nowrap" }}>
              일치율 {match}
            </span>
          )}
        </div>

        {/* 인용 문구 */}
        <div style={{ paddingTop: "4px", alignSelf: "stretch" }}>
          <div style={{ ...serif, color: "#E6DEFF", fontSize: "30px", lineHeight: "38px", letterSpacing: "-0.75px", wordBreak: "keep-all" }}>
            {quote ?? `"${card.label}"`}
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ height: "33px", padding: "16px 0", alignSelf: "stretch" }}>
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, rgba(255,193,116,0.6) 0%, rgba(160,142,122,0.3) 50%, rgba(160,142,122,0) 100%)",
            }}
          />
        </div>

        {/* 해석 */}
        {(status || advice) && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignSelf: "stretch", paddingBottom: "24px" }}>
            {status && (
              <Insight icon={<BulbIcon />} label="현재 학업 상태:">
                {status}
              </Insight>
            )}
            {advice && (
              <Insight icon={<IdeaIcon />} label="아르카나의 권고:">
                {advice}
              </Insight>
            )}
          </div>
        )}

        {/* 처방전 이동 */}
        <div
          onClick={onPrescription}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            alignSelf: "stretch",
            minWidth: "200px",
            padding: "14px 36px",
            borderRadius: "12px",
            background: "linear-gradient(90deg, #F59E0B 0%, #E0A800 100%)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
        >
          <ClipboardIcon />
          <span style={{ ...serif, color: "#613B00", fontSize: "16px", lineHeight: "24px", whiteSpace: "nowrap" }}>처방전 보러 가기</span>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
}

export default Taro_Result;
