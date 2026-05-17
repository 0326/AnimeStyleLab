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

function sentence(parts: string[]) {
  return parts.filter(Boolean).join(" ");
}

function buildConstraintText(
  style: AnimeStyle,
  extraConstraints: string[] = [],
) {
  const merged = Array.from(
    new Set([
      ...extraConstraints,
      ...style.avoidPrompt.split(", ").slice(0, 6),
    ]),
  );
  return merged.join(", ");
}

export function buildPrompt(input: PromptInput): PromptResult {
  const constraints = buildConstraintText(input.style, input.extraConstraints);
  const featureText = input.style.visualFeatures.slice(0, 4).join(", ");
  const qualityText = qualityOptions.slice(0, 3).join(", ");
  const prompt =
    input.targetModel === "nano-banana"
      ? sentence([
          `Generate ${input.useCase} featuring ${input.subject}.`,
          `Use ${input.style.nameEn} style with ${featureText}.`,
          `Lighting should be ${input.lighting}. Color direction: ${input.color}.`,
          `Composition: ${input.composition}.`,
          `Preserve a polished anime finish and avoid ${constraints}.`,
        ])
      : sentence([
          `Create an anime-style image of ${input.subject}.`,
          `The visual direction should be ${input.style.nameEn}, with ${featureText}.`,
          `Use ${input.lighting}, ${input.color}, and ${input.composition}.`,
          `Make it suitable for ${input.useCase} with ${qualityText}.`,
          `Avoid ${constraints}.`,
        ]);

  return {
    title:
      input.targetModel === "gpt-image"
        ? "GPT Image Prompt"
        : "Nano Banana Prompt",
    prompt,
    structure: [
      `Subject: ${input.subject}`,
      `Style: ${input.style.nameZh}`,
      `Visual features: ${featureText}`,
      `Lighting and color: ${input.lighting}; ${input.color}`,
      `Composition and purpose: ${input.composition}; ${input.useCase}`,
      `Avoid: ${constraints}`,
    ],
    ratioHints: input.style.recommendedRatios,
    usageNotes: [
      input.style.modelTips[
        input.targetModel === "gpt-image" ? "gptImage" : "nanoBanana"
      ],
      `Recommended starting uses: ${input.style.bestFor.slice(0, 2).join("、")}`,
    ],
  };
}

export function buildWallpaperPrompt(
  style: AnimeStyle,
  preset: WallpaperPreset,
  targetModel: TargetModel,
  subject: string,
) {
  return buildPrompt({
    subject,
    style,
    lighting: "controlled cinematic lighting",
    color: `${style.tags[0]} led palette with clean depth separation`,
    composition: preset.placement,
    useCase: `${preset.label} (${preset.ratio})`,
    extraConstraints: preset.constraints,
    targetModel,
  });
}
