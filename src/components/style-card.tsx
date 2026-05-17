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
    <article className="overflow-hidden rounded-[26px] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(3,8,20,0.35)] backdrop-blur-sm">
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
                className="rounded-full border border-white/12 bg-black/28 px-3 py-1 text-xs text-white/88 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        }
      />
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="overflow-hidden text-sm leading-6 text-slate-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {style.summary}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/styles/${style.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white px-4 py-2 text-sm font-semibold !text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition hover:bg-slate-50"
            style={{ color: "#020617" }}
          >
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
