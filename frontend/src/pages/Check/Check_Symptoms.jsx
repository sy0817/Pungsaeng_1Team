import Check_Section from "./Check_Section";
import Symptom_Card from "../../components/Symptom_Card";
import { SymptomHeadIcon } from "./Check_Icons";

// 2. 현재 겪는 고민 증상 (복수 선택)
function Check_Symptoms({ symptoms, selectedIds, onToggle }) {
  return (
    <Check_Section icon={<SymptomHeadIcon />} title="2. 현재 겪는 고민 증상" hint="(복수 선택 가능)" hintColor="#BDC2FF" sideText="해당되는 항목 체크">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", alignSelf: "stretch" }}>
        {symptoms.map(({ id, title, description, icon: Icon }) => {
          const selected = selectedIds.includes(id);
          return (
            <Symptom_Card
              key={id}
              title={title}
              description={description}
              selected={selected}
              width="100%"
              icon={<Icon color={selected ? "#FFC174" : "#D8C3AD"} />}
              onClick={() => onToggle(id)}
            />
          );
        })}
      </div>
    </Check_Section>
  );
}

export default Check_Symptoms;
