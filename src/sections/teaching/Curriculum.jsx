import { useEffect, useRef, useState } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import SectionHeading from '../../components/SectionHeading';
import SectionNext from '../../components/SectionNext';
import { addScore, unlock } from '../../components/teaching/arcadeStore';
import { curriculum } from '../../data/teaching';

const TOTAL = curriculum.reduce((n, t) => n + t.topics.length, 0);
const key = (t, i) => `${t}-${i}`;

export default function Curriculum() {
  const ref = useScrollAnimation(100);
  const [open, setOpen] = useState(() => new Set());
  const timers = useRef([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  // 순차 해금(setTimeout) 중에도 최신 상태를 보도록 ref 에 미러링한다.
  // 갱신은 이벤트 핸들러/타이머 안에서만 일어나므로 렌더 중 ref 접근은 없다.
  const openRef = useRef(open);

  const unlockNode = (t, i) => {
    const k = key(t, i);
    if (openRef.current.has(k)) return;
    const next = new Set(openRef.current).add(k);
    openRef.current = next;
    addScore(35);
    setOpen(next);
  };

  // 루트 노드를 누르면 하위 노드가 순차적으로 해금된다
  const unlockTrack = (t) => {
    curriculum[t].topics.forEach((_, i) => {
      timers.current.push(setTimeout(() => unlockNode(t, i), i * 180));
    });
  };

  useEffect(() => {
    if (open.size === TOTAL) unlock('tree-master');
  }, [open]);

  return (
    <section id="curriculum" style={styles.section}>
      <SectionHeading
        eyebrow="Skill Tree"
        title="강의 가능 주제"
        subtitle="Code Agent·AI 활용 강의부터 게임 프로그래밍까지 — 노드를 눌러 해금해 보세요."
      />

      <div ref={ref} className="tree">
        {curriculum.map((track, t) => {
          const done = track.topics.filter((_, i) => open.has(key(t, i))).length;
          const all = track.topics.length;

          return (
            <div key={track.track} className={`tree-branch${done === all ? ' maxed' : ''}`}>
              <button type="button" className="tree-root" onClick={() => unlockTrack(t)}>
                <span className="tree-root-top">
                  <span className="tree-node-dot" />
                  <h3 className="tree-track">{track.track}</h3>
                  <span className="tree-count arcade">{done}/{all}</span>
                </span>
                <p className="tree-blurb">{track.blurb}</p>
                <span className="tree-gauge"><i style={{ width: `${(done / all) * 100}%` }} /></span>
                <span className="tree-cta arcade">
                  {done === all ? '✓ MAXED' : '▸ UNLOCK ALL'}
                </span>
              </button>

              <ul className="tree-nodes">
                {track.topics.map((topic, i) => {
                  const on = open.has(key(t, i));
                  return (
                    <li key={topic}>
                      <button
                        type="button"
                        className={`tree-node${on ? ' on' : ''}`}
                        onClick={() => unlockNode(t, i)}
                        aria-pressed={on}
                      >
                        <span className="tree-node-icon arcade">{on ? '★' : '🔒'}</span>
                        <span className="tree-node-label">{topic}</span>
                        {on && <span className="tree-node-xp arcade">+35</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <SectionNext to="arcade" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '980px', margin: '0 auto' },
};
