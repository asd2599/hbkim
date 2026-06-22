import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject, projects } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  // 잘못된 slug — 빈 상태 처리
  if (!project) {
    return (
      <main style={S.notFound}>
        <p style={{ fontSize: '3rem' }}>🔍</p>
        <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>프로젝트를 찾을 수 없습니다</h1>
        <p style={{ color: '#888', marginBottom: '1.5rem' }}>요청한 포트폴리오가 존재하지 않습니다.</p>
        <Link to="/" className="btn-primary">홈으로</Link>
      </main>
    );
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="detail-page">
      {/* 상단 바 */}
      <div style={S.topbar}>
        <Link to="/" className="detail-back">← 포트폴리오</Link>
      </div>

      {/* 헤더 */}
      <header style={S.header}>
        <div style={S.titleRow}>
          <svg className="proj-icon-lg" style={{ color: project.color }} aria-hidden="true">
            <use href={`/project-icons.svg#${project.icon}`} />
          </svg>
          <h1 style={S.title}>{project.title}</h1>
        </div>
        <p style={S.subtitle}>{project.subtitle}</p>
        <p style={S.oneLiner}>{project.oneLiner}</p>

        <div style={S.tags}>
          {project.tags?.map((t) => <span key={t} style={S.tag}>{t}</span>)}
        </div>

        <div style={S.meta}>
          <Meta label="역할" value={project.role} />
          <Meta label="기간" value={project.period} />
          <Meta label="팀" value={project.team} />
        </div>

        <div style={S.links}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              라이브 보기 · {project.liveLabel}
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              시연 영상
            </a>
          )}
          {project.repos?.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="repo-link">
              {r.label} ↗
            </a>
          ))}
        </div>
      </header>

      {project.cover && (
        <div style={S.coverWrap}>
          <img src={project.cover} alt={`${project.title} 화면`} style={S.cover} loading="lazy" />
        </div>
      )}

      <div style={S.body}>
        {project.overview && (
          <Section title="Overview">
            <p style={S.para}>{project.overview}</p>
          </Section>
        )}

        {youtubeId(project.demoUrl) && (
          <Section title="시연 영상">
            <div className="video-embed">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId(project.demoUrl)}`}
                title={`${project.title} 시연 영상`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </Section>
        )}

        {project.gallery && <FeatureGallery items={project.gallery} />}

        {project.problem && (
          <Section title="문제 정의">
            <p style={S.para}>{project.problem.context}</p>
            <ul style={S.list}>
              {project.problem.points.map((p) => <li key={p} style={S.li}>{p}</li>)}
            </ul>
          </Section>
        )}

        {project.approach && (
          <Section title="접근 & 해결">
            <div style={S.cards}>
              {project.approach.map((a) => (
                <div key={a.title} style={S.card}>
                  <h3 style={S.cardTitle}>{a.title}</h3>
                  <p style={S.cardDesc}>{a.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {project.aiModels && (
          <Section title={project.aiModelsTitle || 'AI 모델 오케스트레이션'}>
            <p style={S.para}>{project.aiModelsIntro || '같은 OpenAI API라도 작업의 성격(창의성·정확성·비용·지연)에 따라 모델·파라미터·출력 포맷을 분리 설계.'}</p>
            <div style={S.tableWrap}>
              <table style={S.table}>
                <thead>
                  <tr>
                    {(project.aiModelsHeaders || ['기능', '모델', '설정', '설계 의도']).map((h) => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {project.aiModels.map((m) => (
                    <tr key={m.feature}>
                      <td style={{ ...S.td, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>{m.feature}</td>
                      <td style={S.td}><span style={S.modelBadge}>{m.model}</span></td>
                      <td style={{ ...S.td, fontFamily: 'var(--font-mono)', color: '#a9b0ff', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{m.config}</td>
                      <td style={S.td}>{m.intent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {project.architecture && (
          <Section title="아키텍처">
            <p style={S.para}>{project.architecture.text}</p>
            <div style={S.archStack}>
              {project.architecture.stack?.map((s) => <span key={s} style={S.archChip}>{s}</span>)}
            </div>
            {project.architecture.image && (
              <figure style={S.archFig}>
                <a href={project.architecture.image} target="_blank" rel="noopener noreferrer">
                  <img src={project.architecture.image} alt="아키텍처 다이어그램" loading="lazy" style={S.archImg} />
                </a>
                {project.architecture.imageCaption && <figcaption style={S.archCap}>{project.architecture.imageCaption}</figcaption>}
              </figure>
            )}
          </Section>
        )}

        {project.engineering && (
          <Section title="프로덕션 엔지니어링">
            <div style={S.cards}>
              {project.engineering.map((e) => (
                <div key={e.title} style={S.card}>
                  <h3 style={S.cardTitle}>{e.title}</h3>
                  <p style={S.cardDesc}>{e.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {project.results && (
          <Section title="결과 & 임팩트">
            <div style={S.results}>
              {project.results.map((r) => (
                <div key={r.label} style={S.resultCard}>
                  <span style={S.resultValue}>{r.value}</span>
                  <span style={S.resultLabel}>{r.label}</span>
                  {r.kind === 'goal' && <span style={S.goalBadge}>목표</span>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {project.stack && (
          <Section title="기술 스택">
            <div style={S.tags}>
              {project.stack.map((s) => <span key={s} style={S.stackChip}>{s}</span>)}
            </div>
          </Section>
        )}

        {project.retrospective && (
          <Section title="회고 & 다음 단계">
            <ul style={S.list}>
              {project.retrospective.map((r) => <li key={r} style={S.li}>{r}</li>)}
            </ul>
          </Section>
        )}
      </div>

      {/* 다음 프로젝트 */}
      <Link to={`/projects/${next.slug}`} className="detail-next">
        <span style={S.nextLabel}>다음 프로젝트</span>
        <span style={S.nextTitle}>
          <svg className="proj-icon-sm" style={{ color: next.color }} aria-hidden="true">
            <use href={`/project-icons.svg#${next.icon}`} />
          </svg>
          {next.title} →
        </span>
      </Link>
    </main>
  );
}

