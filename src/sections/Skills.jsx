import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import SectionNext from '../components/SectionNext';
import { skillClasses } from '../data/profile';

// 클리어 보상: 타일 뒤(블러)에 깔리고, 다 맞추면 모달로 선명하게 공개
const PHOTO = '/images/quiz.jpg';

/* ────────────────────────────────────────────
   기술 스택 = 사천성(짝 맞추기)
   - 각 기술 아이콘을 2장씩 보드에 깔고, 사천성 규칙(꺾임 2번 이하 경로로
     연결)으로 같은 아이콘 짝을 맞춰 제거한다.
   - 짝을 없애면 아래 인벤토리에서 해당 기술이 활성화(점등)된다.
   - 경로는 보드 바깥 한 칸(가상 테두리)과 빈 칸을 지날 수 있다.
   - 막히면 자동 섞기 + 수동 섞기/힌트 제공.
──────────────────────────────────────────── */

const CLASSES = skillClasses;
const PARTS = CLASSES.flatMap((c) => c.items.map((it) => ({ ...it, color: c.color })));
const N = PARTS.length; // 12
const OFFSETS = (() => { const o = []; let a = 0; for (const c of CLASSES) { o.push(a); a += c.items.length; } return o; })();

const COLS = 6;
const ROWS = 4; // COLS*ROWS = 24 = N*2

const Icon = ({ id }) => (
  <svg className="skill-svg" aria-hidden="true"><use href={`/skill-icons.svg#${id}`} /></svg>
);

const rc = (i) => ({ r: Math.floor(i / COLS), c: i % COLS });

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// 셀이 경로로 지날 수 있는가 (보드 밖 한 칸=가상 테두리는 열림, 보드 안은 제거된 칸만 열림)
function cellOpen(tiles, r, c) {
  if (r < -1 || r > ROWS || c < -1 || c > COLS) return false;
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return true; // 가상 테두리
  return tiles[r * COLS + c] === null;
}

// 두 점이 같은 행/열이고 사이의 칸이 모두 열려 있는가
function straightClear(tiles, ar, ac, br, bc) {
  if (ar === br) {
    const lo = Math.min(ac, bc), hi = Math.max(ac, bc);
    for (let c = lo + 1; c < hi; c++) if (!cellOpen(tiles, ar, c)) return false;
    return true;
  }
  if (ac === bc) {
    const lo = Math.min(ar, br), hi = Math.max(ar, br);
    for (let r = lo + 1; r < hi; r++) if (!cellOpen(tiles, r, ac)) return false;
    return true;
  }
  return false;
}

// 사천성 연결 가능 여부 (꺾임 0~2회) — 가능하면 경로(꼭짓점 배열) 반환, 아니면 null
function canConnect(tiles, A, B) {
  // 0회 — 직선
  if (straightClear(tiles, A.r, A.c, B.r, B.c)) return [A, B];
  // 1회 — 모서리 한 곳
  for (const P of [{ r: A.r, c: B.c }, { r: B.r, c: A.c }]) {
    if (cellOpen(tiles, P.r, P.c) && straightClear(tiles, A.r, A.c, P.r, P.c) && straightClear(tiles, P.r, P.c, B.r, B.c)) return [A, P, B];
  }
  // 2회 — 같은 행 경유 (수직→수평→수직)
  for (let k = -1; k <= ROWS; k++) {
    if (k === A.r || k === B.r) continue;
    const P = { r: k, c: A.c }, Q = { r: k, c: B.c };
    if (cellOpen(tiles, P.r, P.c) && cellOpen(tiles, Q.r, Q.c)
      && straightClear(tiles, A.r, A.c, P.r, P.c)
      && straightClear(tiles, P.r, P.c, Q.r, Q.c)
      && straightClear(tiles, Q.r, Q.c, B.r, B.c)) return [A, P, Q, B];
  }
  // 2회 — 같은 열 경유 (수평→수직→수평)
  for (let k = -1; k <= COLS; k++) {
    if (k === A.c || k === B.c) continue;
    const P = { r: A.r, c: k }, Q = { r: B.r, c: k };
    if (cellOpen(tiles, P.r, P.c) && cellOpen(tiles, Q.r, Q.c)
      && straightClear(tiles, A.r, A.c, P.r, P.c)
      && straightClear(tiles, P.r, P.c, Q.r, Q.c)
      && straightClear(tiles, Q.r, Q.c, B.r, B.c)) return [A, P, Q, B];
  }
  return null;
}

