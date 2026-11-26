import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Mypage_Profile from "./Mypage_Profile";
import Mypage_Troubles from "./Mypage_Troubles";
import Mypage_Arcana from "./Mypage_Arcana";
import Mypage_History from "./Mypage_History";
import { toProfile, toStats, toTroubles, toArcana, toHistory } from "./mypageMapper";
import { getMyStatistics, getMyPrescriptions } from "../../api/users";
import { deletePrescription } from "../../api/prescriptions";
import { getErrorMessage } from "../../api/client";
import { getUserId, getUserTitle } from "../../utils/auth";

const PAGE_SIZE = 3; // 과거 처방전은 한 페이지에 3건

const blur = (style) => ({ position: "absolute", borderRadius: "9999px", pointerEvents: "none", ...style });

// ─────────────────────────────────────────────────────────────────────────────
// [고1 담당] 내 정보 조회 API 연결 - 아래 순서대로 주석을 풀면 돼요.
//
// 프로필 배너의 "풍생고 2학년 3반", "이과 트랙" 칩은 내 정보 조회 API 로 받은 값으로 채워요.
// (값이 없으면 칩이 자동으로 숨겨져요)
//
// 1) src/api/users.js 의 getMyInfo 주석을 풀고 URL 을 명세서에 맞게 고친다.
// 2) 이 파일 맨 위 import 에 아래 한 줄을 추가한다.
//      import { getMyInfo } from "../../api/users";
// 3) 아래 [A] 블록(useState + useEffect)의 주석을 푼다.
// 4) 응답의 필드 이름에 맞게 src/pages/Mypage/mypageMapper.js 의 toProfile 안
//    myInfo?.classInfo / myInfo?.track 이름만 고친다. (예: myInfo?.grade, myInfo?.className ...)
// 5) 아래 [B] 의 `const myInfo = null;` 줄을 지운다. ([A]에서 만든 useState 의 myInfo 를 쓰기 때문)
// ─────────────────────────────────────────────────────────────────────────────

function Mypage() {
  const navigate = useNavigate();
  const userId = getUserId() || "게스트";

  const [statistics, setStatistics] = useState(null);
  const [historyPage, setHistoryPage] = useState(null); // PageResponse
  const [lastDiagnosis, setLastDiagnosis] = useState("");
  const [page, setPage] = useState(0); // 0부터 시작
  const [reloadKey, setReloadKey] = useState(0); // 삭제 후 다시 불러올 때 올림
  const [error, setError] = useState("");

  // [A] 내 정보 조회 API 연결 (고1 담당)
  // const [myInfo, setMyInfo] = useState(null);
  // useEffect(() => {
  //   getMyInfo()
  //     .then(setMyInfo)
  //     .catch(() => {}); // 실패해도 마이페이지의 나머지는 그대로 보여줌
  // }, []);

  // [B] 내 정보 조회 API 연결 전: 항상 비어 있음 -> [A] 를 풀면 이 줄을 지운다
  const myInfo = null;

  // 통계 (삭제하면 다시 불러옴)
  useEffect(() => {
    let cancelled = false;
    getMyStatistics()
      .then((data) => !cancelled && setStatistics(data))
      .catch((e) => !cancelled && setError(getErrorMessage(e, "통계를 불러오지 못했어요.")));
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  // 과거 처방전 (페이지가 바뀌거나 삭제하면 다시 불러옴)
  useEffect(() => {
    let cancelled = false;
    getMyPrescriptions({ page, size: PAGE_SIZE })
      .then((data) => {
        if (cancelled) return;
        setHistoryPage(data);
        // 가장 최근 처방전 날짜는 첫 페이지의 첫 항목
        if (page === 0) setLastDiagnosis(data.content[0]?.createdAt ?? "");
      })
      .catch((e) => !cancelled && setError(getErrorMessage(e, "처방전 목록을 불러오지 못했어요.")));
    return () => {
      cancelled = true;
    };
  }, [page, reloadKey]);

  const handleDelete = async (prescriptionId) => {
    if (!window.confirm("이 처방전을 삭제할까요? 삭제하면 되돌릴 수 없어요.")) return;
    try {
      await deletePrescription(prescriptionId);
      // 현재 페이지의 마지막 한 건을 지웠다면 이전 페이지로 이동
      if (historyPage?.content.length === 1 && page > 0) setPage(page - 1);
      setError("");
      setReloadKey((key) => key + 1);
    } catch (e) {
      setError(getErrorMessage(e, "처방전을 삭제하지 못했어요."));
    }
  };

  const profile = toProfile({
    title: getUserTitle(),
    myInfo,
    lastDiagnosis: lastDiagnosis ? lastDiagnosis.slice(0, 10).replaceAll("-", ".") : "",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "56px", width: "100%", minHeight: "100vh", background: "#141029" }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", overflow: "hidden" }}>
        {/* 배경 블러 */}
        <div
          style={blur({
            left: "47.09%",
            right: "25%",
            top: "-160px",
            height: "384px",
            background: "rgba(255, 193, 116, 0.10)",
            filter: "blur(65px)",
          })}
        />
        <div
          style={blur({
            left: "-80px",
            top: "320px",
            width: "320px",
            height: "320px",
            background: "rgba(47, 58, 163, 0.20)",
            filter: "blur(55px)",
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
            gap: "36px",
            width: "100%",
            maxWidth: "1376px",
            padding: "36px 40px 56px",
          }}
        >
          {error && (
            <div
              style={{
                alignSelf: "stretch",
                padding: "10px 16px",
                borderRadius: "8px",
                background: "rgba(251, 85, 65, 0.12)",
                color: "#FB5541",
                fontFamily: '"Liberation Serif"',
                fontSize: "13px",
                lineHeight: "18px",
              }}
            >
              {error}
            </div>
          )}

          <Mypage_Profile userId={userId} profile={profile} stats={toStats(statistics)} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: "24px", alignItems: "start" }}>
            <div style={{ gridColumn: "1 / span 7", display: "flex", flexDirection: "column", gap: "24px" }}>
              <Mypage_Troubles data={toTroubles(statistics)} />
              <Mypage_Arcana userId={userId} data={toArcana(statistics)} />
            </div>
            <div style={{ gridColumn: "8 / span 5" }}>
              <Mypage_History
                data={toHistory(historyPage, PAGE_SIZE)}
                onNewTalk={() => navigate("/check")}
                onDetail={(id) => navigate(`/prescription/${id}`)}
                onDelete={handleDelete}
                onPrev={() => setPage((p) => Math.max(p - 1, 0))}
                onNext={() => setPage((p) => p + 1)}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Mypage;
