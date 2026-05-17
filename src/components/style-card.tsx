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
  const { dictionary } = useLocale();

  return (
    <article className="overflow-hidden border border-[var(--line)] bg-[var(--surface)] transition hover:border-[var(--line-strong)]">
      <PreviewTile
        style={style}
        compact
        showRatio={false}
        showNames={false}
        topRightSlot={
          <FavoriteButton
            slug={style.slug}
            labels={dictionary.actions}
            compact
          />
        }
        bottomSlot={
          <div className="flex flex-wrap gap-2">
            {style.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="border border-white/16 bg-[oklch(10%_0.018_226/0.62)] px-2.5 py-1 text-xs text-white/88"
              >
                {tag}
              </span>
            ))}
          </div>
        }
      />
      <div className="space-y-4 border-t border-[var(--line)] p-5">
        <div className="space-y-2">
          <p className="overflow-hidden text-sm leading-6 text-[oklch(78%_0.026_226)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {style.summary}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/styles/${style.slug}`} className="button-primary">
            {dictionary.styles.viewStyle}
          </Link>
          <CopyButton
            value={style.basePrompt}
            label={dictionary.actions.copyPrompt}
            copiedLabel={dictionary.actions.copied}
          />
        </div>
      </div>
    </article>
  );
}
