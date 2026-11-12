// 로그인한 아이디를 페이지 간에 공유 (브라우저 탭을 닫으면 사라지도록 sessionStorage 사용)
const KEY = "psh_user_id";

const storage = () => (typeof window === "undefined" ? null : window.sessionStorage);

export const getUserId = () => storage()?.getItem(KEY) ?? "";

export const saveUserId = (id) => storage()?.setItem(KEY, id);

export const clearUserId = () => storage()?.removeItem(KEY);
