import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Prescription_Intro from "./Prescription_Intro";
import Prescription_Card from "./Prescription_Card";
import Prescription_Summary from "./Prescription_Summary";
import Prescription_Plan from "./Prescription_Plan";
import Prescription_Toolbar from "./Prescription_Toolbar";
import { toViewModel } from "./prescriptionMapper";
import { getUserId } from "../../utils/auth";

// ─────────────────────────────────────────────────────────────────────────────
// [고1 담당] 처방 결과 조회 API 연결 - 아래 순서대로 주석을 풀면 돼요.
//
// 지금은 "타로 카드 선택 -> 처방전 보러 가기" 로 들어왔을 때만 보여줘요. (그때 받은 처방전을 location.state 로 넘겨 받음)
// 주소창에 /prescription/12 처럼 직접 들어오거나 마이페이지 "상세보기"로 들어오면
// state 가 없어서 빈 화면 안내가 나와요. 그때 서버에서 처방전을 불러오도록 만드는 작업이에요.
//
// 1) src/api/prescriptions.js 의 getPrescription 주석을 풀고 URL 을 명세서에 맞게 고친다.
// 2) 이 파일 맨 위 import 를 아래처럼 바꾼다.
//      import { useEffect, useState } from "react";
//      import { useLocation, useNavigate, useParams } from "react-router-dom";
//      import { getPrescription } from "../../api/prescriptions";
//      import { getErrorMessage } from "../../api/client";
// 3) 아래 [A] 블록 주석을 푼다. (함수 안, const location 아래)
// 4) [B] 한 줄(const source = ...)을 주석 처리하고, 대신 [C] 한 줄 주석을 푼다.
// 5) 불러오는 중/에러 문구가 필요하면 loading, loadError 를 화면에 보여준다. (Prescription_Empty 에 message 로 넘기면 편해요)
// ─────────────────────────────────────────────────────────────────────────────

// 처방전을 보여줄 수 없을 때의 안내 화면
function Prescription_Empty({ message, onCheck }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "64px 25px",
        borderRadius: "12px",
        border: "1px solid rgba(83, 68, 52, 0.3)",
        background: "#1C1831",
      }}
    >
      <span style={{ fontFamily: '"Liberation Serif"', color: "#E6DEFF", fontSize: "18px", lineHeight: "26px" }}>{message}</span>
      <div
        onClick={onCheck}
        style={{ padding: "10px 24px", borderRadius: "8px", background: "#F59E0B", cursor: "pointer" }}
      >
        <span style={{ fontFamily: '"Liberation Serif"', color: "#613B00", fontSize: "14px", lineHeight: "20px", whiteSpace: "nowrap" }}>
          고민 진단하러 가기
        </span>
      </div>
    </div>
  );
}

function Prescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = getUserId() || "게스트";

  // [A] 처방 결과 조회 API 연결 (고1 담당)
  // const { prescriptionId } = useParams();
  // const [fetched, setFetched] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [loadError, setLoadError] = useState("");
  // useEffect(() => {
  //   if (location.state?.prescription || !prescriptionId) return; // 이미 받아 온 처방전이 있으면 호출 안 함
  //   setLoading(true);
  //   getPrescription(prescriptionId)
  //     .then(setFetched)
  //     .catch((e) => setLoadError(getErrorMessage(e, "처방전을 불러오지 못했어요.")))
  //     .finally(() => setLoading(false));
  // }, [prescriptionId, location.state]);

  // [B] 지금: 처방전 생성 직후 넘어온 값만 사용
  const source = location.state?.prescription ?? null;
  // [C] 조회 API 연결 후: 위 [B] 대신 이 줄을 사용
  // const source = location.state?.prescription ?? fetched;

  const data = source ? toViewModel(source) : null;

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
          {data ? (
            <>
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
            </>
          ) : (
            <Prescription_Empty message="표시할 처방전이 없어요. 고민 진단부터 시작해 주세요." onCheck={() => navigate("/check")} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Prescription;
