# CLAUDE.md

Guidance for AI coding agents working on this repo. Keep changes minimal, consistent, and aligned with the conventions below.

## Project

Personal portfolio site for **Kim Hyunbok (hbkim)**, targeting **AI Service Engineer** roles broadly (AI 서비스 개발 / AI 풀스택 / 바이브 코딩 — not narrowed to AI FDE). Deployed at **hbkim.cloud**.

Home page introduces the developer; **each project has its own on-site detail page** (`/projects/:slug`) telling problem → approach → architecture → results. The portfolio lives on this site — do NOT depend on external Notion as the portfolio source.

Positioning to convey: 10y game dev + teaching → AI full-stack. Strengths = ships real AI products fast (vibe coding), full-stack + AI integration (LLM, RAG, multimodal Vision/STT, Function Calling agents, realtime).

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
  App.jsx            # Routes: "/" -> Home, "/projects/:slug" -> ProjectDetail
  index.css
  data/       projects.js, profile.js   # SINGLE SOURCE of truth for content
  pages/      Home, ProjectDetail        # routed pages
  sections/   Hero, About, Skills, Projects, Contact   # home sections, top-to-bottom
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
