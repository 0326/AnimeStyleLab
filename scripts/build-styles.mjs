import { spawnSync } from "node:child_process";
import {
  copyFile,
  mkdir,
  readdir,
  readFile,
  writeFile,
} from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const contentDir = path.join(rootDir, "content", "styles");
const outputPath = path.join(rootDir, "src", "data", "generated-styles.json");
const publicPreviewDir = path.join(
  rootDir,
  "public",
  "generated",
  "style-previews",
);
const biomePath = path.join(rootDir, "node_modules", ".bin", "biome");
const checkOnly = process.argv.includes("--check");
const require = createRequire(import.meta.url);
const { imageSize } = require("next/dist/compiled/image-size");
const previewAspectRatio = 4 / 3;
const previewWidth = 1200;
const previewHeight = 900;
const previewAspectRatioTolerance = 0.01;

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

const categoryGoals = {
  "japanese-anime":
    "Prioritize readable anime silhouettes, clean line art, and cinematic emotional clarity.",
  manga:
    "Prioritize graphic readability, line discipline, and strong panel-like composition.",
  "game-illustration":
    "Prioritize commercial character appeal, material separation, and strong focal hierarchy.",
  "visual-novel":
    "Prioritize character acting, dialogue-scene readability, and controlled background support.",
  "kawaii-chibi":
    "Prioritize simplicity, charm, soft proportions, and instantly readable silhouette design.",
  "figure-3d-plush":
    "Prioritize material realism, object-like form clarity, and collectible presentation quality.",
  "cyber-sci-fi":
    "Prioritize neon lighting logic, futuristic surface detail, and controlled high-contrast depth.",
  "dark-gothic":
    "Prioritize dramatic contrast, symbolic atmosphere, and restrained dark-luxury styling.",
  "healing-dreamy":
    "Prioritize softness, breathing room, low-pressure atmosphere, and gentle tonal transitions.",
  "chinese-anime":
    "Prioritize Eastern fantasy motifs, elegant costume flow, and coherent environment storytelling.",
  webtoon:
    "Prioritize polished character rendering, fashion readability, and clean commercial finish.",
};

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

function splitCsv(text) {
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isMostlyAscii(text) {
  return /^[ -~\s"'().:/&+.-]+$/.test(text);
}

function deriveModelInput(style) {
  const overrides = style.modelInput ?? {};
  const negativeKeywords = splitCsv(style.avoidPrompt).filter(isMostlyAscii);
  const featureKeywords =
    overrides.featureKeywords?.length > 0
      ? overrides.featureKeywords
      : style.promptKeywords.slice(0, 6);
  const mustPreserve =
    overrides.mustPreserve?.length > 0
      ? overrides.mustPreserve
      : featureKeywords.slice(0, 3);
  const mergedNegativeKeywords =
    overrides.negativeKeywords?.length > 0
      ? overrides.negativeKeywords
      : negativeKeywords;
  const preservedKeywords = mustPreserve.slice(0, 2).join(" and ");

  return {
    stylePrompt: overrides.stylePrompt || style.basePrompt,
    styleGoal: overrides.styleGoal || categoryGoals[style.category],
    featureKeywords,
    mustPreserve,
    negativeKeywords: mergedNegativeKeywords,
    gptGuidance:
      overrides.gptGuidance ||
      `Describe the subject, camera framing, and mood in full sentences. Preserve ${preservedKeywords}.`,
    nanoGuidance:
      overrides.nanoGuidance ||
      `State composition and intended use early. Keep ${preservedKeywords} visible in the final image.`,
  };
}

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
  if (style.modelInput) {
    assert(
      typeof style.modelInput === "object",
      `${style.slug ?? folderName}: modelInput must be an object`,
      errors,
    );
    for (const field of [
      "stylePrompt",
      "styleGoal",
      "gptGuidance",
      "nanoGuidance",
    ]) {
      if (field in style.modelInput) {
        assert(
          typeof style.modelInput[field] === "string" &&
            style.modelInput[field].trim().length > 0,
          `${style.slug ?? folderName}: modelInput.${field} must be a non-empty string`,
          errors,
        );
      }
    }
    for (const field of [
      "featureKeywords",
      "mustPreserve",
      "negativeKeywords",
    ]) {
      if (field in style.modelInput) {
        assert(
          Array.isArray(style.modelInput[field]) &&
            style.modelInput[field].length > 0 &&
            style.modelInput[field].every(
              (item) => typeof item === "string" && item.trim(),
            ),
          `${style.slug ?? folderName}: modelInput.${field} must be a non-empty string array`,
          errors,
        );
      }
    }
  }
}

async function readPreviewManifest(folderName, errors) {
  const manifestPath = path.join(contentDir, folderName, "previews.json");

  try {
    const source = await readFile(manifestPath, "utf8");
    const items = JSON.parse(source);

    if (!Array.isArray(items)) {
      errors.push(`${folderName}: previews.json must contain an array`);
      return [];
    }

    return items;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return [];
    }

    errors.push(`${folderName}: invalid previews.json: ${error.message}`);
    return [];
  }
}

