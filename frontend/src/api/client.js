import axios from "axios";
import { getAccessToken, saveSession, clearSession } from "../utils/auth";

/**
 * 모든 API 호출이 지나가는 axios 공통 설정
 *
 * - baseURL 을 비워 두면 "지금 접속한 주소 + /api/..." 로 요청한다.
 *   · 개발(npm run dev) : vite.config.js 의 proxy 가 백엔드로 전달
 *   · 배포(Vercel)      : vercel.json 의 rewrites 가 백엔드로 전달
 *   -> Refresh Token 쿠키가 SameSite=Strict 라서, 브라우저 입장에서 "같은 주소"로 보내야 쿠키가 동작한다.
 * - 백엔드 주소를 직접 쓰고 싶으면 .env 에 VITE_API_BASE_URL 을 넣으면 된다. (쿠키/CORS 주의)
 *
 * 사용법 (src/api/auth.js, users.js, prescriptions.js 참고)
 *   const res = await api.get("/api/v1/users/me/statistics");
 *   return res.data.data;   // 서버 응답은 { code, message, data, errors, timestamp } 모양이라 data.data 를 꺼낸다
 */
export const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Refresh Token 쿠키를 주고받기 위해 필요
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// 1) 요청마다 Access Token 을 붙인다
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2) Access Token 이 만료돼 401 이 오면 재발급을 "한 번만" 하고, 실패했던 요청을 다시 보낸다
//    (여러 요청이 동시에 401 을 받아도 reissue 는 한 번만 호출 - 백엔드 요구사항)
let reissuePromise = null;

export const reissue = () => {
  if (!reissuePromise) {
    reissuePromise = axios
      .post(`${BASE_URL}/api/v1/auth/reissue`, null, { withCredentials: true, timeout: 15000 })
      .then((res) => {
        saveSession(res.data.data);
        return res.data.data.accessToken;
      })
      .finally(() => {
        reissuePromise = null;
      });
  }
  return reissuePromise;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const isAuthApi = config?.url?.includes("/api/v1/auth/"); // 로그인/가입/재발급 자체는 재시도하지 않는다

    if (response?.status === 401 && config && !config._retried && !isAuthApi) {
      config._retried = true;
      try {
        const token = await reissue();
        config.headers.Authorization = `Bearer ${token}`;
        return api(config);
      } catch {
        // 재발급도 실패 -> 로그인이 완전히 풀린 것
        clearSession();
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  },
);

/**
 * 화면에 보여줄 에러 문구를 뽑는다.
 *   try { ... } catch (error) { setMessage(getErrorMessage(error)); }
 * 서버가 준 검증 오류(errors[].reason) -> 서버 message -> 기본 문구 순서
 */
export const getErrorMessage = (error, fallback = "요청에 실패했어요. 잠시 후 다시 시도해주세요.") => {
  const body = error?.response?.data;
  if (body?.errors?.[0]?.reason) return body.errors[0].reason;
  if (body?.message) return body.message;
  if (error?.code === "ERR_NETWORK" || error?.code === "ECONNABORTED") {
    return "서버에 연결할 수 없어요. 네트워크를 확인해주세요.";
  }
  return fallback;
};

// 서버 에러 코드 (예: "USER001") - 코드별로 다르게 처리하고 싶을 때 사용
export const getErrorCode = (error) => error?.response?.data?.code ?? "";
