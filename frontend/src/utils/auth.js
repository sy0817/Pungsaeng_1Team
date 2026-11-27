// 로그인 정보를 페이지 간에 공유 (브라우저 탭을 닫으면 사라지도록 sessionStorage 사용)
// - accessToken : API 요청 헤더(Authorization: Bearer ...)에 쓰는 토큰 (30분짜리, 만료되면 api/client.js 가 재발급)
// - loginId     : 화면에 보여줄 아이디
// - title       : 서버가 계산해 준 칭호 (예: "새내기 수험생")
// ※ Refresh Token 은 서버가 HttpOnly 쿠키로 관리하므로 JS 에서는 다루지 않는다.
const KEYS = {
  accessToken: "psh_access_token",
  loginId: "psh_user_id",
  title: "psh_user_title",
};

const SAVED_LOGIN_ID_KEY = "psh_saved_login_id"; // "아이디 저장" 체크 시에만 localStorage 에 보관

const session = () => (typeof window === "undefined" ? null : window.sessionStorage);
const local = () => (typeof window === "undefined" ? null : window.localStorage);

export const getAccessToken = () => session()?.getItem(KEYS.accessToken) ?? "";

export const getUserId = () => session()?.getItem(KEYS.loginId) ?? "";

export const getUserTitle = () => session()?.getItem(KEYS.title) ?? "";

// 로그인 / 토큰 재발급 응답(LoginResponse)을 그대로 넘기면 저장된다
export const saveSession = ({ accessToken, loginId, title }) => {
  const s = session();
  if (!s) return;
  if (accessToken) s.setItem(KEYS.accessToken, accessToken);
  if (loginId) s.setItem(KEYS.loginId, loginId);
  if (title) s.setItem(KEYS.title, title);
};

export const clearSession = () => {
  const s = session();
  if (!s) return;
  Object.values(KEYS).forEach((key) => s.removeItem(key));
};

// "아이디 저장" 기능
export const getSavedLoginId = () => local()?.getItem(SAVED_LOGIN_ID_KEY) ?? "";
export const saveLoginId = (id) => local()?.setItem(SAVED_LOGIN_ID_KEY, id);
export const clearSavedLoginId = () => local()?.removeItem(SAVED_LOGIN_ID_KEY);
