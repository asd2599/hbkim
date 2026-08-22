// 강사 페이지(/) 아케이드 연출용 초경량 스토어.
// 상태 라이브러리를 쓰지 않는다는 규칙에 맞춰 모듈 스코프 상태 + 구독 방식으로 구현하고,
// React 는 useSyncExternalStore 로 읽는다. 점수/콤보/레벨/업적/토스트를 한 곳에서 관리.

// 레벨 구간 — index 0 이 LV.1 시작점.
const LEVELS = [0, 300, 800, 1500, 2600, 4200, 6500, 9800, 14000];

// 업적 정의. id -> { title, desc, score }
export const ACHIEVEMENTS = {
  'first-click': { title: 'FIRST BLOOD', desc: '페이지에서 첫 클릭', score: 30 },
  'combo-10': { title: 'COMBO MASTER', desc: '10 콤보 달성', score: 150 },
  'card-master': { title: 'CARD MASTER', desc: '교육 철학 카드 4장 모두 공개', score: 200 },
  'quest-clear': { title: 'QUEST CLEAR', desc: '강의 이력 퀘스트 전부 열람', score: 200 },
  'tree-master': { title: 'SKILL TREE MAX', desc: '커리큘럼 노드 전부 해금', score: 250 },
  'bug-hunter': { title: 'BUG HUNTER', desc: '보너스 스테이지 첫 클리어', score: 200 },
  'bug-legend': { title: 'DEBUG LEGEND', desc: '보너스 스테이지 30마리 이상 처치', score: 400 },
  'konami': { title: '↑↑↓↓←→←→BA', desc: '숨겨진 코드를 찾아냄', score: 500 },
  'nameplate': { title: 'WHO IS HE?', desc: '플레이어 명패를 다섯 번 두드림', score: 120 },
  'contact': { title: 'CONTINUE?', desc: '강의 문의 연락처를 열어봄', score: 100 },
};

export const ACHIEVEMENT_TOTAL = Object.keys(ACHIEVEMENTS).length;

const EMPTY = Object.freeze({
  score: 0,
  combo: 0,
  maxCombo: 0,
  level: 1,
  unlocked: Object.freeze([]),
  toasts: Object.freeze([]),
  godMode: false,
});

let snapshot = EMPTY;
const listeners = new Set();
let comboTimer = null;
let seq = 0;

function levelFor(score) {
  let lv = 1;
  for (let i = 0; i < LEVELS.length; i++) if (score >= LEVELS[i]) lv = i + 1;
  return lv;
}

// 현재 레벨 진행률(0~1)과 다음 레벨까지 남은 점수
export function levelProgress(score) {
  const lv = levelFor(score);
  const from = LEVELS[lv - 1] ?? 0;
  const to = LEVELS[lv] ?? from + 1;
  if (lv >= LEVELS.length) return { ratio: 1, next: null };
  return { ratio: Math.min(1, (score - from) / (to - from)), next: to - score };
}

function commit(patch) {
  snapshot = { ...snapshot, ...patch };
  listeners.forEach((fn) => fn());
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getSnapshot() {
  return snapshot;
}

function pushToast(toast) {
  const id = ++seq;
  commit({ toasts: [...snapshot.toasts, { ...toast, id }] });
  setTimeout(() => {
    commit({ toasts: snapshot.toasts.filter((t) => t.id !== id) });
  }, 3800);
}

export function dismissToast(id) {
  commit({ toasts: snapshot.toasts.filter((t) => t.id !== id) });
}

// 점수 추가. combo=true 면 콤보 배수(+10%/스택)를 적용하고 콤보를 1 올린다.
// 실제 가산된 점수를 반환한다(플로팅 텍스트 표기용).
export function addScore(points, { combo = true } = {}) {
  const mult = combo ? 1 + snapshot.combo * 0.1 : 1;
  const gained = Math.max(1, Math.round(points * mult));
  const score = snapshot.score + gained;
  const prevLevel = snapshot.level;
  const level = levelFor(score);
  const nextCombo = combo ? snapshot.combo + 1 : snapshot.combo;

  commit({
    score,
    level,
    combo: nextCombo,
    maxCombo: Math.max(snapshot.maxCombo, nextCombo),
  });

  if (combo) {
    clearTimeout(comboTimer);
    comboTimer = setTimeout(() => commit({ combo: 0 }), 2600);
    if (nextCombo >= 10) unlock('combo-10');
  }
  if (level > prevLevel) {
    pushToast({ kind: 'level', title: `LEVEL UP — LV.${level}`, desc: '계속 둘러보면 더 올라갑니다' });
  }
  return gained;
}

export function unlock(id) {
  const def = ACHIEVEMENTS[id];
  if (!def || snapshot.unlocked.includes(id)) return false;
  commit({ unlocked: [...snapshot.unlocked, id] });
  addScore(def.score, { combo: false });
  pushToast({ kind: 'achievement', title: def.title, desc: def.desc });
  return true;
}

export function isUnlocked(id) {
  return snapshot.unlocked.includes(id);
}

export function setGodMode(on) {
  if (snapshot.godMode === on) return;
  commit({ godMode: on });
}

// 페이지를 떠날 때 초기화 (SPA 라 모듈 상태가 남는다)
export function resetArcade() {
  clearTimeout(comboTimer);
  comboTimer = null;
  snapshot = EMPTY;
  listeners.forEach((fn) => fn());
}
