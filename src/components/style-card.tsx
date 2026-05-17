"use client";

import Link from "next/link";

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

  return (
    <article className="overflow-hidden border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--line-strong)]">
      <PreviewTile
        style={style}
        compact
        showRatio={false}
        showNames={false}
        showFeatureSummary={false}
        topLeftLabel={styleName}
      />
      <div className="space-y-4 border-t border-[var(--line)] p-5">
        <div className="space-y-2">
          <p className="overflow-hidden text-sm leading-6 text-[oklch(78%_0.026_226)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {style.summary}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
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
