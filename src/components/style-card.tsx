"use client";

import Link from "next/link";

import { categoryMap } from "@/data/categories";
import type { AnimeStyle } from "@/data/styles";

import { CopyButton } from "./copy-button";
import { FavoriteButton } from "./favorite-button";
import { useLocale } from "./locale-provider";
import { PreviewTile } from "./preview-tile";

type StyleCardProps = {
  style: AnimeStyle;
};

export function StyleCard({ style }: StyleCardProps) {
  const { dictionary, locale } = useLocale();
  const styleName = locale === "zh" ? style.nameZh : style.nameEn;
  const categoryName =
    locale === "zh"
      ? categoryMap[style.category].nameZh
      : categoryMap[style.category].nameEn;

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-strong)]">
      <Link href={`/styles/${style.slug}`} className="block">
        <PreviewTile
          style={style}
          compact
          showRatio={false}
          showNames={false}
          showFeatureSummary={false}
          topLeftLabel={styleName}
          bottomSlot={
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {style.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/14 bg-[oklch(10%_0.018_226/0.56)] px-2.5 py-1 text-[0.68rem] text-white/78"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/78">
                {style.visualFeatures.slice(0, 2).join(" · ")}
              </p>
            </div>
          }
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 border-t border-[var(--line)] p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">{categoryName}</p>
            <span className="text-[0.72rem] uppercase tracking-[0.12em] text-[oklch(70%_0.03_226)]">
              {style.previewImages.length} view
              {style.previewImages.length > 1 ? "s" : ""}
            </span>
          </div>
          <h3 className="font-display text-[1.7rem] leading-none text-white transition group-hover:text-[oklch(96%_0.02_226)]">
            {styleName}
          </h3>
          <p className="min-h-[3rem] overflow-hidden text-sm leading-6 text-[oklch(78%_0.026_226)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {style.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {style.useCases.slice(0, 2).map((useCase) => (
            <span key={useCase} className="tag px-2.5 py-1">
              {useCase}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-4">
          <Link href={`/styles/${style.slug}`} className="button-primary">
            {dictionary.styles.viewStyle}
          </Link>
          <div className="flex items-center gap-2">
            <FavoriteButton
              slug={style.slug}
              labels={dictionary.actions}
              variant="icon"
            />
            <CopyButton
              value={style.basePrompt}
              label={dictionary.actions.copyPrompt}
              copiedLabel={dictionary.actions.copied}
              copySuccessLabel={dictionary.actions.copyPromptSuccess}
              variant="icon"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
