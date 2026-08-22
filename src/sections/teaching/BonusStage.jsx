import { useCallback, useEffect, useRef, useState } from 'react';
import SectionHeading from '../../components/SectionHeading';
import SectionNext from '../../components/SectionNext';
import { addScore, unlock } from '../../components/teaching/arcadeStore';
import { bonusStage } from '../../data/teaching';

/* ────────────────────────────────────────────
   보너스 스테이지 — 버그 잡기
   3x3 코드 블록에서 버그가 튀어나온다. 눌러서 잡으면 점수 + 콤보.
   정상 코드를 누르면 감점·콤보 초기화, 코드 에이전트를 누르면
   화면의 버그를 한 번에 정리한다. 최고 기록은 localStorage 에 남는다.
──────────────────────────────────────────── */

const SIZE = 9;
const DURATION = 25;      // 초
const TICK = 260;         // 보드 갱신 주기(ms)
const BEST_KEY = 'hbkim.bonus.best';

// 이모지는 코드포인트로 둬서 인코딩 사고를 피한다
const FACE = { bug: '\u{1F41B}', agent: '\u{1F916}', decoy: '✅' };

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeBest = (v) => {
  try {
    localStorage.setItem(BEST_KEY, String(v));
  } catch {
    /* 저장 불가 환경(사생활 보호 모드 등)은 무시 */
  }
};

