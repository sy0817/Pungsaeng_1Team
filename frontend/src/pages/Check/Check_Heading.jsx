import { PinIcon } from "./Check_Icons";

const serif = { fontFamily: '"Liberation Serif"' };

// 페이지 상단 제목
function Check_Heading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", alignSelf: "stretch" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
        <PinIcon />
        <span style={{ ...serif, color: "#FFC174", fontSize: "13px", lineHeight: "18px", letterSpacing: "0.26px", whiteSpace: "nowrap" }}>
          풍생고 학업 고민 진단 (1단계)
        </span>
      </div>
      <h1 style={{ ...serif, margin: 0, color: "#E6DEFF", fontSize: "30px", fontWeight: 400, lineHeight: "38px", letterSpacing: "-0.45px", textAlign: "center" }}>
        오늘 마음에 걸리는 학업 고민을 골라주세요
      </h1>
      <span style={{ ...serif, color: "#D8C3AD", fontSize: "14px", lineHeight: "22px", textAlign: "center" }}>
        선택하신 과목과 학업 고민에 맞춰 맞춤 아르카나 타로 카드가 배치됩니다.
      </span>
    </div>
  );
}

export default Check_Heading;
