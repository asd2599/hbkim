import useScrollAnimation from '../hooks/useScrollAnimation';

const contacts = [
  { icon: '✉️', label: 'asd25999@gmail.com',  href: 'mailto:asd25999@gmail.com' },
  { icon: '📞', label: '010-9636-2599',        href: 'tel:01096362599' },
  { icon: '🥚', label: 'EggTalk · gamestack.store', href: 'https://gamestack.store' },
  { icon: '🏢', label: 'FlowFit · flowfit.cloud',   href: 'https://flowfit.cloud' },
  { icon: '💻', label: 'GitHub · asd2599',    href: 'https://github.com/asd2599' },
];

export default function Contact() {
  const headRef = useScrollAnimation(0);
  const listRef = useScrollAnimation(150);

  return (
    <section id="contact" style={styles.section}>
      <div ref={headRef}>
        <h2 style={styles.heading}>Contact</h2>
        <div className="section-divider" style={{ margin: '0 auto 1rem' }} />
      </div>
      <p style={styles.text}>협업 제안이나 문의가 있으시면 편하게 연락해 주세요.</p>
      <div ref={listRef} style={styles.list}>
        {contacts.map((c) => (
          <a
            key={c.href}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="contact-item"
          >
            <span style={styles.icon}>{c.icon}</span>
            <span>{c.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '6rem 2rem 8rem',
    textAlign: 'center',
    maxWidth: '520px',
    margin: '0 auto',
  },
  heading: { fontSize: '2rem', color: '#fff', marginBottom: '0.75rem' },
  text: { color: '#aaa', marginBottom: '2.5rem', fontSize: '1.05rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'center' },
  icon: { fontSize: '1.2rem', minWidth: '24px' },
};
