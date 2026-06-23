import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Teaching from './pages/Teaching';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        {/* 숨김 전용: 메인에서 링크하지 않음. 주소를 아는 사람만 접근하는 강사 포트폴리오 */}
        <Route path="/teaching" element={<Teaching />} />
      </Routes>
    </>
  );
}
