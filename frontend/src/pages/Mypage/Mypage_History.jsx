import Mypage_Card from "./Mypage_Card";
import Past_Prescription from "../../components/Past_Prescription";
import { NewTalkIcon, ArcanaSparkleIcon, ArcanaCompassIcon, ArcanaMoonIcon } from "./Mypage_Icons";

const serif = { fontFamily: '"Liberation Serif"' };
const ARCANA_ICONS = { sparkle: <ArcanaSparkleIcon />, compass: <ArcanaCompassIcon />, moon: <ArcanaMoonIcon /> };

const pageButton = { ...serif, padding: "4px 8px", borderRadius: "4px", color: "#E6DEFF", fontSize: "11px", lineHeight: "16px", letterSpacing: "0.44px" };

// 우측: 과거 처방전 히스토리
function Mypage_History({ data, onDetail, onDelete, onPrev, onNext, onNewTalk }) {
  const isFirst = data.page <= 1;
  const isLast = data.page >= data.totalPages;

  return (
    <Mypage_Card accent="#BDC2FF" title={data.title} tag={data.tag}>
      <span style={{ ...serif, color: "#D8C3AD", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.12px" }}>{data.description}</span>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignSelf: "stretch" }}>
        {data.items.map(({ id, arcanaIcon, ...item }) => (
          <Past_Prescription
            key={id}
            {...item}
            arcanaIcon={ARCANA_ICONS[arcanaIcon]}
            onDetail={() => onDetail?.(id)}
            onDelete={() => onDelete?.(id)}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", alignSelf: "stretch", paddingTop: "4px" }}>
        <span style={{ ...serif, color: "#D8C3AD", fontSize: "11px", fontWeight: 700, lineHeight: "16px", letterSpacing: "0.44px", whiteSpace: "nowrap" }}>
          페이지 {data.page} / {data.totalPages} (총 {data.total}건)
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div onClick={isFirst ? undefined : onPrev} style={{ ...pageButton, background: "#2B2741", opacity: isFirst ? 0.4 : 1, cursor: isFirst ? "default" : "pointer" }}>
            이전
          </div>
          <div onClick={isLast ? undefined : onNext} style={{ ...pageButton, background: "#36314C", opacity: isLast ? 0.4 : 1, cursor: isLast ? "default" : "pointer" }}>
            다음
          </div>
        </div>
      </div>

      {/* 새 상담 */}
      <div style={{ alignSelf: "stretch", paddingTop: "4px" }}>
        <div
          onClick={onNewTalk}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "10px 0", borderRadius: "8px", background: "#2B2741", cursor: "pointer" }}
        >
          <NewTalkIcon />
          <span style={{ ...serif, color: "#FFC174", fontSize: "13px", lineHeight: "18px", letterSpacing: "0.26px", whiteSpace: "nowrap" }}>
            새로운 학업 고민 타로 상담 시작하기
          </span>
        </div>
      </div>
    </Mypage_Card>
  );
}

export default Mypage_History;
