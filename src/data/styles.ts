import type { StyleCategory } from "./categories";
import generatedStyles from "./generated-styles.json";

export type AnimeStyle = {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  category: StyleCategory;
  summary: string;
  description: string;
  tags: string[];
  visualFeatures: string[];
  promptKeywords: string[];
  basePrompt: string;
  avoidPrompt: string;
  useCases: string[];
  recommendedRatios: string[];
  compatibleStyles: string[];
  similarStyles: string[];
  bestFor: string[];
  notRecommendedFor: string[];
  commonFailurePoints: string[];
  preview: {
    accent: string;
    glow: string;
    surface: string;
    label: string;
  };
  modelTips: {
    gptImage: string;
    nanoBanana: string;
  };
};

export const styles = generatedStyles as AnimeStyle[];

export const styleMap = Object.fromEntries(
  styles.map((style) => [style.slug, style]),
) as Record<string, AnimeStyle>;

export const featuredStyleSlugs = [
  "cel-shine-anime",
  "rainlit-cinematic-anime",
  "premium-gacha-illustration",
  "plush-anime-render",
  "neon-city-anime",
  "black-gold-witchcore",
  "xianxia-sword-maiden",
  "urban-fashion-webtoon",
];

export const featuredStyles = featuredStyleSlugs.map((slug) => styleMap[slug]);

export const allTags = Array.from(
  new Set(styles.flatMap((style) => style.tags)),
).sort();

export const allUseCases = Array.from(
  new Set(styles.flatMap((style) => style.useCases)),
).sort();

export function getStyleBySlug(slug: string) {
  return styleMap[slug];
}

export function getStylesByCategory(category: StyleCategory) {
  return styles.filter((style) => style.category === category);
}
