import Button from "../../components/Button";
import { ProfileIcon } from "./Prescription_Icons";

// 하단 액션 버튼 바
function Prescription_Toolbar({ onSave, onRetry, onMypage }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        alignSelf: "stretch",
        padding: "17px",
        borderRadius: "12px",
        border: "1px solid rgba(83, 68, 52, 0.3)",
        background: "#1C1831",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
        <Button type="primary" label="처방전 이미지 저장 (PNG)" onClick={onSave} />
        <Button type="link" label="다시 진단받기" onClick={onRetry} />
        <Button type="link" label="마이페이지로 이동" icon={<ProfileIcon />} onClick={onMypage} />
      </div>
    </div>
  );
}

export default Prescription_Toolbar;
