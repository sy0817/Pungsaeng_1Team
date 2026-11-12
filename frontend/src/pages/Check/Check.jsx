import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Check_Heading from "./Check_Heading";
import Check_Subjects from "./Check_Subjects";
import Check_Symptoms from "./Check_Symptoms";
import Check_Submit from "./Check_Submit";
import { SUBJECTS, SUBJECT_DETAILS, DEFAULT_DETAIL_SUBJECT, SYMPTOMS } from "./checkData";

const blur = (style) => ({ position: "absolute", borderRadius: "9999px", pointerEvents: "none", ...style });

function Check() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [detail, setDetail] = useState(null);
  const [symptomIds, setSymptomIds] = useState([]);
  const [error, setError] = useState("");

  // 과목을 고르기 전에는 시안처럼 수학의 세부 과목을 보여줌
  const detailSubject = subject ?? DEFAULT_DETAIL_SUBJECT;
  const details = SUBJECT_DETAILS[detailSubject] ?? [];

  const handleSelectSubject = (label) => {
    if (label !== subject) {
      setSubject(label);
      setDetail(null);
    }
    setError("");
  };

  const handleSelectDetail = (name) => {
    if (!subject) setSubject(detailSubject);
    setDetail(name);
    setError("");
  };

  const handleToggleSymptom = (id) => {
    setSymptomIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSubmit = () => {
    if (!subject) {
      setError("과목을 1개 선택해주세요.");
      return;
    }
    // 타로 페이지 "선택한 진단" 칩에 보여줄 요약
    const subjectText = detail ? `${subject} (${detail})` : subject;
    const symptomText = SYMPTOMS.filter((s) => symptomIds.includes(s.id))
      .map((s) => s.short)
      .join(" / ");
    navigate("/taro", { state: { diagnosis: symptomText ? `${subjectText} · ${symptomText}` : subjectText } });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "56px", width: "100%", minHeight: "100vh", background: "#141029" }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", overflow: "hidden", paddingBottom: "285px" }}>
        {/* 배경 블러 */}
        <div
          style={blur({
            left: "-126px",
            top: "51.21%",
            bottom: "11.41%",
            width: "447px",
            background: "rgba(255, 193, 116, 0.10)",
            filter: "blur(20px)",
          })}
        />
        <div
          style={blur({
            right: "-117px",
            top: "11.33%",
            bottom: "43.77%",
            width: "566px",
            background: "rgba(189, 194, 255, 0.15)",
            filter: "blur(32px)",
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
            padding: "36px 40px",
          }}
        >
          <Check_Heading />

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignSelf: "stretch" }}>
            <Check_Subjects
              subjects={SUBJECTS}
              selectedSubject={subject}
              onSelectSubject={handleSelectSubject}
              details={details}
              selectedDetail={detail}
              onSelectDetail={handleSelectDetail}
            />
            <Check_Symptoms symptoms={SYMPTOMS} selectedIds={symptomIds} onToggle={handleToggleSymptom} />
            <Check_Submit onSubmit={handleSubmit} error={error} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Check;
