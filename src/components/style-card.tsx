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
  const primaryName = locale === "zh" ? style.nameZh : style.nameEn;
  const secondaryName = locale === "zh" ? style.nameEn : style.nameZh;

  return (
    <article className="overflow-hidden rounded-[26px] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(3,8,20,0.35)] backdrop-blur-sm">
      <PreviewTile style={style} compact />
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">
                {secondaryName}
              </p>
              <h3 className="font-display text-2xl text-white">
                {primaryName}
              </h3>
            </div>
            <FavoriteButton slug={style.slug} labels={dictionary.actions} />
          </div>
          <p className="text-sm leading-6 text-slate-300">{style.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {style.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/styles/${style.slug}`}
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-100"
          >
            {dictionary.styles.viewStyle}
          </Link>
          <CopyButton
            value={style.basePrompt}
            label={dictionary.actions.copyBasePrompt}
            copiedLabel={dictionary.actions.copied}
          />
        </div>
      </div>
    </article>
  );
}
