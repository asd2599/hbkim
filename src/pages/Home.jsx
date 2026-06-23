import IconPillNav from '../components/IconPillNav';
import { homeNav } from '../components/homeNav';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

export default function Home() {
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
