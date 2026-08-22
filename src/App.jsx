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
        {/* 기본 페이지: 현재 활동(AI 강사 · Code Agent/AI 활용 강의)을 대표하는 강사 포트폴리오 */}
        <Route path="/" element={<Teaching />} />
        {/* 숨김 전용: 메인에서 링크하지 않음. 주소를 아는 사람만 접근하는 AI 서비스 엔지니어 포트폴리오 */}
        <Route path="/portfolio" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}
