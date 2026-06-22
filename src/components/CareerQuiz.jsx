import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';

/* ────────────────────────────────────────────
   경력 = AI 스무고개 (힌트 없음, 순수 질문)
   - 경력 4개를 난이도(level) 순으로 출제. 정답은 회사명이 아니라
     그 시절을 연상시키는 "핵심 단어"(profile.career[].quiz.keyword).
   - 힌트는 주지 않는다. 플레이어가 던진 질문에 대해서만 AI가 예/아니오로 답한다.
     (예/아니오로 답할 수 없는 질문이면 "글쎄요")
   - 질문/정답 시도는 전체 합산 20개까지. 다 쓰면 처음부터.
   - 맞히면 해당 회사 카드의 "회사명"이 해금되고, 카드를 클릭하면
     열리면서(3D flip) 비하인드 스토리가 공개된다.
   - 카드는 항상 역할·개발내용·기간을 노출하고 회사명만 가린다.

   AI 예/아니오 판정은 /api/twenty (서버리스, OpenAI)로 라우팅한다.
──────────────────────────────────────────── */

const TOTAL_QUESTIONS = 20;

// quiz 데이터가 있는 경력만, 난이도(level) 오름차순으로 출제
const STAGES = [...profile.career]
  .filter((c) => c.quiz && c.quiz.keyword)
  .sort((a, b) => a.quiz.level - b.quiz.level);
const N = STAGES.length;

const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, '').trim();

const isCorrect = (guess, stage) => {
  const g = norm(guess);
  if (!g) return false;
  return [stage.quiz.keyword, ...(stage.quiz.aliases || [])]
    .filter(Boolean)
    .map(norm)
    .some((w) => w && g === w);
};

