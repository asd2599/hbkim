// 포트폴리오 단일 소스 (docs/<project> 기반).
// 프로젝트 추가 = 이 배열에 객체 1개 추가하면 카드 + 상세페이지(/projects/:slug) 자동 생성.
//
// 상세 페이지 섹션 스키마 (모두 선택적 — 있는 것만 렌더):
//   overview   : 한 문단 요약
//   problem    : { context, points[] }           문제 정의
//   approach   : [{ title, desc }]                핵심 접근/기능 (어떻게 풀었나)
//   architecture: { text, stack[] }               시스템 구조
//   results    : [{ value, label, kind }]         결과 (kind: 'fact' 실측 | 'goal' 목표)
//   retrospective: [string]                        회고/다음 단계
//
// 사실/수치는 docs 근거로만 채운다. 목표치는 kind:'goal'로 표기해 실측과 구분.

export const projects = [
  {
    slug: 'eggtalk',
    emoji: '🥚',
    icon: 'proj-eggtalk',
    color: '#a78bfa',
    title: 'EggTalk',
    subtitle: '실시간 AI 다마고치 소셜 플랫폼',
    oneLiner: 'LLM을 제품의 핵심 경험으로 통합한 실시간 풀스택 서비스',
    role: '개인 풀스택 (기획·설계·구현·배포·운영 단독)',
    period: '2026',
    team: '1인',
    liveUrl: 'https://gamestack.store',
    liveLabel: 'gamestack.store',
    demoUrl: 'https://youtu.be/O5ymmClGbLg',
    repos: [
      { label: 'Frontend', url: 'https://github.com/asd2599/eggtalk-frontend' },
      { label: 'Backend', url: 'https://github.com/asd2599/eggtalk-backend' },
    ],
    tags: ['LLM', 'AI Agent', 'Realtime', 'WebSocket'],
    stack: ['React 19', 'Vite', 'Tailwind 4', 'Node.js', 'Express 5', 'Socket.IO', 'PostgreSQL', 'OpenAI API', 'Fly.io', 'Vercel'],
    overview:
      'AI 펫이 성격을 갖고 대화하고, AI 봇이 마피아 게임에서 사람을 속이며, AI가 두 펫의 "유전자"를 합성해 자식 펫을 만드는 실시간 소셜 플랫폼. ' +
      'LLM을 7개 도메인에 작업별로 분리 통합하고, 실시간 동기화부터 프로덕션 장애 추적까지 1인 단독 수행.',
    gallery: [
      {
        src: '/images/Eggtalk/PetChat.PNG',
        title: 'AI 펫 페르소나 채팅',
        caption: 'empathy·logic·humor 성격 스탯을 system 프롬프트에 동적 주입 — 같은 질문도 펫마다 다른 말투로 응답.',
        points: [
          { x: 48, y: 45, text: '성격 스탯이 주입된 페르소나 응답 — 펫마다 어투가 다름' },
          { x: 45, y: 53, text: '대화 한 마디마다 공감·논리력·애정도 등 스탯이 실시간 증감' },
        ],
      },
      {
        src: '/images/Eggtalk/MapiaGamePage.PNG',
        title: 'AI 마피아 게임',
        caption: 'AI 펫이 역할(마피아/시민)에 맞춰 거짓말·추리·투표·야간 행동까지 수행하는 멀티 에이전트 게임 루프.',
        points: [
          { x: 82, y: 27, text: 'AI 봇 — 역할에 맞춰 거짓말하고 추리하는 자율 플레이어' },
          { x: 20, y: 46, text: '나(플레이어) — AI들과 함께 토론·투표' },
          { x: 47, y: 73, text: 'AI가 채팅 맥락을 읽고 스스로 생성한 추리 발언' },
        ],
      },
      {
        src: '/images/Eggtalk/BreedingPage.PNG',
        title: '자식 펫 유전 합성',
        caption: '두 펫의 "유전자"를 gpt-4-turbo가 JSON으로 합성해 새로운 성격의 자식 펫을 생성.',
        points: [
          { x: 50, y: 17, text: '두 부모 펫의 유전자를 gpt-4-turbo가 JSON으로 합성한 자식' },
          { x: 50, y: 72, text: '부모로부터 상속된 성격 매트릭스(포만감·청결도·체력·스트레스)' },
        ],
      },
      {
        src: '/images/Eggtalk/DatingChat.PNG',
        title: 'AI 데이팅',
        caption: '두 AI 펫이 페르소나를 갖고 자율적으로 대화하고, 선물이 스탯에 반영되는 실시간 채팅.',
        points: [
          { x: 27, y: 20, text: '두 AI 펫이 서로 자율적으로 1:1 대화' },
          { x: 45, y: 61, text: '선물이 스탯(지식 +10 · 논리력 +5)에 즉시 반영' },
        ],
      },
      {
        src: '/images/Eggtalk/RollPayPage.PNG',
        title: '역할극 + LLM 채점',
        caption: '역할극 발화를 gpt-4o-mini가 temp 0.2·max_tokens 5로 결정적 채점(점수만 회수해 비용 최소화).',
        points: [
          { x: 33, y: 11, text: 'LLM이 부여한 역할로 진행하는 역할극' },
          { x: 50, y: 47, text: 'gpt-4o-mini가 발화를 결정적으로 채점 — 점수만 회수' },
        ],
      },
      {
        src: '/images/Eggtalk/CreateStoryGame.PNG',
        title: '스토리 생성 미니게임',
        caption: 'response_format JSON Mode로 창의적이되 파싱 가능한 시나리오를 생성.',
        points: [
          { x: 45, y: 18, text: '사용자 입력(누가)' },
          { x: 50, y: 38, text: 'JSON Mode로 생성된 시나리오 요소(언제·어디서·무엇을)' },
        ],
      },
    ],
    problem: {
      context: '단발 챗봇을 넘어, LLM이 제품의 핵심 루프로 동작하는 서비스를 1인으로 설계·운영하는 것이 목표.',
      points: [
        '같은 OpenAI API라도 작업(창의성·정확성·비용·지연)마다 다른 엔지니어링 결정이 필요',
        '숨김 정보 게임(마피아)에서 역할이 모두에게 노출되던 실시간 동기화 문제',
        'DB·서버가 막힌 상황에서 인프라를 통째로 이전하고 라이브로 검증해야 하는 운영 과제',
      ],
    },
    approach: [
      { title: '작업 기반 멀티모델 오케스트레이션', desc: '기능별로 모델·temperature·max_tokens·출력 포맷을 분리 설계. 결정적 채점은 gpt-4o-mini·temp 0.2·max_tokens 5로 비용 최소화, 핵심 유전 분석만 gpt-4-turbo 투입.' },
      { title: '구조화 출력(JSON Mode)으로 안전한 계약', desc: '분류·점수·게임 상태에 response_format: json_object를 강제해 백엔드가 안전하게 소비할 수 있는 계약을 보장.' },
      { title: '자율 AI 에이전트 (마피아 봇)', desc: '맥락(채팅 로그·생존자·자기 역할)을 읽고 역할에 맞게 거짓말·추리하며 투표·야간 행동까지 수행하는 멀티 에이전트 게임 루프.' },
      { title: '소켓별 개인화 전송으로 역할 은닉', desc: '시청자별로 마스킹한 players 배열을 개별 emit해 숨김 정보 게임을 성립. 배포 서버에 소켓 2개를 붙인 E2E로 검증.' },
    ],
    aiModels: [
      { feature: '펫 페르소나 채팅', model: 'gpt-3.5-turbo', config: 'text · temp 0.8 · 150', intent: '빠른 응답·저비용, 자연스러운 대화' },
      { feature: '마피아 봇 발언', model: 'gpt-4o-mini', config: 'text · temp 1.2 · 150', intent: '예측 불가한 "사람다운" 발화·연기' },
      { feature: '역할극 채점', model: 'gpt-4o-mini', config: 'text · temp 0.2 · 5', intent: '결정적·초저비용 분류(점수만 회수)' },
      { feature: '시나리오 생성', model: 'gpt-4o-mini', config: 'JSON · temp 1.1', intent: '창의적이되 파싱 가능한 구조' },
      { feature: '자식 펫 유전 분석', model: 'gpt-4-turbo', config: 'JSON · temp 0.8 · 500', intent: '정교한 추론이 필요한 핵심 기능만 상위 모델' },
      { feature: '미니게임 판정', model: 'gpt-4o-mini', config: 'JSON · temp 0.1~0.7 · 20~400', intent: '판정은 낮게, 서사는 높게 온도 분리' },
    ],
    architecture: {
      text: 'React 19(Vercel) ↔ REST(axios) + WebSocket(socket.io) ↔ Node/Express 5(Fly.io 단일 머신). 소켓 핸들러를 5개 도메인으로 분리, 게임 상태는 인메모리 Map. PostgreSQL(Supabase Pooler) + OpenAI 멀티모델.',
      stack: ['React 19', 'Express 5', 'Socket.IO', 'PostgreSQL (Supabase)', 'OpenAI multi-model', 'Fly.io', 'Vercel'],
      image: '/images/Eggtalk/ERD.png',
      imageCaption: '데이터베이스 ERD — 유저·펫·방·메시지·게임 상태 스키마',
    },
    engineering: [
      { title: 'Supabase IPv6 전용 연결 장애 (Case 1)', desc: 'DB 연결이 ENOTFOUND로 실패 → DNS 조회로 AAAA(IPv6) 레코드만 존재함을 확인. IPv4를 지원하는 Session Pooler로 전환하고, 풀러 호스트를 프로빙해 리전(ap-southeast-1)을 역추적해 연결 문자열을 복구.' },
      { title: '로그인만 500 — JWT_SECRET 누락 (Case 2)', desc: '가입·조회는 되는데 로그인만 실패 → jwt.sign에 들어갈 JWT_SECRET이 배포 환경에 누락(.env가 컨테이너에서 제외). 플랫폼 secret으로 주입. "성공 경로에서만 터지는 버그"라 표면 스모크 테스트로는 안 잡히던 케이스.' },
      { title: '인메모리 상태 ↔ 멀티 머신 충돌 (Case 3)', desc: '소켓 게임 상태를 인메모리 Map에 두는 설계가 다중 머신에서 상태 분리를 유발 → 배포를 단일 머신으로 고정해 실시간 무결성 보장. 설계 선택이 운영 제약으로 이어진다는 점까지 추적해 운영에 반영.' },
    ],
    results: [
      { value: '7개', label: 'LLM 통합 도메인', kind: 'fact' },
      { value: '버그 7종', label: '마피아 게임 진단·정상화 + E2E 회귀 검증', kind: 'fact' },
      { value: 'IPv6·JWT', label: '프로덕션 장애 근본원인 추적·라이브 검증', kind: 'fact' },
    ],
    retrospective: [
      '인메모리 상태의 수평 확장 한계 → Redis 어댑터 도입 시 멀티 머신 가능',
      'LLM 호출 캐싱·재시도·토큰 사용량 모니터링 레이어 추가',
      '펫 대화 RAG(과거 상호작용 기억), LLM-as-judge 기반 자동 밸런싱',
    ],
  },

  {
    slug: 'flowfit',
    emoji: '🏢',
    icon: 'proj-flowfit',
    color: '#6ea8ff',
    title: 'FlowFit',
    subtitle: '기업 업무 자동화 AI 포털',
    oneLiner: '8개 업무 도메인의 반복 업무를 25개+ AI 기능으로 자동화한 사내 "AI 워크포스" 포털 (3인 팀 팀장)',
    role: '3인 팀 팀장 — 구조·통합 주도, 재무·법무·구매·전략 직접 구현',
    period: '2026.02 – 2026.04',
    team: '3인 팀',
    liveUrl: 'https://flowfit.cloud',
    liveLabel: 'flowfit.cloud',
    demoUrl: 'https://youtu.be/cfgdkqi9yyw',
    repos: [
      { label: 'Frontend', url: 'https://github.com/asd2599/flowfit-frontend' },
      { label: 'Backend', url: 'https://github.com/asd2599/flowfit-backend' },
    ],
    tags: ['Function Calling', 'RAG', 'Vision', 'STT', 'SSE'],
    stack: ['React 19', 'Vite', 'TailwindCSS', 'FastAPI', 'gpt-4o-mini', 'text-embedding-3-small', 'whisper-1', 'dall-e-3', 'Tavily', 'yfinance', 'python-pptx', 'PostgreSQL'],
    overview:
      '"AI 채팅"이 아니라 영수증 OCR→전표 분류, 규정 RAG 검토, 구매 에이전트, 경쟁사 리서치→PPTX 보고서까지 ' +
      '실제 업무 산출물을 만드는 25개+ 기능을 8개 도메인에 통합한 사내 AI 워크포스 포털. ' +
      'Function Calling 에이전트·키워드/벡터 RAG·멀티모달(Vision·STT)·SSE 스트리밍을 작업 특성에 맞게 적용. 3인 팀 팀장으로 구조·통합을 주도.',
    gallery: [
      {
        src: '/images/flowfit/law-chatbot.png', wide: true,
        title: '법무 계약 벡터 RAG 챗봇',
        caption: '사내 법령·계약 문서를 text-embedding-3-small로 임베딩하고 코사인 유사도(numpy)로 검색하는 벡터 RAG — 출처와 함께 근거 기반 답변.',
        points: [
          { x: 30, y: 41, text: '문서 근거로만 답변 — 근거 없으면 "확인 불가"로 환각 억제' },
          { x: 24, y: 55, text: '답변 근거 문서·조항을 출처로 함께 표시' },
        ],
      },
      {
        src: '/images/flowfit/law-contract.png', wide: true,
        title: '계약서 AI 리스크 검토',
        caption: 'gpt-4o-mini Vision으로 PDF 계약서를 조항별로 분석해 위험도 탐지·수정안 제안.',
        points: [
          { x: 32, y: 56, text: 'gpt-4o-mini Vision으로 계약서 전체 리스크 요약' },
          { x: 18, y: 88, text: '위험 조항을 조항별로 탐지(Warning)·수정안 제안' },
        ],
      },
      {
        src: '/images/flowfit/finance-receipt.png', wide: true,
        title: '재무 Vision OCR 영수증',
        caption: '영수증 이미지를 gpt-4o-mini Vision으로 인식해 ERP 호환 JSON(거래처·공급가액·부가세·계정과목·신뢰도) 반환 — 계정과목 자동 분류·중복 탐지.',
        points: [
          { x: 50, y: 45, text: 'gpt-4o-mini Vision으로 영수증 이미지 인식 (base64)' },
          { x: 24, y: 88, text: '동일 거래 중복 지출 자동 감지(중복 의심)' },
          { x: 74, y: 88, text: '계정과목 자동 분류 + 신뢰도 표기' },
        ],
      },
      {
        src: '/images/flowfit/purchase-agent.png', wide: true,
        title: '구매 Function Calling 에이전트',
        caption: '구매 요청 한 문장 → search_products → check_budget → create_purchase_order를 스스로 호출하는 멀티스텝 에이전트(LangChain 미사용), 사고 과정 SSE 스트리밍.',
        points: [
          { x: 16, y: 20, text: 'Tavily 실시간 검색으로 상위 3개 상품 선별·가격 비교' },
          { x: 44, y: 20, text: '에이전트 사고 과정을 SSE로 실시간 스트리밍' },
        ],
      },
      {
        src: '/images/flowfit/strategy-research.png', wide: true,
        title: '전략 경쟁사 리서치',
        caption: 'Tavily 검색 + GPT 분석으로 경쟁사별 이슈를 자동 정리하고 전략 액션 아이템 도출.',
        points: [
          { x: 50, y: 8, text: 'Tavily 검색 + GPT로 경쟁사 동향 자동 정리' },
          { x: 50, y: 74, text: 'GPT가 도출한 즉시 실행 전략 액션 아이템' },
        ],
      },
      {
        src: '/images/flowfit/strategy-finance.png', wide: true,
        title: '전략 재무 지표 비교',
        caption: 'yfinance로 주가·시총·매출·영업이익·PER/PBR 비교, Recharts 시각화 + python-pptx로 바로 쓰는 PPTX 보고서 자동 생성.',
        points: [
          { x: 50, y: 16, text: 'yfinance로 기업별 재무 지표 자동 수집·비교' },
          { x: 50, y: 58, text: 'Recharts 시각화 + python-pptx 보고서 자동 생성' },
        ],
      },
    ],
    problem: {
      context: '사무직 업무의 상당 부분이 반복·수작업 중심이며, 기존 ERP·챗봇·RPA는 비용·유연성·통합 워크플로우에서 한계.',
      points: [
        '재무: 영수증·세금계산서 수작업 입력 오류·지연',
        '법무: 계약서 검토에 드는 시간과 전문 인력 부재',
        '구매: 공급업체 비교·견적의 복잡성',
        '전략: 경쟁사 동향 수집·분석에 소요되는 시간',
      ],
    },
    approach: [
      { title: '적재적소 RAG — 키워드 vs 벡터', desc: '같은 RAG라도 용어가 명확한 HR 규정은 키워드 빈도 검색, 법무 계약은 text-embedding-3-small 임베딩 + 코사인 유사도(numpy)의 벡터 RAG로 분리. 문서 특성·비용에 맞춰 기술을 선택.' },
      { title: 'Function Calling 구매 에이전트', desc: '구매 요청 한 문장 → search_products(Tavily 웹검색) → check_budget(DB 예산조회) → create_purchase_order(주문서 생성)를 스스로 순서대로 호출하는 멀티스텝 에이전트를 LangChain 없이 직접 구현.' },
      { title: '멀티모달 실무 적용', desc: 'Vision(영수증·계약서 이미지 분석), STT(whisper-1 회의 녹취), 이미지 생성(dall-e-3 카드뉴스)을 각 부서 업무 흐름에 맞게 통합.' },
      { title: '외부 데이터 → 바로 쓰는 산출물', desc: 'Tavily 실시간 검색·yfinance 재무 데이터를 GPT로 분석하고, python-pptx로 PPTX 보고서까지 자동 생성 — "분석만"이 아니라 .pptx/.docx/.pdf 산출물로 연결.' },
    ],
    aiModelsTitle: 'AI 통합 — 작업별 모델·포맷 분리',
    aiModelsIntro: '"OpenAI를 붙였다"가 아니라, 작업의 성격에 맞는 모델·포맷·기법을 선택. 구조화 작업엔 JSON Mode를 강제해 백엔드 계약을 보장(20개+ 서비스).',
    aiModelsHeaders: ['용도', '모델', '포맷', '비고'],
    aiModels: [
      { feature: '텍스트 생성·분류·요약', model: 'gpt-4o-mini', config: 'JSON / text', intent: '비용·속도 최적의 워크호스 (서비스 전반 37개 호출 지점)' },
      { feature: '법무 계약 RAG 임베딩', model: 'text-embedding-3-small', config: 'vector', intent: '1536차원 벡터 유사도 검색' },
      { feature: '영수증·계약서 이미지 분석', model: 'gpt-4o-mini (Vision)', config: 'JSON', intent: 'base64 image_url 입력 → 구조화 출력' },
      { feature: '회의 녹취·음성 메모', model: 'whisper-1', config: 'text', intent: 'STT — 음성 → 텍스트' },
      { feature: '마케팅 이미지 생성', model: 'dall-e-3', config: 'image', intent: '카드뉴스·홍보 이미지' },
    ],
    engineering: [
      { title: '적재적소 RAG (키워드 vs 벡터)', desc: '공통 rag_utils가 두 전략을 제공 — HR 규정은 문단 청킹 + 키워드 빈도 검색(임베딩 비용 0), 법무 계약은 임베딩 + 코사인 유사도 벡터 RAG. 배치 임베딩의 index 정렬로 순서까지 보장.' },
      { title: 'LangChain 없는 Function Calling 에이전트', desc: '3개 도구(검색·예산조회·주문서 생성)를 정의하고, 모델의 tool_calls를 받아 실제 함수를 실행한 뒤 결과를 다시 모델에 돌려주는 멀티스텝 루프를 직접 구현. tool_start/tool_done/token 이벤트를 SSE로 실시간 노출.' },
      { title: '부서 = 모듈 경계 아키텍처', desc: 'routers/<부서> + services/<부서> + 공통 services/common(RAG·문서파싱·STT)으로 8개 도메인·25+ 기능을 한 백엔드에 담되 경계를 명확히 — 3인 병렬 개발, 기능 추가 = 서비스 1개 추가.' },
      { title: 'JSON Mode 계약으로 인터페이스 안정화', desc: '백엔드가 소비하는 거의 모든 LLM 응답에 response_format=json_object를 강제(20개+ 서비스)해 파싱 깨짐을 구조적으로 차단.' },
    ],
    architecture: {
      text: 'React 19 + Vite + Tailwind(Vercel) ↔ REST / SSE(EventSource) ↔ FastAPI(Fly.io). main.py가 /api/<부서>로 부서별 라우터를 마운트하고, 공통 역량(RAG·문서파싱·STT)은 services/common으로 추출. PostgreSQL(pg8000) + OpenAI 멀티모델 + 외부 API(Tavily·yfinance).',
      stack: ['FastAPI (Fly.io)', '부서별 Router / Service', 'common 모듈 (RAG·OCR·STT)', 'PostgreSQL (pg8000)', 'OpenAI 멀티모델', 'Tavily · yfinance'],
    },
    results: [
      { value: '8개 도메인', label: '25+ AI 기능 단일 포털 통합', kind: 'fact' },
      { value: '키워드 + 벡터', label: '문서 특성별 적재적소 RAG 분리', kind: 'fact' },
      { value: 'Function Calling', label: '3개 도구 멀티스텝 에이전트 + SSE 실시간', kind: 'fact' },
      { value: '50%+', label: '부서별 반복 업무 처리시간 단축 (목표)', kind: 'goal' },
    ],
    retrospective: [
      '법무 임베딩의 영속 캐시·벡터 인덱스 도입 (현재 경량 numpy 검색)',
      'LLM 호출 캐싱·재시도·토큰 사용량 모니터링 레이어 추가',
      'Slack·MS Teams 연동, 부서 간 워크플로우 연결(구매→재무 전표 자동화)로 엔터프라이즈 SaaS 확장',
    ],
  },

  {
    slug: 'kiwofarm',
    emoji: '🌱',
    icon: 'proj-kiwofarm',
    color: '#58ff8c',
    title: 'KiwoFarm',
    subtitle: '공공데이터 + AI 도시농업 비서',
    oneLiner: '공공데이터를 1차 콘텐츠로 가공해 심기→기르기→수확→보상 풀사이클을 AI로 잇는 초보 텃밭 비서',
    role: '3인 팀 — 풀스택 / AI 기능(추천 엔진·RAG·수확 인증) 구현',
    period: '2026',
    team: '3인 팀 (창업경진대회)',
    liveUrl: 'https://kiwofarm.store',
    liveLabel: 'kiwofarm.store',
    repos: [
      { label: 'Frontend', url: 'https://github.com/mspark9/kiwofarm_frontend' },
      { label: 'Backend', url: 'https://github.com/asd2599/kiwofarm-backend' },
    ],
    demoUrl: 'https://youtu.be/uqzFtO08WqE',
    tags: ['공공데이터 RAG', 'Vision', '추천 엔진', '게이미피케이션'],
    stack: ['Next.js 14', 'TypeScript', 'Mantine', 'FastAPI', 'Python', 'gpt-4o', 'gpt-4o-mini', 'text-embedding-3-small', '농사로·NCPMS OpenAPI', 'PostgreSQL', 'Vercel', 'Fly.io'],
    overview:
      '농식품 공공데이터(농사로 OpenAPI)를 "부가 정보"가 아니라 서비스의 1차 콘텐츠로 가공해, 초보 텃밭인의 ' +
      '심기 → 기르기 → 수확 → 보상 풀사이클을 AI로 잇는 도시농업 비서. 공공데이터를 작물 단위로 정제·임베딩하고, ' +
      '결정적 추천 엔진 + GPT-4o 멀티모달 수확 인증 + 게이미피케이션으로 연결.',
    gallery: [
      {
        src: '/images/kiwofarm/kiwo-recommend.jpg',
        title: '작목 추천 — 매트릭스가 결정, AI는 설명',
        caption: '작목 40종×12개월 매트릭스를 결정적 코드로 평가해 적기 작물을 고르고, gpt-4o-mini는 그 결과에 대한 설명·팁만 생성.',
        points: [
          { x: 30, y: 16, text: '매트릭스(40종×12개월)가 점수로 결정한 적기 작물' },
          { x: 22, y: 36, text: '적합도 88% — 재현 가능한 결정적 스코어 엔진 산출' },
          { x: 45, y: 58, text: 'LLM은 "판단자"가 아니라 "설명자" — 이유·팁만 생성' },
        ],
      },
      {
        src: '/images/kiwofarm/kiwo-calendar.jpg',
        title: 'AI 영농 캘린더',
        caption: '농사로 텃밭가꾸기·이달의 농업기술을 RAG로 회수해 파종~수확 일정을 날짜별로 자동 생성, 병해충 발생정보로 위험 시점 경보.',
        points: [
          { x: 50, y: 68, text: '공공데이터 RAG로 파종~수확 작업을 날짜에 자동 배치' },
          { x: 38, y: 93, text: '작업 유형 구분(생육관리·물관수·병해충·수확)' },
        ],
      },
      {
        src: '/images/kiwofarm/kiwo-harvest.jpg',
        title: 'GPT-4o 멀티모달 수확 인증',
        caption: '수확 사진의 작물 일치·수확 여부·신선도·도용 의심(모니터 재촬영·스톡사진)·신뢰도를 GPT-4o로 판정 — 멀티모달을 진위 검증 시스템으로 사용.',
        points: [
          { x: 38, y: 25, text: 'GPT-4o Vision으로 수확 사진 진위 판정(작물·도용 의심)' },
          { x: 44, y: 65, text: '인증 통과 → 도감·수확레벨·완주율에 반영' },
        ],
      },
      {
        src: '/images/kiwofarm/kiwo-collection.jpg',
        title: '작물 도감 (게이미피케이션)',
        caption: '수확 인증에 성공한 작물이 도감(40종)에 수집되고, 기록·완주로 지속 동기를 부여 — 초보자의 높은 중도 포기율을 낮추는 장치.',
        points: [
          { x: 30, y: 39, text: '수확 인증 성공 작물이 도감에 수집(40종)' },
          { x: 50, y: 86, text: '기록·완주 비교로 지속 방문 유도' },
        ],
      },
      {
        src: '/images/kiwofarm/kiwo-journal.jpg',
        title: 'AI 자동 성장 일지',
        caption: '기간 메모·사진을 gpt-4o-mini가 한 편의 성장 일지로 자동 정리·작성해 커뮤니티에 자랑 글로 공유.',
        points: [
          { x: 30, y: 23, text: '메모·사진을 gpt-4o-mini가 일지로 자동 작성' },
          { x: 50, y: 80, text: '기록 사진을 엮어 커뮤니티 자랑 글로 공유' },
        ],
      },
      {
        src: '/images/kiwofarm/kiwo-attendance.jpg',
        title: '출석·연속 보상',
        caption: '출석·연속(Streak)·도감·뱃지·포인트(팜)로 지속 동기를 부여하는 게이미피케이션 — 풀사이클의 "보상" 단계.',
        points: [
          { x: 50, y: 42, text: '출석·연속 기록으로 매일 방문 유도' },
          { x: 50, y: 70, text: '연속 보상(+팜)으로 중도 포기율↓' },
        ],
      },
    ],
    problem: {
      context: '기존 영농 플랫폼(농업ON·NH오늘농사)은 전업·상업농 대상이라 초보 텃밭인에게는 진입장벽이 높음.',
      points: [
        '초보자는 내 환경에 무엇을 심을지 스스로 판단하기 어려움',
        '이 사진이 진짜 수확이 맞는지, 지금 무엇을 해야 하는지 알기 어려움',
        '높은 중도 포기율 — 지속 동기 부여 장치 부재',
      ],
    },
    approach: [
      { title: '공공데이터를 "1차 콘텐츠"로 가공', desc: '농사로 비정형 본문을 작물 단위로 재귀속 → 800자 청크 → text-embedding-3-small 임베딩하는 파이프라인으로, LLM 환각을 공공 실데이터로 보강하는 RAG의 1차 소스로 사용.' },
      { title: '심기 — 매트릭스가 결정, AI는 설명', desc: '작목 40종×12개월 매트릭스를 결정적 코드로 평가(재현 가능)하고, gpt-4o-mini는 결정된 top N에 대한 이유·팁·첫 달 할 일만 1회 배치로 생성.' },
      { title: '수확 — GPT-4o 멀티모달 진위 판정', desc: '수확 사진의 작물 일치·수확 여부·신선도·도용 의심·신뢰도를 GPT-4o로 판정. crop_match && is_harvest && !fake_suspect면 통과하는 관대 정책으로 초보 경험은 지키되 명백한 도용만 차단.' },
      { title: '풀사이클 + 게이미피케이션', desc: '심기→기르기(영농 캘린더·위기 경보)→수확(인증)→보상(출석·도감·뱃지·팜 경매)의 루프로 설계해 초보자의 "첫 수확 완주"를 끝까지 동반.' },
    ],
    aiModelsTitle: '모델 운용 — 작업별 분리',
    aiModelsIntro: '핵심 판정(수확 인증)에만 gpt-4o를 투입하고, 설명·챗봇 등 대부분은 gpt-4o-mini로 처리하는 비용·품질 분리.',
    aiModelsHeaders: ['용도', '모델', '구분', '비고'],
    aiModels: [
      { feature: '수확 사진 진위 판정', model: 'gpt-4o', config: '멀티모달(Vision)', intent: '신뢰가 중요한 판정에만 상위 모델 투입' },
      { feature: '추천 설명·팁·챗봇 답변', model: 'gpt-4o-mini', config: 'text', intent: '비용·속도 최적 워크호스' },
      { feature: '작물 지식 임베딩 (RAG)', model: 'text-embedding-3-small', config: 'vector(1536)', intent: '로컬 .npy 코사인 검색' },
    ],
    engineering: [
      { title: '"매트릭스가 결정하고 AI는 설명한다"', desc: '작목 추천 점수는 100% 결정적 코드로 산정(재현 가능)하고, LLM은 결과에 대한 자연어 설명만 1회 배치로 생성. 신뢰가 중요한 추천에서 LLM을 판단자가 아니라 설명자로 둔 핵심 설계.' },
      { title: '적정 규모 RAG — pgvector → 로컬 .npy', desc: '작물 단위 청크가 수백 개 이하·쓰기 1회·읽기 위주라, pgvector 대신 작물별 .npy(임베딩 행렬)+.json(메타) + numpy brute-force 코사인으로 다운사이징. 벡터 DB·DB 세션 없이 더 빠르고 인프라 불필요 — 오버엔지니어링을 걷어낸 판단.' },
      { title: 'GPT-4o를 "진위 검증 시스템"으로', desc: '멀티모달을 이미지 캡션이 아니라 도용(모니터 재촬영·스톡사진) 의심까지 판정하는 신뢰 시스템으로 사용. 날짜·작물 자동 매칭과 결합해 "진짜 수확"을 증명.' },
      { title: 'graceful degradation', desc: 'OpenAI 키가 없거나 호출이 실패해도 추천은 결정적 엔진으로 그대로 동작. 시연용 demo_mode는 인증을 통과시키되 판정 결과는 그대로 기록해 시연 후 검토 가능.' },
    ],
    architecture: {
      text: 'Next.js 14 + TypeScript + Mantine(Vercel) ↔ REST ↔ FastAPI(Fly.io). 풀사이클 단계가 곧 모듈 경계(core/planting·farmplan·harvest·rag·rewards·community)이고, 공공데이터는 data/ 클라이언트로 격리. PostgreSQL(Supabase) + OpenAI 멀티모델 + 로컬 임베딩 스토어(.npy).',
      stack: ['Next.js 14 (Vercel)', 'FastAPI (Fly.io)', '도메인별 core 모듈', '로컬 .npy 임베딩 스토어', 'PostgreSQL (Supabase)', '농사로 · NCPMS OpenAPI'],
    },
    results: [
      { value: '공공데이터 RAG', label: '농사로 5종·NCPMS를 작물 단위로 정제·임베딩(40종 중 18종 본문 축적)', kind: 'fact' },
      { value: '매트릭스 + AI', label: '작목 40종×12개월 결정적 추천 + LLM 설명 분리', kind: 'fact' },
      { value: 'GPT-4o Vision', label: '수확 사진 진위(도용 의심) 판정', kind: 'fact' },
      { value: '첫 수확 70%', label: '무료 이용자 완주율 (출시 1년 목표)', kind: 'goal' },
    ],
    retrospective: [
      '서비스 피벗 — 영농 의사결정 도구(디지털 트윈·출하 예측)에서 초보 도시 텃밭인의 "첫 수확" 풀사이클 비서로 재정의(페르소나 검증)',
      '미충원 작목 본문 추가 수집·정밀 가공, LLM 호출 캐싱·모니터링 레이어',
      '모바일 네이티브 앱, 직거래(KAMIS 가격 연동) Phase 2, 커뮤니티 스케일업',
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
