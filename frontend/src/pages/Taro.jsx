import { useState } from "react";
import Header from "../components/Header";
import CTA from "../components/CTA";
import Subject_Tab from "../components/Subject_Tab";
import Detail_Tab from "../components/Detail_Tab";
import Symptom_Card from "../components/Symptom_Card";
import Tarot_Card from "../components/Tarot_Card";
import Button from "../components/Button";
import Input_Section from "../components/Input_Section";
import Past_Prescription from "../components/Past_Prescription";

import img꿈과목표 from "../assets/photo/꿈과 목표.png";
import img노력과꾸준함 from "../assets/photo/노력과 꾸준함.png";
import img도움과인연 from "../assets/photo/도움과 인연.png";
import img도전과극복 from "../assets/photo/도전과 극복.png";
import img밝은미래 from "../assets/photo/밝은 미래.png";
import img새로운시작 from "../assets/photo/새로운 시작.png";
import img성과와보상 from "../assets/photo/성과와 보상.png";
import img성장과발전 from "../assets/photo/성장과 발전.png";
import img올바른방향 from "../assets/photo/올바른 방향.png";
import img휴식과재충전 from "../assets/photo/휴식과 재충전.png";

const subjects = ["국어", "수학", "영어", "과학", "사회", "기타"];
const details = ["공통수학 1", "공통수학 2", "수학 I", "수학 II", "미적분"];
const symptoms = [
  { title: "개념이 부족해요", description: "기본 원리가 약해요" },
  { title: "응용·킬러 문항에서 막혀요", description: "문제 적용이 어려워요" },
  { title: "집중이 오래 안 돼요", description: "30분도 집중하기 힘들어요" },
  { title: "계획을 못 지켜요", description: "매일 미루다가 시험 전날" },
  { title: "스마트폰을 자꾸 봐요", description: "수업 중에도 계속 봐요" },
  { title: "시험이 너무 불안해요", description: "시험날 머리가 하얘져요" },
];
const tarotCards = [
  { label: "꿈과 목표", image: img꿈과목표 },
  { label: "노력과 꾸준함", image: img노력과꾸준함 },
  { label: "도움과 인연", image: img도움과인연 },
  { label: "도전과 극복", image: img도전과극복 },
  { label: "밝은 미래", image: img밝은미래 },
  { label: "새로운 시작", image: img새로운시작 },
  { label: "성과와 보상", image: img성과와보상 },
  { label: "성장과 발전", image: img성장과발전 },
  { label: "올바른 방향", image: img올바른방향 },
  { label: "휴식과 재충전", image: img휴식과재충전 },
];

function Taro() {
  const [selectedSubject, setSelectedSubject] = useState("수학");
  const [selectedDetail, setSelectedDetail] = useState("공통수학 1");
  const [selectedSymptom, setSelectedSymptom] = useState("응용·킬러 문항에서 막혀요");
  const [selectedCard, setSelectedCard] = useState("꿈과 목표");
  const pageStyle = {
    display: "flex",
    width: "100%",
    minHeight: "1376px",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(0deg, #141029 0%, #141029 100%), #FFF",
  };

  const innerStyle = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "56px",
  };

  const containerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  };

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>
        <Header />
        <div style={containerStyle}>
          {/* 상단 중앙 그라디언트 블러 */}
          <div
            style={{
              position: "absolute",
              left: "238px",
              top: "-128px",
              width: "900px",
              height: "550px",
              borderRadius: "9999px",
              background:
                "linear-gradient(180deg, rgba(47, 58, 163, 0.25) 0%, rgba(245, 158, 11, 0.10) 50%, rgba(245, 158, 11, 0.00) 100%)",
              filter: "blur(32px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* 좌측 amber 블러 */}
          <div
            style={{
              position: "absolute",
              left: "-128px",
              top: "522.981px",
              width: "320px",
              height: "309.926px",
              borderRadius: "9999px",
              background: "rgba(255, 193, 116, 0.10)",
              filter: "blur(20px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* 우측 lavender 블러 */}
          <div
            style={{
              position: "absolute",
              right: "-112px",
              bottom: "151.108px",
              width: "384px",
              height: "371.911px",
              borderRadius: "9999px",
              background: "rgba(189, 194, 255, 0.15)",
              filter: "blur(32px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <main style={{ position: "relative", zIndex: 1, width: "100%" }}>
            타로 콘텐츠 영역
            <div style={{ display: "flex", gap: "8px" }}>
              {subjects.map((s) => (
                <Subject_Tab
                  key={s}
                  label={s}
                  selected={selectedSubject === s}
                  onClick={() => setSelectedSubject(s)}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              {details.map((d) => (
                <Detail_Tab
                  key={d}
                  label={d}
                  selected={selectedDetail === d}
                  onClick={() => setSelectedDetail(d)}
                />
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 418px)", gap: "8px", marginTop: "12px" }}>
              {symptoms.map((s) => (
                <Symptom_Card
                  key={s.title}
                  title={s.title}
                  description={s.description}
                  selected={selectedSymptom === s.title}
                  onClick={() => setSelectedSymptom(s.title)}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <Button type="primary" label="처방전 이미지 저장 (PNG)" />
              <Button type="link" label="다시 진단받기" />
            </div>
            <CTA label="타로 카드 뽑으러 가기" />
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px", width: "400px" }}>
              <Input_Section label="이메일" value="user@example.com" />
              <Input_Section label="이메일" value="" />
              <Input_Section label="비밀번호" hint="8자 이상 + 영문, 숫자" value="PoongSaeng!2" showToggle />
              <Input_Section label="비밀번호 확인" value="PoongSaeng!2" showToggle validated="비밀번호가 일치합니다" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 192px)", gap: "12px", marginTop: "12px" }}>
              {tarotCards.map((card) => (
                <Tarot_Card
                  key={card.label}
                  label={card.label}
                  image={card.image}
                  selected={selectedCard === card.label}
                  onClick={() => setSelectedCard(card.label)}
                />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px", width: "510px" }}>
              <Past_Prescription
                date="2025.02.20"
                subject="영어"
                symptom="단어 암기"
                title="수능특강 영단어 누적 암기 플랜"
                arcana="올바른 방향"
                summary="처방 요약: 어원 중심 30개 일일 암기, 복습 주기 3일"
                status="완료됨"
              />
              <Past_Prescription
                date="2025.03.05"
                subject="수학"
                symptom="응용 문제"
                title="수능 킬러 문항 집중 공략 플랜"
                arcana="도전과 극복"
                summary="처방 요약: 매일 킬러 2문항 풀이 + 오답 분석"
                status="진행 중"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Taro;
