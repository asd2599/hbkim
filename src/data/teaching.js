// 강사 전용 포트폴리오 단일 소스 (/teaching).
// 사실(기간·기관·과목)은 profile.js(career)를 재사용해 중복·불일치를 막는다.
// 교육 철학 / 커리큘럼 카피는 포지셔닝 초안 — TODO 표기 부분은 실제 내용으로 다듬을 것.
// 수치·성과는 절대 지어내지 않는다. 실데이터가 생기면 성과 섹션을 추가로 확장.

import { profile } from './profile';

export const teachingProfile = {
  eyebrow: 'Teaching Portfolio',
  headline: '복잡한 걸 쉽게 — 게임 개발자 출신 프로그래밍 강사',
  sub: '게임을 직접 만들어 출시한 개발 경험 + 8년간의 강의 경력',
  intro:
    '2D 게임을 직접 출시하고 게임 클라이언트를 총괄한 개발 현장 경험 위에, 8년간 게임 프로그래밍을 가르쳐 왔습니다. ' +
    '비전공자도 끝까지 따라오게 만드는 설명과 커리큘럼 설계가 강점이며, 이제는 AI 도구를 수업에 녹여 더 빠르게 만들고 깊이 이해하도록 돕습니다.',
  // Hero 타이핑 연출 (강의 분야)
  typing: ['C/C++ · 자료구조', 'Unity · Unreal 게임 프로그래밍', 'DirectX 그래픽스', 'AI 활용 · 바이브 코딩'],
};

// 교육 철학 — 포지셔닝 문구. 사실 근거: 게임 출시·클라이언트 총괄 경력(노리소프트·부클),
// 비전공자 교육 역량(profile.strengths), AI 도구(Cursor·Claude Code) 실사용.
export const philosophy = [
  { title: '"왜"부터 이해시킨다', desc: '문법 암기가 아니라 동작 원리와 맥락을 먼저 잡아, 처음 보는 문제도 스스로 풀게 만듭니다.' },
  { title: '비전공자의 눈높이', desc: '복잡한 개념을 일상 비유와 시각 자료로 풀어, 코딩이 처음인 사람도 진입 장벽을 넘게 합니다.' },
  { title: '현장에서 만든 것을 가르친다', desc: '게임을 직접 출시하고 클라이언트를 총괄한 경험을 수업에 녹여, 교과서가 아닌 실무의 감각을 전합니다.' },
  { title: 'AI 시대의 코딩', desc: 'Cursor·Claude Code 같은 AI 도구를 수업에 접목해, 더 빠르게 만들고 더 깊이 이해하도록 돕습니다.' },
];

// 강의 이력: profile.career의 "강사" 경력만 재사용 + 교육용 메타(과목·과정·대상) 부가.
// 과목 목록은 career[].desc(이력서 근거)에 기반.
const teachingMeta = {
  'SBS게임아카데미': { subjects: ['C/C++', 'DirectX', 'Unity'], courseType: '국비·국기 과정', audience: '게임 프로그래밍 취업 준비생' },
  '서울게임아카데미': { subjects: ['Unity', 'Unreal', 'C/C++'], courseType: '국비·국기 과정', audience: '게임 프로그래밍 취업 준비생' },
};

export const teachingHistory = profile.career
  .filter((c) => c.role.includes('강사'))
  .map((c) => ({
    period: c.period,
    org: c.company,
    role: c.role,
    desc: c.desc,
    ...(teachingMeta[c.company] || {}),
  }));

// 강의 가능 주제 / 커리큘럼 (게임 · AI 두 트랙 동등)
export const curriculum = [
  {
    track: '게임 프로그래밍',
    blurb: '기초 프로그래밍부터 엔진 기반 게임 제작까지, 끝까지 만들어 보는 과정.',
    topics: ['C/C++ · 자료구조', '게임 수학 · 물리', 'DirectX 그래픽스', 'Unity 게임 개발', 'Unreal Engine'],
  },
  {
    track: 'AI 활용 · 바이브 코딩',
    blurb: 'AI 도구로 빠르게 만들고 깊이 이해하는 실전 개발 워크플로우.',
    topics: ['LLM · RAG 기초', '프롬프트 엔지니어링', 'Cursor · Claude Code 바이브 코딩', 'AI 에이전트 · Function Calling', 'AI 제품 빠르게 만들기'],
  },
];

export const teachingContact = {
  email: profile.contact.email,
  phone: profile.contact.phone,
  github: profile.contact.github,
  githubLabel: profile.contact.githubLabel,
};
