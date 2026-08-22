import { useEffect } from 'react';
import IconPillNav from '../components/IconPillNav';
import { homeNav } from '../components/homeNav';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

export default function Home() {
  // 숨김 전용 하위 페이지(/portfolio): 검색엔진 비노출(noindex) + 탭 타이틀만 엔지니어 포지셔닝으로 교체.
  // 기본 메인 페이지는 이제 강사 포트폴리오(Teaching)이므로 index.html 기본 메타를 그대로 둔다.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = '김현복 · AI Service Engineer';

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <>
      <IconPillNav items={homeNav} />
      <main className="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
