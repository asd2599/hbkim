import useScrollAnimation from '../../hooks/useScrollAnimation';
import SectionHeading from '../../components/SectionHeading';
import SectionNext from '../../components/SectionNext';
import { curriculum } from '../../data/teaching';

export default function Curriculum() {
  const ref = useScrollAnimation(100);

  return (
    <section id="curriculum" style={styles.section}>
      <SectionHeading
        eyebrow="Curriculum"
        title="강의 가능 주제"
        subtitle="게임 프로그래밍부터 AI 활용·바이브 코딩까지 — 요청에 맞춰 커리큘럼을 설계합니다."
      />

      <div ref={ref} className="t-grid-2">
        {curriculum.map((track) => (
          <article key={track.track} className="project-card" style={styles.card}>
            <h3 style={styles.title}>{track.track}</h3>
            <p style={styles.blurb}>{track.blurb}</p>
            <ul style={styles.topics}>
              {track.topics.map((t) => (
                <li key={t} style={styles.topic}>
                  <span style={styles.bullet}>▹</span>
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <SectionNext to="t-contact" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' },
  card: { gap: '0.7rem' },
  title: { fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' },
  blurb: { fontSize: '0.9rem', color: 'var(--text-mute)', lineHeight: 1.6 },
  topics: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.3rem 0 0', padding: 0 },
  topic: { display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5 },
  bullet: { color: 'var(--accent)', flexShrink: 0 },
};
