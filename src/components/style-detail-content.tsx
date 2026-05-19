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
  const relatedTitle = locale === "zh" ? "其他推荐图谱" : "Related Style Atlas";
  const categoryName =
    locale === "zh"
      ? categoryMap[style.category].nameZh
      : categoryMap[style.category].nameEn;
  const copyGptLabel =
    locale === "zh" ? "复制 GPT Image 提示词" : "Copy GPT Image Prompt";
  const copyNanoLabel =
    locale === "zh" ? "复制 BANANA 提示词" : "Copy BANANA Prompt";

  return (
    <div className="section-frame space-y-10 py-10">
      <div className="grid items-start gap-8 grid-cols-[600px_minmax(0,1fr)]">
        <div className="w-[600px]">
          <StylePreviewGallery key={style.slug} style={style} />
          <div className="mt-4 flex items-center gap-3">
            <CopyButton
              value={gptPrompt.prompt}
              label={copyGptLabel}
              copiedLabel={dictionary.actions.copied}
              copySuccessLabel={dictionary.actions.copyPromptSuccess}
              feedbackMode="toast"
            />
            <CopyButton
              value={nanoPrompt.prompt}
              label={copyNanoLabel}
              copiedLabel={dictionary.actions.copied}
              copySuccessLabel={dictionary.actions.copyPromptSuccess}
              feedbackMode="toast"
            />
            <Link href="/builder" className="button-tonal">
              {dictionary.detail.remix}
            </Link>
            <div className="ml-auto">
              <FavoriteButton slug={style.slug} labels={dictionary.actions} />
            </div>
          </div>
        </div>
        <section className="panel-strong h-[506px] overflow-hidden">
          <div className="h-full overflow-y-auto px-6 py-6">
            <div className="flex items-start gap-4">
              <div>
                <p className="eyebrow">{categoryName}</p>
                <h1 className="mt-3 font-display text-[2.8rem] leading-none text-white">
                  {primaryName}
                </h1>
                <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[oklch(74%_0.04_187)]">
                  {secondaryName}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[0.95rem] leading-7 text-[oklch(80%_0.026_226)]">
              {style.description}
            </p>
            <div className="mt-5 grid gap-4 border-t border-[var(--line)] pt-5">
              <DetailTextBlock title="Tags" content={style.tags.join(" · ")} />
              <DetailTextBlock
                title={dictionary.detail.visualFeatures}
                content={style.visualFeatures.join(" · ")}
              />
              <DetailTextBlock
                title={dictionary.detail.bestFor}
                content={style.bestFor.join(" · ")}
              />
              <DetailTextBlock
                title={dictionary.detail.useCases}
                content={style.useCases.join(" · ")}
              />
            </div>
          </div>
        </section>
      </div>

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

      <section className="space-y-5">
        <div>
          <p className="eyebrow">{categoryName}</p>
          <h2 className="mt-3 font-display text-4xl text-white">
            {relatedTitle}
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-6">
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

type DetailTextBlockProps = {
  title: string;
  content: string;
};

function DetailTextBlock({ title, content }: DetailTextBlockProps) {
  return (
    <section>
      <p className="eyebrow">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[oklch(78%_0.026_226)]">
        {content}
      </p>
    </section>
  );
}

type PromptBlockProps = {
  prompt: string;
  notes: string;
};

function PromptBlock({ prompt, notes }: PromptBlockProps) {
  return (
    <div>
      <div className="border border-[var(--line)] bg-[var(--surface-ink)] p-5">
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
