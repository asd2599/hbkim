import useScrollAnimation from '../hooks/useScrollAnimation';
import SectionHeading from '../components/SectionHeading';
import CareerQuiz from '../components/CareerQuiz';
import SectionNext from '../components/SectionNext';
import { profile } from '../data/profile';

export default function About() {
  const summaryRef = useScrollAnimation(100);

  return (
    <section id="about" style={styles.section}>
      <SectionHeading
        eyebrow="About"
        title="소개"
        subtitle="AI 스무고개로 경력을 해금하세요 — 핵심 단어를 맞히면 회사명과 비하인드 스토리가 열립니다."
      />

      <p ref={summaryRef} style={styles.summary}>
        {profile.summary}
      </p>

      <CareerQuiz />
      <SectionNext to="skills" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '860px', margin: '0 auto' },
  summary: { color: 'var(--text-dim)', lineHeight: 1.95, fontSize: '1.05rem', marginBottom: '2.5rem' },
};
