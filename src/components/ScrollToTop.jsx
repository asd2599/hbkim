import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 라우트 전환 시 스크롤 위치를 맨 위로 복귀
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
