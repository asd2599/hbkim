// 개인 정보 단일 소스 (docs/미리디_AX엔지니어_이력서_김현복 기반)
// 화면 카피는 이 파일을 참조한다. 사실/수치는 docs 근거로만 갱신.

export const profile = {
  name: '김현복',
  nameEn: 'Hyunbok Kim',
  // 포지셔닝: AI FDE 한정 → AI 서비스 엔지니어 전반
  role: 'AI Service Engineer',
  roleTags: ['AI Service Engineer', 'AI Full-Stack', 'Vibe Coding'],
  tagline: 'AI를 실제로 작동하는 제품으로 만드는 풀스택 엔지니어',
  // 한 줄 요약
  oneLiner:
    '게임 개발·교육 10년의 현장 경험 위에, LLM·RAG·멀티모달을 제품에 통합하는 AI 풀스택 역량을 더했습니다.',
  // About 요약 (이력서 핵심 요약 기반, 직무 일반화)
  summary:
    '게임 엔진 개발과 10년 이상의 프로그래밍 교육 경험을 기반으로, 복잡한 시스템 설계와 실시간 데이터 처리에 강한 AI 서비스 엔지니어입니다. ' +
    'OpenAI API·RAG·멀티모달(Vision/STT)·LLM 에이전트를 실제 서비스에 통합해 기획부터 배포·운영까지 단독 또는 팀 리드로 수행하며, ' +
    'Cursor·Claude Code 기반 AI 페어 프로그래밍(바이브 코딩)으로 빠르게 동작하는 제품을 만듭니다.',
  strengths: [
    'LLM을 단발 기능이 아니라 제품 루프로 설계 (멀티모델 오케스트레이션·구조화 출력)',
    'RAG·Function Calling·Vision·STT 등 최신 AI 기술의 실무 적용',
    '실시간(WebSocket)·상태 일관성·프로덕션 장애 추적까지 끝을 보는 엔지니어링',
    '비전공자에게 복잡한 기술을 쉽게 전달해온 교육·문서화 역량',
  ],
  contact: {
    email: 'asd25999@gmail.com',
    phone: '010-9636-2599',
    github: 'https://github.com/asd2599',
    githubLabel: 'github.com/asd2599',
    site: 'https://hbkim.cloud',
  },
  // 경력 (이력서 5. 경력 사항)
  career: [
    {
      period: '2023.12 – 2025.12',
      company: 'SBS게임아카데미',
      role: '게임 프로그래밍 강사',
      desc: 'C/C++, DirectX, Unity 게임 프로그래밍 국비·국기 과정 강의',
    },
    {
      period: '2017.03 – 2023.12',
      company: '서울게임아카데미',
      role: '전임 강사 (9년)',
      desc: 'Unity, Unreal, C/C++ 게임 프로그래밍 국비·국기 과정 강의',
    },
    {
      period: '2015.12 – 2017.07',
      company: '부클',
      role: '게임 클라이언트 개발',
      desc: 'Unity 기반 3D 게임 클라이언트 개발',
    },
    {
      period: '2013.12 – 2015.10',
      company: '노리소프트',
      role: '게임 클라이언트 개발 총괄',
      desc: '2D 게임 개발·서비스 출시, 클라이언트 총괄 (인앱결제·iOS·앱마켓 상용화)',
    },
  ],
  education: [
    { period: '2006.03 – 2013.08', name: '동서대학교', detail: '디지털콘텐츠학부 게임전공 졸업' },
  ],
};

// Hero 타이핑 연출 문구 (주요 기술)
export const typingPhrases = [
  'LLM · RAG 기반 AI 서비스',
  '멀티모달 (Vision · STT) 통합',
  'Function Calling AI 에이전트',
  '실시간 WebSocket 풀스택',
  'React · FastAPI · PostgreSQL',
  'OpenAI API 프로덕션 운영',
];

// Hero 인벤토리 — 3개 스킬 클래스(각각 따로 장착되는 연출).
// icon 값은 public/skill-icons.svg 의 symbol id.
export const skillClasses = [
  {
    id: 'ai',
    label: 'AI',
    color: '#2de2e6',
    items: [
      { name: 'LLM', icon: 'skill-llm' },
      { name: 'RAG', icon: 'skill-rag' },
      { name: 'AI Agents', icon: 'skill-agent' },
      { name: 'Multi-Modal (VLM)', icon: 'skill-vlm' },
    ],
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    color: '#ff4d8d',
    items: [
      { name: 'React', icon: 'skill-react' },
      { name: 'FastAPI', icon: 'skill-fastapi' },
      { name: 'Node.js', icon: 'skill-nodejs' },
      { name: 'Socket.io', icon: 'skill-socketio' },
      { name: 'Vector DB', icon: 'skill-vectordb' },
    ],
  },
  {
    id: 'core',
    label: 'Core',
    color: '#58ff8c',
    items: [
      { name: 'C/C++', icon: 'skill-cpp' },
      { name: 'System Optimization', icon: 'skill-optimize' },
      { name: 'Low-Latency', icon: 'skill-latency' },
    ],
  },
];

// 소셜/연락 버튼 (Hero 원형 버튼)
export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/asd2599', external: true },
  { id: 'email', label: 'Email', href: 'mailto:asd25999@gmail.com', external: false },
];

// 컬러 기술 아이콘 매핑 (devicon class). 다크 배경에서 또렷한 컬러 아이콘만 등록.
export const techIcons = {
  'React': 'devicon-react-original colored',
  'React 19': 'devicon-react-original colored',
  'Vite': 'devicon-vitejs-plain colored',
  'TailwindCSS': 'devicon-tailwindcss-plain colored',
  'TailwindCSS 4': 'devicon-tailwindcss-plain colored',
  'Tailwind 4': 'devicon-tailwindcss-plain colored',
  'Node.js': 'devicon-nodejs-plain colored',
  'Python': 'devicon-python-plain colored',
  'JavaScript': 'devicon-javascript-plain colored',
  'C': 'devicon-c-plain colored',
  'C++': 'devicon-cplusplus-plain colored',
  'C#': 'devicon-csharp-plain colored',
  'PostgreSQL': 'devicon-postgresql-plain colored',
  'FastAPI': 'devicon-fastapi-plain colored',
};

// Hero 컬러 아이콘 스트립 (대표 스택)
export const heroTech = [
  'React', 'Vite', 'JavaScript', 'Python', 'Node.js',
  'FastAPI', 'PostgreSQL', 'TailwindCSS', 'C++', 'C#',
];

// 기술 스택 (이력서 3. 핵심 보유 역량 기반 — AI 우선 정렬)
export const skillGroups = [
  { category: 'LLM / AI 파이프라인', skills: ['OpenAI API', 'RAG', 'LLM Agent', 'VLM / Vision', 'Vector DB', 'Prompt Engineering'] },
  { category: 'AI 자동화 / 에이전트', skills: ['Function Calling', 'Python 자동화', 'AI 워크플로우', 'n8n'] },
  { category: 'Backend / 서빙', skills: ['FastAPI', 'Node.js', 'Express 5', 'Socket.IO', 'JWT', 'SSE Streaming'] },
  { category: 'Frontend', skills: ['React 19', 'Vite', 'TailwindCSS 4'] },
  { category: 'Language', skills: ['Python', 'JavaScript', 'C', 'C++', 'C#'] },
  { category: 'Game Engine / System', skills: ['Unity3D', 'Unreal Engine', 'DirectX'] },
  { category: 'Database', skills: ['PostgreSQL'] },
  { category: 'AI 도구 / DevOps', skills: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Vercel', 'Fly.io', 'GitHub'] },
];
