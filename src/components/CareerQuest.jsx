import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';

/* ────────────────────────────────────────────
   경력 = 슈팅 격파 연출
   왼쪽 터렛이 총알을 쏘고, 오른쪽에서 경력(적)이 첫 경력부터 순서대로 등장.
   총알을 맞아 HP가 깎이다가 파괴되면 아래 QUEST LOG가 CLEARED로 점등.
   - 진입 시 자동 재생, REPLAY, prefers-reduced-motion이면 전부 격파 표시
──────────────────────────────────────────── */

// 이력서 career는 최신순 → 오래된순(첫 경력부터)으로 뒤집는다.
const QUESTS = [...profile.career].reverse();
const N = QUESTS.length;

const FRAGS = [[-34, -26], [36, -30], [-30, 22], [34, 26], [-6, -40], [8, 36], [-44, 2], [44, 6]];
const questIcon = (role) => (role.includes('강사') ? '🎓' : '🎮');

const INCOMING_MS = 360;
const TRAVEL_MS = 2600;   // 보스가 우→좌로 이동하는 시간 (CSS .boss.battle / .boss-hpfill 과 일치)
const DESTROY_MS = 650;
const START_DELAY = 450;
const START_X = 92;       // 보스 시작 위치 (left %)
const END_X = 6;          // 끝(터렛 근처) 위치 — 여기 닿으면 폭발

