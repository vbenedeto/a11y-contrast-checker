# A11y Contrast Checker

A tool that checks whether two colors pass WCAG contrast guidelines.

You can check colors two ways:
- **Manually** — pick or type two hex colors
- **From an image** — upload a screenshot, click to sample the text and background colors directly from it

| Criterion | Level | Normal text | Large text | UI components |
|---|---|---|---|---|
| 1.4.3 | AA | 4.5:1 | 3:1 | — |
| 1.4.6 | AAA | 7:1 | 4.5:1 | — |
| 1.4.11 | AA | — | — | 3:1 |

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Emotion** for styling (styled components + a shared theme)
- **lucide-react** for icons

No backend — everything (color parsing, luminance math, contrast calculation) runs client-side. Next.js was chosen to match the stack this project was built for, not because the app needs server-side rendering.

## Accessibility choices, specifically

- Every input has a real, associated `<label>` 
- Pass/fail results use **color + icon + text** together
- Results update in an `aria-live="polite"` region, so screen reader users hear updates as colors change without needing to re-navigate to the results
- Invalid hex input shows an error with `aria-invalid` + `aria-describedby`, announced via `role="alert"`
- The app's own color palette was verified against its own contrast engine (header title vs. background: 7.12:1, passes AAA)

## Running locally

```bash
git clone https://github.com/vbenedeto/a11y-contrast-checker.git
cd a11y-contrast-checker
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live demo

[link once deployed]

## What I'd add with more time

- **Emotion code-snippet parser** — paste a `styled.button` block, extract `color`/`background` values via regex, run them through the same engine. Scoped out to keep the timeline realistic, but the engine already supports it — it'd just need a textarea + a small regex.
- **Unit tests** (Vitest) for the WCAG math functions — currently verified manually against known reference values (black vs. white = 21:1, white luminance = 1, etc.) 
- **A large-text toggle** — right now all five thresholds show at once, which is complete but doesn't let someone say "I'm specifically checking large text" and get a single, focused answer.
- **"Suggested fix"** — nudge a failing color's lightness until it crosses the passing threshold, so the tool doesn't just say "fail," it helps fix it.
