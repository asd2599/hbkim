import { useState, useEffect } from 'react';

// 단어 배열을 타이핑 → 멈춤 → 지우기 → 다음 단어로 반복.
// 현재 화면에 보여줄 문자열을 반환한다.
export default function useTypewriter(
  words,
  { typeSpeed = 85, deleteSpeed = 40, pause = 1400 } = {},
) {
  const [index, setIndex] = useState(0);     // 현재 단어
  const [sub, setSub] = useState(0);         // 보여줄 글자 수
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length];
    const atEnd = !deleting && sub === current.length;
    const atStart = deleting && sub === 0;
    const delay = atEnd ? pause : deleting ? deleteSpeed : typeSpeed;

    const t = setTimeout(() => {
      if (atEnd) {
        setDeleting(true);                       // 다 썼으면 지우기 시작
      } else if (atStart) {
        setDeleting(false);                      // 다 지웠으면 다음 단어
        setIndex((i) => (i + 1) % words.length);
      } else {
        setSub((s) => s + (deleting ? -1 : 1));  // 한 글자씩
      }
    }, delay);
    return () => clearTimeout(t);
  }, [sub, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return words.length ? words[index % words.length].substring(0, sub) : '';
}
