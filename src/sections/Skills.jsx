import useScrollAnimation from '../hooks/useScrollAnimation';

const skillGroups = [
  { category: 'Language',          skills: ['C', 'C++', 'C#', 'JavaScript', 'Python'] },
  { category: 'Frontend / Mobile', skills: ['React 19', 'Vite', 'Tailwind CSS 4', 'Framer Motion', 'Socket.io-client'] },
  { category: 'Backend / Server',  skills: ['Node.js', 'Express 5', 'Socket.IO', 'JWT', 'FastAPI'] },
  { category: 'Game Engine',       skills: ['Unity3D', 'Unreal Engine', 'DirectX'] },
  { category: 'AI / API',          skills: ['OpenAI API (GPT-4o-mini)', 'Prompt Engineering', 'RAG', 'Tool Use'] },
  { category: 'Database',          skills: ['PostgreSQL'] },
  { category: 'DevOps / Tooling',  skills: ['GitHub', 'Cursor', 'Claude Code', 'GitHub Copilot', 'Antigravity'] },
];

function SkillGroup({ group, delay }) {
  const ref = useScrollAnimation(delay);
  return (
    <div ref={ref} style={styles.group}>
      <h3 style={styles.category}>{group.category}</h3>
      <div style={styles.badges}>
        {group.skills.map((skill) => (
          <span key={skill} style={styles.badge}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const headRef = useScrollAnimation(0);

  return (
    <section id="skills" style={styles.section}>
      <div ref={headRef}>
        <h2 style={styles.heading}>Tech Stack</h2>
        <div className="section-divider" />
      </div>
      <div style={styles.groups}>
        {skillGroups.map((g, i) => (
          <SkillGroup key={g.category} group={g} delay={i * 60} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '860px', margin: '0 auto' },
  heading: { fontSize: '2rem', color: '#fff', marginBottom: '0.75rem' },
  groups: { display: 'flex', flexDirection: 'column', gap: '1.75rem' },
  group: {},
  category: { color: '#646cff', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' },
  badges: { display: 'flex', flexWrap: 'wrap', gap: '0.6rem' },
  badge: {
    padding: '0.4rem 1rem',
    background: '#1e1e2e',
    border: '1px solid #2a2a3e',
    borderRadius: '999px',
    color: '#ccc',
    fontSize: '0.88rem',
  },
};