export default function CareerQuest() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [statuses, setStatuses] = useState(() => QUESTS.map(() => (reduced ? 'cleared' : 'locked')));
  // active: 현재 화면의 적 { idx, phase: idle|incoming|battle|destroyed|done, x(left %) }
  const [active, setActive] = useState(reduced ? { idx: N, phase: 'done', x: END_X } : { idx: 0, phase: 'idle', x: START_X });
  const [runId, setRunId] = useState(0);

  const rootRef = useRef(null);
  const startedRef = useRef(reduced);

  const cleared = statuses.filter((s) => s === 'cleared').length;
  const done = active.phase === 'done';
  const showBoss = active.idx < N && (active.phase === 'incoming' || active.phase === 'battle' || active.phase === 'destroyed');
  const firing = active.phase === 'battle';
  const enemy = active.idx < N ? QUESTS[active.idx] : null;
  // 무기 강화 단계 = 지금까지 격파한 경력 수
  const tier = Math.min(active.idx < N ? active.idx : N, 3);
  const shotCount = 2 + (active.idx < N ? active.idx : 0);

  // 진입 시 1회 시작
  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setRunId(1);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // 격파 시퀀스 — 보스가 우→좌로 이동하다 끝에 닿으면 폭발 (모든 setState는 타이머 콜백 안)
  useEffect(() => {
    if (runId === 0) return;
    const timers = [];
    let idx = 0;

    const spawn = () => {
      setActive({ idx, phase: 'incoming', x: START_X });
      timers.push(setTimeout(battle, INCOMING_MS));
    };
    const battle = () => {
      // 왼쪽으로 이동 시작 (CSS transition) + HP 게이지 드레인
      setActive((a) => ({ ...a, phase: 'battle', x: END_X }));
      timers.push(setTimeout(boom, TRAVEL_MS));
    };
    const boom = () => {
      const killedIdx = idx;
      setActive((a) => ({ ...a, phase: 'destroyed' }));
      setStatuses((s) => s.map((v, i) => (i === killedIdx ? 'cleared' : v)));
      idx += 1;
      timers.push(setTimeout(idx < N ? spawn : finish, DESTROY_MS));
    };
    const finish = () => setActive({ idx: N, phase: 'done', x: END_X });

    timers.push(setTimeout(spawn, START_DELAY));
    return () => timers.forEach(clearTimeout);
  }, [runId]);

  const replay = () => {
    setStatuses(QUESTS.map(() => 'locked'));
    setActive({ idx: 0, phase: 'idle', x: START_X });
    setRunId((r) => r + 1);
  };

  return (
    <div className="quest-rpg" ref={rootRef}>
      <div className="quest-hud">
        <span className="arcade" style={st.hudTitle}>◆ QUEST LOG — CAREER</span>
        <span className="arcade" style={st.hudCount}>{cleared}/{N} CLEARED</span>
        {!reduced && (
          <button type="button" className="inv2-reset arcade" onClick={replay} disabled={runId > 0 && !done}>
            REPLAY
          </button>
        )}
      </div>

      {/* 슈팅 아레나 */}
      <div className="shoot-arena">
        {/* 좌측 터렛 (격파할수록 강화) */}
        <div className={`turret t${tier} ${firing ? 'firing' : ''}`} aria-hidden="true" />

        {/* 총알 스트림 (교전 중에만, 강화될수록 더 많고 굵게) */}
        {firing &&
          Array.from({ length: shotCount }).map((_, i) => (
            <span key={`shot-${i}`} className={`shot t${tier}`} style={{ animationDelay: `${i * 0.13}s` }} />
          ))}

        {/* 무기 강화 토스트 */}
        {cleared > 0 && !done && (
          <span key={`wp-${cleared}`} className="inv-toast arcade neon neon-yellow">
            WEAPON UP ▸ LV.{cleared + 1}
          </span>
        )}

        {/* 경력 적 — 우→좌 이동, 끝에 닿으면 폭발 */}
        {showBoss && enemy && (
          <div key={`boss-${active.idx}`} className={`boss ${active.phase}`} style={{ left: `${active.x}%` }}>
            <div className="boss-top">
              <span className="boss-icon">{questIcon(enemy.role)}</span>
              <span className="boss-name">{enemy.company}</span>
              <span className="boss-sub">{enemy.period}</span>
            </div>
            <div className="boss-role">{enemy.role}</div>
            <p className="boss-desc">{enemy.desc}</p>
            <div className="boss-hpbar">
              <div className="boss-hpfill" />
            </div>
            {active.phase === 'destroyed' &&
              FRAGS.map(([fx, fy], fi) => (
                <span key={fi} className="frag" style={{ '--fx': `${fx}px`, '--fy': `${fy}px` }} />
              ))}
          </div>
        )}

        {/* 전부 격파 */}
        {done && (
          <div className="arena-clear arcade neon neon-cyan">
            ALL CLEARED
            <small>▸ AI SERVICE ENGINEER 도달</small>
          </div>
        )}
      </div>

      {/* QUEST LOG 상세 */}
      <div className="qlog">
        {QUESTS.map((q, i) => {
          const isCleared = statuses[i] === 'cleared';
          const isActive = active.idx === i && (active.phase === 'battle' || active.phase === 'incoming');
          return (
            <div key={q.company} className={`qlog-item${isCleared ? ' cleared' : ''}${isActive ? ' active' : ''}`}>
              <span className="qlog-icon">{questIcon(q.role)}</span>
              <div style={st.qlogBody}>
                <div style={st.qlogTop}>
                  <span style={st.qlogCompany}>{q.company}</span>
                  <span style={st.qlogRole}>{q.role}</span>
                  <span style={st.qlogPeriod}>{q.period}</span>
                </div>
                <p style={st.qlogDesc}>{q.desc}</p>
              </div>
              <span className={`qlog-badge${isCleared ? ' on' : ''}`}>{isCleared ? 'CLEARED ✓' : 'LOCKED'}</span>
            </div>
          );
        })}
        {/* 골(현재) */}
        <div className={`qlog-item goal${done ? ' cleared' : ''}`}>
          <span className="qlog-icon">🚀</span>
          <div style={st.qlogBody}>
            <div style={st.qlogTop}>
              <span style={st.qlogCompany}>AI Service Engineer</span>
              <span style={st.qlogPeriod}>2026 ~</span>
            </div>
            <p style={st.qlogDesc}>게임 개발·교육 10년 → AI 풀스택으로 전직. 다음 퀘스트를 시작합니다.</p>
          </div>
          <span className={`qlog-badge${done ? ' on' : ''}`}>{done ? 'NOW ▸' : 'NEXT'}</span>
        </div>
      </div>
    </div>
  );
}

const st = {
  hudTitle: { fontSize: '0.6rem', color: 'var(--neon-cyan)', letterSpacing: '0.08em' },
  hudCount: { fontSize: '0.55rem', color: 'var(--neon-green)', marginLeft: '0.5rem' },

  qlogBody: { flex: 1, minWidth: 0 },
  qlogTop: { display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' },
  qlogCompany: { fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' },
  qlogRole: { fontSize: '0.78rem', color: 'var(--accent-2)' },
  qlogPeriod: { fontSize: '0.72rem', color: 'var(--text-mute)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' },
  qlogDesc: { fontSize: '0.86rem', color: 'var(--text-mute)', lineHeight: 1.65 },
};
