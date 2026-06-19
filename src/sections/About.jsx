import useScrollAnimation from '../hooks/useScrollAnimation';
import SectionHeading from '../components/SectionHeading';
import CareerQuest from '../components/CareerQuest';
import SectionNext from '../components/SectionNext';
import { profile } from '../data/profile';

export default function About() {
  const summaryRef = useScrollAnimation(100);

  return (
    <section id="about" style={styles.section}>
      <SectionHeading
        eyebrow="About"
        title="소개"
        subtitle="첫 경력부터 차근차근 — 게임 개발·교육 10년의 퀘스트를 깨고 AI 풀스택에 도달했습니다."
      />

      <p ref={summaryRef} style={styles.summary}>
        {profile.summary}
      </p>

      <CareerQuest />
      <SectionNext to="skills" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '860px', margin: '0 auto' },
  summary: { color: 'var(--text-dim)', lineHeight: 1.95, fontSize: '1.05rem', marginBottom: '2.5rem' },
};
