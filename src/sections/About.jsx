import useScrollAnimation from '../hooks/useScrollAnimation';

const careers = [
  { period: '2023.12 – 2025.12', company: 'SBS게임아카데미', role: '게임 프로그래밍 강사', desc: '10년 이상 경력 기반 게임 개발 및 최신 기술 교육 커리큘럼 담당 (C, C++, Unity, C#)' },
  { period: '2017.10 – 2023.12', company: '서울게임아카데미', role: '전임 강사', desc: '9년간 프로그래밍 전임 강사로 활동, 수강생 대상 기초 로직 및 아키텍처 설계 교육 진행' },
  { period: '2015.12 – 2017.07', company: '부클', role: '클라이언트 개발', desc: 'Unity 엔진 기반 3D 게임 개발 프로젝트 참여, 클라이언트 개발 담당' },
  { period: '2013.12 – 2015.10', company: '노리소프트', role: '클라이언트 개발 총괄', desc: '2D 러닝 액션 게임 개발 및 서비스 출시 총괄. 인앱 결제, iOS 디버깅, 앱 마켓 상용화 전 과정' },
];

export default function About() {
  const headRef = useScrollAnimation(0);
  const summaryRef = useScrollAnimation(100);
  const timelineRef = useScrollAnimation(200);

  return (
    <section id="about" style={styles.section}>
      <div ref={headRef}>
        <h2 style={styles.heading}>About Me</h2>
        <div className="section-divider" />
      </div>

      <p ref={summaryRef} style={styles.summary}>
        10년 이상의 게임 엔진 개발 및 프로그래밍 교육 경력을 기반으로,
        복잡한 시스템의 로직 설계와 실시간 데이터 동기화에 최적화된 AI 애플리케이션 엔지니어입니다.
        C/C++부터 최신 React/Node.js 환경까지 아우르는 풀스택 기술 스택과
        Cursor · Claude Code 등 AI 에이전트를 활용한 Rapid Prototyping 역량을 보유하고 있습니다.
      </p>

      <div ref={timelineRef}>
        <h3 style={styles.subheading}>Career</h3>
        <div style={styles.timeline}>
          {careers.map((c) => (
            <div key={c.company} style={styles.item}>
              <div style={styles.period}>{c.period}</div>
              <div style={styles.content}>
                <div style={styles.companyRow}>
                  <span style={styles.company}>{c.company}</span>
                  <span style={styles.role}>{c.role}</span>
                </div>
                <p style={styles.desc}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '6rem 2rem', maxWidth: '860px', margin: '0 auto' },
  heading: { fontSize: '2rem', color: '#fff', marginBottom: '0.75rem' },
  summary: { color: '#aaa', lineHeight: 1.9, fontSize: '1.05rem', marginBottom: '3rem' },
  subheading: { fontSize: '1.2rem', color: '#fff', marginBottom: '1.5rem', fontWeight: '600' },
  timeline: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  item: { display: 'flex', gap: '1.5rem' },
  period: { color: '#646cff', fontSize: '0.82rem', minWidth: '155px', paddingTop: '0.9rem', fontWeight: '600', lineHeight: 1.4 },
  content: { flex: 1, background: '#1e1e2e', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #2a2a3e' },
  companyRow: { display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' },
  company: { color: '#fff', fontWeight: 'bold', fontSize: '1rem' },
  role: { color: '#646cff', fontSize: '0.83rem' },
  desc: { color: '#aaa', fontSize: '0.9rem', lineHeight: 1.7 },
};
