const stats = [
  { value: '12년+', label: '게임 개발 · 교육 경력' },
  { value: '2개',   label: 'AI 풀스택 포트폴리오' },
  { value: 'AI Native', label: 'Cursor · Claude Code 활용' },
];

const previewSkills = [
  'React 19', 'Node.js', 'Python', 'OpenAI API',
  'Socket.IO', 'PostgreSQL', 'Unity3D', 'C++', 'FastAPI', 'RAG',
];

export default function Hero() {
  return (
    <section id="hero" style={styles.section}>

      {/* 상단: 프로필 + 텍스트 */}
      <div style={styles.top}>
        <div className="hero-img" style={styles.imgWrap}>
          <img
            src="/images/profile.png"
            alt="김현복 프로필 사진"
            className="profile-img"
          />
        </div>

        <div className="hero-text" style={styles.textWrap}>
          <p style={styles.tag}>AI FDE Candidate</p>
          <h1 style={styles.name}>김현복</h1>
          <p style={styles.subtitle}>AI Application Engineer · Game Dev 12y · AI Native Full-Stack</p>
          <p style={styles.desc}>
            12년의 게임 도메인 전문성 위에 AI 에이전트 기반 고속 프로토타이핑을 더해,
            현업의 Pain Point를 실질적 자동화 솔루션으로 전환합니다.
          </p>
          <div style={styles.btnGroup}>
            <a href="#projects" className="btn-primary">포트폴리오 보기</a>
            <a href="#contact"  className="btn-secondary">연락하기</a>
          </div>
        </div>
      </div>

      {/* 중단: 핵심 스탯 */}
      <div className="hero-text" style={styles.stats}>
        {stats.map((s) => (
          <div key={s.label} style={styles.statCard}>
            <span style={styles.statValue}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* 하단: 스킬 미리보기 */}
      <div className="hero-text" style={styles.skillsWrap}>
        <p style={styles.skillsTitle}>Tech Stack</p>
        <div style={styles.skillBadges}>
          {previewSkills.map((s) => (
            <span key={s} style={styles.skillBadge}>{s}</span>
          ))}
        </div>
      </div>

      {/* 스크롤 유도 */}
      <a href="#about" style={styles.scrollDown} className="scroll-indicator">
        <span style={styles.scrollText}>scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#646cff" strokeWidth="2" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '7rem 2rem 4rem',
    maxWidth: '960px',
    margin: '0 auto',
    gap: '2.5rem',
  },

  /* 프로필 + 텍스트 row */
  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  imgWrap: { flexShrink: 0 },
  textWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
    flex: 1,
    minWidth: '260px',
  },
  tag: {
    fontSize: '0.8rem',
    color: '#646cff',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    background: '#646cff18',
    padding: '0.3rem 0.9rem',
    borderRadius: '999px',
    border: '1px solid #646cff44',
    display: 'inline-block',
    width: 'fit-content',
  },
  name: { fontSize: '3.2rem', color: '#fff', lineHeight: 1.1 },
  subtitle: { fontSize: '0.95rem', color: '#bbb', lineHeight: 1.6 },
  desc: { fontSize: '0.93rem', color: '#777', lineHeight: 1.85, maxWidth: '480px' },
  btnGroup: { display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '0.25rem' },

  /* 스탯 */
  stats: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  statCard: {
    flex: 1,
    minWidth: '160px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
    padding: '1.1rem 1.5rem',
    background: '#1e1e2e',
    border: '1px solid #2a2a3e',
    borderRadius: '12px',
  },
  statValue: { fontSize: '1.5rem', fontWeight: '800', color: '#646cff' },
  statLabel: { fontSize: '0.8rem', color: '#888', textAlign: 'center' },

  /* 스킬 미리보기 */
  skillsWrap: {
    width: '100%',
    textAlign: 'center',
  },
  skillsTitle: {
    fontSize: '0.75rem',
    color: '#555',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
  },
  skillBadges: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' },
  skillBadge: {
    padding: '0.3rem 0.85rem',
    background: '#1a1a2a',
    border: '1px solid #2a2a3e',
    borderRadius: '999px',
    color: '#aaa',
    fontSize: '0.82rem',
  },

  /* 스크롤 유도 */
  scrollDown: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
    marginTop: '0.5rem',
    textDecoration: 'none',
  },
  scrollText: { fontSize: '0.7rem', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase' },
};
