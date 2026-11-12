const serif = { fontFamily: '"Liberation Serif"', color: "#D8C3AD", whiteSpace: "nowrap" };

function Footer() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "36px 0", width: "100%", background: "#0E0A23" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1376px",
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        {/* 좌측: 브랜드 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: '"Liberation Serif"', color: "#FFC174", fontSize: "16px", fontWeight: 700, lineHeight: "24px", whiteSpace: "nowrap" }}>
              PSH TAROT
            </span>
            <span style={{ ...serif, fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px" }}>풍생고등학교 학생 맞춤형 학업 코칭 아르카나</span>
          </div>
          <span style={{ ...serif, fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px" }}>
            시험 불안 · 과목 슬럼프 · 진로 진학 고민을 신비로운 타로 통찰과 과학적 학습 처방으로 해결합니다.
          </span>
        </div>

        {/* 우측: 링크 */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <span style={{ ...serif, fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px" }}>학습 상담 센터</span>
          <span style={{ ...serif, fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px" }}>이용 가이드</span>
          <span style={{ ...serif, fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px" }}>
            © 2025 풍생고등학교 학업상담실. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