// 연결 가능한 짝 하나 찾기 (없으면 null)
function findPair(tiles) {
  const cells = [];
  for (let i = 0; i < tiles.length; i++) if (tiles[i] !== null) cells.push(i);
  for (let i = 0; i < cells.length; i++) {
    for (let j = i + 1; j < cells.length; j++) {
      if (tiles[cells[i]] !== tiles[cells[j]]) continue;
      if (canConnect(tiles, rc(cells[i]), rc(cells[j]))) return [cells[i], cells[j]];
    }
  }
  return null;
}

function freshTiles() {
  const base = [];
  for (let i = 0; i < N; i++) base.push(i, i);
  return shuffle(base);
}

// 풀이 가능한(짝이 하나라도 있는) 보드 생성
function makeBoard() {
  let t = freshTiles();
  let guard = 0;
  while (!findPair(t) && guard++ < 80) t = freshTiles();
  return t;
}

// 남은 타일만 다시 섞기 (위치는 유지, 값만 재배치 → 짝 보장)
function reshuffle(t) {
  const pos = [], vals = [];
  t.forEach((v, i) => { if (v !== null) { pos.push(i); vals.push(v); } });
  if (pos.length === 0) return t;
  const build = (order) => { const nt = t.slice(); pos.forEach((p, k) => { nt[p] = order[k]; }); return nt; };
  let nt = build(shuffle(vals));
  let guard = 0;
  while (!findPair(nt) && guard++ < 80) nt = build(shuffle(vals));
  return nt;
}

