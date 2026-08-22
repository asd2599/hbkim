import { useSyncExternalStore } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import SectionHeading from '../../components/SectionHeading';
import { AchievementBoard } from '../../components/teaching/ArcadeHud';
import { subscribe, getSnapshot, unlock } from '../../components/teaching/arcadeStore';
import { teachingContact } from '../../data/teaching';

export default function TeachContact() {
  const ref = useScrollAnimation(100);
  const s = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const items = [
    { label: teachingContact.email, href: `mailto:${teachingContact.email}` },
    { label: teachingContact.phone, href: `tel:${teachingContact.phone.replace(/-/g, '')}` },
    { label: teachingContact.githubLabel, href: teachingContact.github, external: true },
  ];

  return (
    <section id="t-contact" style={styles.section}>
      <SectionHeading
        eyebrow="Continue?"
        title="강의 문의"
        subtitle="강의·특강·커리큘럼 협업 제안을 환영합니다. 코인을 넣듯 편하게 연락 주세요."
      />

      <div ref={ref} className="gc-wrap">
        {/* 최종 스코어 보드 */}
        <div className="gc-score">
          <p className="arcade arcade-blink gc-title">GAME CLEAR</p>
          <dl className="gc-stats">
            <div><dt className="arcade">SCORE</dt><dd className="arcade">{String(s.score).padStart(6, '0')}</dd></div>
            <div><dt className="arcade">LEVEL</dt><dd className="arcade">{s.level}</dd></div>
            <div><dt className="arcade">MAX COMBO</dt><dd className="arcade">x{s.maxCombo}</dd></div>
          </dl>
          <p className="gc-note">
            여기까지 오셨다면 이 페이지의 절반은 보신 겁니다. 나머지 절반은 직접 만나서 보여드릴게요.
          </p>
        </div>

        {/* 연락처 = 코인 슬롯 */}
        <div className="gc-slots">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              target={it.external ? '_blank' : undefined}
              rel={it.external ? 'noopener noreferrer' : undefined}
              className="contact-item gc-slot"
              style={{ '--c': 'var(--accent)' }}
              onClick={() => unlock('contact')}
            >
              <span className="gc-coin arcade">◎</span>
              <span className="ct-label">{it.label}</span>
              <span className="ct-arrow">▶</span>
            </a>
          ))}
        </div>

        {/* 업적 목록 */}
        <div className="gc-ach">
          <p className="eyebrow">Achievements</p>
          <AchievementBoard />
        </div>
      </div>

      <div className="section-next-wrap">
        <a href="#t-hero" className="section-next" aria-label="맨 위로">
          <span className="arcade">▲ TOP</span>
        </a>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem 8rem', maxWidth: '900px', margin: '0 auto' },
};
