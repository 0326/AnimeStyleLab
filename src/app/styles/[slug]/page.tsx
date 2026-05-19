import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StyleDetailContent } from "@/components/style-detail-content";
import { getStyleBySlug, styles } from "@/data/styles";
import { buildPrompt } from "@/lib/prompt-builder";

type StylePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return styles.map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({
  params,
}: StylePageProps): Promise<Metadata> {
  const { slug } = await params;
  const style = getStyleBySlug(slug);

  if (!style) {
    return { title: "Style Not Found" };
  }

  return {
    title: `${style.nameZh} Prompt`,
    description: `${style.summary} Learn the visual features, use cases, prompt direction, and failure points for ${style.nameZh}.`,
  };
}

export default async function StyleDetailPage({ params }: StylePageProps) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);

  if (!style) {
    notFound();
  }

  const relatedStyles = buildRelatedStyles(style);
  const gptPrompt = buildPrompt({
    subject: style.bestFor[0].includes("角色")
      ? "anime character"
      : "anime scene",
    style,
    lighting: style.visualFeatures[0],
    color: `${style.tags[0]} driven palette`,
    composition: "centered hero composition",
    useCase: style.useCases[0],
    targetModel: "gpt-image",
  });
  const nanoPrompt = buildPrompt({
    subject: style.bestFor[0].includes("角色")
      ? "anime character"
      : "anime scene",
    style,
    lighting: style.visualFeatures[1] ?? style.visualFeatures[0],
    color: `${style.tags[0]} driven palette`,
    composition: "centered hero composition",
    useCase: style.useCases[0],
    targetModel: "nano-banana",
  });

  return (
    <StyleDetailContent
      style={style}
      relatedStyles={relatedStyles}
      gptPrompt={gptPrompt}
      nanoPrompt={nanoPrompt}
    />
  );
}

function buildRelatedStyles(
  style: NonNullable<ReturnType<typeof getStyleBySlug>>,
) {
  const preferred = style.similarStyles
    .map((relatedSlug) => getStyleBySlug(relatedSlug))
    .filter(Boolean);
  const sameCategory = styles.filter(
    (candidate) =>
      candidate.slug !== style.slug && candidate.category === style.category,
  );
  const fallback = styles.filter((candidate) => candidate.slug !== style.slug);

  return [...preferred, ...sameCategory, ...fallback]
    .filter(
      (candidate, index, candidates) =>
        candidates.findIndex((item) => item.slug === candidate.slug) === index,
    )
    .slice(0, 4);
}
