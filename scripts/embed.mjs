// 지식베이스 청크를 OpenAI로 한 번 임베딩해서 로컬 파일(api/embeddings.js)로 저장한다.
// 실행: npm run embed   (docs/chatbot_knowledge.md → api/knowledge.js 수정 후 재실행)
// 키는 .env 의 OPENAI_API_KEY 사용. 결과 파일은 시크릿이 아니므로 커밋해도 된다.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildChunks } from '../api/knowledge.js';

const root = new URL('..', import.meta.url);
const EMBED_MODEL = process.env.OPENAI_EMBED_MODEL || 'text-embedding-3-small';

function getKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  try {
    const env = readFileSync(new URL('.env', root), 'utf8');
    const m = env.match(/^OPENAI_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  } catch { /* no .env */ }
  return null;
}

async function embed(input, key) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: EMBED_MODEL, input }),
  });
  if (!res.ok) throw new Error(`embeddings ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  return json.data.slice().sort((a, b) => a.index - b.index).map((d) => d.embedding);
}

const key = getKey();
if (!key) {
  console.error('✖ OPENAI_API_KEY 가 없습니다. .env 에 키를 넣고 다시 실행하세요.');
  process.exit(1);
}

const chunks = buildChunks();
console.log(`• 청크 ${chunks.length}개 임베딩 중… (model: ${EMBED_MODEL})`);
const vectors = await embed(chunks, key);
// 용량 절약: 소수 6자리 반올림. 텍스트는 저장하지 않는다(한글 인코딩 깨짐 방지).
// 청크 텍스트는 런타임에 api/knowledge.js 의 buildChunks() 가 같은 순서로 제공하고,
// 여기 vectors 와 인덱스로 1:1 정합한다.
const round = (v) => v.map((x) => Math.round(x * 1e6) / 1e6);

const out =
  `// 자동 생성 파일 — 직접 수정하지 말 것. 재생성: npm run embed\n` +
  `// 출처: api/knowledge.js (← docs/chatbot_knowledge.md). vectors 순서 = buildChunks() 순서.\n` +
  `export const EMBEDDINGS = ${JSON.stringify({ model: EMBED_MODEL, dim: vectors[0].length, count: chunks.length, vectors: vectors.map(round) })};\n`;

const outPath = fileURLToPath(new URL('api/embeddings.js', root));
writeFileSync(outPath, out, 'utf8');
console.log(`✓ 저장 완료: api/embeddings.js  (${chunks.length}개, dim ${vectors[0].length})`);
