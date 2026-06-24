import { useEffect, useRef, useState } from 'react';

/* ────────────────────────────────────────────
   포트폴리오 챗봇 (로컬 RAG + OpenAI)
   - 브라우저는 /api/chat 서버리스 함수만 호출 (OpenAI 키는 서버에만 존재)
   - "김현복에 대해" 편하게 물어볼 수 있는 AI 비서
──────────────────────────────────────────── */

const DEFAULT_GREETING =
  '저는 김현봇입니다. 김현복님의 경력·프로젝트·기술·성향 등 궁금한 걸 편하게 물어보세요!';

const DEFAULT_SUGGESTIONS = [
  '대표 프로젝트가 뭔가요?',
  '게임 개발에서 왜 AI로 전향했나요?',
  '본인의 강점은?',
  '어떤 기술 스택을 쓰나요?',
];

export default function Chatbot({
  greeting = DEFAULT_GREETING,
  suggestions = DEFAULT_SUGGESTIONS,
  title = '김현봇',
  subtitle = 'AI · RAG 챗봇',
  placeholder = '김현복님께 궁금하신 게 있으면 물어보세요',
} = {}) {
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: greeting }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, loading]);

  const ask = async (q) => {
    const question = (q ?? '').trim();
    if (!question || loading) return;
    const history = msgs
      .filter((m) => !m.error)
      .map((m) => ({ role: m.role, content: m.content }))
      .slice(-6);
    setMsgs((m) => [...m, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMsgs((m) => [...m, { role: 'assistant', content: data.answer }]);
      } else {
        // 429(요청 과다) 등 서버 메시지를 그대로 노출
        setMsgs((m) => [
          ...m,
          { role: 'assistant', error: true, content: data.error || '⚠ 답변을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.' },
        ]);
      }
    } catch {
      setMsgs((m) => [
        ...m,
        { role: 'assistant', error: true, content: '⚠ 답변을 가져오지 못했어요. 잠시 후 다시 시도하거나 asd25999@gmail.com 으로 문의해 주세요.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div className="chatbot hud-frame">
      <div className="chatbot-head">
        <span className="chatbot-head-ava">
          <img src="/avatar-bot.svg" alt="" />
          <span className="chatbot-dot" />
        </span>
        <span className="arcade chatbot-title">{title}</span>
        <span style={st.sub}>{subtitle}</span>
      </div>

      <div className="chatbot-log" ref={scrollRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`chat-row ${m.role}`}>
            <img className="chat-ava" src={m.role === 'assistant' ? '/avatar-bot.svg' : '/avatar-user.svg'} alt="" />
            <span className={`chat-bubble ${m.role}${m.error ? ' err' : ''}`}>{m.content}</span>
          </div>
        ))}
        {loading && (
          <div className="chat-row assistant">
            <img className="chat-ava" src="/avatar-bot.svg" alt="" />
            <span className="chat-bubble assistant">
              <span className="typing"><i /><i /><i /></span>
            </span>
          </div>
        )}
      </div>

      {msgs.length <= 1 && (
        <div className="chat-suggest">
          {suggestions.map((s) => (
            <button key={s} type="button" className="chat-chip" onClick={() => ask(s)} disabled={loading}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form className="chatbot-input" onSubmit={onSubmit}>
        <input
          className="form-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          maxLength={500}
          aria-label="질문 입력"
        />
        <button type="submit" className="btn-arcade" disabled={loading || !input.trim()}>
          {loading ? '...' : 'SEND'}
        </button>
      </form>
    </div>
  );
}

const st = {
  sub: { fontSize: '0.62rem', color: 'var(--text-mute)', marginLeft: 'auto', fontFamily: 'var(--font-mono)' },
};
