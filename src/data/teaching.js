// 강사 전용 포트폴리오 단일 소스 (/teaching).
// 사실(기간·기관·과목)은 profile.js(career)를 재사용해 중복·불일치를 막는다.
// 교육 철학 / 커리큘럼 카피는 포지셔닝 초안 — TODO 표기 부분은 실제 내용으로 다듬을 것.
// 수치·성과는 절대 지어내지 않는다. 실데이터가 생기면 성과 섹션을 추가로 확장.

import { profile } from './profile';

export const teachingProfile = {
  eyebrow: 'AI 강사',
  headline: '복잡한 AI를 쉽게 — Code Agent를 가르치는 AI 강사',
  sub: 'Claude Code·Codex 등 Code Agent, Gemini·기업 전용 에이전트 등 AI 활용을 가르칩니다',
  intro:
    '현재 민코딩에서 AI 강사로 일하며, 기업 대상으로 Claude Code·Codex 등 Code Agent 활용법과 Gemini·기업 전용 에이전트 등 AI 활용법을 가르치고 있습니다. ' +
    '2D 게임을 직접 출시하고 클라이언트를 총괄한 개발 현장 경험, 8년간 게임 프로그래밍을 가르쳐온 경력, ' +
    'AI 풀스택 제품을 직접 만들어 온 경험을 바탕으로 비전공자도 끝까지 따라오게 만드는 설명과 실무에 바로 쓰는 커리큘럼을 설계합니다.',
  // Hero 타이핑 연출 (강의 분야)
  typing: [
    'Claude Code · Codex 코드 에이전트 강의',
    'Gemini · 기업 전용 에이전트 AI 활용',
    '바이브 코딩 워크플로우',
    'C/C++ · Unity · Unreal 게임 프로그래밍',
  ],
};

// 교육 철학 — 포지셔닝 문구. 사실 근거: 게임 출시·클라이언트 총괄 경력(노리소프트·부클),
// 비전공자 교육 역량(profile.strengths), AI 도구(Cursor·Claude Code) 실사용.
export const philosophy = [
  { title: '"왜"부터 이해시킨다', desc: '문법 암기가 아니라 동작 원리와 맥락을 먼저 잡아, 처음 보는 문제도 스스로 풀게 만듭니다.' },
  { title: '비전공자의 눈높이', desc: '복잡한 개념을 일상 비유와 시각 자료로 풀어, 코딩이 처음인 사람도 진입 장벽을 넘게 합니다.' },
  { title: '현장에서 만든 것을 가르친다', desc: '게임을 직접 출시하고 클라이언트를 총괄한 경험, AI 제품을 직접 만든 경험을 수업에 녹여, 교과서가 아닌 실무의 감각을 전합니다.' },
  { title: 'AI 에이전트 시대의 실무 교육', desc: 'Claude Code·Codex 같은 Code Agent, Gemini 같은 생성형 AI를 직접 실무에 적용해본 경험을 바탕으로, 도구를 다루는 법이 아니라 일하는 방식 자체를 바꾸는 법을 가르칩니다.' },
];

// 강의 이력: profile.career의 "강사" 경력만 재사용 + 교육용 메타(과목·과정·대상) 부가.
// 과목 목록은 career[].desc(이력서 근거)에 기반.
const teachingMeta = {
  '민코딩': { subjects: ['Claude Code', 'Codex', 'Gemini', '기업 전용 에이전트'], courseType: '기업 출강 · 사내교육', audience: '기업 실무자' },
  'SBS게임아카데미': { subjects: ['C/C++', 'DirectX', 'Unity'], courseType: '국비·국기 과정', audience: '게임 프로그래밍 취업 준비생' },
  '서울게임아카데미': { subjects: ['Unity', 'Unreal', 'C/C++'], courseType: '국비·국기 과정', audience: '게임 프로그래밍 취업 준비생' },
};

// 현재 소속(민코딩, 2026.07–현재)을 포함해 "강사" 경력 전부를 profile.career 에서 끌어온다.
export const teachingHistory = profile.career
  .filter((c) => c.role.includes('강사'))
  .map((c) => ({
    period: c.period,
    org: c.company,
    role: c.role,
    desc: c.desc,
    ...(teachingMeta[c.company] || {}),
  }));

// 강의 가능 주제 / 커리큘럼 (현재 AI 에이전트 강의 두 트랙 + 배경 경험인 게임 프로그래밍)
export const curriculum = [
  {
    track: 'Code Agent 활용 강의',
    blurb: 'Claude Code, Codex 등 코드 에이전트로 실무 개발 워크플로우를 바꾸는 법을 가르칩니다.',
    topics: ['Claude Code 실전 활용', 'Codex 등 코드 에이전트 비교·활용', '바이브 코딩 워크플로우', '에이전트 프롬프트·설정 튜닝', '팀 도입 전략'],
  },
  {
    track: 'AI 활용 강의 (기업 · 일반)',
    blurb: 'Gemini 등 생성형 AI와 기업 전용 에이전트를 업무에 적용하는 법을 가르칩니다.',
    topics: ['Gemini 등 생성형 AI 활용', '기업 전용(사내) AI 에이전트 구축·활용', '업무 자동화 워크플로우', 'AI 활용 사내교육 커리큘럼 설계'],
  },
  {
    track: '게임 프로그래밍',
    blurb: '기초 프로그래밍부터 엔진 기반 게임 제작까지, 8년간 가르쳐온 배경 경험.',
    topics: ['C/C++ · 자료구조', '게임 수학 · 물리', 'DirectX 그래픽스', 'Unity 게임 개발', 'Unreal Engine'],
  },
];

export const teachingContact = {
  email: profile.contact.email,
  phone: profile.contact.phone,
  github: profile.contact.github,
  githubLabel: profile.contact.githubLabel,
};

// Hero 플레이어 카드 스탯 — 모두 실제 이력 기반 수치(지어내지 않음).
// value 는 실제 숫자, max 는 게이지 표현용 상한.
export const playerStats = [
  { label: 'TEACHING', value: 8, max: 10, unit: 'YRS', note: '게임아카데미 프로그래밍 강사 (2017.10–2025.12)' },
  { label: 'FIELD', value: 10, max: 10, unit: 'YRS', note: '게임 개발 · 교육 현장 경험' },
  { label: 'AI BUILD', value: 3, max: 10, unit: 'APPS', note: 'EggTalk · FlowFit · KiwoFarm 직접 개발·배포' },
];

// 보너스 스테이지(버그 잡기) 연출용 라벨.
// agentLabels: 잡으면 화면의 버그를 전부 정리해주는 파워업(코드 에이전트) 이름 — 실제 강의에서 다루는 도구.
// bugLabels  : 잡아야 하는 버그에 붙는 에러 이름.
export const bonusStage = {
  agentLabels: ['Claude Code', 'Codex', 'Gemini'],
  bugLabels: ['NullRef', 'TypeError', 'Timeout', 'OOM', 'Segfault', 'RaceCond', 'OffByOne'],
};
