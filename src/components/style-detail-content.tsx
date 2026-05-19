"use client";

import Link from "next/link";

import { categoryMap } from "@/data/categories";
import type { AnimeStyle } from "@/data/styles";
import type { PromptResult } from "@/lib/prompt-builder";

import { CopyButton } from "./copy-button";
import { FavoriteButton } from "./favorite-button";
import { useLocale } from "./locale-provider";
import { PromptModelTabs } from "./prompt-model-tabs";
import { StylePreviewGallery } from "./style-preview-gallery";

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
        <StylePreviewGallery key={style.slug} style={style} />
        <section className="panel-strong p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{categoryName}</p>
              <h1 className="mt-3 font-display text-6xl text-white">
                {primaryName}
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[oklch(74%_0.04_187)]">
                {secondaryName}
              </p>
            </div>
            <FavoriteButton slug={style.slug} labels={dictionary.actions} />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <MetricTile
              label={dictionary.detail.useCases}
              value={String(style.useCases.length)}
            />
            <MetricTile
              label={dictionary.detail.startingRatios}
              value={style.recommendedRatios[0]}
            />
            <MetricTile
              label="Preview"
              value={`${style.previewImages.length}`}
            />
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[oklch(80%_0.026_226)]">
            {style.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {style.tags.map((tag) => (
              <span key={tag} className="tag">
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
            <Link href="/builder" className="button-tonal">
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

      <section className="panel p-6">
        <PromptModelTabs
          tabs={[
            { id: "gpt-image", label: "GPT Image" },
            { id: "nano-banana", label: "Nano Banana" },
          ]}
          renderHeader={(activeTabId, tabList) => (
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="eyebrow">
                  {activeTabId === "gpt-image" ? "GPT Image" : "Nano Banana"}
                </p>
                <h2 className="mt-2 font-display text-4xl text-white">
                  {activeTabId === "gpt-image"
                    ? dictionary.detail.gptTitle
                    : dictionary.detail.nanoTitle}
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-4">
                {tabList}
              </div>
            </div>
          )}
          renderPanel={(activeTabId) => (
            <PromptBlock
              prompt={
                activeTabId === "gpt-image"
                  ? gptPrompt.prompt
                  : nanoPrompt.prompt
              }
              notes={
                activeTabId === "gpt-image"
                  ? style.modelTips.gptImage
                  : style.modelTips.nanoBanana
              }
            />
          )}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="panel p-6">
          <p className="eyebrow">{dictionary.detail.useCases}</p>
          <h2 className="mt-3 font-display text-4xl text-white">
            {dictionary.detail.whereWorks}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {style.useCases.map((useCase) => (
              <span key={useCase} className="tag px-3 py-2 text-sm">
                {useCase}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-3 text-sm leading-6 text-[oklch(78%_0.026_226)]">
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
              className="group panel overflow-hidden transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-strong)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--line)] bg-[var(--surface-ink)]">
                <img
                  src={relatedStyle.previewImages[0]?.src}
                  alt={
                    locale === "zh"
                      ? (relatedStyle.previewImages[0]?.altZh ??
                        relatedStyle.nameZh)
                      : (relatedStyle.previewImages[0]?.altEn ??
                        relatedStyle.nameEn)
                  }
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_22%,oklch(8%_0.018_226/0.74)_100%)]" />
                <div className="absolute right-4 bottom-4 left-4">
                  <p className="eyebrow">
                    {locale === "zh"
                      ? relatedStyle.nameEn
                      : relatedStyle.nameZh}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-white">
                    {locale === "zh"
                      ? relatedStyle.nameZh
                      : relatedStyle.nameEn}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm leading-6 text-[oklch(78%_0.026_226)]">
                  {relatedStyle.summary}
                </p>
              </div>
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
    <section className="panel p-6">
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-[oklch(78%_0.026_226)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

type PromptBlockProps = {
  prompt: string;
  notes: string;
};

function PromptBlock({ prompt, notes }: PromptBlockProps) {
  const { dictionary } = useLocale();

  return (
    <div>
      <div className="relative border border-[var(--line)] bg-[var(--surface-ink)] p-5 pr-18">
        <div className="absolute right-4 bottom-4">
          <CopyButton
            value={prompt}
            label={dictionary.actions.copyPrompt}
            copiedLabel={dictionary.actions.copied}
            variant="overlay"
          />
        </div>
        <p className="font-mono text-sm leading-7 text-[oklch(88%_0.035_187)]">
          {prompt}
        </p>
      </div>
      <p className="mt-4 text-sm leading-6 text-[oklch(78%_0.026_226)]">
        {notes}
      </p>
    </div>
  );
}

type MetricTileProps = {
  label: string;
  value: string;
};

function MetricTile({ label, value }: MetricTileProps) {
  return (
    <div className="border border-[var(--line)] bg-[var(--surface-ink)] px-4 py-3">
      <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[oklch(70%_0.026_226)]">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl leading-none text-white">
        {value}
      </p>
    </div>
  );
}
