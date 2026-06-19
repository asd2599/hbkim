import Sidebar from '../components/Sidebar';
import MobileHeader from '../components/MobileHeader';
import SectionNav from '../components/SectionNav';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Sidebar />
      <MobileHeader />
      <SectionNav />
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
