import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // 개발 서버(npm run dev)에서 /api 요청을 백엔드로 전달한다.
  // 브라우저는 계속 localhost:5173 에만 요청하므로 CORS 도, 쿠키(SameSite=Strict) 문제도 생기지 않는다.
  // 로컬에서 백엔드를 직접 띄웠다면 .env.local 에 VITE_PROXY_TARGET=http://localhost:8080 을 적는다.
  const proxyTarget = env.VITE_PROXY_TARGET || 'https://pungsaeng.duckdns.org'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          // 백엔드 CORS 에는 http://localhost:5173 만 등록돼 있다.
          // 5173 이 이미 사용 중이라 5174 등 다른 포트로 뜨거나 127.0.0.1 로 접속해도 막히지 않도록 Origin 을 맞춰서 보낸다.
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (proxyReq.getHeader('origin')) proxyReq.setHeader('origin', 'http://localhost:5173')
            })
          },
        },
      },
    },
  }
})
