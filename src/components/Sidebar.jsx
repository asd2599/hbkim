import useActiveSection from '../hooks/useActiveSection';
import useScrollProgress from '../hooks/useScrollProgress';

const navItems = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'contact',  label: 'Contact' },
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Sidebar() {
  const active  = useActiveSection(navItems.map((n) => n.id));
  const progress = useScrollProgress();

  return (
    <aside className="sidebar">
      {/* 좌측 엣지 진행 바 */}
      <div style={st.progressTrack}>
        <div style={{ ...st.progressFill, height: `${progress}%` }} />
      </div>

      <div style={st.inner}>
        {/* 로고 */}
        <div style={st.logoArea}>
          <span className="arcade neon neon-cyan" style={st.logo}>HB KIM</span>
          <span style={st.logoSub}>▸ AI Service Engineer</span>
        </div>

        {/* 구분선 */}
        <div style={st.divider} />

        {/* 네비게이션 */}
        <nav style={st.nav}>
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  ...st.navItem,
                  color:       isActive ? '#fff'       : '#666',
                  background:  isActive ? '#2de2e618'  : 'transparent',
                  borderLeft:  isActive ? '2px solid #2de2e6' : '2px solid transparent',
                  textShadow:  isActive ? '0 0 8px #2de2e688' : 'none',
                  fontWeight:  isActive ? '600'         : '400',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

      </div>
    </aside>
  );
}

const st = {
  progressTrack: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '2px',
    height: '100%',
    background: '#1a1a2e',
  },
  progressFill: {
    width: '100%',
    background: 'linear-gradient(180deg, #2de2e6, #58ff8c)',
    boxShadow: '0 0 8px #2de2e6aa',
    transition: 'height 0.15s linear',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '2rem 0 1.5rem 0',
  },
  logoArea: {
    padding: '0 1.5rem 0 1.75rem',
    marginBottom: '0.25rem',
  },
  logo: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '0.02em',
  },
  logoSub: {
    display: 'block',
    fontSize: '0.64rem',
    color: '#8b8b9e',
    fontFamily: 'var(--font-mono)',
    marginTop: '0.3rem',
    fontWeight: '500',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  divider: {
    height: '1px',
    background: '#1e1e30',
    margin: '1.25rem 1.5rem',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    flex: 1,
    padding: '0 0.75rem',
  },
  navItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '0.65rem 1rem',
    fontSize: '0.9rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s, background 0.2s',
    letterSpacing: '0.01em',
  },
};
