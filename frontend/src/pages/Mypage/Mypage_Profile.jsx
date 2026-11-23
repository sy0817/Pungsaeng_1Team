import { StatChartIcon, StatBookIcon, StatSparkleIcon, AvatarBadgeIcon } from "./Mypage_Icons";

const serif = { fontFamily: '"Liberation Serif"' };
const ICONS = { chart: <StatChartIcon />, book: <StatBookIcon />, sparkle: <StatSparkleIcon /> };

const chip = { ...serif, padding: "2px 4px", borderRadius: "9999px", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px", whiteSpace: "nowrap" };

function StatPill({ icon, label, value, unit, unitColor }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        borderRadius: "8px",
        background: "rgba(14, 10, 35, 0.8)",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "8px", background: "#2B2741" }}>
        {ICONS[icon]}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <span style={{ ...serif, color: "#D8C3AD", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px", whiteSpace: "nowrap" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px", whiteSpace: "nowrap" }}>
          <span style={{ ...serif, color: "#E6DEFF", fontSize: "18px", fontWeight: 700, lineHeight: "26px", letterSpacing: "-0.09px" }}>{value}</span>
          <span style={{ ...serif, color: unitColor, fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px" }}>{unit}</span>
        </div>
      </div>
    </div>
  );
}

// 상단 프로필 배너 (학생 정보 + 요약 통계)
function Mypage_Profile({ userId, profile, stats }) {
  const initial = userId.slice(0, 1).toUpperCase();

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        padding: "24px",
        borderRadius: "12px",
        background: "rgba(28, 24, 49, 0.9)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* 상단 그라디언트 바 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          opacity: 0.8,
          background: "linear-gradient(90deg, rgba(255,193,116,0) 0%, #FFC174 50%, rgba(255,193,116,0) 100%)",
        }}
      />

      {/* 학생 정보 */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ position: "relative", width: "64px", height: "64px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "9999px",
              background: "#2B2741",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
              color: "#FFC174",
              ...serif,
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            {initial}
          </div>
          <div style={{ position: "absolute", right: 0, bottom: 0, display: "flex" }}>
            <AvatarBadgeIcon />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px" }}>
            <span style={{ ...serif, color: "#E6DEFF", fontSize: "22px", lineHeight: "30px", letterSpacing: "-0.22px", whiteSpace: "nowrap" }}>{userId} 학생</span>
            <span style={{ ...chip, background: "#36314C", color: "#FFC174" }}>{profile.classInfo}</span>
            <span style={{ ...chip, background: "rgba(47, 58, 163, 0.4)", color: "#BDC2FF" }}>{profile.track}</span>
          </div>
          <div style={{ ...serif, paddingTop: "2px", color: "#D8C3AD", fontSize: "14px", lineHeight: "22px" }}>
            🔮 고교 아르카나 학습 성향: <span style={{ color: "#FFC174" }}>{profile.archetype} </span>(최근 진단: {profile.lastDiagnosis})
          </div>
        </div>
      </div>

      {/* 요약 통계 */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
        {stats.map(({ id, ...stat }) => (
          <StatPill key={id} {...stat} />
        ))}
      </div>
    </div>
  );
}

export default Mypage_Profile;