async function readPreviewDirectoryFiles(folderName) {
  const previewDir = path.join(contentDir, folderName, "previews");

  try {
    const entries = await readdir(previewDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => /\.(png|webp|jpg|jpeg)$/i.test(fileName))
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    if (error?.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function validatePreviewManifestItem(item, folderName, errors, ids, files) {
  if (!item || typeof item !== "object") {
    errors.push(`${folderName}: preview entry must be an object`);
    return false;
  }

  for (const field of ["id", "file", "altZh", "altEn", "label", "focus"]) {
    if (typeof item[field] !== "string" || item[field].trim().length === 0) {
      errors.push(`${folderName}: preview entry missing "${field}"`);
      return false;
    }
  }

  if (ids.has(item.id)) {
    errors.push(`${folderName}: duplicate preview id "${item.id}"`);
  }
  if (files.has(item.file)) {
    errors.push(`${folderName}: duplicate preview file "${item.file}"`);
  }

  ids.add(item.id);
  files.add(item.file);
  return true;
}

function validatePreviewDimensions(dimensions, folderName, fileName, errors) {
  if (
    !dimensions ||
    !Number.isInteger(dimensions.width) ||
    !Number.isInteger(dimensions.height)
  ) {
    errors.push(`${folderName}: could not read dimensions for "${fileName}"`);
    return false;
  }

  const ratio = dimensions.width / dimensions.height;
  if (Math.abs(ratio - previewAspectRatio) > previewAspectRatioTolerance) {
    errors.push(
      `${folderName}: "${fileName}" must be close to ${previewWidth}x${previewHeight} (4:3), received ${dimensions.width}x${dimensions.height}`,
    );
    return false;
  }

  return true;
}

function createFallbackPreviewManifest(style, previewFiles) {
  if (previewFiles.length === 0) {
    return [];
  }

  return previewFiles.map((fileName, index) => ({
    id: index === 0 ? "cover" : `preview-${index + 1}`,
    file: fileName,
    altZh: `${style.nameZh}风格预览${index + 1}`,
    altEn: `${style.nameEn} preview ${index + 1}`,
    label: index === 0 ? "Hero" : `View ${index + 1}`,
    focus: index === 0 ? "overall-style" : "style-variation",
  }));
}

async function buildPreviewImages(folderName, style, errors) {
  const previewItems = await readPreviewManifest(folderName, errors);
  const previewFiles = await readPreviewDirectoryFiles(folderName);
  const normalizedPreviewItems =
    previewItems.length > 0
      ? previewItems
      : createFallbackPreviewManifest(style, previewFiles);

  if (normalizedPreviewItems.length === 0) {
    return [];
  }

  if (normalizedPreviewItems.length > 6) {
    errors.push(`${folderName}: previewImages cannot exceed 6 entries`);
  }

  const ids = new Set();
  const files = new Set();
  const builtImages = [];

  for (const item of normalizedPreviewItems) {
    if (!validatePreviewManifestItem(item, folderName, errors, ids, files)) {
      continue;
    }

    const sourcePath = path.join(contentDir, folderName, "previews", item.file);

    let buffer;
    try {
      buffer = await readFile(sourcePath);
    } catch (_error) {
      errors.push(`${folderName}: missing preview file "${item.file}"`);
      continue;
    }

    const dimensions = imageSize(buffer);
    if (!validatePreviewDimensions(dimensions, folderName, item.file, errors)) {
      continue;
    }

    const outputDir = path.join(publicPreviewDir, folderName);
    const outputPath = path.join(outputDir, item.file);
    const publicPath = `/generated/style-previews/${folderName}/${item.file}`;

    if (!checkOnly) {
      await mkdir(outputDir, { recursive: true });
      await copyFile(sourcePath, outputPath);
    }

    builtImages.push({
      id: item.id,
      src: publicPath,
      altZh: item.altZh.trim(),
      altEn: item.altEn.trim(),
      label: item.label.trim(),
      focus: item.focus.trim(),
      width: dimensions.width,
      height: dimensions.height,
    });
  }

  return builtImages;
}

async function readStyles(errors) {
  const entries = await readdir(contentDir, { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  return Promise.all(
    folders.map(async (folderName) => {
      const filePath = path.join(contentDir, folderName, "index.md");
      const source = await readFile(filePath, "utf8");
      const parsedStyle = parseStyleMarkdown(source, filePath);
      const previewImages = await buildPreviewImages(
        folderName,
        parsedStyle,
        errors,
      );
      return {
        folderName,
        style: {
          ...parsedStyle,
          previewImages,
        },
      };
    }),
  );
}

async function main() {
  const errors = [];
  const styleEntries = await readStyles(errors);
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
    .map(({ order, ...style }) => ({
      ...style,
      modelInput: deriveModelInput(style),
    }));
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
