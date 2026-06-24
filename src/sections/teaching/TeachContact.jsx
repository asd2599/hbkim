import useScrollAnimation from '../../hooks/useScrollAnimation';
import SectionHeading from '../../components/SectionHeading';
import { teachingContact } from '../../data/teaching';

export default function TeachContact() {
  const ref = useScrollAnimation(100);

  const items = [
    { label: teachingContact.email, href: `mailto:${teachingContact.email}` },
    { label: teachingContact.phone, href: `tel:${teachingContact.phone.replace(/-/g, '')}` },
  ];

  return (
    <section id="t-contact" style={styles.section}>
      <SectionHeading
        eyebrow="Contact"
        title="강의 문의"
        subtitle="강의·특강·커리큘럼 협업 제안을 환영합니다. 바로 연락 주세요."
      />

      <div ref={ref} style={styles.wrap}>
        <div style={styles.list}>
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target={it.external ? '_blank' : undefined}
            rel={it.external ? 'noopener noreferrer' : undefined}
            className="contact-item"
            style={{ '--c': 'var(--accent)' }}
          >
            <span className="ct-label">{it.label}</span>
            <span className="ct-arrow">▶</span>
          </a>
        ))}
        </div>
      </div>

      <div className="section-next-wrap">
        <a href="#t-hero" className="section-next" aria-label="맨 위로">
          <span style={{ fontFamily: 'var(--font-mono)' }}>▲ TOP</span>
        </a>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem 8rem', maxWidth: '900px', margin: '0 auto' },
  wrap: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  list: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
};
