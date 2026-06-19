import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// 개발 서버(npm run dev)에서도 /api/chat 서버리스 함수를 그대로 실행해 챗봇을 테스트할 수 있게 한다.
// (배포 시엔 Vercel이 api/ 함수를 자동 처리하므로 이 미들웨어는 사용되지 않음)
function devApi() {
  // 네이티브 import 로 핸들러를 1회 로드 (Vite의 ssrLoadModule 변환을 거치지 않아
  // 프로덕션(Vercel Node)과 동일하게 동작하고 한글 인코딩도 안전하다)
  let handlerP
  return {
    name: 'dev-api-chat',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/chat')) return next()
        try {
          if (!handlerP) handlerP = import(new URL('./api/chat.js', import.meta.url).href).then((m) => m.default)
          const handler = await handlerP
          await handler(req, res)
        } catch (e) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'dev api error', detail: String(e) }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // .env 의 서버용 변수(OPENAI_*)를 dev 미들웨어가 쓰도록 process.env 에 주입.
  // VITE_ 접두사가 아니므로 클라이언트 번들에는 포함되지 않는다.
  const env = loadEnv(mode, process.cwd(), '')
  for (const k of ['OPENAI_API_KEY', 'OPENAI_CHAT_MODEL', 'OPENAI_EMBED_MODEL']) {
    if (env[k] && !process.env[k]) process.env[k] = env[k]
  }
  return { plugins: [react(), devApi()] }
})
