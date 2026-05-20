# Style Content

AnimeStyleLab style records are maintained as one folder per style:

```text
content/styles/
  cel-shine-anime/
    index.md
    previews/
      01-cover.webp
      02-scene.webp
```

Each `index.md` uses `---json` frontmatter for structured fields and Markdown body text for `description`.
Preview images are optional during migration. When present, add preview files under `previews/`. The build scans that directory in filename order and auto-generates preview metadata.

After editing styles, run:

```bash
npm run styles:build
```

This validates the content, regenerates `src/data/generated-styles.json`, and refreshes the compressed preview thumbs under each style's `thumb/` folder.

Original preview files are not copied into `public/`. Generated `src` and `originalSrc` metadata point to the jsDelivr GitHub CDN by default.

The validator checks:

- `slug` is unique and matches the folder name.
- `category` is one of the known project categories.
- `similarStyles` points only to existing style slugs.
- Required string, list, `preview`, and `modelTips` fields are present.
- Preview images under `previews/` can be read and compressed successfully.
- `order` is unique and controls display/default data order.

Do not edit `src/data/generated-styles.json` by hand.