// 유튜브 URL → 영상 ID (youtu.be / watch?v= / embed)
function youtubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|[?&]v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

// 주요 기능 — 이미지(왼쪽·프레임) + 설명(오른쪽) 고정, 한 페이지씩 슬라이드로 넘김.
function FeatureGallery({ items }) {
  const [cur, setCur] = useState(0);
  const n = items.length;
  const go = (d) => setCur((c) => (c + d + n) % n);

  return (
    <Section title="주요 기능">
      <div className="feat-slider">
        <div className="feat-viewport">
          <div className="feat-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
            {items.map((g, i) => (
              <div className={`feat-slide${i === cur ? ' active' : ''}`} key={g.src} aria-hidden={i !== cur}>
                <figure className="feat-figure">
                  <img src={g.src} alt={g.title} loading="lazy" />
                  {g.points?.map((p, pi) => (
                    <span key={pi} className="ann-ring" style={{ left: `${p.x}%`, top: `${p.y}%`, '--i': pi }}>{pi + 1}</span>
                  ))}
                </figure>
                <div className="feat-info">
                  <span className="ann-eyebrow arcade">FEATURE {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="ann-title">{g.title}</h3>
                  <p className="ann-caption">{g.caption}</p>
                  {g.points && (
                    <ol className="ann-list">
                      {g.points.map((p, pi) => (
                        <li key={pi} className="ann-li" style={{ '--i': pi }}>
                          <span className="ann-num">{pi + 1}</span>
                          <span>{p.text}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {n > 1 && (
          <div className="feat-nav">
            <button type="button" className="feat-arrow" onClick={() => go(-1)} aria-label="이전 기능">←</button>
            <div className="feat-dots">
              {items.map((g, i) => (
                <button
                  key={g.src}
                  type="button"
                  className={`feat-dot${i === cur ? ' on' : ''}`}
                  onClick={() => setCur(i)}
                  aria-label={`${i + 1}번 기능`}
                  aria-current={i === cur}
                />
              ))}
            </div>
            <span className="feat-count">{cur + 1} / {n}</span>
            <button type="button" className="feat-arrow" onClick={() => go(1)} aria-label="다음 기능">→</button>
          </div>
        )}
      </div>
    </Section>
  );
}

function Meta({ label, value }) {
  if (!value) return null;
  return (
    <div style={S.metaItem}>
      <span style={S.metaLabel}>{label}</span>
      <span style={S.metaValue}>{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={S.section}>
      <h2 style={S.sectionTitle}>{title}</h2>
      <div className="section-divider" style={{ marginBottom: '1.5rem' }} />
      {children}
    </section>
  );
}

const S = {
  notFound: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' },
  topbar: { maxWidth: '820px', margin: '0 auto', padding: '2rem 1.5rem 0' },
  header: { maxWidth: '820px', margin: '0 auto', padding: '2.5rem 1.5rem 3rem', borderBottom: '1px solid #1e1e30' },
  emoji: { fontSize: '3rem', display: 'block', marginBottom: '0.75rem' },
  titleRow: { display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.4rem' },
  title: { fontSize: '2.6rem', color: '#fff', lineHeight: 1.1 },
  subtitle: { fontSize: '1.1rem', color: '#646cff', fontWeight: '600', marginBottom: '0.85rem' },
  oneLiner: { fontSize: '1rem', color: '#aaa', lineHeight: 1.7, maxWidth: '640px', marginBottom: '1.5rem' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' },
  tag: { padding: '0.3rem 0.85rem', background: '#646cff18', border: '1px solid #646cff44', borderRadius: '999px', color: '#a9b0ff', fontSize: '0.78rem', fontWeight: '600' },
  meta: { display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.75rem' },
  metaItem: { display: 'flex', flexDirection: 'column', gap: '0.2rem' },
  metaLabel: { fontSize: '0.72rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' },
  metaValue: { fontSize: '0.92rem', color: '#ddd' },
  links: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' },

  coverWrap: { maxWidth: '820px', margin: '2rem auto 0', padding: '0 1.5rem' },
  cover: { width: '100%', maxHeight: '440px', objectFit: 'cover', objectPosition: 'top', borderRadius: '16px', border: '1px solid #2a2a3e', display: 'block', boxShadow: '0 18px 50px -20px rgba(0,0,0,0.7)' },

  body: { maxWidth: '820px', margin: '0 auto', padding: '1rem 1.5rem' },

  tableWrap: { overflowX: 'auto', marginTop: '1.25rem', border: '1px solid #2a2a3e', borderRadius: '12px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: '560px' },
  th: { textAlign: 'left', padding: '0.75rem 1rem', color: '#9aa0c0', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #2a2a3e', background: '#13131d', whiteSpace: 'nowrap' },
  td: { padding: '0.7rem 1rem', color: '#bbb', borderBottom: '1px solid #1e1e2a', lineHeight: 1.55, verticalAlign: 'top' },
  modelBadge: { fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#5fd3c0', background: '#0e1f1c', border: '1px solid #2de2e644', borderRadius: '6px', padding: '0.2rem 0.5rem', whiteSpace: 'nowrap', display: 'inline-block' },

  archFig: { margin: '1.5rem 0 0' },
  archImg: { width: '100%', borderRadius: '12px', border: '1px solid #2a2a3e', display: 'block', background: '#fff' },
  archCap: { fontSize: '0.78rem', color: '#777', marginTop: '0.6rem', textAlign: 'center' },
  section: { padding: '2.5rem 0' },
  sectionTitle: { fontSize: '1.5rem', color: '#fff', marginBottom: '0.75rem' },
  para: { color: '#bbb', lineHeight: 1.9, fontSize: '1rem' },
  list: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' },
  li: { color: '#bbb', lineHeight: 1.7, paddingLeft: '1.25rem', position: 'relative' },

  cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' },
  card: { background: '#1e1e2e', border: '1px solid #2a2a3e', borderRadius: '12px', padding: '1.25rem 1.4rem' },
  cardTitle: { color: '#fff', fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' },
  cardDesc: { color: '#aaa', fontSize: '0.9rem', lineHeight: 1.7 },

  archStack: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' },
  archChip: { padding: '0.3rem 0.8rem', background: '#16162a', border: '1px solid #2a2a3e', borderRadius: '6px', color: '#9aa0c0', fontSize: '0.82rem' },

  results: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' },
  resultCard: { position: 'relative', background: '#16161f', border: '1px solid #2a2a3e', borderRadius: '12px', padding: '1.4rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  resultValue: { fontSize: '1.6rem', fontWeight: '800', color: '#646cff' },
  resultLabel: { fontSize: '0.83rem', color: '#999', lineHeight: 1.5 },
  goalBadge: { position: 'absolute', top: '0.7rem', right: '0.7rem', fontSize: '0.62rem', color: '#aaa', border: '1px solid #444', borderRadius: '4px', padding: '0.1rem 0.35rem' },

  stackChip: { padding: '0.35rem 0.9rem', background: '#1e1e2e', border: '1px solid #2a2a3e', borderRadius: '999px', color: '#ccc', fontSize: '0.85rem' },

  nextLabel: { fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' },
  nextTitle: { fontSize: '1.2rem', color: '#fff', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' },
};
