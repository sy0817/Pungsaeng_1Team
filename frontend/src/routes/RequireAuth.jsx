import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";
import { reissue } from "../api/client";

/**
 * 로그인해야 볼 수 있는 페이지를 감싸는 보호 라우트
 *
 * 1) 이 탭에 Access Token 이 있으면 그대로 보여준다.
 * 2) 없으면(새 탭, 탭을 닫았다 연 경우) Refresh Token 쿠키로 재발급을 시도한다. (자동 로그인)
 * 3) 재발급도 실패하면 /login 으로 보낸다.
 */
function RequireAuth({ children }) {
  const [status, setStatus] = useState(getAccessToken() ? "ok" : "checking"); // checking | ok | denied

  useEffect(() => {
    if (status !== "checking") return undefined;

    let alive = true;
    reissue()
      .then(() => alive && setStatus("ok"))
      .catch(() => alive && setStatus("denied"));

    return () => {
      alive = false;
    };
  }, [status]);

  if (status === "denied") return <Navigate to="/login" replace />;
  if (status === "checking") return null; // 확인하는 짧은 순간에는 빈 화면
  return children;
}

export default RequireAuth;
