import { useState } from 'react';
import useActiveSection from '../hooks/useActiveSection';

const sections = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'contact',  label: 'Contact' },
];

function Dot({ section, isActive, isHovered, onHover, onLeave }) {
  const handleClick = () => {
    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.dotWrap} onMouseEnter={onHover} onMouseLeave={onLeave}>
      {/* 라벨 */}
      <span style={{
        ...styles.label,
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateX(0)' : 'translateX(6px)',
      }}>
        {section.label}
      </span>
      {/* 도트 */}
      <button
        onClick={handleClick}
        style={{
          ...styles.dot,
          background: isActive ? '#646cff' : 'transparent',
          borderColor: isActive ? '#646cff' : '#555',
          transform: isActive ? 'scale(1.4)' : isHovered ? 'scale(1.2)' : 'scale(1)',
          boxShadow: isActive ? '0 0 10px #646cff88' : 'none',
        }}
        aria-label={section.label}
      />
    </div>
  );
}

export default function SectionNav() {
  const active = useActiveSection(sections.map((s) => s.id));
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.container} className="section-nav">
      {sections.map((s, i) => (
        <div key={s.id} style={styles.itemWrap}>
          <Dot
            section={s}
            isActive={active === s.id}
            isHovered={hovered === s.id}
            onHover={() => setHovered(s.id)}
            onLeave={() => setHovered(null)}
          />
          {/* 연결선 (마지막 제외) */}
          {i < sections.length - 1 && (
            <div style={{
              ...styles.line,
              background: active === s.id || sections.findIndex(x => x.id === active) > i
                ? '#646cff88'
                : '#2a2a3e',
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 0,
  },
  itemWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dotWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '4px 0',
    cursor: 'pointer',
  },
  label: {
    fontSize: '0.72rem',
    color: '#aaa',
    whiteSpace: 'nowrap',
    transition: 'opacity 0.2s, transform 0.2s',
    userSelect: 'none',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    border: '1.5px solid #555',
    cursor: 'pointer',
    padding: 0,
    transition: 'background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s',
    flexShrink: 0,
  },
  line: {
    width: '1.5px',
    height: '28px',
    transition: 'background 0.3s',
    margin: '2px 0',
    alignSelf: 'center',
    marginRight: '3px',
  },
};
