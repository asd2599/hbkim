// 섹션 하단 다음 이동 버튼. up=true면 맨 위로.
export default function SectionNext({ to, up = false }) {
  return (
    <div className="section-next-wrap">
      <a href={up ? '#hero' : `#${to}`} className="section-next" aria-label={up ? '맨 위로' : '다음 섹션'}>
        <span className="arcade">{up ? '▲ TOP' : '▼ NEXT'}</span>
      </a>
    </div>
  );
}
