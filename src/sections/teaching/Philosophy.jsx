import useScrollAnimation from '../../hooks/useScrollAnimation';
import SectionHeading from '../../components/SectionHeading';
import SectionNext from '../../components/SectionNext';
import { philosophy } from '../../data/teaching';

export default function Philosophy() {
  const ref = useScrollAnimation(100);

  return (
    <section id="philosophy" style={styles.section}>
      <SectionHeading
        eyebrow="Philosophy"
        title="교육 철학"
        subtitle="어떤 마음으로, 어떻게 가르치는가."
      />

      <div ref={ref} className="t-grid-2">
        {philosophy.map((p) => (
          <article key={p.title} className="project-card" style={styles.card}>
            <h3 style={styles.title}>{p.title}</h3>
            <p style={styles.desc}>{p.desc}</p>
          </article>
        ))}
      </div>

      <SectionNext to="history" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' },
  card: { gap: '0.6rem' },
  title: { fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' },
  desc: { fontSize: '0.92rem', color: 'var(--text-mute)', lineHeight: 1.7 },
};
