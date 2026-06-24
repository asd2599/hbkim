import useTypewriter from '../../hooks/useTypewriter';
import SectionNext from '../../components/SectionNext';
import Chatbot from '../../components/Chatbot';
import { teachingProfile } from '../../data/teaching';

const CHAT_SUGGESTIONS = [
  '어떤 과목을 가르치나요?',
  '강의 경력이 얼마나 되나요?',
  '비전공자도 따라갈 수 있나요?',
  'AI 활용 수업도 가능한가요?',
];

export default function TeachHero() {
  const typed = useTypewriter(teachingProfile.typing);

  return (
    <section id="t-hero" style={styles.section}>
      <div className="teach-hero-grid">
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

        <div className="teach-hero-chat">
          <Chatbot
            subtitle="강의 Q&A"
            greeting="안녕하세요, 김현봇입니다! 강의 경력·과목·교육 방식이 궁금하시면 편하게 물어보세요."
            suggestions={CHAT_SUGGESTIONS}
            placeholder="강의에 대해 궁금한 점을 물어보세요"
          />
        </div>
      </div>

      <SectionNext to="philosophy" />
    </section>
  );
}

const styles = {
  section: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 2rem', maxWidth: '1120px', margin: '0 auto' },
  inner: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  headline: { fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.25, margin: '0.4rem 0' },
  typingLine: { fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 2.2vw, 1.35rem)', color: 'var(--accent)', minHeight: '1.8em', margin: '0.6rem 0' },
  typingText: { fontWeight: 600 },
  sub: { color: 'var(--text-dim)', fontSize: '1.05rem', fontWeight: 600, marginTop: '0.5rem' },
  intro: { color: 'var(--text-mute)', fontSize: '1rem', lineHeight: 1.85, maxWidth: '640px', marginTop: '0.3rem' },
};
