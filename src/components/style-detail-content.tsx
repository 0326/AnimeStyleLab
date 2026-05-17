"use client";

import Link from "next/link";

import { categoryMap } from "@/data/categories";
import type { AnimeStyle } from "@/data/styles";
import type { PromptResult } from "@/lib/prompt-builder";

import { CopyButton } from "./copy-button";
import { FavoriteButton } from "./favorite-button";
import { useLocale } from "./locale-provider";
import { PreviewTile } from "./preview-tile";

type StyleDetailContentProps = {
  style: AnimeStyle;
  relatedStyles: AnimeStyle[];
  gptPrompt: PromptResult;
  nanoPrompt: PromptResult;
};

export function StyleDetailContent({
  style,
  relatedStyles,
  gptPrompt,
  nanoPrompt,
}: StyleDetailContentProps) {
  const { dictionary, locale } = useLocale();
  const primaryName = locale === "zh" ? style.nameZh : style.nameEn;
  const secondaryName = locale === "zh" ? style.nameEn : style.nameZh;
  const categoryName =
    locale === "zh"
      ? categoryMap[style.category].nameZh
      : categoryMap[style.category].nameEn;

  return (
    <div className="section-frame space-y-10 py-10">
      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <PreviewTile style={style} />
        <section className="panel-strong rounded-[34px] p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{categoryName}</p>
              <h1 className="mt-3 font-display text-6xl text-white">
                {primaryName}
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cyan-100/68">
                {secondaryName}
              </p>
            </div>
            <FavoriteButton slug={style.slug} labels={dictionary.actions} />
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {style.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {style.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CopyButton
              value={style.basePrompt}
              label={dictionary.actions.copyBasePrompt}
              copiedLabel={dictionary.actions.copied}
            />
            <CopyButton
              value={style.avoidPrompt}
              label={dictionary.actions.copyAvoidTerms}
              copiedLabel={dictionary.actions.copied}
            />
            <Link
              href="/builder"
              className="rounded-full border border-cyan-300/16 bg-cyan-300/8 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/14"
            >
              {dictionary.detail.remix}
            </Link>
          </div>
        </section>
      </div>

      <section className="grid gap-6 xl:grid-cols-3">
        <InfoPanel
          title={dictionary.detail.visualFeatures}
          items={style.visualFeatures}
        />
        <InfoPanel title={dictionary.detail.bestFor} items={style.bestFor} />
        <InfoPanel
          title={dictionary.detail.avoid}
          items={style.commonFailurePoints}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <PromptBlock
          eyebrow="GPT Image"
          title={dictionary.detail.gptTitle}
          prompt={gptPrompt.prompt}
          notes={style.modelTips.gptImage}
        />
        <PromptBlock
          eyebrow="Nano Banana"
          title={dictionary.detail.nanoTitle}
          prompt={nanoPrompt.prompt}
          notes={style.modelTips.nanoBanana}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="panel rounded-[28px] p-6">
          <p className="eyebrow">{dictionary.detail.useCases}</p>
          <h2 className="mt-3 font-display text-4xl text-white">
            {dictionary.detail.whereWorks}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {style.useCases.map((useCase) => (
              <span
                key={useCase}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-sm text-slate-200"
              >
                {useCase}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
            <p>
              {dictionary.detail.notRecommendedFor}{" "}
              {style.notRecommendedFor.join("、")}
            </p>
            <p>
              {dictionary.detail.startingRatios}{" "}
              {style.recommendedRatios.join(" · ")}
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedStyles.map((relatedStyle) => (
            <Link
              key={relatedStyle.slug}
              href={`/styles/${relatedStyle.slug}`}
              className="panel rounded-[24px] p-4 transition hover:border-white/20 hover:bg-white/6"
            >
              <p className="eyebrow">
                {locale === "zh" ? relatedStyle.nameEn : relatedStyle.nameZh}
              </p>
              <h3 className="mt-2 font-display text-2xl text-white">
                {locale === "zh" ? relatedStyle.nameZh : relatedStyle.nameEn}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {relatedStyle.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

type InfoPanelProps = {
  title: string;
  items: string[];
};

function InfoPanel({ title, items }: InfoPanelProps) {
  return (
    <section className="panel rounded-[28px] p-6">
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

type PromptBlockProps = {
  eyebrow: string;
  title: string;
  prompt: string;
  notes: string;
};

function PromptBlock({ eyebrow, title, prompt, notes }: PromptBlockProps) {
  return (
    <section className="panel rounded-[28px] p-6">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl text-white">{title}</h2>
      <div className="mt-6 rounded-[22px] border border-white/10 bg-slate-950/50 p-5">
        <p className="font-mono text-sm leading-7 text-cyan-50/88">{prompt}</p>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{notes}</p>
    </section>
  );
}
