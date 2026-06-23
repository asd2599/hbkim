import useTypewriter from '../../hooks/useTypewriter';
import SectionNext from '../../components/SectionNext';
import { teachingProfile } from '../../data/teaching';

export default function TeachHero() {
  const typed = useTypewriter(teachingProfile.typing);

  return (
    <section id="t-hero" style={styles.section}>
      <div className="hero-text" style={styles.inner}>
        <span className="eyebrow">{teachingProfile.eyebrow}</span>
        <h1 style={styles.headline}>{teachingProfile.headline}</h1>

        <p style={styles.typingLine}>
          <span style={styles.typingText}>{typed}</span>
          <span className="type-cursor">▌</span>
        </p>

        <p style={styles.sub}>{teachingProfile.sub}</p>
        <p style={styles.intro}>{teachingProfile.intro}</p>
      </div>

      <SectionNext to="philosophy" />
    </section>
  );
}

const styles = {
  section: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' },
  inner: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  headline: { fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.25, margin: '0.4rem 0' },
  typingLine: { fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 2.2vw, 1.35rem)', color: 'var(--accent)', minHeight: '1.8em', margin: '0.6rem 0' },
  typingText: { fontWeight: 600 },
  sub: { color: 'var(--text-dim)', fontSize: '1.05rem', fontWeight: 600, marginTop: '0.5rem' },
  intro: { color: 'var(--text-mute)', fontSize: '1rem', lineHeight: 1.85, maxWidth: '640px', marginTop: '0.3rem' },
};
