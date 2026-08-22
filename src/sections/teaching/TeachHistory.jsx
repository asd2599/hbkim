import { useEffect, useRef, useState } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import SectionHeading from '../../components/SectionHeading';
import SectionNext from '../../components/SectionNext';
import { addScore, unlock } from '../../components/teaching/arcadeStore';
import { teachingHistory } from '../../data/teaching';

const RANKS = ['S', 'A', 'A', 'B', 'B', 'C'];

export default function TeachHistory() {
  const ref = useScrollAnimation(100);
  const sectionRef = useRef(null);
  const timers = useRef([]);
  const [opened, setOpened] = useState(() => new Set());

  const open = (i) => {
    setOpened((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  };

  // 스크롤로 들어오면 퀘스트가 순차적으로 열린다 — 클릭하지 않아도 보상 내용이 드러나도록.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        teachingHistory.forEach((_, i) => {
          timers.current.push(setTimeout(() => open(i), 900 + i * 520));
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    const t = timers.current;
    return () => { io.disconnect(); t.forEach(clearTimeout); };
  }, []);

  // 자동 공개보다 먼저 누르면 보너스 점수
  const claim = (i) => {
    if (opened.has(i)) return;
    addScore(60);
    open(i);
  };

  useEffect(() => {
    if (opened.size === teachingHistory.length) unlock('quest-clear');
  }, [opened]);

  return (
    <section id="history" ref={sectionRef} style={styles.section}>
      <SectionHeading
        eyebrow="Quest Log"
        title="강의 이력"
        subtitle="Code Agent·AI 활용 강의부터 국비·국기 과정 게임 프로그래밍까지 — 퀘스트를 눌러 보상을 확인하세요."
      />

      <div ref={ref} className="quest-log">
        {teachingHistory.map((h, i) => {
          const active = h.period.includes('현재');
          const questNo = String(teachingHistory.length - i).padStart(2, '0');
          const isOpen = opened.has(i);

          return (
            <article
              key={h.org + h.period}
              className={`quest${active ? ' active' : ''}${isOpen ? ' opened' : ''}`}
              onClick={() => claim(i)}
            >
              <div className="quest-rail">
                <span className="quest-rank arcade">{RANKS[i] || 'C'}</span>
              </div>

              <div className="quest-body">
                <div className="quest-top">
                  <span className="quest-no arcade">QUEST {questNo}</span>
                  <span className={`quest-status arcade${active ? ' on' : ''}`}>
                    {active ? '● IN PROGRESS' : '✓ CLEARED'}
                  </span>
                </div>

                <div className="quest-head">
                  <div>
                    <h3 className="quest-org">{h.org}</h3>
                    <span className="quest-role">{h.role}</span>
                  </div>
                  <span className="quest-period">{h.period}</span>
                </div>

                <p className="quest-desc">{h.desc}</p>

                <div className="quest-meta">
                  {h.courseType && <span className="quest-tag">{h.courseType}</span>}
                  {h.audience && <span className="quest-tag">대상 · {h.audience}</span>}
                </div>

                {h.subjects?.length > 0 && (
                  <div className="quest-loot">
                    <span className="quest-loot-label arcade">
                      {isOpen ? '✓ REWARD' : 'REWARD ▸ 클릭해서 먼저 열기'}
                    </span>
                    <div className="quest-loot-items">
                      {h.subjects.map((s, k) => (
                        <span
                          key={s}
                          className="loot-chip"
                          style={{ transitionDelay: `${k * 70}ms` }}
                        >
                          + {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <SectionNext to="curriculum" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' },
};
