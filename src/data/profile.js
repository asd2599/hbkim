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
  // quiz: About 섹션 "AI 스무고개" 게임용 메타데이터.
  //   - level   : 게임 단계/난이도 (1=쉬움 … 4=어려움). 이 순서대로 출제된다.
  //   - keyword : 정답 단어. 회사명이 아니라 그 시절을 연상시키는 핵심 단어.
  //   - aliases : 정답으로 인정할 다른 표기/동의어
  //   - hint    : 단계 시작 시 한 번 던지는 추상적 힌트 (1개)
  // 시작 힌트 이후엔 힌트 없이, 플레이어 질문에 AI(/api/twenty)가 예/아니오로만 답한다.
  // behind: 카드를 열면(클릭) 나오는 비하인드 스토리. (정답을 맞혀야 카드 해금)
  // TODO(hbkim): keyword / aliases / hint / behind 실제 내용으로 채우기.
  career: [
    {
      period: '2023.12 – 2025.12',
      company: 'SBS게임아카데미',
      role: '게임 프로그래밍 강사',
      desc: 'C/C++, DirectX, Unity 게임 프로그래밍 국비·국기 과정 강의',
      quiz: {
        level: 4,
        keyword: '전환',
        aliases: ['전향', '방향전환', '터닝포인트'],
        hint: '모든 걸 바꾼 어떤 흐름을 보고, 가르치던 내가 직접 길을 바꿨다',
      },
      behind:
        'SBS에서 강의하던 시기의 가장 큰 변화는 AI였습니다. AI가 빠르게 발전하면서 수업의 방향도, 학생들의 질문도 눈에 띄게 달라졌어요. 교육의 방향이 바뀌는 걸 가까이서 지켜보다 보니, 제 커리어와 인생의 방향에도 변화가 필요하다는 걸 직감했습니다. 그래서 가르치던 자리에서 한 걸음 더 나아가, 직접 AI 제품을 만드는 이 길로 전환하게 됐습니다.',
    },
    {
      period: '2017.10 – 2023.12',
      company: '서울게임아카데미',
      role: '게임 프로그래밍 강사',
      desc: 'Unity, Unreal, C/C++ 게임 프로그래밍 국비·국기 과정 강의',
      quiz: {
        level: 3,
        keyword: '극복',
        aliases: ['이겨냄', '이겨내기', '극복하기'],
        hint: '그만둘 뻔한 위기를, 오히려 나를 키우는 계기로 바꿨다',
      },
      behind:
        '강의를 이어가던 중 목 상태가 너무 나빠져, 강사를 그만둬야 하나 고민할 정도였습니다. 그냥 버티는 대신 병원 치료를 병행하고 발성 수업을 꾸준히 들으며 발성·스피치·커뮤니케이션까지 폭넓게 공부했습니다. 위기를 핑계가 아니라 계기로 삼은 셈이라, 결과적으로 예전보다 훨씬 더 좋은 강의를 할 수 있게 저 자신을 끌어올렸습니다.',
    },
    {
      period: '2015.12 – 2017.07',
      company: '부클',
      role: '게임 클라이언트 개발',
      desc: 'Unity 기반 3D 게임 클라이언트 개발',
      quiz: {
        level: 2,
        keyword: '적응',
        aliases: ['적응력', '적응하기', '순응'],
        hint: '맡은 영역도, 게임 장르도 도중에 바뀌었지만 그때그때 맞춰갔다',
      },
      behind:
        '처음엔 부사수로 들어가 UI만 담당했습니다. 그런데 UI를 만들다 보니 캐릭터·카메라·스킬처럼 맞물리는 부분들로 자연스럽게 손이 넓어졌고, UI와 서버가 연결된 영역도 많아 그쪽 작업까지 도맡게 됐습니다. 게다가 프로젝트는 처음 MORPG로 개발하다 퍼블리셔를 잡지 못해, 중간에 MMORPG로 장르를 통째로 갈아엎고 다시 만들었습니다. 덕분에 클라이언트 전반과 서버 연동, 그리고 "엎고 다시 짓는" 경험까지 한 번에 겪었죠.',
    },
    {
      period: '2013.12 – 2015.10',
      company: '노리소프트',
      role: '게임 클라이언트 개발 총괄',
      desc: '2D 게임 개발·서비스 출시, 클라이언트 총괄 (인앱결제·iOS·앱마켓 상용화)',
      quiz: {
        level: 1,
        keyword: '프로토타입',
        aliases: ['prototype', '시제품'],
        hint: '원래는 "맛보기"만 만들기로 했던 것',
      },
      behind:
        '입사 당시 막내였고, 선임들은 각자 다른 프로젝트에 매여 있었습니다. 원래 제 역할은 새 프로젝트의 프로토타입만 Unity로 만들어 보는 것이었고, 이후엔 선임들이 이어받기로 되어 있었죠. 그런데 선임들의 앞 프로젝트가 길어지고 제가 만든 프로토타입의 완성도가 예상보다 높아지면서, 자연스럽게 클라이언트 전체를 제가 맡게 됐습니다. 선임들은 뒤에 붙는 UI 작업만 거들었고, 결국 마무리부터 출시까지 제 손으로 끝냈습니다.',
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
