# SnapCo Brand Diagnosis — Claude Instructions

## Project Overview
A React questionnaire tool that helps clients determine whether their industry/situation genuinely needs brand design investment. The core framing is **urgency detection**, not brand evaluation — higher scores = higher urgency to invest in branding.

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS (custom design tokens in `tailwind.config.ts`)
- react-router-dom v6 (HashRouter, base: `/DIAGNOSIS/`)
- No backend — all scoring runs client-side

## Commands
```bash
npm run dev      # start dev server
npm run build    # tsc + vite build
npm run preview  # preview production build
```

## Architecture
```
src/
  app/           # providers, router, global styles
  features/
    diagnosis/
      components/   # UI components (DiagnosisFlow, QuestionCard, etc.)
      hooks/        # useDiagnosisFlow, useDiagnosisResult
      scoring/      # engine.ts, questionBank.ts, scoringRules.ts, resultTextRules.ts, types.ts
      store/        # DiagnosisProvider, context, selectors
      types/        # re-exports from scoring/types
  pages/         # HomePage, QuestionnairePage, ResultPage
  shared/
    components/ui/ # Button, SurfaceCard, ProgressBar
    layouts/       # AppShell (background image + dark overlay)
```

## Design Tokens
- `accent` = `#ff4d2e` (orange) — primary brand color
- `bone` = `#f2f2f2` — light text
- `obsidian` = `#050505` — darkest background
- `shadow-ambient` = orange glow on cards
- `rounded-monolith` = `3rem` — default card radius
- `SurfaceCard` tones: `low` / `high` / `glass`

## Scoring Logic
- **High score = high urgency** (1–4 scale per option)
- Some questions have inverted scores (A=4 most urgent, D=1 least)
- Dimensions: `brand` / `visual` / `growth` / `conversion`
- Overall levels: `strong` (≥75%) / `stable` (≥55%) / `fragile` (≥35%) / `critical` (<35%)
- `findLowestDimension` returns the **highest percentage** dimension (most urgent)

## Key Conventions
- All Chinese copy uses Traditional Chinese (繁體中文)
- Section names: 概況與展望 / 消費者角度 / 經營與擴張 / 轉換與現況
- Result levels: 高度建議投入 / 建議開始規劃 / 可以提前布局 / 目前暫不急迫
- Option labels use A/B/C/D badges (orange circle, top-left on images)
- Q6/Q7/Q8 have image options in `src/assets/` — no text label shown, only badge + image

## Assets
- Background image: `src/assets/01back.jpg`
- Q6 images: `A1.jpg` (A), `A2.jpg` (B)
- Q7 images: `B2.jpg` (A), `B1.jpg` (B)
- Q8 images: `C1.jpg` (A), `C2.jpg` (B)
- Favicon: `public/favicon.png`

## Deployment
GitHub Pages via `.github/workflows/deploy-pages.yml` — auto-deploys on push to `main`.
Live URL: `https://enems141319-hash.github.io/DIAGNOSIS/`
