import useScrollAnimation from '../hooks/useScrollAnimation';

const projects = [
  {
    emoji: '🥚',
    title: 'EggTalk',
    subtitle: 'AI 다마고치 소셜 플랫폼',
    desc: '실시간 소켓 기반 다마고치 소셜 플랫폼. 만장일치 기반 공동 육아 시스템, AI 동화 창작, 스무고개 미니게임 구현. Memory FSM과 Concurrent Voting Lock으로 멀티유저 실시간 동기화 아키텍처 구축.',
    stacks: ['React 18', 'Node.js', 'Socket.IO', 'PostgreSQL', 'OpenAI API'],
    link: 'https://gamestack.store',
    linkLabel: 'gamestack.store',
    repos: [
      { label: 'Frontend', url: 'https://github.com/asd2599/eggtalk-frontend' },
      { label: 'Backend',  url: 'https://github.com/asd2599/eggtalk-backend' },
    ],
  },
  {
    emoji: '🏢',
    title: 'FlowFit',
    subtitle: '기업 업무 자동화 포털',
    desc: '8개 부서 25+ AI 자동화 기능을 탑재한 기업 업무 자동화 포털. RAG · Vision · Tool Use · SSE 스트리밍 포함. OpenAI API를 활용한 문서 분석, 이미지 처리, 실시간 스트리밍 응답 구현.',
    stacks: ['FastAPI', 'React', 'TailwindCSS', 'OpenAI API', 'PostgreSQL'],
    link: 'https://flowfit.cloud',
    linkLabel: 'flowfit.cloud',
    repos: [
      { label: 'Frontend', url: 'https://github.com/asd2599/flowfit-frontend' },
      { label: 'Backend',  url: 'https://github.com/asd2599/flowfit-backend' },
    ],
  },
];

function ProjectCard({ project, delay }) {
  const ref = useScrollAnimation(delay);
  return (
    <div ref={ref} className="project-card">
      <div style={styles.cardHeader}>
        <span style={styles.emoji}>{project.emoji}</span>
        <div>
          <h3 style={styles.cardTitle}>{project.title}</h3>
          <p style={styles.cardSubtitle}>{project.subtitle}</p>
        </div>
      </div>
      <p style={styles.cardDesc}>{project.desc}</p>
      <div style={styles.stacks}>
        {project.stacks.map((s) => (
          <span key={s} style={styles.stack}>{s}</span>
        ))}
      </div>
      <div style={styles.footer}>
        <a href={project.link} target="_blank" rel="noopener noreferrer" style={styles.siteLink}>
          {project.linkLabel} →
        </a>
        <div style={styles.repos}>
          {project.repos.map((r) => (
            <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer" className="repo-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              {r.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotionBanner({ delay }) {
  const ref = useScrollAnimation(delay);
  return (
    <a
      ref={ref}
      href="https://inexpensive-stock-21c.notion.site/AI-FDE-Portfolio-341fda89c9838130aa01e24755479df5"
      target="_blank"
      rel="noopener noreferrer"
      className="notion-banner"
    >
      <div style={styles.notionLeft}>
        <span style={styles.notionIcon}>📓</span>
        <div>
          <p style={styles.notionTitle}>제작 과정 상세 기록 · Notion</p>
          <p style={styles.notionDesc}>
            기획 의도부터 아키텍처 설계, 트러블슈팅까지 — 두 프로젝트의 빌드 과정을 과정형으로 정리했습니다.
          </p>
        </div>
      </div>
      <span style={styles.notionArrow}>Notion에서 보기 →</span>
    </a>
  );
}

export default function Projects() {
  const headRef = useScrollAnimation(0);

  return (
    <section id="projects" style={styles.section}>
      <div ref={headRef}>
        <h2 style={styles.heading}>Portfolio</h2>
        <div className="section-divider" />
      </div>
      <div style={styles.grid}>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={i * 150} />
        ))}
      </div>
      <NotionBanner delay={400} />
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' },
  heading: { fontSize: '2rem', color: '#fff', marginBottom: '0.75rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' },
  cardHeader: { display: 'flex', alignItems: 'flex-start', gap: '1rem' },
  emoji: { fontSize: '2rem', lineHeight: 1 },
  cardTitle: { color: '#fff', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.2rem' },
  cardSubtitle: { color: '#646cff', fontSize: '0.83rem' },
  cardDesc: { color: '#aaa', fontSize: '0.93rem', lineHeight: 1.75, flex: 1 },
  stacks: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
  stack: {
    padding: '0.25rem 0.75rem',
    background: '#0f0f0f',
    border: '1px solid #2a2a3e',
    borderRadius: '999px',
    color: '#bbb',
    fontSize: '0.8rem',
  },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' },
  siteLink: { color: '#646cff', fontWeight: 'bold', fontSize: '0.95rem' },
  repos: { display: 'flex', gap: '0.5rem' },
  notionLeft: { display: 'flex', alignItems: 'center', gap: '1.25rem' },
  notionIcon: { fontSize: '2rem', flexShrink: 0 },
  notionTitle: { color: '#fff', fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.3rem' },
  notionDesc: { color: '#888', fontSize: '0.88rem', lineHeight: 1.6 },
  notionArrow: { color: '#646cff', fontWeight: 'bold', fontSize: '0.9rem', flexShrink: 0 },
};
