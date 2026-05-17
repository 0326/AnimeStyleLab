import { qualityOptions } from "@/data/prompt-segments";
import type { AnimeStyle } from "@/data/styles";
import type { WallpaperPreset } from "@/data/wallpaper-presets";

export type TargetModel = "gpt-image" | "nano-banana";

export type PromptInput = {
  subject: string;
  style: AnimeStyle;
  lighting: string;
  color: string;
  composition: string;
  useCase: string;
  extraConstraints?: string[];
  targetModel: TargetModel;
};

export type PromptResult = {
  title: string;
  prompt: string;
  structure: string[];
  ratioHints: string[];
  usageNotes: string[];
};

function joinUnique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function formatPromptSections(sections: Array<[string, string]>) {
  return sections
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}\n${value}`)
    .join("\n\n");
}

function buildNegativeText(style: AnimeStyle) {
  return joinUnique(style.modelInput.negativeKeywords).join(", ");
}

function buildLayoutConstraintText(extraConstraints: string[] = []) {
  return joinUnique(extraConstraints).join(", ");
}

export function buildPrompt(input: PromptInput): PromptResult {
  const negativeText = buildNegativeText(input.style);
  const layoutConstraintText = buildLayoutConstraintText(
    input.extraConstraints,
  );
  const featureText = input.style.modelInput.featureKeywords
    .slice(0, 4)
    .join(", ");
  const stylePrompt = input.style.modelInput.stylePrompt;
  const qualityText = qualityOptions.slice(0, 3).join(", ");
  const styleGoal = input.style.modelInput.styleGoal;
  const preserveText = input.style.modelInput.mustPreserve.join(", ");
  const prompt =
    input.targetModel === "nano-banana"
      ? formatPromptSections([
          ["TASK", `Generate ${input.useCase} featuring ${input.subject}.`],
          ["STYLE REFERENCE", stylePrompt],
          ["STYLE GOAL", styleGoal],
          ["STYLE KEYWORDS", featureText],
          ["SUBJECT", input.subject],
          ["LIGHTING", input.lighting],
          ["COLOR PALETTE", input.color],
          ["COMPOSITION", input.composition],
          ["MUST PRESERVE", preserveText],
          layoutConstraintText
            ? ["LAYOUT CONSTRAINTS", layoutConstraintText]
            : ["LAYOUT CONSTRAINTS", "None."],
          [
            "QUALITY TARGET",
            "Polished anime finish with strong focal clarity.",
          ],
          ["AVOID", negativeText],
        ])
      : formatPromptSections([
          ["TASK", `Create ${input.useCase} of ${input.subject}.`],
          ["STYLE REFERENCE", stylePrompt],
          ["STYLE GOAL", styleGoal],
          ["STYLE KEYWORDS", featureText],
          ["SUBJECT", input.subject],
          ["LIGHTING", input.lighting],
          ["COLOR PALETTE", input.color],
          ["COMPOSITION", input.composition],
          ["MUST PRESERVE", preserveText],
          layoutConstraintText
            ? ["LAYOUT CONSTRAINTS", layoutConstraintText]
            : ["LAYOUT CONSTRAINTS", "None."],
          ["QUALITY TARGET", qualityText],
          ["AVOID", negativeText],
        ]);

  return {
    title:
      input.targetModel === "gpt-image"
        ? "GPT Image Prompt"
        : "Nano Banana Prompt",
    prompt,
    structure: [
      `Subject: ${input.subject}`,
      `Style: ${input.style.nameEn}`,
      `Style goal: ${styleGoal}`,
      `Style keywords: ${featureText}`,
      `Lighting and color: ${input.lighting}; ${input.color}`,
      `Composition and use case: ${input.composition}; ${input.useCase}`,
      `Must preserve: ${preserveText}`,
      layoutConstraintText
        ? `Layout constraints: ${layoutConstraintText}`
        : "Layout constraints: none",
      `Avoid: ${negativeText}`,
    ],
    ratioHints: input.style.recommendedRatios,
    usageNotes: [
      input.targetModel === "gpt-image"
        ? input.style.modelInput.gptGuidance
        : input.style.modelInput.nanoGuidance,
      `Recommended ratios: ${input.style.recommendedRatios.join(" / ")}`,
    ],
  };
}

export function buildWallpaperPrompt(
  style: AnimeStyle,
  preset: WallpaperPreset,
  targetModel: TargetModel,
  subject: string,
) {
  const wallpaperColorCue =
    style.modelInput.featureKeywords[0] ?? "clean anime palette";

  return buildPrompt({
    subject,
    style,
    lighting: "controlled cinematic lighting",
    color: `${wallpaperColorCue} palette with clean depth separation`,
    composition: preset.placement,
    useCase: `${preset.promptLabel} (${preset.ratio})`,
    extraConstraints: preset.constraints,
    targetModel,
  });
}
