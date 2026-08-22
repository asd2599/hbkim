import { useEffect, useRef } from 'react';
import { addScore, unlock, setGodMode } from './arcadeStore';

const KONAMI = [
  'arrowup', 'arrowup', 'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a',
];

const COLORS = ['#3b82f6', '#60a5fa', '#2de2e6', '#a78bfa', '#ffe45e'];

// 전역 연출 레이어: 클릭 파티클 · 점수 플로팅 · 커서 트레일 · 코나미 코드.
// 렌더 폭주를 피하려고 파티클은 React state 가 아니라 DOM 으로 직접 다룬다.
export default function ArcadeFx() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;

    const spawn = (el, life) => {
      layer.appendChild(el);
      setTimeout(() => el.remove(), life);
    };

    // ── 클릭: 파티클 폭발 + 획득 점수 플로팅 ──
    const onPointerDown = (e) => {
      // 토스트·HUD·입력창 클릭은 연출에서 제외
      if (e.target.closest?.('.atoast, .ahud, input, textarea, select')) return;

      const gained = addScore(5);
      unlock('first-click');

      const float = document.createElement('span');
      float.className = 'fx-float arcade';
      float.textContent = `+${gained}`;
      float.style.left = `${e.clientX}px`;
      float.style.top = `${e.clientY}px`;
      spawn(float, 900);

      if (reduced) return;

      for (let i = 0; i < 10; i++) {
        const p = document.createElement('i');
        p.className = 'fx-particle';
        const ang = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
        const dist = 26 + Math.random() * 44;
        p.style.left = `${e.clientX}px`;
        p.style.top = `${e.clientY}px`;
        p.style.background = COLORS[i % COLORS.length];
        p.style.setProperty('--dx', `${Math.cos(ang) * dist}px`);
        p.style.setProperty('--dy', `${Math.sin(ang) * dist}px`);
        spawn(p, 620);
      }
    };

    // ── 커서 트레일 (마우스 환경에서만) ──
    let last = 0;
    const onPointerMove = (e) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const d = document.createElement('i');
      d.className = 'fx-trail';
      d.style.left = `${e.clientX}px`;
      d.style.top = `${e.clientY}px`;
      spawn(d, 520);
    };

    // ── 코나미 코드 ──
    let idx = 0;
    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      idx = key === KONAMI[idx] ? idx + 1 : (key === KONAMI[0] ? 1 : 0);
      if (idx !== KONAMI.length) return;
      idx = 0;
      setGodMode(true);
      layer.closest('.teaching-root')?.classList.add('god-mode');
      unlock('konami');
      if (reduced) return;
      // 화면 전체 색종이
      for (let i = 0; i < 70; i++) {
        const c = document.createElement('i');
        c.className = 'fx-confetti';
        c.style.left = `${Math.random() * 100}vw`;
        c.style.background = COLORS[i % COLORS.length];
        c.style.animationDelay = `${Math.random() * 0.6}s`;
        c.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
        spawn(c, 3200);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    if (fine && !reduced) document.addEventListener('pointermove', onPointerMove);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointermove', onPointerMove);
      layer.closest('.teaching-root')?.classList.remove('god-mode');
      layer.replaceChildren();
    };
  }, []);

  useEffect(() => {
    // 콘솔 이스터에그
    console.log(
      '%c ▸ INSERT COIN ',
      'background:#3b82f6;color:#06101f;font-weight:700;padding:4px 10px;border-radius:4px',
      '\n↑ ↑ ↓ ↓ ← → ← → B A 를 눌러보세요.',
    );
  }, []);

  return <div className="fx-layer" ref={layerRef} aria-hidden="true" />;
}
