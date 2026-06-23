import useScrollAnimation from '../../hooks/useScrollAnimation';
import SectionHeading from '../../components/SectionHeading';
import SectionNext from '../../components/SectionNext';
import { teachingHistory } from '../../data/teaching';

export default function TeachHistory() {
  const ref = useScrollAnimation(100);

  return (
    <section id="history" style={styles.section}>
      <SectionHeading
        eyebrow="History"
        title="강의 이력"
        subtitle="국비·국기 과정에서 게임 프로그래밍을 가르친 기록."
      />

      <div ref={ref} style={styles.list}>
        {teachingHistory.map((h) => (
          <article key={h.org + h.period} className="project-card" style={styles.card}>
            <div style={styles.head}>
              <div>
                <h3 style={styles.org}>{h.org}</h3>
                <span style={styles.role}>{h.role}</span>
              </div>
              <span style={styles.period}>{h.period}</span>
            </div>

            <p style={styles.desc}>{h.desc}</p>

            <div style={styles.metaRow}>
              {h.courseType && <span style={styles.metaTag}>{h.courseType}</span>}
              {h.audience && <span style={styles.metaTag}>대상 · {h.audience}</span>}
            </div>

            {h.subjects?.length > 0 && (
              <div style={styles.subjects}>
                {h.subjects.map((s) => (
                  <span key={s} className="tech-chip" style={styles.chip}>{s}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <SectionNext to="curriculum" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' },
  list: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  card: { gap: '0.85rem' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' },
  org: { fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' },
  role: { fontSize: '0.85rem', color: 'var(--accent-2)' },
  period: { fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-mute)', whiteSpace: 'nowrap' },
  desc: { fontSize: '0.92rem', color: 'var(--text-mute)', lineHeight: 1.7 },
  metaRow: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  metaTag: { fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', padding: '0.25rem 0.6rem', border: '1px solid var(--border-2)', borderRadius: '999px' },
  subjects: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  chip: { fontSize: '0.78rem' },
};
