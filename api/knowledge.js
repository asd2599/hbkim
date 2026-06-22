// 챗봇 RAG 지식 소스 (출처: docs/chatbot_knowledge.md).
// docs 파일을 고치면 이 문자열도 함께 갱신할 것.
// 서버리스 함수가 import 로 추적해 번들에 포함하므로 런타임에서 항상 접근 가능.

export const KNOWLEDGE_MD = `# 김현복(Hyunbok Kim) — AI 챗봇 지식베이스

## 기본 정보

- 이름: 김현복 (Hyunbok Kim)
- 생년: 1987년생 (87년생)
- 직무/포지션: AI Service Engineer (AI 서비스 엔지니어). AI 풀스택 / 바이브 코딩 개발자로도 활동.
- 한 줄 소개: AI를 실제로 작동하는 제품으로 만드는 풀스택 엔지니어.
- 핵심 요약: 게임 개발·교육 10년의 현장 경험 위에, LLM·RAG·멀티모달을 제품에 통합하는 AI 풀스택 역량을 더했다.
- 거주지: 경기도 광명시 (수도권, 서울 인접). 서울·수도권 출근·미팅 모두 가능.
- 연락처: 이메일 asd25999@gmail.com · 전화 010-9636-2599 · GitHub github.com/asd2599 · 사이트 hbkim.cloud

## 소개 (About)

김현복은 게임 엔진 개발과 10년 이상의 프로그래밍 교육 경험을 기반으로, 복잡한 시스템 설계와 실시간 데이터 처리에 강한 AI 서비스 엔지니어다. OpenAI API·RAG·멀티모달(Vision/STT)·LLM 에이전트를 실제 서비스에 통합해 기획부터 배포·운영까지 단독 또는 팀 리드로 수행한다. Cursor·Claude Code 기반 AI 페어 프로그래밍(바이브 코딩)으로 빠르게 동작하는 제품을 만든다.

## 강점 (Strengths)

- LLM을 단발 기능이 아니라 제품 루프로 설계한다 (멀티모델 오케스트레이션·구조화 출력).
- RAG·Function Calling·Vision·STT 등 최신 AI 기술을 실무에 적용한다.
- 실시간(WebSocket)·상태 일관성·프로덕션 장애 추적까지 끝을 보는 엔지니어링을 한다.
- 비전공자에게 복잡한 기술을 쉽게 전달해온 교육·문서화 역량이 있다.

## 커리어 전환 스토리

게임 클라이언트 개발(약 3년)과 게임 프로그래밍 강사(약 8년)를 거쳐 AI 풀스택으로 전환했다. 오랜 개발·교육 경험에서 온 시스템 설계력·실시간 처리·전달력을 기반으로, AI 풀스택을 학습해 실제 동작하는 AI 제품을 빠르게 만드는 방향(바이브 코딩)으로 진로를 옮겼다.

## 경력 (Career)

- 2023.12 – 2025.12 · SBS게임아카데미 · 게임 프로그래밍 강사 — C/C++, DirectX, Unity 게임 프로그래밍 국비·국기 과정 강의.
- 2017.10 – 2023.12 · 서울게임아카데미 · 게임 프로그래밍 강사 — Unity, Unreal, C/C++ 게임 프로그래밍 국비·국기 과정 강의.
- 2015.12 – 2017.07 · 부클 · 게임 클라이언트 개발 — Unity 기반 3D 게임 클라이언트 개발.
- 2013.12 – 2015.10 · 노리소프트 · 게임 클라이언트 개발 총괄 — 2D 게임 개발·서비스 출시, 클라이언트 총괄(인앱결제·iOS·앱마켓 상용화).

## 학력 (Education)

- 2006.03 – 2013.08 · 동서대학교 · 디지털콘텐츠학부 게임전공 졸업.

## 강의·교육 경력 (Teaching)

게임 프로그래밍 분야에서 약 8년간 강의했다(서울게임아카데미 6년, SBS게임아카데미). 주요 과목은 C/C++, DirectX, Unity, Unreal 기반 게임 프로그래밍이며 국비·국기 과정을 담당했다. 비전공자·입문자에게 복잡한 개념을 쉽게 전달하는 데 강점이 있고, 이 전달력·문서화 역량은 AI 서비스 엔지니어로서도 핵심 자산이다.

## 기술 스택 (Skills)

- LLM / AI 파이프라인: OpenAI API, RAG, LLM Agent, VLM / Vision, Vector DB, Prompt Engineering
- AI 자동화 / 에이전트: Function Calling, Python 자동화, AI 워크플로우, n8n
- Backend / 서빙: FastAPI, Node.js, Express 5, Socket.IO, JWT, SSE Streaming
- Frontend: React 19, Vite, TailwindCSS 4
- Language: Python, JavaScript, C, C++, C#
- Game Engine / System: Unity3D, Unreal Engine, DirectX
- Database: PostgreSQL
- AI 도구 / DevOps: Claude Code, Cursor, GitHub Copilot, Vercel, Fly.io, GitHub

스킬을 3개 그룹으로 요약하면: (1) AI — LLM, RAG, AI Agents, Multi-Modal(VLM) / (2) Full-Stack — React, FastAPI, Node.js, Socket.io, Vector DB / (3) Core — C/C++, System Optimization, Low-Latency.

## 프로젝트 1 — EggTalk (실시간 AI 다마고치 소셜 플랫폼)

- 한 줄: LLM을 제품의 핵심 경험으로 통합한 실시간 풀스택 서비스.
- 역할: 개인 풀스택(기획·설계·구현·배포·운영 단독, 1인). 시기: 2026.
- 라이브: gamestack.store · 기술: React 19, Vite, Tailwind 4, Node.js, Express 5, Socket.IO, PostgreSQL, OpenAI API, Fly.io, Vercel.
- 개요: AI 펫이 성격을 갖고 대화하고, AI 봇이 마피아 게임에서 사람을 속이며, AI가 두 펫의 "유전자"를 합성해 자식 펫을 만드는 실시간 소셜 플랫폼. LLM을 7개 도메인에 작업별로 분리 통합하고 실시간 동기화·프로덕션 장애 추적까지 단독으로 끝냈다.
- 핵심 접근: 작업 기반 멀티모델 오케스트레이션(기능별 모델·temperature·max_tokens·출력 포맷 분리), 구조화 출력(JSON Mode), 자율 AI 에이전트(마피아 봇), 소켓별 개인화 전송.
- 아키텍처: React 19(Vercel) ↔ REST+WebSocket ↔ Node/Express 5(Fly.io). PostgreSQL(Supabase) + OpenAI 멀티모델.
- 결과: LLM 통합 도메인 7개 / 마피아 게임 버그 7종 진단·정상화 + E2E 회귀 검증 / IPv6·JWT 프로덕션 장애 근본원인 추적·라이브 검증.

## 프로젝트 2 — FlowFit (기업 업무 자동화 AI 포털)

- 한 줄: 8개 부서 25개 이상 AI 자동화 기능을 단일 포털로 통합(팀장 주도).
- 역할: 팀장 / 재무·법무·구매·전략팀 담당(3인 팀). 시기: 2026.02 – 2026.04.
- 라이브: flowfit.cloud · 기술: React 19, Vite, TailwindCSS, FastAPI, OpenAI(GPT-4o·Whisper·DALL·E 3), PostgreSQL, Fly.io, Vercel.
- 개요: 재무·법무·인사·구매·영업·마케팅·전략 등 부서별 반복 업무를 AI로 자동화하는 풀스택 포털. Function Calling 에이전트, RAG, OCR/Vision, STT, SSE 스트리밍을 실무에 적용. 팀장으로 주도.
- 핵심 접근: 법무 규정 RAG 챗봇(경량 RAG), 재무 Vision OCR 영수증 처리, 구매 Function Calling 에이전트, 전략 리서치·재무 분석 자동화.
- 결과: 8개 부서 25+ AI 기능 단일 포털 통합 / RAG·Vision·STT·DALL·E·Function Calling 멀티모달 실무 적용 / 부서별 반복 업무 처리시간 50%+ 단축(목표).

## 프로젝트 3 — KiwoFarm (공공데이터 + AI 도시농업 비서)

- 한 줄: 심기→기르기→수확→보상 풀사이클을 공공데이터와 AI로 연결.
- 역할: 풀스택 / AI 기능 구현(3인 팀, 창업경진대회). 시기: 2026.
- 라이브: kiwofarm.store · 시연 영상: youtu.be/uqzFtO08WqE · 기술: React, OpenAI(GPT-4o·Vision), Embeddings/RAG, 농사로 OpenAPI, PostgreSQL.
- 개요: 베란다·옥상·주말농장 초보 텃밭인을 위한 AI 영농 동반자. 농식품 공공데이터(농사로 OpenAPI)와 AI를 결합해 작목 추천→시기별 할 일→AI 수확 인증→보상의 4단계 풀사이클 제공.
- 핵심 접근: 결정적 스코어 추천 엔진+GPT 자연어, 농사로 RAG 일정 생성, GPT-4o Vision 수확 인증, 출처 포함 영농 RAG 챗봇.
- 결과: 5종 AI(Vision·추천·생성·RAG) 결합 / 작목 40종×12개월 매트릭스 + 18종 공공데이터 임베딩 / 무료 이용자 첫 수확 완주율 70%(출시 1년 목표).

## 인성 · 가치관 · 면접 Q&A

Q. MBTI나 성격이 어떻게 되나요?
A. 저는 ISFP예요. 내성적인 편이지만 '사회적 외향형'이라고 할까요 — 강의를 하거나 사람들과 만나는 자리에서는 조용히만 있지 않고 잘 어울려요. 다만 먼저 적극적으로 사람을 찾아다니는 타입은 아니에요. 성향이 대부분 중간(50%)에 가까워서, 너무 과하거나 모자란 것보다 '적당함·균형'을 추구하는 편입니다.

Q. 가치관이나 일할 때 중요하게 여기는 건 무엇인가요?
A. 균형과 적당함을 중요하게 생각하고, 무엇보다 정직함을 중시해요. 그리고 제가 하는 일이 많은 사람에게 도움이 되고 즐거움을 줄 수 있기를 바랍니다. 그게 제가 일하는 가장 큰 동기예요.

Q. 본인의 장점은 무엇인가요?
A. 한번 꽂히면 끝까지 파고드는 끈기가 강점이에요. EggTalk에서는 마피아 게임 버그 7종을 끝까지 진단·정상화하고, IPv6·JWT 같은 프로덕션 장애의 근본 원인까지 추적해 해결했어요. 또 게임 개발에서 AI로 전환한 뒤 단기간에 실제 배포된 제품 3개를 만들 만큼 학습·실행이 빠르고, 10년 강의 경험 덕에 복잡한 걸 쉽게 풀어 전달하는 데도 강합니다.

Q. 단점은 무엇인가요?
A. 저는 모든 규칙을 기계적으로 다 지키기보다, 상황에 맞게 유연하고 효율적으로 처리하는 걸 선호해요. 때로는 정해진 절차를 조금 우회해서라도 결과를 빠르게 내려는 편이라, 원칙·절차를 엄격히 따지는 환경에서는 의식적으로 균형을 맞추려 노력합니다. 다만 '정직함'만큼은 타협하지 않아요 — 거짓말을 하거나 결과를 속이는 일은 절대 하지 않습니다.

Q. 일하는 스타일은 어떤가요?
A. 정답을 오래 고민하기보다 일단 동작하는 걸 빠르게 만들어보고 다듬는, 실행 우선형이에요. 효율적으로 유연하게 푸는 걸 좋아하고, 바이브 코딩(AI 페어 프로그래밍)도 그 연장선이에요.

Q. 좋아하는 것은 무엇인가요?
A. 수영을 좋아해서 아침마다 수영을 하고, 운동을 즐기는 편이에요. 집에서 OTT로 드라마나 영화 보는 것도 좋아합니다.

Q. 싫어하는 것은 무엇인가요?
A. 거짓말을 싫어하고, 극단적인 것을 싫어해요. 종교·정치적으로 치우친 것뿐 아니라 너무 깔끔하거나 너무 지저분한 것처럼 한쪽으로 극단인 것들이 잘 안 맞아요. 균형이 맞는 상태를 편하게 느낍니다.

Q. 스트레스는 어떻게 푸나요?
A. 주로 친구들과 수다 떨면서 풀어요. 속에 있는 걸 바로바로 말하는 편이라, 이야기하다 보면 자연스럽게 풀립니다.

Q. 어떻게 이 길(개발)에 들어서게 됐나요?
A. 고등학교 진학할 때부터 '재미있는 일'을 하고 싶었고, 그 선택 중 하나가 게임학과였어요. 그렇게 게임 개발 관련 일을 쭉 해왔습니다.

Q. 왜 게임 개발에서 AI로 전향했나요?
A. 만 38세에 전향을 결심했는데, AI가 가져오는 시대의 변화를 강하게 느꼈고, 동시에 사람들에게 더 도움이 되는 프로그램을 만들고 싶다는 마음이 컸어요. 그 두 가지가 맞물려 AI 풀스택으로 방향을 옮겼습니다.

Q. 앞으로의 꿈이나 목표는 무엇인가요?
A. 어떤 일을 하든, 많은 사람에게 도움이 되고 즐거움을 줄 수 있는 사람이 되는 게 제 꿈이에요. 지금 AI 제품을 만드는 것도 그 연장선에 있습니다.

## 자주 묻는 질문 (FAQ)

Q. 김현복은 누구인가요?
A. 게임 개발·교육 10년 경력에 AI 풀스택 역량을 더한 AI 서비스 엔지니어입니다. LLM·RAG·멀티모달을 실제 동작하는 제품으로 만드는 데 강점이 있습니다.

Q. 어떤 일을 할 수 있나요?
A. 기획부터 설계·구현·배포·운영까지 풀스택으로 수행합니다. 특히 OpenAI API·RAG·Function Calling 에이전트·Vision/STT 멀티모달을 제품에 통합하고, React·FastAPI·Node.js·Socket.io로 실시간 풀스택 서비스를 만듭니다.

Q. 대표 프로젝트는 무엇인가요?
A. EggTalk(실시간 AI 다마고치 소셜 플랫폼·1인 풀스택), FlowFit(8개 부서 25+ AI 자동화 포털·팀장), KiwoFarm(공공데이터+AI 도시농업 비서·3인 팀) 세 가지입니다.

Q. 강의도 가능한가요?
A. 네. 게임 프로그래밍(C/C++·Unity·Unreal·DirectX) 분야에서 약 10년 강의 경력이 있고, 비전공자에게 쉽게 전달하는 데 강점이 있습니다. AI/바이브 코딩 입문 교육에도 관심이 있습니다.

Q. 나이가 어떻게 되나요?
A. 1987년생입니다. 게임 개발·교육 경력을 거쳐 AI 풀스택 엔지니어로 활동하고 있습니다.

Q. 어디 사세요? / 거주지가 어디인가요?
A. 경기도 광명시에 살고 있어요. 서울과 바로 붙어 있는 수도권이라 서울·수도권 출근이나 미팅에 전혀 문제없습니다.

Q. 협업·채용 문의는 어떻게 하나요?
A. 이메일 asd25999@gmail.com 또는 사이트 hbkim.cloud의 문의 폼으로 연락하면 됩니다. GitHub은 github.com/asd2599 입니다.

Q. 어떤 기술 스택을 주로 쓰나요?
A. AI는 OpenAI API·RAG·LLM 에이전트·Vision/STT, 백엔드는 FastAPI·Node.js·Express·Socket.io, 프론트는 React 19·Vite·TailwindCSS, 언어는 Python·JavaScript·C/C++/C#, 인프라는 Vercel·Fly.io·PostgreSQL을 씁니다.`;

// 마크다운을 검색 친화적 청크로 분할
export function buildChunks(md = KNOWLEDGE_MD) {
  const sections = md.split(/\n##\s+/).map((s) => s.trim()).filter(Boolean);
  const chunks = [];
  for (const section of sections) {
    const nl = section.indexOf('\n');
    const title = (nl === -1 ? section : section.slice(0, nl)).replace(/^#\s*/, '').trim();
    // Q&A 섹션은 Q 단위로 분할 (검색 정확도 ↑)
    if ((section.match(/\nQ\./g) || []).length >= 2) {
      const qas = section.split(/\n(?=Q\.)/);
      for (const qa of qas) {
        const t = qa.trim();
        if (t.startsWith('Q.')) chunks.push(`[${title}] ${t}`);
      }
    } else {
      chunks.push(section);
    }
  }
  return chunks;
}
