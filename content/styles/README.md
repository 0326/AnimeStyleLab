# Style Content

AnimeStyleLab style records are maintained as one folder per style:

```text
content/styles/
  cel-shine-anime/
    index.md
```

Each `index.md` uses `---json` frontmatter for structured fields and Markdown body text for `description`.

After editing styles, run:

```bash
npm run styles:build
```

This validates the content and regenerates `src/data/generated-styles.json`.

The validator checks:

- `slug` is unique and matches the folder name.
- `category` is one of the known project categories.
- `similarStyles` points only to existing style slugs.
- Required string, list, `preview`, and `modelTips` fields are present.
- `order` is unique and controls display/default data order.

Do not edit `src/data/generated-styles.json` by hand.