// AI 심판에게 예/아니오를 묻는다.
async function askOracle(question, stage) {
  try {
    const res = await fetch('/api/twenty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: stage.quiz.keyword, aliases: stage.quiz.aliases || [], question }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.answer) return data.answer;
    return data.error || '⚠ 지금은 답할 수 없어요.';
  } catch {
    return '⚠ 연결에 실패했어요. 잠시 후 다시.';
  }
}

export default function CareerQuiz() {
  const [phase, setPhase] = useState('intro'); // intro | play | over | cleared
  const [solved, setSolved] = useState(() => STAGES.map(() => false));
  const [current, setCurrent] = useState(0); // 현재 출제 중인 단계 index
  const [used, setUsed] = useState(0); // 누적 질문/정답 시도 수
  const [log, setLog] = useState([]); // 현재 단계 Q&A 로그
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false); // AI 응답 대기
  const [openCard, setOpenCard] = useState(null); // 열린(비하인드 공개) 카드 index

  const logRef = useRef(null);

  // 모달 열렸을 때 ESC로 닫기
  useEffect(() => {
    if (openCard === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpenCard(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openCard]);

  const solvedCount = solved.filter(Boolean).length;
  const remaining = TOTAL_QUESTIONS - used;
  const stage = STAGES[current];

  const scrollLog = () => {
    const el = logRef.current;
    if (el) requestAnimationFrame(() => (el.scrollTop = el.scrollHeight));
  };

  // 단계 진입 로그: (선택적 시스템 메시지) + 시작 힌트 1개 + 안내
  const openingLog = (i, sys) => {
    const arr = [];
    if (sys) arr.push({ role: 'sys', text: sys });
    if (STAGES[i].quiz.hint) arr.push({ role: 'oracle', text: `💡 ${STAGES[i].quiz.hint}` });
    arr.push({ role: 'oracle', text: '예/아니오 질문을 던지거나, 바로 정답을 입력하세요.' });
    return arr;
  };

  const start = () => {
    setSolved(STAGES.map(() => false));
    setUsed(0);
    setCurrent(0);
    setOpenCard(null);
    setPending(false);
    setLog(openingLog(0));
    setPhase('play');
  };

  const solveCurrent = () => {
    const newSolved = solved.slice();
    newSolved[current] = true;
    setSolved(newSolved);
    const next = newSolved.findIndex((v) => !v);
    if (next === -1) {
      setPhase('cleared');
      return;
    }
    setCurrent(next);
    setLog(openingLog(next, `정답! 다음 단계 (${next + 1}/${N})`));
    scrollLog();
  };

  const act = (kind) => {
    if (phase !== 'play' || used >= TOTAL_QUESTIONS || pending) return;
    const t = input.trim();
    if (!t) return;
    setInput('');

    // 정답 시도가 맞으면: 소모하되 게임 진행
    if (kind === 'guess' && isCorrect(t, stage)) {
      setUsed((u) => u + 1);
      setLog((l) => [...l, { role: 'you', text: t }]);
      solveCurrent();
      return;
    }

    const nextUsed = used + 1;
    setUsed(nextUsed);

    if (kind === 'guess') {
      setLog((l) => [...l, { role: 'you', text: t }, { role: 'oracle', text: '아니오 — 정답이 아니에요.' }]);
      scrollLog();
    } else {
      setLog((l) => [...l, { role: 'you', text: t }]);
      setPending(true);
      scrollLog();
      askOracle(t, stage).then((ans) => {
        setLog((l) => [...l, { role: 'oracle', text: ans }]);
        setPending(false);
        scrollLog();
      });
    }

    if (nextUsed >= TOTAL_QUESTIONS) setPhase('over');
  };

  return (
    <div className="cq">
      <div className="cq-hud">
        <span className="arcade" style={st.hudTitle}>◆ 20 QUESTIONS — CAREER</span>
        <span className="arcade" style={st.hudCount}>{solvedCount}/{N} 해금</span>
        <span className="arcade" style={st.hudQ}>질문 {remaining}/{TOTAL_QUESTIONS}</span>
      </div>

      {/* ── 게임 패널 ── */}
      {phase === 'intro' && (
        <div className="cq-panel">
          <p className="cq-panel-title arcade neon neon-cyan">AI 스무고개</p>
          <p style={st.panelText}>
            각 경력의 회사명은 숨겨져 있습니다. 그 시절을 연상시키는 <b>핵심 단어</b>를 맞히면
            회사명이 해금되고, 카드를 열어 <b>비하인드 스토리</b>를 볼 수 있어요.
          </p>
          <p style={st.panelMeta}>시작 힌트 1개 + 예/아니오 질문으로 좁혀가세요 · 총 {N}단계 · 질문/정답 합쳐 {TOTAL_QUESTIONS}개 초과 시 처음부터</p>
          <button type="button" className="btn-arcade" onClick={start}>START</button>
        </div>
      )}

      {phase === 'over' && (
        <div className="cq-panel">
          <p className="cq-panel-title arcade neon neon-pink">GAME OVER</p>
          <p style={st.panelText}>질문 {TOTAL_QUESTIONS}개를 모두 썼어요. 처음부터 다시 도전!</p>
          <button type="button" className="btn-arcade pink" onClick={start}>RETRY</button>
        </div>
      )}

      {phase === 'cleared' && (
        <div className="cq-panel">
          <p className="cq-panel-title arcade neon neon-green">ALL CLEARED ✓</p>
          <p style={st.panelText}>모든 회사가 해금됐어요. 카드를 눌러 비하인드 스토리를 확인하세요.</p>
          <button type="button" className="btn-arcade" onClick={start}>REPLAY</button>
        </div>
      )}

      {phase === 'play' && stage && (
        <div className="cq-panel">
          <div className="cq-stage-head">
            <span className="arcade" style={st.stageNo}>STAGE {current + 1}/{N}</span>
            <span style={st.stars} aria-label={`난이도 ${stage.quiz.level}`}>
              {'★'.repeat(stage.quiz.level)}{'☆'.repeat(Math.max(0, N - stage.quiz.level))}
            </span>
          </div>

          <div className="cq-log" ref={logRef}>
            {log.map((m, i) => (
              <div key={i} className={`cq-msg ${m.role}`}>{m.text}</div>
            ))}
            {pending && <div className="cq-msg oracle"><span className="typing"><i /><i /><i /></span></div>}
          </div>

          <div className="cq-controls">
            <input
              className="form-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && act('ask')}
              placeholder="예/아니오로 답할 질문을 하거나, 핵심 단어를 입력하세요"
              maxLength={120}
              disabled={pending}
              aria-label="스무고개 입력"
            />
            <div className="cq-btns">
              <button type="button" className="btn-arcade" onClick={() => act('ask')} disabled={!input.trim() || pending}>질문</button>
              <button type="button" className="btn-arcade pink" onClick={() => act('guess')} disabled={!input.trim() || pending}>정답!</button>
            </div>
          </div>
        </div>
      )}

      {/* ── 회사 카드 덱 (4행 1열, 역할·개발내용은 항상 노출·회사명만 가림) ── */}
      <div className="cq-deck">
        {STAGES.map((s, i) => {
          const unlocked = solved[i];
          return (
            <button
              key={s.company}
              type="button"
              className={`cq-card${unlocked ? ' unlocked' : ' locked'}`}
              onClick={() => unlocked && setOpenCard(i)}
              disabled={!unlocked}
            >
              <span className="cq-card-stage">{'★'.repeat(s.quiz.level)}</span>
              <div className="cq-card-body">
                <div className="cq-card-line">
                  <span className="cq-card-company">{unlocked ? s.company : '???'}</span>
                  <span className="cq-card-role">{s.role}</span>
                  <span className="cq-card-period">{s.period}</span>
                </div>
                <p className="cq-card-desc">{s.desc}</p>
              </div>
              <span className={`cq-card-foot${unlocked ? ' on' : ''}`}>
                {unlocked ? '비하인드 ↗' : 'LOCKED'}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 비하인드 모달 ── */}
      {openCard !== null && STAGES[openCard] && (
        <div className="cq-modal-overlay" onClick={() => setOpenCard(null)}>
          <div className="cq-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="cq-modal-close" onClick={() => setOpenCard(null)} aria-label="닫기">✕</button>
            <span className="cq-modal-company">{STAGES[openCard].company}</span>
            <span className="cq-modal-meta">{STAGES[openCard].role} · {STAGES[openCard].period}</span>
            <p className="cq-modal-behind">{STAGES[openCard].behind}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const st = {
  hudTitle: { fontSize: '0.6rem', color: 'var(--neon-cyan)', letterSpacing: '0.08em' },
  hudCount: { fontSize: '0.55rem', color: 'var(--neon-green)', marginLeft: '0.5rem' },
  hudQ: { fontSize: '0.55rem', color: 'var(--neon-yellow)', marginLeft: 'auto' },

  panelText: { color: 'var(--text-dim)', fontSize: '0.92rem', lineHeight: 1.8, margin: '0.4rem 0' },
  panelMeta: { color: 'var(--text-mute)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', margin: '0.2rem 0 1rem' },

  stageNo: { fontSize: '0.58rem', color: 'var(--neon-cyan)', letterSpacing: '0.06em' },
  stars: { color: 'var(--neon-yellow)', fontSize: '0.9rem', letterSpacing: '0.1em' },
};
