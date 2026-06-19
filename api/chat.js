// 포트폴리오 챗봇 — 로컬 RAG + OpenAI (Vercel 서버리스 함수).
// OPENAI_API_KEY 는 서버 측에서만 사용 — 절대 클라이언트로 노출되지 않는다.
// 청크 임베딩은 사전 계산해 로컬 파일(api/embeddings.js)로 보관 → 런타임엔 질문만 임베딩한다.
import { EMBEDDINGS } from './embeddings.js';
import { buildChunks } from './knowledge.js';

const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';
const EMBED_MODEL = process.env.OPENAI_EMBED_MODEL || EMBEDDINGS?.model || 'text-embedding-3-small';
const TOP_K = 8;

// 인덱스 캐시
let _chunks = null;
let _vectors = null;

// 간단한 인메모리 rate limit (인스턴스 단위) — OpenAI 토큰 남용 방지
const RL_MAX = 12; // IP당 윈도 내 최대 요청
const RL_WINDOW = 60_000; // 60초
const _rl = new Map(); // ip -> { count, reset }
function rateLimited(req) {
  const ip = String(req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const e = _rl.get(ip);
  if (!e || now > e.reset) {
    _rl.set(ip, { count: 1, reset: now + RL_WINDOW });
    if (_rl.size > 5000) for (const [k, v] of _rl) if (now > v.reset) _rl.delete(k);
    return false;
  }
  e.count += 1;
  return e.count > RL_MAX;
}

async function embed(input, apiKey) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: EMBED_MODEL, input }),
  });
  if (!res.ok) throw new Error(`embeddings ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  // 응답 순서가 입력 순서와 다를 수 있으므로 index 로 정렬해 청크와 정합 유지
  return json.data.slice().sort((a, b) => a.index - b.index).map((d) => d.embedding);
}

async function ensureIndex(apiKey) {
  if (_vectors) return;
  // 텍스트는 knowledge.js 에서(인코딩 안전), 벡터는 사전 임베딩 파일에서. 인덱스로 1:1 정합.
  _chunks = buildChunks();
  if (EMBEDDINGS?.vectors?.length === _chunks.length) {
    _vectors = EMBEDDINGS.vectors; // 사전 임베딩 사용 (API 호출 없음)
    return;
  }
  // 폴백: 파일이 없거나 개수 불일치(지식 변경 후 재임베딩 안 함) → 런타임 1회 임베딩
  _vectors = await embed(_chunks, apiKey);
}

function cosine(a, b) {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) return JSON.parse(req.body);
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(obj));
}

const SYSTEM = `너는 'hbkim.cloud' 포트폴리오의 AI 챗봇 '김현봇'이야. 개발자 '김현복' 본인이라고 생각하고, 아래 [컨텍스트]를 바탕으로 1인칭("저는…")으로 한국어로 답해. (정체를 직접 물으면 "저는 김현봇입니다"라고 밝혀.)
규칙:
- 친근하고 위트 있게. 보통 2~4문장. 김현복다운 말투(균형·정직 중시, 실행 우선, 가벼운 유머)를 살려.
- 컨텍스트에 있는 사실(경력·프로젝트·기술·수치·거주지 등)은 정확히 답해. 경력·날짜·숫자 같은 사실은 절대 지어내지 마.
- 컨텍스트에 답이 없거나 김현복과 무관한 질문(날씨·잡담·엉뚱한 부탁 등)이 오면, "정보가 없다"고 딱딱하게 끊지 말고 김현복답게 재치 있게 받아넘긴 뒤 경력·프로젝트·기술 같은 얘기로 자연스럽게 슬쩍 돌려.
- 곤란하거나 사적인 질문도 정색하지 말고 가볍게 웃어넘기되, 거짓 사실은 만들지 마.
- 채용·협업에 도움이 되도록 핵심 매력은 또렷하게.`;

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== 'POST') return send(res, 405, { error: 'Method Not Allowed' });

  if (rateLimited(req)) return send(res, 429, { error: '요청이 너무 많아요. 잠시 후 다시 시도해 주세요.' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return send(res, 500, { error: 'OPENAI_API_KEY가 설정되지 않았습니다. (.env 또는 Vercel 환경변수 확인)' });

  let payload;
  try {
    payload = await readJson(req);
  } catch {
    return send(res, 400, { error: '잘못된 요청 본문' });
  }

  const question = (payload.question || '').toString().slice(0, 500).trim();
  if (!question) return send(res, 400, { error: '질문이 비어 있습니다.' });
  const history = Array.isArray(payload.history) ? payload.history.slice(-6) : [];

  try {
    await ensureIndex(apiKey);
    const [qVec] = await embed([question], apiKey);
    const ranked = _chunks
      .map((text, i) => ({ text, score: cosine(qVec, _vectors[i]) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);
    const context = ranked.map((r, i) => `(${i + 1}) ${r.text}`).join('\n\n');

    const messages = [
      { role: 'system', content: `${SYSTEM}\n\n[컨텍스트]\n${context}` },
      ...history
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) })),
      { role: 'user', content: question },
    ];

    const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: CHAT_MODEL, messages, temperature: 0.3, max_tokens: 400 }),
    });
    if (!chatRes.ok) {
      return send(res, 502, { error: 'AI 응답 생성에 실패했습니다.', detail: (await chatRes.text()).slice(0, 300) });
    }
    const data = await chatRes.json();
    const answer = data.choices?.[0]?.message?.content?.trim() || '답변을 생성하지 못했어요.';
    return send(res, 200, { answer, sources: ranked.map((r) => r.text.slice(0, 40)) });
  } catch (e) {
    return send(res, 500, { error: '서버 오류', detail: String(e).slice(0, 300) });
  }
}
