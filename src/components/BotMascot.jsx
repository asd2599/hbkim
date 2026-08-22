/* ────────────────────────────────────────────
   김현봇 마스코트 — 대화 상태에 따라 반응하는 SVG 로봇.
   state 값에 따라 CSS 클래스(.is-*)만 바뀌고, 동작은 전부 index.css 의 키프레임이 담당한다.
   - idle      : 대기 중 (춤)
   - listening : 사용자가 입력 중 (앞으로 기울여 듣기)
   - thinking  : 답변 생성 중 (턱 괴고 안테나 회전)
   - talking   : 답변 말하는 중 (입 움직임 + 제스처)
   - wave / happy / teach / code / contact : 대화 내용에 맞춘 리액션
   - error     : 요청 실패 (글리치)
──────────────────────────────────────────── */

import { BOT_STATUS } from './botStatus';

// 눈 모양 — 상태별로 다르게 그린다
function Eyes({ state }) {
  if (state === 'happy') {
    return (
      <g className="bm-eyes" fill="none" strokeWidth="2.4" strokeLinecap="round">
        <path d="M20.6 27.4 24 24l3.4 3.4" />
        <path d="M36.6 27.4 40 24l3.4 3.4" />
      </g>
    );
  }
  if (state === 'error') {
    return (
      <g className="bm-eyes bm-eyes-err" fill="none" strokeWidth="2.4" strokeLinecap="round">
        <path d="M21.2 23.2 26.8 28.8M26.8 23.2 21.2 28.8" />
        <path d="M37.2 23.2 42.8 28.8M42.8 23.2 37.2 28.8" />
      </g>
    );
  }
  return (
    <g className="bm-eyes">
      <circle className="bm-eye" cx="24" cy="26" r="3.4" />
      <circle className="bm-eye" cx="40" cy="26" r="3.4" />
      <circle className="bm-glint" cx="25.2" cy="24.8" r="1.1" />
      <circle className="bm-glint" cx="41.2" cy="24.8" r="1.1" />
    </g>
  );
}

export default function BotMascot({ state = 'idle', className = '' }) {
  return (
    <svg
      className={`bm is-${state} ${className}`}
      viewBox="0 0 64 74"
      role="img"
      aria-label={`김현봇 ${BOT_STATUS[state] || ''}`}
    >
      <g className="bm-all">
        {/* 안테나 */}
        <g className="bm-antenna">
          <path className="bm-antenna-rod" d="M32 14V7" strokeWidth="2" strokeLinecap="round" />
          <circle className="bm-antenna-ball" cx="32" cy="5" r="3" />
        </g>

        {/* 팔 (몸통보다 뒤에 그려 자연스럽게) */}
        <rect className="bm-arm bm-arm-l" x="8.5" y="45" width="5.6" height="16" rx="2.8" />
        <rect className="bm-arm bm-arm-r" x="49.9" y="45" width="5.6" height="16" rx="2.8" />

        {/* 다리 */}
        <rect className="bm-leg bm-leg-l" x="21.5" y="62" width="7" height="10" rx="3.2" />
        <rect className="bm-leg bm-leg-r" x="35.5" y="62" width="7" height="10" rx="3.2" />

        {/* 머리 */}
        <g className="bm-head">
          <rect className="bm-head-shell" x="13" y="13" width="38" height="28" rx="10" />
          <Eyes state={state} />
          <rect className="bm-mouth" x="26" y="33" width="12" height="3.4" rx="1.7" />
        </g>

        {/* 목 + 몸통 */}
        <rect className="bm-neck" x="29" y="40" width="6" height="4" rx="2" />
        <g className="bm-body">
          <rect className="bm-torso" x="17" y="43" width="30" height="21" rx="8" />
          <circle className="bm-core" cx="32" cy="53.5" r="4" />
        </g>
      </g>
    </svg>
  );
}
