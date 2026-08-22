# CLAUDE.md

Guidance for AI coding agents working on this repo. Keep changes minimal, consistent, and aligned with the conventions below.

## Project

Personal site for **Kim Hyunbok (hbkim)**. Deployed at **hbkim.cloud**. Two positionings, two routes:

- **`/` (default/home) — AI 강사 (AI instructor).** Current primary activity: teaching Code Agent usage (Claude Code, Codex, etc.) and AI utilization (Gemini, enterprise-dedicated agents, etc.) via corporate in-house training and public/community lectures. Content lives in `src/data/teaching.js`, rendered by `pages/Teaching.jsx`. This page is indexed (no noindex) since it's now the main identity.
- **`/portfolio` (hidden, not linked from nav) — AI Service Engineer.** Targets AI 서비스 개발 / AI 풀스택 / 바이브 코딩 roles broadly. Content lives in `src/data/profile.js` + `src/data/projects.js`, rendered by `pages/Home.jsx`. **Each project has its own on-site detail page** (`/projects/:slug`) telling problem → approach → architecture → results. `pages/Home.jsx` sets `noindex` + overrides `document.title` while mounted, mirroring how `/teaching` used to be hidden before the swap. The portfolio lives on this site — do NOT depend on external Notion as the portfolio source.

Positioning to convey on `/portfolio`: 10y game dev + teaching → AI full-stack. Strengths = ships real AI products fast (vibe coding), full-stack + AI integration (LLM, RAG, multimodal Vision/STT, Function Calling agents, realtime).

Positioning to convey on `/` (teaching): 8y programming instructor (game academies) + hands-on AI full-stack builder → now an **AI instructor at 민코딩 (Mincoding) since 2026.07**, teaching Code Agent workflows (Claude Code, Codex) and AI utilization (Gemini, enterprise agents) **to corporate clients (기업 대상)**. That employer, start date, and audience are confirmed — everything else about the current teaching activity (client company names, headcounts, metrics) is not: don't invent it. The current role lives in `profile.js` `career[0]` and flows into `teachingHistory` automatically.

The RAG chatbot's knowledge source is `api/knowledge.js` (`KNOWLEDGE_MD`) — keep it in sync with `profile.js`/`teaching.js` when positioning changes. After editing `api/knowledge.js`, regenerate embeddings with `npm run embed` (requires `OPENAI_API_KEY` in `.env`) so `api/embeddings.js` reflects the new text.

## Tech Stack

- React 19 + Vite (ESM). **Plain JavaScript/JSX only — do NOT add TypeScript.**
- Routing: **react-router-dom** (multi-page SPA). SPA fallback via `vercel.json` rewrites.
- Styling: plain CSS (global `index.css` with design tokens in `:root`) + inline styles. **No Tailwind, no CSS-in-JS libs, no UI kits.** Reuse the CSS variables (`--accent`, `--surface`, `--font-mono`, etc.) and shared classes (`.eyebrow`, `.section-title`, `.gradient-text`, `.project-card`, `.btn-*`).
- Animation: IntersectionObserver scroll fade-in + CSS keyframes (see `hooks/`).
- No state lib, no backend. Static SPA. Deploy: Vercel.

Do not introduce further dependencies without a clear need; prefer the standard library / native APIs.

## Architecture

```
src/
  main.jsx           # BrowserRouter root
  App.jsx            # Routes: "/" -> Teaching (default), "/portfolio" -> Home (hidden), "/projects/:slug" -> ProjectDetail
  index.css
  data/       projects.js, profile.js, teaching.js   # SINGLE SOURCE of truth for content
  pages/      Teaching (default "/"), Home (hidden "/portfolio"), ProjectDetail   # routed pages
  sections/   Hero, About, Skills, Projects, Contact   # "/portfolio" sections, top-to-bottom
  sections/teaching/  TeachHero, Philosophy, TeachHistory, Curriculum, BonusStage, TeachContact   # "/" sections, top-to-bottom
  components/teaching/ arcadeStore.js, ArcadeHud.jsx, ArcadeFx.jsx, teachNav.js  # "/" 게임 연출(점수·업적·이펙트)
  components/ Sidebar, SectionNav, MobileHeader, Navbar, ScrollToTop  # layout/nav, reused
  hooks/      useActiveSection, useScrollAnimation, useScrollProgress
  assets/
public/        # static assets, favicons
docs/          # source material: resume (이력서) + per-project plans — reference only, not shipped
vercel.json    # SPA rewrite so /projects/:slug deep-links resolve
```

Conventions:
- **Content is data-driven.** All project + profile facts live in `src/data/`. Edit copy there, not in JSX.
- **Add a project = add one object to `src/data/projects.js`** — its card (Projects section) and detail page (`/projects/:slug`) are generated automatically. No new files needed.
- ProjectDetail renders only the optional sections present in the data object (overview / problem / approach / architecture / results / retrospective).
- One home section = one file in `sections/`. Reusable UI/layout goes in `components/`; shared behavior in `hooks/`.
- Keep nav data (section ids/labels) in sync across `Sidebar`, `SectionNav`.
- `/` is themed as a blue **arcade**: score/level/combo HUD, achievement toasts, click particles, card flip, skill tree, bonus minigame, Konami easter egg. State lives in `components/teaching/arcadeStore.js` (module-scope store + `useSyncExternalStore`, no state lib). Game flourishes must never hide content — anything revealed by interaction also auto-reveals on scroll, and `prefers-reduced-motion` disables the animations.

## Styling & Responsive

- Layout: left fixed sidebar nav + right section-dot nav; scroll-snap between sections; vertical scroll-progress bar.
- Breakpoint: **900px**. Below it, sidebar collapses to a hamburger (`MobileHeader`) with slide-in menu + overlay.
- Mobile-first care: touch targets ≥ 44px; test both desktop and mobile widths.
- Reuse existing CSS variables/colors and animation patterns; match the current visual style instead of inventing new ones.

## Content (single source of truth)

Canonical content lives in `src/data/` (`projects.js`, `profile.js`). Keep names/links exact:
- **EggTalk** — realtime socket-based AI Tamagotchi social platform. https://gamestack.store
- **FlowFit** — enterprise AI work-automation portal, 8 departments / 25+ AI features. https://flowfit.cloud
- **KiwoFarm** — public-data + AI urban-farming assistant (plant→grow→harvest→reward). https://kiwofarm.store

Profile/contact: Email asd25999@gmail.com · Phone 010-9636-2599 · GitHub github.com/asd2599.
When adding project detail, pull facts from `docs/` (the resume `미리디_AX엔지니어_이력서_김현복.docx` and per-project plan docs). **Do not invent metrics, dates, or features.** Distinguish achieved facts from goals: target numbers (e.g. FlowFit "50%+", KiwoFarm "첫 수확 70%") must be marked `kind: 'goal'` in the data, never presented as measured results.

## Commands

```bash
npm install
npm run dev      # local dev
npm run build    # production build -> dist/
npm run preview  # preview build
npm run lint     # eslint
```

## Working Rules

- Make the smallest change that satisfies the request; don't refactor unrelated code.
- Match existing file/style patterns before adding anything new.
- All UI states must be handled: loading, empty, error (where applicable).
- Keep copy concise and recruiter-friendly; Korean for visible UI text unless asked otherwise.
- Never fabricate experience, numbers, or project facts. If unknown, ask or leave a clear TODO.
- Don't commit secrets. No `.env` values in code.

## Communication Style

Be concise and direct. Skip greetings/filler. Lead with the solution or the change made. No redundant explanation.
