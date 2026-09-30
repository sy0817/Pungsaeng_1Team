import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

// 상단 메인바 (로그인/회원가입 제외 모든 화면 공통) - 세로 비율 기준
function Title() {
  const navigate = useNavigate();
  const location = useLocation();

  // 메뉴 라벨과 이동 경로 매핑
  const menus = [
    { label: "고민 진단", path: "/check" },
    { label: "타로", path: "/taro" },
    { label: "처방전", path: "/prescription" },
    { label: "마이", path: "/mypage" },
  ];

  const barStyle = {
    width: "100%",
    height: "clamp(72px, 9.86vh, 101px)",
    flex: "none",
    background:
      "linear-gradient(0deg, rgba(45, 69, 128, 0.32) 0%, #010711 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "clamp(20px, 4vw, 60px)",
    paddingRight: "clamp(20px, 4vw, 60px)",
    boxSizing: "border-box",
  };

  const brandStyle = {
    display: "flex",
    alignItems: "center",
  };

  const logoBoxStyle = {
    height: "clamp(48px, 8vh, 82px)",
    aspectRatio: "149 / 82",
    background: `url(${logo}) center / contain no-repeat`,
    flex: "none",
  };

  const brandNameStyle = {
    marginLeft: "-18px",
    color: "#F8FAFC",
    textAlign: "center",
    fontFamily: '"Pretendard Variable"',
    fontSize: "clamp(20px, 3.9vh, 40px)",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    whiteSpace: "nowrap",
  };

  // 메뉴 nav는 메인바 높이만큼 꽉 차서 활성 배경이 세로로 채워지게 함
  const navStyle = {
    display: "flex",
    alignItems: "stretch",
    height: "100%",
    gap: "clamp(24px, 4vw, 80px)",
  };

  const menuBase = {
    height: "100%",
    minWidth: "clamp(90px, 12vw, 177px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    boxSizing: "border-box",
    cursor: "pointer",
    color: "#F8FAFC",
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: "clamp(18px, 3.5vh, 36px)",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    padding: 0,
    whiteSpace: "nowrap",
  };

  // 현재 페이지일 때 활성 스타일 (노란 밑줄 + 그라디언트 배경)
  const menuActive = {
    borderBottom: "2px solid #FFC159",
    background:
      "linear-gradient(180deg, rgba(30, 41, 59, 0.10) 41.35%, rgba(153, 116, 53, 0.20) 100%)",
  };

  return (
    <header style={barStyle}>
      <div style={brandStyle}>
        <div style={logoBoxStyle} />
        <span style={brandNameStyle}>PSH TAROT</span>
      </div>

      <nav style={navStyle}>
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <button
              key={menu.path}
              type="button"
              onClick={() => navigate(menu.path)}
              style={isActive ? { ...menuBase, ...menuActive } : menuBase}
            >
              {menu.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default Title;
