import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Mypage_Profile from "./Mypage_Profile";
import Mypage_Troubles from "./Mypage_Troubles";
import Mypage_Arcana from "./Mypage_Arcana";
import Mypage_History from "./Mypage_History";
import { PROFILE, STATS, TROUBLES, ARCANA, HISTORY } from "./mypageData";
import { getUserId } from "../../utils/auth";

const blur = (style) => ({ position: "absolute", borderRadius: "9999px", pointerEvents: "none", ...style });

function Mypage() {
  const navigate = useNavigate();
  const userId = getUserId() || "게스트";

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
          <Mypage_Profile userId={userId} profile={PROFILE} stats={STATS} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: "24px", alignItems: "start" }}>
            <div style={{ gridColumn: "1 / span 7", display: "flex", flexDirection: "column", gap: "24px" }}>
              <Mypage_Troubles data={TROUBLES} />
              <Mypage_Arcana userId={userId} data={ARCANA} />
            </div>
            <div style={{ gridColumn: "8 / span 5" }}>
              <Mypage_History
                data={HISTORY}
                onNewTalk={() => navigate("/check")}
                // TODO: 상세보기 / 삭제 / 페이지 이동 API 연동
                onDetail={() => navigate("/prescription")}
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
