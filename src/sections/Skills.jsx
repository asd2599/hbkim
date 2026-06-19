import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import SectionNext from '../components/SectionNext';
import { skillClasses } from '../data/profile';

/* ────────────────────────────────────────────
   스킬 로봇 합체 — 파츠가 하나씩 자리에 "도킹"될 때(스냅+클랭)
   아래 해당 기술이 활성화된다. 합체 → 유지 → 흩어짐 → 재도킹 루프.
──────────────────────────────────────────── */

const CLASSES = skillClasses;
const PARTS = CLASSES.flatMap((c) => c.items.map((it) => ({ ...it, color: c.color })));
const N = PARTS.length;

// 클래스별 시작 인덱스(아래 목록 ↔ 도킹 순서 정합)
const OFFSETS = (() => {
  const out = [];
  let acc = 0;
  for (const c of CLASSES) { out.push(acc); acc += c.items.length; }
  return out;
})();

// 합체 시 파츠 위치(%)
const ASSEMBLED = [
  { x: 50, y: 11 }, { x: 37, y: 17 }, { x: 63, y: 17 }, { x: 50, y: 31 },
  { x: 30, y: 31 }, { x: 70, y: 31 }, { x: 50, y: 45 }, { x: 19, y: 50 },
  { x: 81, y: 50 }, { x: 50, y: 60 }, { x: 41, y: 83 }, { x: 59, y: 83 },
];

// 흩어진 위치(타원) — 결정적
const SCATTERED = PARTS.map((_, i) => {
  const a = (i / N) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * 42, y: 50 + Math.sin(a) * 40, rot: ((i * 53) % 80) - 40 };
});

const DOCK_INTERVAL = 230; // 파츠 한 개씩 도킹 간격
const HOLD_MS = 1900;      // 완전 합체 유지
const SCATTER_HOLD = 1300; // 흩어진 채 유지
const START_DELAY = 450;

const Icon = ({ id }) => (
  <svg className="skill-svg" aria-hidden="true">
    <use href={`/skill-icons.svg#${id}`} />
  </svg>
);

export default function Skills() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [docked, setDocked] = useState(reduced ? N : 0);
  const stageRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const el = stageRef.current;
    if (!el) return;
    let t = 0;
    let started = false;
    let d = 0;

    const assembleNext = () => {
      d += 1;
      setDocked(d);
      t = setTimeout(d < N ? assembleNext : scatter, d < N ? DOCK_INTERVAL : HOLD_MS);
    };
    const scatter = () => {
      d = 0;
      setDocked(0);
      t = setTimeout(assembleNext, SCATTER_HOLD);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          t = setTimeout(assembleNext, START_DELAY);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [reduced]);

  const complete = docked >= N;

  return (
    <section id="skills" style={styles.section}>
      <SectionHeading eyebrow="Skills" title="기술 스택" />

      <div style={styles.status}>
        <div style={styles.legendDots}>
          {CLASSES.map((c) => (
            <span key={c.id} style={styles.legendItem}>
              <span style={{ ...styles.dot, background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
              {c.label}
            </span>
          ))}
        </div>
        <span className={`arcade neon ${complete ? 'neon-green' : 'neon-cyan'}`} style={styles.phaseText}>
          {complete ? '◆ COMBINE COMPLETE' : `◆ DOCKING ${docked}/${N}`}
        </span>
      </div>

      {/* 로봇 합체 스테이지 */}
      <div ref={stageRef} className="mech-stage">
        <svg className={`mech-frame${complete ? ' on' : ''}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points="50,11 50,31 50,45 50,60" />
          <line x1="30" y1="31" x2="70" y2="31" />
          <line x1="30" y1="31" x2="19" y2="50" />
          <line x1="70" y1="31" x2="81" y2="50" />
          <line x1="50" y1="60" x2="41" y2="83" />
          <line x1="50" y1="60" x2="59" y2="83" />
          <line x1="50" y1="11" x2="37" y2="17" />
          <line x1="50" y1="11" x2="63" y2="17" />
        </svg>
        <span className={`mech-core-glow${docked > 0 ? ' on' : ''}`} />

        {PARTS.map((p, i) => {
          const on = i < docked;
          const pos = on ? ASSEMBLED[i] : SCATTERED[i];
          const rot = on ? 0 : SCATTERED[i].rot;
          return (
            <div
              key={p.name}
              className={`mech-part${on ? ' docked' : ''}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                color: p.color,
                '--cls': p.color,
              }}
            >
              <span className="mech-icon"><Icon id={p.icon} /></span>
              <span className="mech-label">{p.name}</span>
            </div>
          );
        })}
      </div>

      {/* 아래: 도킹될 때마다 활성화되는 기술 목록 */}
      <div className="inv-classes" style={{ marginTop: '1.4rem' }}>
        {CLASSES.map((cls, ci) => {
          const allOn = OFFSETS[ci] + cls.items.length <= docked;
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
                  const active = OFFSETS[ci] + ii < docked;
                  return (
                    <div key={item.name} className={`eq-slot${active ? ' filled' : ''}`}>
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

      <SectionNext to="projects" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '880px', margin: '0 auto' },
  status: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem',
  },
  legendDots: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  legendItem: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' },
  dot: { width: 8, height: 8, borderRadius: '50%' },
  phaseText: { fontSize: '0.58rem', letterSpacing: '0.06em' },
};
