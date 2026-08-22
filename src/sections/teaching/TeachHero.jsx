import { useRef } from 'react';
import useTypewriter from '../../hooks/useTypewriter';
import SectionNext from '../../components/SectionNext';
import Chatbot from '../../components/Chatbot';
import { unlock } from '../../components/teaching/arcadeStore';
import { teachingProfile, playerStats } from '../../data/teaching';

const CHAT_SUGGESTIONS = [
  'Claude Code·Codex 강의도 하나요?',
  '기업 사내교육도 진행하나요?',
  '강의 경력이 얼마나 되나요?',
  '비전공자도 따라갈 수 있나요?',
];

export default function TeachHero() {
  const typed = useTypewriter(teachingProfile.typing);
  const taps = useRef(0);

  // 이스터에그: 플레이어 명패를 다섯 번 두드리면 업적 해금
  const tapNameplate = (e) => {
    taps.current += 1;
    const el = e.currentTarget;
    el.classList.remove('shake');
    void el.offsetWidth; // 애니메이션 재시작
    el.classList.add('shake');
    if (taps.current === 5) unlock('nameplate');
  };

  return (
    <section id="t-hero" style={styles.section}>
      <div className="teach-hero-grid">
        <div className="hero-text" style={styles.inner}>
          <p className="arcade arcade-blink t-coin">▸ INSERT COIN — PLAYER 1</p>

          <button type="button" className="t-nameplate" onClick={tapNameplate}>
            <span className="t-avatar arcade">HB</span>
            <span className="t-nameplate-body">
              <span className="arcade neon t-name">KIM HYUNBOK</span>
              <span className="t-class">{teachingProfile.eyebrow} · AI INSTRUCTOR</span>
            </span>
            <span className="t-lv arcade">LV.8</span>
          </button>

          <h1 style={styles.headline}>{teachingProfile.headline}</h1>

          <p style={styles.typingLine}>
            <span style={styles.typingText}>{typed}</span>
            <span className="type-cursor">▌</span>
          </p>

          <ul className="t-stats">
            {playerStats.map((s) => (
              <li key={s.label} className="t-stat" title={s.note}>
                <span className="t-stat-label arcade">{s.label}</span>
                <span className="t-stat-bar">
                  <i style={{ width: `${(s.value / s.max) * 100}%` }} />
                </span>
                <span className="t-stat-val arcade">{s.value} {s.unit}</span>
              </li>
            ))}
          </ul>

          <p style={styles.sub}>{teachingProfile.sub}</p>
          <p style={styles.intro}>{teachingProfile.intro}</p>

          <div className="t-cta">
            <a href="#curriculum" className="btn-arcade">CURRICULUM ▸</a>
            <a href="#arcade" className="btn-arcade pink">BONUS STAGE</a>
          </div>
        </div>

        <div className="teach-hero-chat">
          <Chatbot
            subtitle="강의 Q&A"
            greeting="안녕하세요, 김현봇입니다! Code Agent·AI 활용 강의, 강의 경력, 교육 방식이 궁금하시면 편하게 물어보세요."
            suggestions={CHAT_SUGGESTIONS}
            placeholder="강의에 대해 궁금한 점을 물어보세요"
          />
        </div>
      </div>

      <SectionNext to="philosophy" />
    </section>
  );
}

const styles = {
  section: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 2rem', maxWidth: '1120px', margin: '0 auto' },
  inner: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  headline: { fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.25, margin: '0.6rem 0 0' },
  typingLine: { fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', color: 'var(--accent)', minHeight: '1.8em', margin: '0.5rem 0' },
  typingText: { fontWeight: 600 },
  sub: { color: 'var(--text-dim)', fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem' },
  intro: { color: 'var(--text-mute)', fontSize: '0.95rem', lineHeight: 1.85, maxWidth: '640px', marginTop: '0.3rem' },
};
