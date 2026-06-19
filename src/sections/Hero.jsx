import { profile } from '../data/profile';
import Chatbot from '../components/Chatbot';
import SectionNext from '../components/SectionNext';

export default function Hero() {
  return (
    <section id="hero" style={styles.section}>
      {/* 배경 프로필 영상 (반투명·반복·상단에서 아래로 페이드) */}
      <div className="hero-bg-video" aria-hidden="true">
        <video src="/vedio/profile.mp4" autoPlay loop muted playsInline preload="auto" />
      </div>

      {/* 상단: 플레이어 카드 + 포트레이트 */}
      <div style={styles.top}>
        <div className="hero-text" style={styles.textWrap}>
          <p className="arcade arcade-blink" style={styles.insertCoin}>▸ INSERT COIN — PLAYER 1</p>

          <h1 style={styles.name}>
            <span className="arcade neon neon-cyan" style={styles.nameAccent}>KIM HYUNBOK</span>
            <span style={styles.role}>AI SERVICE ENGINEER</span>
          </h1>

          <p style={styles.subtitle}>{profile.roleTags.join(' · ')}</p>

          <p style={styles.desc}>
            게임 개발·교육 10년의 현장 경험 위에 LLM·RAG·멀티모달을 더해,
            AI를 실제로 작동하는 제품으로 만드는 풀스택 엔지니어입니다.
          </p>

          {/* CTA */}
          <div style={styles.btnGroup}>
            <a href="#projects" className="btn-arcade">PORTFOLIO ▸</a>
            <a href="#contact" className="btn-arcade pink">CONTACT</a>
          </div>
        </div>

      </div>

      {/* 프로필 아래: AI 챗봇 (RAG) */}
      <div className="hero-text" style={styles.invWrap}>
        <Chatbot />
      </div>

      {/* 스크롤 유도 */}
      <SectionNext to="about" />
    </section>
  );
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5rem 2rem 4rem',
    maxWidth: '980px',
    margin: '0 auto',
    gap: '2.25rem',
  },

  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  textWrap: { display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minWidth: '280px' },

  insertCoin: { fontSize: '0.62rem', color: 'var(--neon-yellow)', letterSpacing: '0.06em' },

  name: { display: 'flex', flexDirection: 'column', gap: '0.55rem', lineHeight: 1.1 },
  nameAccent: { fontSize: 'clamp(1.4rem, 4.5vw, 2.2rem)', letterSpacing: '0.01em' },
  role: { fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-2)', letterSpacing: '0.16em', fontWeight: 600 },

  subtitle: { fontSize: '0.95rem', color: '#cfcfdb', lineHeight: 1.6, fontWeight: 500 },

  desc: { fontSize: '0.95rem', color: '#8a8a9c', lineHeight: 1.85, maxWidth: '480px' },
  btnGroup: { display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '0.5rem' },

  invWrap: { width: '100%' },
};
