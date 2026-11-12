import { WandLargeIcon, ArrowLargeIcon } from "./Check_Icons";

const serif = { fontFamily: '"Liberation Serif"' };

// 타로 카드 뽑으러 가기 버튼 + 안내 문구
function Check_Submit({ onSubmit, error }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", alignSelf: "stretch", padding: "16px 0" }}>
      <div
        onClick={onSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "16px 56px",
          borderRadius: "12px",
          background: "#F59E0B",
          filter: "drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))",
          cursor: "pointer",
        }}
      >
        <WandLargeIcon />
        <span style={{ ...serif, color: "#613B00", fontSize: "22px", lineHeight: "30px", letterSpacing: "-0.22px", whiteSpace: "nowrap" }}>
          타로 카드 뽑으러 가기
        </span>
        <ArrowLargeIcon />
      </div>

      <span style={{ ...serif, color: error ? "#FB5541" : "#D8C3AD", fontSize: "12px", lineHeight: "16px", whiteSpace: "nowrap" }}>
        {error || "선택하신 과목과 고민에 맞춰 22장의 메이저 아르카나가 자동 추천됩니다."}
      </span>
    </div>
  );
}

export default Check_Submit;
