import { useState, useEffect } from 'react';
import useScrollProgress from '../hooks/useScrollProgress';

const navItems = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'contact',  label: 'Contact' },
];

const scrollTo = (id, close) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  close();
};

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();

  // 메뉴 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="mobile-header">
        <span style={st.logo}>HB Kim</span>
        <button style={st.hamburger} onClick={() => setOpen(true)} aria-label="메뉴 열기">
          <span style={st.bar} />
          <span style={st.bar} />
          <span style={st.bar} />
        </button>
        {/* 스크롤 진행바 */}
        <div style={st.progressTrack}>
          <div style={{ ...st.progressFill, width: `${progress}%` }} />
        </div>
      </header>

      {/* 오버레이 메뉴 */}
      <div
        className="mobile-overlay"
        style={{ ...st.overlay, opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
        onClick={() => setOpen(false)}
      />
      <nav
        className="mobile-menu"
        style={{ ...st.menu, transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <div style={st.menuHeader}>
          <span style={st.menuLogo}>HB Kim</span>
          <button style={st.closeBtn} onClick={() => setOpen(false)} aria-label="메뉴 닫기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div style={st.menuLinks}>
          {navItems.map((item) => (
            <button
              key={item.id}
              style={st.menuLink}
              onClick={() => scrollTo(item.id, () => setOpen(false))}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={st.menuSocial}>
          <a href="https://github.com/asd2599" target="_blank" rel="noopener noreferrer" style={st.socialLink}>
            GitHub
          </a>
          <a href="mailto:asd25999@gmail.com" style={st.socialLink}>
            Email
          </a>
        </div>
      </nav>
    </>
  );
}

const st = {
  logo: { fontSize: '1.2rem', fontWeight: '800', color: '#fff' },
  hamburger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '4px',
  },
  bar: {
    display: 'block',
    width: '22px',
    height: '2px',
    background: '#fff',
    borderRadius: '2px',
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: '#1a1a2e',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #646cff, #a78bfa)',
    transition: 'width 0.1s linear',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: '#000000aa',
    zIndex: 199,
    transition: 'opacity 0.3s',
  },
  menu: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '72vw',
    maxWidth: '300px',
    height: '100vh',
    background: '#0d0d18',
    borderRight: '1px solid #1e1e30',
    zIndex: 200,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: '1.5rem',
  },
  menuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5rem',
  },
  menuLogo: { fontSize: '1.2rem', fontWeight: '800', color: '#fff' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px' },
  menuLinks: { display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 },
  menuLink: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    color: '#ccc',
    fontSize: '1.15rem',
    fontWeight: '500',
    padding: '0.75rem 0.5rem',
    cursor: 'pointer',
    borderBottom: '1px solid #1a1a2e',
    letterSpacing: '0.02em',
  },
  menuSocial: { display: 'flex', gap: '1rem', paddingTop: '1.5rem' },
  socialLink: { color: '#646cff', fontSize: '0.9rem', fontWeight: '600' },
};
