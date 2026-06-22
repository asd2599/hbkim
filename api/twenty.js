// AI 스무고개 심판 — About 섹션 CareerQuiz 게임용 (Vercel 서버리스 함수).
// 클라이언트가 비밀 단어와 사용자의 질문을 보내면, LLM이 그 질문에 대해
// "예 / 아니오 / 글쎄요" 중 하나로만 답한다. (비밀 단어 자체는 절대 노출 금지)
// OPENAI_API_KEY 는 서버 측에서만 사용된다.

const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

// 간단한 인메모리 rate limit (인스턴스 단위)
const RL_MAX = 30; // IP당 윈도 내 최대 요청 (질문이 잦으므로 chat보다 넉넉)
const RL_WINDOW = 60_000;
const _rl = new Map();
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

const SYSTEM = `너는 스무고개 게임의 심판이다. 비밀 단어가 정해져 있고, 사용자는 그 단어를 맞히려고 질문을 던진다.
규칙:
- 사용자의 질문이 비밀 단어에 대해 사실이면 "예", 사실이 아니면 "아니오"로 답한다.
- 예/아니오로 판단하기 애매하거나, 질문이 예/아니오로 답할 수 없는 형태면 "글쎄요"라고 답한다.
- 비밀 단어, 그 일부, 철자, 힌트, 설명을 절대 말하지 않는다.
- 오직 "예", "아니오", "글쎄요" 중 한 단어만 출력한다. 그 외 어떤 말도 덧붙이지 않는다.`;

// LLM 출력에서 예/아니오/글쎄요만 안전하게 추출
function normalizeAnswer(raw) {
  const t = (raw || '').trim();
  if (/아니|아뇨|no/i.test(t)) return '아니오';
  if (/글쎄|모르|애매|불명|불가/.test(t)) return '글쎄요';
  if (/예|네|응|맞|yes/i.test(t)) return '예';
  return '글쎄요';
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== 'POST') return send(res, 405, { error: 'Method Not Allowed' });
  if (rateLimited(req)) return send(res, 429, { error: '질문이 너무 빨라요. 잠시 후 다시 시도해 주세요.' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return send(res, 500, { error: 'OPENAI_API_KEY가 설정되지 않았습니다.' });

  let payload;
  try {
    payload = await readJson(req);
  } catch {
    return send(res, 400, { error: '잘못된 요청 본문' });
  }

  const keyword = (payload.keyword || '').toString().slice(0, 40).trim();
  const question = (payload.question || '').toString().slice(0, 200).trim();
  const aliases = Array.isArray(payload.aliases) ? payload.aliases.slice(0, 6).map((a) => String(a).slice(0, 40)) : [];
  if (!keyword || !question) return send(res, 400, { error: '단어 또는 질문이 비어 있습니다.' });

  const userMsg = `비밀 단어: "${keyword}"${aliases.length ? ` (같은 뜻으로 인정: ${aliases.join(', ')})` : ''}\n사용자 질문: ${question}`;

  try {
    const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: userMsg },
        ],
        temperature: 0,
        max_tokens: 6,
      }),
    });
    if (!chatRes.ok) {
      return send(res, 502, { error: 'AI 응답 생성에 실패했습니다.', detail: (await chatRes.text()).slice(0, 300) });
    }
    const data = await chatRes.json();
    const answer = normalizeAnswer(data.choices?.[0]?.message?.content);
    return send(res, 200, { answer });
  } catch (e) {
    return send(res, 500, { error: '서버 오류', detail: String(e).slice(0, 300) });
  }
}
