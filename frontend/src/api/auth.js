import { api } from "./client";
import { saveSession } from "../utils/auth";

// ───────── 이미 연동 완료 ─────────

// 아이디 중복 확인 -> { available: true | false }
export const checkLoginId = async (loginId) => {
  const res = await api.get("/api/v1/auth/check-id", { params: { loginId } });
  return res.data.data;
};

// 회원가입 -> { userId, loginId }
export const signup = async ({ loginId, password, passwordConfirm }) => {
  const res = await api.post("/api/v1/auth/signup", { loginId, password, passwordConfirm });
  return res.data.data;
};

// 로그인 -> { accessToken, tokenType, expiresIn, loginId, title }
// 성공하면 토큰/아이디/칭호를 저장한다. (Refresh Token 은 서버가 쿠키로 내려줌)
export const login = async ({ loginId, password }) => {
  const res = await api.post("/api/v1/auth/login", { loginId, password });
  saveSession(res.data.data);
  return res.data.data;
};

// ───────── 아직 연동 안 함: 로그아웃 API 담당자가 채우는 부분 ─────────
//
// 1) 백엔드에 로그아웃 API 가 배포되면 아래 주석을 풀고, 주소(URL)만 실제 명세서에 맞게 고치세요.
//    (Swagger: https://pungsaeng.duckdns.org/swagger-ui/index.html)
//
// export const logout = async () => {
//   await api.post("/api/v1/auth/logout"); // ← 명세서의 URL / 메서드(post, delete ...)로 수정
// };
//
// 2) 그 다음 src/components/Header.jsx 의 handleLogout 안에 있는 "로그아웃 API 연결" 주석을 따라가세요.
