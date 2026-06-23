import { useEffect } from 'react';
import IconPillNav from '../components/IconPillNav';
import { teachNav } from '../components/teaching/teachNav';
import TeachHero from '../sections/teaching/TeachHero';
import Philosophy from '../sections/teaching/Philosophy';
import TeachHistory from '../sections/teaching/TeachHistory';
import Curriculum from '../sections/teaching/Curriculum';
import TeachContact from '../sections/teaching/TeachContact';

export default function Teaching() {
  // 강사 페이지 동안만: body 에 차분한 블루 테마 적용(아케이드 레이어 off) + 검색엔진 비노출(noindex)
  useEffect(() => {
    document.body.classList.add('teaching-mode');

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.body.classList.remove('teaching-mode');
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="teaching-root">
      <IconPillNav items={teachNav} />
      <main className="main-content">
        <TeachHero />
        <Philosophy />
        <TeachHistory />
        <Curriculum />
        <TeachContact />
      </main>
    </div>
  );
}
