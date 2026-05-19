# AnimeStyleLab

AnimeStyleLab is a content-driven Next.js app for browsing, previewing, and building anime-style prompt references.

## What this project does

- Renders a static prompt lab using `Next.js` app router and Tailwind CSS v4.
- Uses `content/styles/*` folders as the source of truth for anime style records.
- Generates runtime JSON data from Markdown style content with `scripts/build-styles.mjs`.
- Supports static export via `next export` and unoptimized image handling for preview assets.

## Quick start

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3326](http://localhost:3326).

## Available scripts

- `pnpm dev` — regenerate style JSON data, then start the local development server on port `3326`.
- `pnpm build` — validate style content, generate `src/data/generated-styles.json`, and build the production app.
- `pnpm start` — run the built app locally.
- `pnpm styles:build` — validate `content/styles` and regenerate style JSON data.
- `pnpm styles:check` — validate style content without writing files.
- `pnpm lint` — run style validation and `biome` checks.
- `pnpm format` — format code with `biome`.

> You can also run these commands with `npm` if you prefer.
> Preview optimization prefers `cwebp` or `magick` when available, and falls back to macOS `sips` automatically in local builds.

## Project structure

- `src/app/` — Next.js application entrypoints and route pages.
- `src/components/` — reusable UI components for the builder, styles browser, cards, and detail views.
- `src/data/generated-styles.json` — generated style metadata consumed by the app.
- `content/styles/` — source style folders with Markdown data and optional preview images.
- `public/generated/style-previews/` — generated preview image assets copied from each style folder.
- `scripts/build-styles.mjs` — loader/validator that converts `content/styles` into app-ready JSON.

## Style content authoring

Each style lives in a dedicated folder under `content/styles/`.

Example structure:

```text
content/styles/
  cel-shine-anime/
    index.md
    previews.json
    previews/
      01-cover.webp
      02-scene.webp
```

`index.md` must contain `---json` frontmatter for structured fields and Markdown body text for the style description.

After editing or adding style content, run:

```bash
pnpm styles:build
```

This regenerates `src/data/generated-styles.json` and validates:

- `slug` matches the folder name and is unique.
- `category` belongs to the approved category set.
- required fields, arrays, and preview metadata exist.
- preview manifests match actual files in `previews/`.

`pnpm dev` also regenerates this data once before the app starts, so newly added preview entries are reflected after a dev server restart.

## Dependencies

- `next` 16.2.6
- `react` 19.2.4
- `tailwindcss` v4
- `@biomejs/biome` 2.2.0

## Deployment

This project exports a static site by default through `next.config.ts`.

Build and export with:

```bash
pnpm build
```

Then deploy the contents of `.next/output/static` to any static host.

## Notes

- Do not edit `src/data/generated-styles.json` directly.
- Keep preview images at a 4:3 aspect ratio if possible (1200x900 recommended).
- Use `pnpm styles:check` to validate changes before commit.
