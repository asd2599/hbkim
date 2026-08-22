import { useSyncExternalStore } from 'react';
import {
  subscribe, getSnapshot, levelProgress,
  ACHIEVEMENTS, ACHIEVEMENT_TOTAL, dismissToast,
} from './arcadeStore';

// 화면 좌상단에 고정되는 아케이드 HUD(SCORE/LV/COMBO) + 우하단 업적 토스트.
// 스크롤·클릭 등 페이지 이벤트에 반응해 값이 오른다.
export default function ArcadeHud() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const { ratio } = levelProgress(s.score);

  return (
    <>
      <div className="ahud" aria-live="off">
        <div className="ahud-row">
          <span className="ahud-label arcade">SCORE</span>
          <span className="ahud-score arcade">{String(s.score).padStart(6, '0')}</span>
        </div>

        <div className="ahud-row">
          <span className="ahud-lv arcade">LV.{s.level}</span>
          <span className="ahud-xp"><i style={{ width: `${ratio * 100}%` }} /></span>
        </div>

        <div className="ahud-row ahud-foot">
          <span className="ahud-trophy">🏆 {s.unlocked.length}/{ACHIEVEMENT_TOTAL}</span>
          {s.combo > 1 && <span className="ahud-combo arcade" key={s.combo}>x{s.combo} COMBO</span>}
        </div>
      </div>

      <div className="atoast-wrap">
        {s.toasts.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`atoast atoast-${t.kind}`}
            onClick={() => dismissToast(t.id)}
          >
            <span className="atoast-icon">{t.kind === 'level' ? '⬆' : '🏆'}</span>
            <span className="atoast-body">
              <strong className="arcade">{t.title}</strong>
              <em>{t.desc}</em>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

// 마지막 섹션에서 보여주는 업적 목록 (해금/미해금 모두 표시)
export function AchievementBoard() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return (
    <div className="ach-board">
      {Object.entries(ACHIEVEMENTS).map(([id, def]) => {
        const on = s.unlocked.includes(id);
        return (
          <div key={id} className={`ach-item${on ? ' on' : ''}`}>
            <span className="ach-badge">{on ? '🏆' : '🔒'}</span>
            <span className="ach-text">
              <strong className="arcade">{on ? def.title : '? ? ? ? ?'}</strong>
              <em>{on ? def.desc : '아직 잠겨 있습니다'}</em>
            </span>
            <span className="ach-pts arcade">+{def.score}</span>
          </div>
        );
      })}
    </div>
  );
}
