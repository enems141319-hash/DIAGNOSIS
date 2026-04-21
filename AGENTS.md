# SnapCo Brand Diagnosis — Agent Instructions

## What This Project Is
A client-facing questionnaire that determines whether a business genuinely needs to invest in brand design. Framing: **urgency detection** — high score = high urgency to build a brand system.

## Tech Stack
- React 18 + TypeScript + Vite + Tailwind CSS
- react-router-dom v6 with HashRouter
- Client-side only (no backend, no API calls)
- Deployed to GitHub Pages at base path `/DIAGNOSIS/`

## Running the Project
```bash
npm run dev      # development server
npm run build    # production build (tsc + vite)
```

## Important Rules

### Scoring Direction
High score = high urgency. Do NOT invert this logic. `findLowestDimension` intentionally returns the highest-percentage dimension (most urgent need).

### Language
All UI copy is Traditional Chinese (繁體中文). Keep it that way.

### Images
`.jpg` and `.png` imports work via `src/vite-env.d.ts`. Place new assets in `src/assets/`.

### Routing
Uses `HashRouter` — all internal routes use hash (`/#/diagnosis`, `/#/result`). The `base` in `vite.config.ts` is `/DIAGNOSIS/`.

### No backdrop-blur on option buttons
Removed to prevent GPU compositing flicker with the fixed background image. Do not re-add `backdrop-blur` to `.QuestionCard` option buttons.

## File Map
| What you want to change | File |
|---|---|
| Questions / scores / weights | `src/features/diagnosis/scoring/questionBank.ts` |
| Scoring algorithm | `src/features/diagnosis/scoring/engine.ts` |
| Result text (insights, problems, recommendations) | `src/features/diagnosis/scoring/resultTextRules.ts` |
| Score thresholds | `src/features/diagnosis/scoring/scoringRules.ts` |
| Question UI | `src/features/diagnosis/components/QuestionCard.tsx` |
| Progress sidebar | `src/features/diagnosis/components/DiagnosisProgressPanel.tsx` |
| Result page | `src/features/diagnosis/components/ResultPresentation.tsx` |
| Global background / footer | `src/shared/layouts/AppShell.tsx` |
| Design tokens | `tailwind.config.ts` |
