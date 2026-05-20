# Style Content

AnimeStyleLab style records are maintained as one folder per style:

```text
content/styles/
  cel-shine-anime/
    index.md
    previews.json
    previews/
      01-cover.webp
      02-scene.webp
```

Each `index.md` uses `---json` frontmatter for structured fields and Markdown body text for `description`.
Preview images are optional during migration. When present, add a `previews.json` manifest plus 1200x900 preview files under `previews/`.

`previews.json` format:

```json
[
  {
    "id": "cover",
    "file": "01-cover.webp",
    "altZh": "高亮赛璐璐主预览",
    "altEn": "Cel shine anime primary preview",
    "label": "Hero",
    "focus": "overall-style"
  }
]
```

After editing styles, run:

```bash
npm run styles:build
```

This validates the content, regenerates `src/data/generated-styles.json`, and refreshes the compressed `webp` previews under `public/generated/style-previews/`.

Original preview files are not copied into `public/`. The generated `originalSrc` metadata points to the jsDelivr GitHub CDN by default.

The validator checks:

- `slug` is unique and matches the folder name.
- `category` is one of the known project categories.
- `similarStyles` points only to existing style slugs.
- Required string, list, `preview`, and `modelTips` fields are present.
- Preview manifests, when present, point to existing images under `previews/`.
- Preview images should stay at `1200x900` or another width/height pair that preserves a `4:3` ratio.
- `order` is unique and controls display/default data order.

Do not edit `src/data/generated-styles.json` by hand.
