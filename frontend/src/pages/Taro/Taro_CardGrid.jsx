import Tarot_Card from "../../components/Tarot_Card";
import { HandIcon } from "./Taro_Icons";

// 안내 문구 + 5열 카드 그리드
function Taro_CardGrid({ cards, selected, onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "1024px", padding: "16px 0" }}>
      {/* 안내 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", paddingBottom: "16px", alignSelf: "stretch" }}>
        <HandIcon />
        <span
          style={{
            color: "#FFC174",
            fontFamily: '"Liberation Serif"',
            fontSize: "13px",
            lineHeight: "18px",
            letterSpacing: "0.26px",
            whiteSpace: "nowrap",
          }}
        >
          아래 10장의 신비로운 카드 중 직관이 이끄는 1장을 클릭하세요
        </span>
      </div>

      {/* 카드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: "16px",
          alignItems: "start",
          justifyItems: "center",
          alignSelf: "stretch",
          paddingBottom: "36px",
        }}
      >
        {cards.map((card) => (
          <Tarot_Card
            key={card.label}
            label={card.label}
            image={card.image}
            selected={selected === card.label}
            onClick={() => onSelect(card.label)}
          />
        ))}
      </div>
    </div>
  );
}

export default Taro_CardGrid;