export default function Skills() {
  const [tiles, setTiles] = useState(makeBoard);
  const [selected, setSelected] = useState(null);
  const [hint, setHint] = useState([]);
  const [bad, setBad] = useState(null);
  const [msg, setMsg] = useState('');
  const [matching, setMatching] = useState([]); // 사라지는 중인 타일 [a, b]
  const [path, setPath] = useState(null); // 연결선 { w, h, pts }
  const [busy, setBusy] = useState(false); // 연출 중 입력 잠금
  const [reward, setReward] = useState(false); // 클리어 보상(사진) 모달
  const [activated, setActivated] = useState(() => new Set()); // 아래 슬롯에 박힌(점등) 스킬
  const [flyers, setFlyers] = useState([]); // 중앙 → 슬롯으로 날아가는 아이콘
  const [started, setStarted] = useState(false); // START 전 인트로 화면
  const boardRef = useRef(null);
  const slotRefs = useRef({}); // 스킬 index → eq-icon 엘리먼트
  const flyerId = useRef(0);

  // 보상 모달 ESC로 닫기
  useEffect(() => {
    if (!reward) return;
    const onKey = (e) => { if (e.key === 'Escape') setReward(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reward]);

  // 경로(그리드 좌표) → 보드 픽셀 좌표 (가상 테두리 셀도 균일 간격으로 외삽)
  const toPixels = (pathCells) => {
    const board = boardRef.current;
    if (!board) return null;
    const cs = getComputedStyle(board);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padT = parseFloat(cs.paddingTop) || 0;
    const gap = parseFloat(cs.columnGap || cs.gap) || 0;
    const W = board.clientWidth, H = board.clientHeight;
    const cellW = (W - padL * 2 - (COLS - 1) * gap) / COLS;
    const cellH = (H - padT * 2 - (ROWS - 1) * gap) / ROWS;
    const cx = (c) => padL + c * (cellW + gap) + cellW / 2;
    const cy = (r) => padT + r * (cellH + gap) + cellH / 2;
    return { w: W, h: H, pts: pathCells.map((p) => [cx(p.c), cy(p.r)]) };
  };

  const matchedCount = activated.size;
  const won = activated.size === N;

  const reset = () => {
    setTiles(makeBoard());
    setSelected(null); setHint([]); setBad(null); setMsg('');
    setReward(false); setActivated(new Set()); setFlyers([]);
  };
  const restart = reset;
  const begin = () => { reset(); setStarted(true); };

  // 매칭한 스킬 아이콘을 화면 중앙(살짝 크게) → 아래 슬롯으로 날려 "박는다". 도착 시 슬롯 점등.
  const launchFlyer = (skill) => {
    const finalize = () => {
      setActivated((prev) => {
        const next = new Set(prev).add(skill);
        if (next.size === N) setTimeout(() => setReward(true), 280);
        return next;
      });
    };
    const target = slotRefs.current[skill];
    if (!target) { finalize(); return; }
    const r = target.getBoundingClientRect(); // 실제 슬롯(아이콘+글자) 크기·위치
    const id = (flyerId.current += 1);
    // transform-origin: 0 0 → 화면중앙 2배 → 슬롯 위치 1배(정확히 겹침)
    const start = { tx: window.innerWidth / 2 - r.width, ty: window.innerHeight / 2 - r.height, s: 2 };
    const end = { tx: r.left, ty: r.top, s: 1 };
    setFlyers((fs) => [...fs, { id, skill, w: r.width, h: r.height, start, end, landing: false }]);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setFlyers((fs) => fs.map((f) => (f.id === id ? { ...f, landing: true } : f)));
    }));
    setTimeout(() => {
      setFlyers((fs) => fs.filter((f) => f.id !== id));
      finalize();
    }, 580);
  };

  const doReshuffle = (base, note) => {
    setTiles(reshuffle(base));
    setSelected(null);
    setHint([]);
    setMsg(note || '보드를 섞었어요.');
  };

  const showHint = () => {
    const p = findPair(tiles);
    if (!p) { doReshuffle(tiles, '연결할 짝이 없어 자동으로 섞었어요.'); return; }
    setHint(p);
    setMsg('');
    setTimeout(() => setHint([]), 1300);
  };

  const handleClick = (i) => {
    if (busy || tiles[i] === null || won) return;
    setMsg('');
    if (selected === null) { setSelected(i); return; }
    if (selected === i) { setSelected(null); return; }

    const a = selected;
    const route = tiles[a] === tiles[i] ? canConnect(tiles, rc(a), rc(i)) : null;
    if (route) {
      const snapshot = tiles;
      setBusy(true);
      setMatching([a, i]);
      setHint([]);
      setSelected(null);
      setPath(toPixels(route)); // 연결선 표시
      setTimeout(() => {
        const nt = snapshot.slice();
        nt[a] = null;
        nt[i] = null;
        setTiles(nt);
        setMatching([]);
        setPath(null);
        setBusy(false);
        launchFlyer(snapshot[a]); // 스킬 아이콘이 아래 슬롯으로 날아가 박힘 → 점등
        if (nt.some((v) => v !== null) && !findPair(nt)) {
          setTimeout(() => doReshuffle(nt, '막혔어요 — 자동으로 섞었어요.'), 400);
        }
      }, 380);
    } else {
      setBad(i);
      setTimeout(() => setBad(null), 320);
      setSelected(i);
    }
  };

  return (
    <section id="skills" style={styles.section}>
      <SectionHeading eyebrow="Skills" title="기술 스택" />

      {!started && (
        <div className="ss-intro">
          <p className="ss-intro-title arcade neon neon-cyan">사천성 — 기술 스택</p>
          <p style={styles.introText}>
            같은 기술 아이콘 <b>2장</b>을 <b>꺾임 2번 이하</b> 경로로 연결해 지우세요.
            짝을 맞추면 그 기술이 아래 인벤토리에 장착되고, <b>모두 맞추면</b> 보드 뒤에 숨겨진 사진이 공개됩니다.
          </p>
          <p style={styles.introMeta}>총 {N}종 · 막히면 힌트/섞기 · 어릴 적 사진이 보상</p>
          <button type="button" className="btn-arcade" onClick={begin}>START</button>
        </div>
      )}

      {started && (
      <div className="ss-toolbar">
        <span className={`arcade neon ${won ? 'neon-green' : 'neon-cyan'}`} style={styles.phase}>
          {won ? '◆ ALL CLEARED' : `◆ ${matchedCount}/${N} 활성화`}
        </span>
        <span style={styles.msg}>{msg}</span>
        <span className="spacer" />
        <button type="button" className="ss-btn" onClick={showHint} disabled={won}>힌트</button>
        <button type="button" className="ss-btn" onClick={() => doReshuffle(tiles)} disabled={won}>섞기</button>
        <button type="button" className="ss-btn" onClick={restart}>다시</button>
      </div>
      )}

      {started && (
      <div className="ss-board" ref={boardRef} style={{ '--cols': COLS, '--rows': ROWS, '--photo': `url(${PHOTO})` }}>
        <div className="ss-photo" aria-hidden="true" />
        {tiles.map((v, i) =>
          v === null ? (
            <span key={i} className="ss-cell empty" />
          ) : (
            <button
              key={i}
              type="button"
              className={`ss-tile${selected === i ? ' sel' : ''}${hint.includes(i) ? ' hint' : ''}${bad === i ? ' bad' : ''}${matching.includes(i) ? ' matching' : ''}`}
              style={{ '--cls': PARTS[v].color }}
              onClick={() => handleClick(i)}
              aria-label={PARTS[v].name}
            >
              <Icon id={PARTS[v].icon} />
            </button>
          )
        )}
        {path && (
          <svg className="ss-path" viewBox={`0 0 ${path.w} ${path.h}`} preserveAspectRatio="none" aria-hidden="true">
            <polyline points={path.pts.map((p) => p.join(',')).join(' ')} />
          </svg>
        )}
        {won && (
          <div className="ss-win">
            <span className="arcade neon neon-green" style={styles.winTitle}>ALL CLEARED ✓</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" className="ss-btn" onClick={() => setReward(true)}>사진 보기</button>
              <button type="button" className="ss-btn" onClick={restart}>다시</button>
            </div>
          </div>
        )}
      </div>
      )}

      {/* 클리어 보상 — 어릴 적 사진 (선명하게) */}
      {reward && (
        <div className="ss-reward-overlay" onClick={() => setReward(false)}>
          <div className="ss-reward" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="ss-reward-close" onClick={() => setReward(false)} aria-label="닫기">✕</button>
            <span className="ss-reward-badge arcade neon neon-green">CLEAR 보상 🎉</span>
            <img src={PHOTO} alt="김현복 어릴 적 사진" />
            <p className="ss-reward-cap">어릴 적의 김현복 👶</p>
          </div>
        </div>
      )}

      {/* 아래: 짝을 맞출 때마다 활성화되는 기술 인벤토리 */}
      <div className="inv-classes" style={{ marginTop: '1.4rem' }}>
        {CLASSES.map((cls, ci) => {
          const allOn = cls.items.every((_, ii) => activated.has(OFFSETS[ci] + ii));
          return (
            <div
              key={cls.id}
              className={`inv-class${allOn ? ' done' : ''}`}
              style={{ '--cls': cls.color, '--cls-soft': cls.color + '66', '--cls-faint': cls.color + '22' }}
            >
              <div className="inv-class-head">
                <span className="arcade inv-class-name">{cls.label}</span>
                {allOn && <span className="arcade inv-class-badge">READY ✓</span>}
              </div>
              <div className="inv-class-slots">
                {cls.items.map((item, ii) => {
                  const gi = OFFSETS[ci] + ii;
                  const active = activated.has(gi);
                  return (
                    <div key={item.name} className={`eq-slot${active ? ' filled' : ''}`} ref={(el) => { slotRefs.current[gi] = el; }}>
                      <span className="eq-icon"><Icon id={item.icon} /></span>
                      <span className="eq-name">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 중앙(2배) → 아래 슬롯(1배)으로 날아가 박히는 스킬 슬롯 복제본 */}
      {flyers.map((f) => {
        const color = PARTS[f.skill].color;
        return (
          <div
            key={f.id}
            className="ss-flyer"
            style={{
              width: f.w,
              height: f.h,
              '--cls': color,
              '--cls-soft': color + '66',
              '--cls-faint': color + '22',
              transform: f.landing
                ? `translate(${f.end.tx}px, ${f.end.ty}px) scale(${f.end.s})`
                : `translate(${f.start.tx}px, ${f.start.ty}px) scale(${f.start.s})`,
            }}
            aria-hidden="true"
          >
            <div className="eq-slot filled">
              <span className="eq-icon"><Icon id={PARTS[f.skill].icon} /></span>
              <span className="eq-name">{PARTS[f.skill].name}</span>
            </div>
          </div>
        );
      })}

      <SectionNext to="projects" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '880px', margin: '0 auto' },
  phase: { fontSize: '0.58rem', letterSpacing: '0.06em' },
  msg: { fontSize: '0.72rem', color: 'var(--neon-yellow)', fontFamily: 'var(--font-mono)' },
  winTitle: { fontSize: '0.85rem' },
  introText: { color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.9, margin: '0.4rem 0' },
  introMeta: { color: 'var(--text-mute)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', margin: '0.2rem 0 1.1rem' },
};
