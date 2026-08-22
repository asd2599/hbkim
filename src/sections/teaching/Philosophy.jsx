import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../../components/SectionHeading';
import SectionNext from '../../components/SectionNext';
import { addScore, unlock } from '../../components/teaching/arcadeStore';
import { philosophy } from '../../data/teaching';

// 카드 등급(연출용). 내용은 data/teaching.js 가 단일 소스.
const RARITY = ['RARE', 'RARE', 'EPIC', 'LEGENDARY'];

function SkillCard({ item, rarity, revealed, onReveal }) {
  const ref = useRef(null);

  // 마우스 위치에 따라 3D 틸트 + 홀로그램 하이라이트
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(px - 0.5) * 16}deg`);
    el.style.setProperty('--rx', `${(0.5 - py) * 16}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  return (
    <button
      type="button"
      ref={ref}
      className={`sk-card${revealed ? ' revealed' : ''} rar-${rarity.toLowerCase()}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onReveal}
      aria-expanded={revealed}
    >
      <span className="sk-inner">
        {/* 뒷면 — 아직 공개되지 않은 카드 */}
        <span className="sk-face sk-back">
          <span className="sk-logo arcade">?</span>
          <span className="sk-hint arcade">TAP TO OPEN</span>
        </span>

        {/* 앞면 — 실제 교육 철학 */}
        <span className="sk-face sk-front">
          <span className="sk-rarity arcade">{rarity}</span>
          <strong className="sk-title">{item.title}</strong>
          <span className="sk-desc">{item.desc}</span>
        </span>
      </span>
    </button>
  );
}

export default function Philosophy() {
  const gridRef = useRef(null);
  const [revealed, setRevealed] = useState(() => new Set());
  const timers = useRef([]);

  // 스크롤로 들어오면 순차 자동 공개 — 내용이 영영 가려지지 않도록 보장한다.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        philosophy.forEach((_, i) => {
          timers.current.push(
            setTimeout(() => setRevealed((prev) => new Set(prev).add(i)), 500 + i * 420),
          );
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    const t = timers.current;
    return () => { io.disconnect(); t.forEach(clearTimeout); };
  }, []);

  // 자동 공개보다 먼저 누르면 보너스 점수
  const reveal = (i) => {
    if (revealed.has(i)) return;
    addScore(40);
    setRevealed((prev) => new Set(prev).add(i));
  };

  useEffect(() => {
    if (revealed.size === philosophy.length) unlock('card-master');
  }, [revealed]);

  return (
    <section id="philosophy" style={styles.section}>
      <SectionHeading
        eyebrow="Philosophy"
        title="교육 철학"
        subtitle="어떤 마음으로, 어떻게 가르치는가. 카드를 눌러 먼저 열어보세요."
      />

      <div ref={gridRef} className="sk-deck">
        {philosophy.map((p, i) => (
          <SkillCard
            key={p.title}
            item={p}
            rarity={RARITY[i] || 'RARE'}
            revealed={revealed.has(i)}
            onReveal={() => reveal(i)}
          />
        ))}
      </div>

      <SectionNext to="history" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '980px', margin: '0 auto' },
};
