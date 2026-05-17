<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Skills

Use these skills when working on AnimeStyleLab:

- `react-effects`: Use whenever adding or changing React components with derived state, filters, localStorage, Prompt Builder state, or any `useEffect`.
- `browser:browser`: Use after meaningful UI changes to verify the local app in the in-app browser, especially at PC widths such as 1280, 1440, 1920, and 2560.
- `imagegen`: Use when creating or refining bitmap preview assets for style cards and style detail pages.
- `ui-design-review`: Use to review visual hierarchy, typography, color, spacing, consistency, and overall polish before calling the UI finished.
- `ui-design`: Use only for fast visual exploration and inspiration, not as a direct implementation template, since this project is a Next.js app rather than a single HTML page.
- `crafting-effective-readmes`: Use when editing README, setup instructions, data maintenance docs, or deployment notes.
- `commit-work`: Use when staging, splitting, or committing project changes.
- `cloudflare:cloudflare` and `cloudflare:wrangler`: Use for Cloudflare Pages deployment, Wrangler configuration, and static export deployment checks.

Project scope reminders:

- The MVP targets PC responsive layouts only; do not spend effort on a dedicated mobile experience.
- Prompt generation should support only GPT Image and Nano Banana in v1.
- Treat style preview images, data quality, and Prompt structure as first-class product requirements.

Visual direction reminders:

- Do not ship a generic AI SaaS look. The site should read as an anime style lab and prompt workbench.
- Prioritize preview imagery and style contrast. Users should understand a style visually before reading prompt text.
- Use a distinct typography system rather than default app-shell typography.
- Favor a dark studio/workbench atmosphere with controlled accent color, not full-screen glow or noisy gradients.
- Keep cards crisp and legible. Avoid heavy glassmorphism that reduces text contrast or makes repeated cards muddy.
- The Prompt Builder should feel like a creative tool panel, not a generic settings form.
- Every major interactive component should have clear hover, selected, focus, empty, and copied states.
- On wide PC screens, constrain reading width and preserve a strong grid rather than stretching content edge to edge.
