import Check_Section from "./Check_Section";
import Subject_Tab from "../../components/Subject_Tab";
import Detail_Tab from "../../components/Detail_Tab";
import { BookIcon } from "./Check_Icons";

// 1. 과목 선택 + 세부 과목
function Check_Subjects({ subjects, selectedSubject, onSelectSubject, details, selectedDetail, onSelectDetail }) {
  return (
    <Check_Section icon={<BookIcon />} title="1. 과목 선택" bold hint="(필수 1개)" hintColor="#FFC32D" sideText="현재 가장 고민되는 과목">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "8px", alignSelf: "stretch" }}>
        {subjects.map(({ label, icon: Icon, height }) => {
          const selected = selectedSubject === label;
          return (
            <div key={label} style={{ flex: "1 0 0", minWidth: 0 }}>
              <Subject_Tab
                label={label}
                selected={selected}
                width="100%"
                height={height}
                icon={<Icon color={selected ? "#613B00" : "#D8C3AD"} />}
                onClick={() => onSelectSubject(label)}
              />
            </div>
          );
        })}
      </div>

      {details.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
            padding: "8px",
            borderRadius: "8px",
            background: "#1C1831",
          }}
        >
          <span style={{ padding: "0 8px", color: "#FFC174", fontFamily: '"Liberation Serif"', fontSize: "12px", lineHeight: "16px", whiteSpace: "nowrap" }}>
            세부 과목:
          </span>
          {details.map((detail) => (
            <Detail_Tab
              key={detail}
              label={detail}
              width="auto"
              selected={selectedDetail === detail}
              onClick={() => onSelectDetail(detail)}
            />
          ))}
        </div>
      )}
    </Check_Section>
  );
}

export default Check_Subjects;