export default function BonusStage() {
  const [phase, setPhase] = useState('ready'); // ready | play | over
  const [cells, setCells] = useState(() => Array(SIZE).fill(null));
  const [time, setTime] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [best, setBest] = useState(readBest);
  const [flash, setFlash] = useState(null);

  const scoreRef = useRef(0);
  const hitsRef = useRef(0);
  const flashTimer = useRef(null);

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  const showFlash = (text, kind) => {
    clearTimeout(flashTimer.current);
    // id 는 애니메이션 재생을 위한 리마운트 키 — 이전 값에서 증가시킨다
    setFlash((prev) => ({ text, kind, id: (prev?.id ?? 0) + 1 }));
    flashTimer.current = setTimeout(() => setFlash(null), 700);
  };

  // ── 보드 루프: 만료된 타깃 제거 + 새 타깃 등장 ──
  useEffect(() => {
    if (phase !== 'play') return undefined;
    const id = setInterval(() => {
      setCells((prev) => {
        const now = Date.now();
        const next = prev.map((c) => (c && c.until <= now ? null : c));
        const empty = [];
        next.forEach((c, i) => { if (!c) empty.push(i); });
        if (empty.length && Math.random() < 0.6) {
          const idx = pick(empty);
          const r = Math.random();
          const kind = r < 0.08 ? 'agent' : r < 0.3 ? 'decoy' : 'bug';
          next[idx] = {
            id: `${now}-${idx}`,
            kind,
            label: kind === 'agent' ? pick(bonusStage.agentLabels)
              : kind === 'decoy' ? '정상 코드'
                : pick(bonusStage.bugLabels),
            until: now + (kind === 'agent' ? 1050 : 1300),
          };
        }
        return next;
      });
    }, TICK);
    return () => clearInterval(id);
  }, [phase]);

  const finish = useCallback(() => {
    setPhase('over');
    setCells(Array(SIZE).fill(null));

    const finalScore = scoreRef.current;
    const finalHits = hitsRef.current;

    if (finalScore > readBest()) {
      writeBest(finalScore);
      setBest(finalScore);
    }
    if (finalScore > 0) addScore(finalScore, { combo: false });
    unlock('bug-hunter');
    if (finalHits >= 30) unlock('bug-legend');
  }, []);

  // ── 제한 시간: 매초 카운트다운 + 종료 예약 ──
  useEffect(() => {
    if (phase !== 'play') return undefined;
    const tick = setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    const end = setTimeout(finish, DURATION * 1000);
    return () => { clearInterval(tick); clearTimeout(end); };
  }, [phase, finish]);

  const start = () => {
    scoreRef.current = 0;
    hitsRef.current = 0;
    setScore(0);
    setHits(0);
    setCombo(0);
    setMaxCombo(0);
    setTime(DURATION);
    setCells(Array(SIZE).fill(null));
    setFlash(null);
    setPhase('play');
  };

  const bump = (delta) => {
    scoreRef.current = Math.max(0, scoreRef.current + delta);
    setScore(scoreRef.current);
  };

  const strike = (i) => {
    if (phase !== 'play') return;
    const cell = cells[i];

    if (!cell) {
      setCombo(0);
      showFlash('MISS', 'miss');
      return;
    }

    if (cell.kind === 'decoy') {
      setCells((prev) => prev.map((c, k) => (k === i ? null : c)));
      setCombo(0);
      bump(-5);
      showFlash('정상 코드! -5', 'bad');
      return;
    }

    if (cell.kind === 'agent') {
      const cleared = cells.filter((c) => c && c.kind === 'bug').length;
      setCells((prev) => prev.map((c) => (c && c.kind !== 'decoy' ? null : c)));
      const gain = 50 + cleared * 20;
      hitsRef.current += cleared;
      setHits(hitsRef.current);
      bump(gain);
      showFlash(`${cell.label} 투입! +${gain}`, 'boost');
      return;
    }

    // 버그 처치
    setCells((prev) => prev.map((c, k) => (k === i ? null : c)));
    const nextCombo = combo + 1;
    setCombo(nextCombo);
    setMaxCombo((m) => Math.max(m, nextCombo));
    hitsRef.current += 1;
    setHits(hitsRef.current);
    const gain = 10 + (nextCombo - 1) * 2;
    bump(gain);
    showFlash(`+${gain}${nextCombo > 2 ? ` x${nextCombo}` : ''}`, 'good');
  };

  return (
    <section id="arcade" style={styles.section}>
      <SectionHeading
        eyebrow="Bonus Stage"
        title="버그 잡기"
        subtitle="쉬어가는 코너. 25초 동안 버그를 잡아보세요 — 정상 코드를 누르면 감점, 코드 에이전트를 잡으면 한 번에 정리됩니다."
      />

      <div className="bs-wrap">
        <div className="bs-hud">
          <span className="bs-hud-item">
            <b className="arcade">SCORE</b>
            <em className="arcade">{String(score).padStart(4, '0')}</em>
          </span>
          <span className="bs-hud-item">
            <b className="arcade">TIME</b>
            <em className={`arcade${time <= 5 && phase === 'play' ? ' danger' : ''}`}>{String(time).padStart(2, '0')}</em>
          </span>
          <span className="bs-hud-item">
            <b className="arcade">COMBO</b>
            <em className="arcade">x{combo}</em>
          </span>
          <span className="bs-hud-item">
            <b className="arcade">BEST</b>
            <em className="arcade">{String(best).padStart(4, '0')}</em>
          </span>
        </div>

        <div className={`bs-board${phase === 'play' ? ' live' : ''}`}>
          {cells.map((cell, i) => (
            <button
              key={i}
              type="button"
              className="bs-cell"
              onClick={() => strike(i)}
              disabled={phase !== 'play'}
              aria-label={cell ? cell.label : '빈 코드 블록'}
            >
              {cell && (
                <span key={cell.id} className={`bs-target bs-${cell.kind}`}>
                  <i className="bs-face">{FACE[cell.kind]}</i>
                  <em className="bs-tag">{cell.label}</em>
                </span>
              )}
            </button>
          ))}

          {flash && (
            <span key={flash.id} className={`bs-flash bs-flash-${flash.kind} arcade`}>{flash.text}</span>
          )}

          {phase !== 'play' && (
            <div className="bs-overlay">
              {phase === 'ready' ? (
                <>
                  <p className="arcade arcade-blink bs-overlay-title">PRESS START</p>
                  <p className="bs-overlay-sub">버그는 잡고, 정상 코드는 피하세요.</p>
                  <button type="button" className="btn-arcade" onClick={start}>START</button>
                </>
              ) : (
                <>
                  <p className="arcade bs-overlay-title">STAGE CLEAR</p>
                  <p className="bs-overlay-sub">
                    SCORE {score} · 처치 {hits}마리 · 최고 콤보 x{maxCombo}
                    {score > 0 && score >= best ? ' · 신기록!' : ''}
                  </p>
                  <button type="button" className="btn-arcade" onClick={start}>RETRY</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <SectionNext to="t-contact" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '820px', margin: '0 auto' },
};
