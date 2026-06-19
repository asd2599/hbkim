import useScrollAnimation from '../hooks/useScrollAnimation';

// 섹션 공통 헤더: eyebrow(// LABEL) + 제목 + 그라데이션 디바이더 + (선택) 서브타이틀
export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  const ref = useScrollAnimation(0);
  return (
    <div ref={ref} style={{ textAlign: center ? 'center' : 'left' }}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      <div className="section-divider" style={center ? { margin: '0 auto 2rem' } : undefined} />
      {subtitle && <p className={center ? 'section-sub center' : 'section-sub'}>{subtitle}</p>}
    </div>
  );
}
