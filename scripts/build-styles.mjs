import { spawnSync } from "node:child_process";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const contentDir = path.join(rootDir, "content", "styles");
const outputPath = path.join(rootDir, "src", "data", "generated-styles.json");
const biomePath = path.join(rootDir, "node_modules", ".bin", "biome");
const checkOnly = process.argv.includes("--check");

const validCategories = new Set([
  "japanese-anime",
  "manga",
  "game-illustration",
  "visual-novel",
  "kawaii-chibi",
  "figure-3d-plush",
  "cyber-sci-fi",
  "dark-gothic",
  "healing-dreamy",
  "chinese-anime",
  "webtoon",
]);

const requiredStringFields = [
  "id",
  "slug",
  "nameZh",
  "nameEn",
  "category",
  "summary",
  "description",
  "basePrompt",
  "avoidPrompt",
];

const requiredStringArrayFields = [
  "tags",
  "visualFeatures",
  "promptKeywords",
  "useCases",
  "recommendedRatios",
  "compatibleStyles",
  "similarStyles",
  "bestFor",
  "notRecommendedFor",
  "commonFailurePoints",
];

function assert(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function parseStyleMarkdown(source, filePath) {
  const match = source.match(/^---json\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`${filePath}: expected ---json frontmatter`);
  }

  const [, jsonText, body] = match;
  let data;

  try {
    data = JSON.parse(jsonText);
  } catch (error) {
    throw new Error(`${filePath}: invalid JSON frontmatter: ${error.message}`);
  }

  return {
    ...data,
    description: body.trim(),
  };
}

function formatJson(source) {
  const result = spawnSync(
    biomePath,
    ["format", "--stdin-file-path", outputPath],
    {
      input: source,
      encoding: "utf8",
    },
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || "Failed to format generated styles JSON");
  }

  return result.stdout;
}

function validateStyle(style, folderName, errors) {
  assert(
    Number.isInteger(style.order) && style.order >= 1,
    `${style.slug ?? folderName}: "order" must be a positive integer`,
    errors,
  );

  for (const field of requiredStringFields) {
    assert(
      typeof style[field] === "string" && style[field].trim().length > 0,
      `${style.slug ?? folderName}: missing required string field "${field}"`,
      errors,
    );
  }

  for (const field of requiredStringArrayFields) {
    assert(
      Array.isArray(style[field]) &&
        style[field].every((item) => typeof item === "string" && item.trim()),
      `${style.slug ?? folderName}: "${field}" must be a non-empty string array`,
      errors,
    );
    assert(
      Array.isArray(style[field]) && style[field].length > 0,
      `${style.slug ?? folderName}: "${field}" cannot be empty`,
      errors,
    );
  }

  assert(
    style.id === style.slug,
    `${style.slug ?? folderName}: "id" must match "slug"`,
    errors,
  );
  assert(
    style.slug === folderName,
    `${style.slug ?? folderName}: slug must match folder name "${folderName}"`,
    errors,
  );
  assert(
    validCategories.has(style.category),
    `${style.slug ?? folderName}: unknown category "${style.category}"`,
    errors,
  );
  assert(
    style.preview &&
      ["accent", "glow", "surface", "label"].every(
        (key) =>
          typeof style.preview[key] === "string" && style.preview[key].trim(),
      ),
    `${style.slug ?? folderName}: preview must include accent, glow, surface, label`,
    errors,
  );
  assert(
    style.modelTips &&
      ["gptImage", "nanoBanana"].every(
        (key) =>
          typeof style.modelTips[key] === "string" &&
          style.modelTips[key].trim(),
      ),
    `${style.slug ?? folderName}: modelTips must include gptImage and nanoBanana`,
    errors,
  );
}

async function readStyles() {
  const entries = await readdir(contentDir, { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  return Promise.all(
    folders.map(async (folderName) => {
      const filePath = path.join(contentDir, folderName, "index.md");
      const source = await readFile(filePath, "utf8");
      return {
        folderName,
        style: parseStyleMarkdown(source, filePath),
      };
    }),
  );
}

async function main() {
  const errors = [];
  const styleEntries = await readStyles();
  const styles = styleEntries.map((entry) => entry.style);

  for (const { folderName, style } of styleEntries) {
    validateStyle(style, folderName, errors);
  }

  const slugCounts = new Map();
  const orderCounts = new Map();
  for (const style of styles) {
    slugCounts.set(style.slug, (slugCounts.get(style.slug) ?? 0) + 1);
    orderCounts.set(style.order, (orderCounts.get(style.order) ?? 0) + 1);
  }

  const slugs = new Set(styles.map((style) => style.slug));
  for (const [slug, count] of slugCounts.entries()) {
    assert(count === 1, `duplicate slug "${slug}"`, errors);
  }
  for (const [order, count] of orderCounts.entries()) {
    assert(count === 1, `duplicate order "${order}"`, errors);
  }

  for (const style of styles) {
    for (const relatedSlug of style.similarStyles) {
      assert(
        slugs.has(relatedSlug),
        `${style.slug}: similarStyles references missing slug "${relatedSlug}"`,
        errors,
      );
    }
  }

  if (errors.length) {
    throw new Error(`Style validation failed:\n- ${errors.join("\n- ")}`);
  }

  const generatedStyles = [...styles]
    .sort((a, b) => a.order - b.order)
    .map(({ order, ...style }) => style);
  const output = formatJson(`${JSON.stringify(generatedStyles, null, 2)}\n`);

  if (checkOnly) {
    const current = await readFile(outputPath, "utf8");
    if (current !== output) {
      throw new Error(
        "Generated styles are out of date. Run `npm run styles:build`.",
      );
    }
    console.log(`Validated ${generatedStyles.length} styles`);
    return;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output);
  console.log(`Generated ${generatedStyles.length} styles`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
