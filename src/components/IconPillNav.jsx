import useActiveSection from '../hooks/useActiveSection';

// 떠 있는 타원형(pill) 아이콘 네비 — 홈·강사 페이지 공용.
// items: [{ id, label, icon }]  icon 은 public/nav-icons.svg 의 symbol id.
// 색상은 var(--accent) 토큰을 따르므로, 페이지(.teaching-root 등)에서 토큰만 덮으면 자동 리테마.
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function IconPillNav({ items }) {
  const active = useActiveSection(items.map((n) => n.id));

  return (
    <nav className="pillnav" aria-label="섹션 내비게이션">
      {items.map((item) => (
        <button
          key={item.id}
          className={`pillnav-btn${active === item.id ? ' active' : ''}`}
          onClick={() => scrollTo(item.id)}
          aria-label={item.label}
        >
          <svg className="pillnav-icon" aria-hidden="true">
            <use href={`/nav-icons.svg#${item.icon}`} />
          </svg>
          <span className="pillnav-tip" aria-hidden="true">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
