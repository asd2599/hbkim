import { useEffect } from 'react';
import IconPillNav from '../components/IconPillNav';
import { teachNav } from '../components/teaching/teachNav';
import ArcadeHud from '../components/teaching/ArcadeHud';
import ArcadeFx from '../components/teaching/ArcadeFx';
import { resetArcade } from '../components/teaching/arcadeStore';
import TeachHero from '../sections/teaching/TeachHero';
import Philosophy from '../sections/teaching/Philosophy';
import TeachHistory from '../sections/teaching/TeachHistory';
import Curriculum from '../sections/teaching/Curriculum';
import BonusStage from '../sections/teaching/BonusStage';
import TeachContact from '../sections/teaching/TeachContact';

export default function Teaching() {
  // 기본(메인) 페이지: body 에 블루 아케이드 테마 적용.
  // 검색엔진 노출은 index.html 기본 메타를 그대로 따른다(noindex 없음).
  useEffect(() => {
    document.body.classList.add('teaching-mode');
    return () => {
      document.body.classList.remove('teaching-mode');
      resetArcade();
    };
  }, []);

  return (
    <div className="teaching-root">
      <IconPillNav items={teachNav} />
      <ArcadeHud />
      <ArcadeFx />
      <main className="main-content">
        <TeachHero />
        <Philosophy />
        <TeachHistory />
        <Curriculum />
        <BonusStage />
        <TeachContact />
      </main>
    </div>
  );
}
