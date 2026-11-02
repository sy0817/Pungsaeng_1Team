import Button from "./Button";

const compassIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2.75 7.25L6.25 6.25L7.25 2.75L3.75 3.75L2.75 7.25ZM5 5.75C4.79167 5.75 4.61458 5.67708 4.46875 5.53125C4.32292 5.38542 4.25 5.20833 4.25 5C4.25 4.79167 4.32292 4.61458 4.46875 4.46875C4.61458 4.32292 4.79167 4.25 5 4.25C5.20833 4.25 5.38542 4.32292 5.53125 4.46875C5.67708 4.61458 5.75 4.79167 5.75 5C5.75 5.20833 5.67708 5.38542 5.53125 5.53125C5.38542 5.67708 5.20833 5.75 5 5.75ZM5 10C4.30833 10 3.65833 9.86875 3.05 9.60625C2.44167 9.34375 1.9125 8.9875 1.4625 8.5375C1.0125 8.0875 0.65625 7.55833 0.39375 6.95C0.13125 6.34167 0 5.69167 0 5C0 4.30833 0.13125 3.65833 0.39375 3.05C0.65625 2.44167 1.0125 1.9125 1.4625 1.4625C1.9125 1.0125 2.44167 0.65625 3.05 0.39375C3.65833 0.13125 4.30833 0 5 0C5.69167 0 6.34167 0.13125 6.95 0.39375C7.55833 0.65625 8.0875 1.0125 8.5375 1.4625C8.9875 1.9125 9.34375 2.44167 9.60625 3.05C9.86875 3.65833 10 4.30833 10 5C10 5.69167 9.86875 6.34167 9.60625 6.95C9.34375 7.55833 8.9875 8.0875 8.5375 8.5375C8.0875 8.9875 7.55833 9.34375 6.95 9.60625C6.34167 9.86875 5.69167 10 5 10ZM5 9C6.10833 9 7.05208 8.61042 7.83125 7.83125C8.61042 7.05208 9 6.10833 9 5C9 3.89167 8.61042 2.94792 7.83125 2.16875C7.05208 1.38958 6.10833 1 5 1C3.89167 1 2.94792 1.38958 2.16875 2.16875C1.38958 2.94792 1 3.89167 1 5C1 6.10833 1.38958 7.05208 2.16875 7.83125C2.94792 8.61042 3.89167 9 5 9Z" fill="#BDC2FF"/>
  </svg>
);

const trashIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
    <path d="M1.75 10.5C1.42917 10.5 1.15451 10.3858 0.926042 10.1573C0.697569 9.92882 0.583333 9.65417 0.583333 9.33333V1.75H0V0.583333H2.91667V0H6.41667V0.583333H9.33333V1.75H8.75V9.33333C8.75 9.65417 8.63576 9.92882 8.40729 10.1573C8.17882 10.3858 7.90417 10.5 7.58333 10.5H1.75ZM7.58333 1.75H1.75V9.33333H7.58333V1.75ZM2.91667 8.16667H4.08333V2.91667H2.91667V8.16667ZM5.25 8.16667H6.41667V2.91667H5.25V8.16667Z" fill="#D8C3AD"/>
  </svg>
);

function Past_Prescription({
  date = "2025.02.20",
  subject = "영어",
  symptom = "단어 암기",
  title = "수능특강 영단어 누적 암기 플랜",
  arcana = "올바른 방향",
  summary = "처방 요약: 어원 중심 30개 일일 암기",
  status = "완료됨",
  onDetail,
  onDelete,
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        padding: "16px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        alignSelf: "stretch",
        borderRadius: "8px",
        background: "rgba(14, 10, 35, 0.90)",
      }}
    >
      {/* 그림자 레이어 */}
      <div
        style={{
          position: "absolute",
          width: "478px",
          height: "192px",
          borderRadius: "8px",
          background: "rgba(255, 255, 255, 0.00)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -2px rgba(0, 0, 0, 0.10)",
          pointerEvents: "none",
          top: 0,
          left: 0,
        }}
      />

      {/* 컨테이너 1 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", alignSelf: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {/* 태그 행 */}
          <div style={{ display: "flex", alignItems: "center", alignContent: "center", gap: "4px", alignSelf: "stretch", flexWrap: "wrap" }}>
            {/* 날짜 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ color: "#D8C3AD", fontFamily: '"Liberation Serif"', fontSize: "11px", fontWeight: 400, lineHeight: "16px", letterSpacing: "0.44px" }}>
                {date}
              </span>
            </div>
            {/* 과목 overlay 배지 */}
            <div style={{ display: "flex", padding: "2px 4px", flexDirection: "column", alignItems: "flex-start", borderRadius: "4px", background: "rgba(47, 58, 163, 0.40)" }}>
              <span style={{ color: "#BDC2FF", fontFamily: '"Liberation Serif"', fontSize: "11px", fontWeight: 400, lineHeight: "16px", letterSpacing: "0.44px" }}>
                {subject}
              </span>
            </div>
            {/* 고민 background 배지 */}
            <div style={{ display: "flex", padding: "2px 4px", flexDirection: "column", alignItems: "flex-start", borderRadius: "4px", background: "#2B2741" }}>
              <span style={{ color: "#D8C3AD", fontFamily: '"Liberation Serif"', fontSize: "11px", fontWeight: 400, lineHeight: "16px", letterSpacing: "0.44px" }}>
                {symptom}
              </span>
            </div>
          </div>

          {/* 제목 */}
          <div style={{ display: "flex", paddingTop: "4px", flexDirection: "column", alignItems: "flex-start", alignSelf: "stretch" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", alignSelf: "stretch" }}>
              <span style={{ alignSelf: "stretch", color: "#E6DEFF", fontFamily: '"Liberation Serif"', fontSize: "16px", fontWeight: 400, lineHeight: "24px" }}>
                {title}
              </span>
            </div>
          </div>
        </div>

        {/* Arcana 배지 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ display: "flex", padding: "2px 4px", alignItems: "center", gap: "4px", borderRadius: "4px", background: "#2B2741" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              {compassIcon}
            </div>
            <span style={{ color: "#BDC2FF", fontFamily: '"Liberation Serif"', fontSize: "11px", fontWeight: 400, lineHeight: "16px", letterSpacing: "0.44px" }}>
              {arcana}
            </span>
          </div>
        </div>
      </div>

      {/* 요약 overlay */}
      <div style={{ display: "flex", padding: "4px", flexDirection: "column", alignItems: "flex-start", alignSelf: "stretch", borderRadius: "4px", background: "rgba(43, 39, 65, 0.30)" }}>
        <span style={{ color: "#D8C3AD", fontFamily: '"Liberation Serif"', fontSize: "12px", fontWeight: 400, lineHeight: "18px", letterSpacing: "0.12px" }}>
          {summary}
        </span>
      </div>

      {/* 컨테이너 2 */}
      <div style={{ display: "flex", paddingTop: "4px", justifyContent: "space-between", alignItems: "center", alignSelf: "stretch" }}>
        {/* 상태 */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "9999px", background: "#BDC2FF" }} />
          <span style={{ color: "#D8C3AD", fontFamily: '"Liberation Serif"', fontSize: "11px", fontWeight: 400, lineHeight: "16px", letterSpacing: "0.44px" }}>
            {status}
          </span>
        </div>

        {/* 버튼 영역 */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Button type="link" label="상세보기" onClick={onDetail} />
          {/* 삭제 버튼 */}
          <div
            onClick={onDelete}
            style={{ display: "flex", padding: "4px 4px 8px 4px", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "4px", cursor: "pointer" }}
          >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
              {trashIcon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Past_Prescription;
