import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SectionHeading from '../components/SectionHeading';
import SectionNext from '../components/SectionNext';
import { projects } from '../data/projects';

function ProjectCard({ project, delay, index }) {
  const ref = useScrollAnimation(delay);
  return (
    <Link ref={ref} to={`/projects/${project.slug}`} className="project-card" style={{ color: 'inherit' }}>
      <span className="arcade" style={styles.stage}>STAGE {String(index + 1).padStart(2, '0')}</span>
      <div style={styles.cardHeader}>
        <svg className="proj-icon" style={{ color: project.color }} aria-hidden="true">
          <use href={`/project-icons.svg#${project.icon}`} />
        </svg>
        <div>
          <h3 style={styles.cardTitle}>{project.title}</h3>
          <p style={styles.cardSubtitle}>{project.subtitle}</p>
        </div>
      </div>
      <p style={styles.cardDesc}>{project.oneLiner}</p>
      <div style={styles.tags}>
        {project.tags?.map((t) => <span key={t} style={styles.tag}>{t}</span>)}
      </div>
      <div style={styles.footer}>
        <span style={styles.detailLink}>자세히 보기 →</span>
        <span style={styles.live}>{project.liveLabel}</span>
      </div>
    </Link>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={styles.section}>
      <SectionHeading
        eyebrow="Portfolio"
        title="프로젝트"
        subtitle="문제 정의부터 배포·운영까지 직접 만든 AI 풀스택 서비스들. 카드를 눌러 상세 과정을 확인하세요."
      />
      <div style={styles.grid}>
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} delay={i * 150} index={i} />
        ))}
      </div>
      <SectionNext to="contact" />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' },
  heading: { fontSize: '2rem', color: '#fff', marginBottom: '0.75rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
  stage: { fontSize: '0.55rem', color: 'var(--neon-cyan)', letterSpacing: '0.08em', textShadow: '0 0 8px #2de2e688' },
  cardHeader: { display: 'flex', alignItems: 'flex-start', gap: '1rem' },
  emoji: { fontSize: '2rem', lineHeight: 1 },
  cardTitle: { color: '#fff', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.2rem' },
  cardSubtitle: { color: '#646cff', fontSize: '0.83rem' },
  cardDesc: { color: '#aaa', fontSize: '0.93rem', lineHeight: 1.75, flex: 1 },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  tag: { padding: '0.2rem 0.6rem', background: '#16162a', border: '1px solid #2a2a3e', borderRadius: '999px', color: '#9aa0c0', fontSize: '0.72rem' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' },
  detailLink: { color: '#646cff', fontWeight: 'bold', fontSize: '0.95rem' },
  live: { color: '#666', fontSize: '0.8rem' },
};
