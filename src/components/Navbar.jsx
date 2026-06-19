import useScrollProgress from '../hooks/useScrollProgress';

export default function Navbar() {
  const progress = useScrollProgress();

  return (
    <>
      <nav style={styles.nav}>
        <span style={styles.logo}>HB Kim</span>
        <ul style={styles.links}>
          <li><a href="#about"    className="nav-link">About</a></li>
          <li><a href="#skills"   className="nav-link">Skills</a></li>
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#contact"  className="nav-link">Contact</a></li>
          <li>
            <a
              href="https://github.com/asd2599"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-github"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </li>
        </ul>
      </nav>
      {/* 스크롤 진행바 */}
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }} />
      </div>
    </>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    position: 'fixed',
    top: 0,
    width: '100%',
    background: '#0f0f0fcc',
    backdropFilter: 'blur(12px)',
    zIndex: 100,
    borderBottom: '1px solid #1a1a2e',
  },
  logo: { fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' },
  links: {
    display: 'flex',
    gap: '1.5rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  progressTrack: {
    position: 'fixed',
    top: '61px',
    left: 0,
    width: '100%',
    height: '2px',
    background: '#1a1a2e',
    zIndex: 99,
  },
  progressBar: {
    height: '100%',
    background: '#646cff',
    transition: 'width 0.1s linear',
  },
};
