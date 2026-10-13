import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import S_Button from "../components/S_Button";
import Chip from "../components/Chip";
import DetailChip from "../components/DetailChip";
import ConcernChip from "../components/ConcernChip";
import MC from "../components/MC";

function Mypage() {
  const subjects = ["국어", "수학", "영어", "과학", "사회", "기타"];
  const details = ["국어1", "국어2", "문학", "언매", "화작", "독서"];
  const concerns = [
    "개념이 부족해요",
    "문제가 안 풀어져요",
    "집중이 오래 안 돼요",
    "계획을 못 지켜요",
    "스마트폰을 자꾸 봐요",
    "시험이 너무 불안해요",
  ];

  const [subject, setSubject] = useState("국어");
  const [detail, setDetail] = useState("문학");
  const [selectedConcerns, setSelectedConcerns] = useState(["개념이 부족해요"]);

  const toggleConcern = (item) => {
    setSelectedConcerns((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const pageStyle = { minHeight: "100vh", display: "flex", flexDirection: "column" };
  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px",
    padding: "48px 24px 80px",
  };
  const sectionStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" };
  const sectionTitleStyle = {
    color: "#94a3b8",
    fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
    fontSize: "16px",
    fontWeight: 600,
  };
  const rowStyle = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" };
  const concernGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, auto)",
    columnGap: "15px",
    rowGap: "25px",
    justifyContent: "center",
  };

  return (
    <div style={pageStyle}>
      <Title />
      <main style={contentStyle}>
        <div style={sectionStyle}>
          <span style={sectionTitleStyle}>Chip (과목 - 단일 선택)</span>
          <div style={rowStyle}>
            {subjects.map((s) => (
              <Chip key={s} label={s} selected={subject === s} onClick={() => setSubject(s)} />
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <span style={sectionTitleStyle}>DetailChip (세부 - 단일 선택)</span>
          <div style={rowStyle}>
            {details.map((d) => (
              <DetailChip key={d} label={d} selected={detail === d} onClick={() => setDetail(d)} />
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <span style={sectionTitleStyle}>ConcernChip (고민 - 다중 선택)</span>
          <div style={concernGridStyle}>
            {concerns.map((c) => (
              <ConcernChip
                key={c}
                label={c}
                selected={selectedConcerns.includes(c)}
                onClick={() => toggleConcern(c)}
              />
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <span style={sectionTitleStyle}>MC (메시지 카드)</span>
          <MC line1="첫 번째 줄 - 흰색 텍스트입니다" line2="두 번째 줄 - 연한 회색 텍스트입니다" />
        </div>

        <div style={sectionStyle}>
          <span style={sectionTitleStyle}>Button (비활성 / 활성)</span>
          <Button>비활성 버튼</Button>
          <Button active onClick={() => alert("활성 버튼 클릭됨")}>활성 버튼</Button>
        </div>

        <div style={sectionStyle}>
          <span style={sectionTitleStyle}>S_Button (작은 버튼)</span>
          <S_Button onClick={() => alert("S_Button 클릭됨")}>작은 버튼</S_Button>
        </div>
      </main>
    </div>
  );
}

export default Mypage;
