"use client";

import type { ReactNode } from "react";

import type { AnimeStyle } from "@/data/styles";

import { useLocale } from "./locale-provider";

type PreviewTileProps = {
  style: AnimeStyle;
  compact?: boolean;
  showRatio?: boolean;
  showNames?: boolean;
  showFeatureSummary?: boolean;
  topLeftLabel?: string;
  topRightSlot?: ReactNode;
  bottomSlot?: ReactNode;
};

export function PreviewTile({
  style,
  compact = false,
  showRatio = true,
  showNames = true,
  showFeatureSummary = true,
  topLeftLabel,
  topRightSlot,
  bottomSlot,
}: PreviewTileProps) {
  const { locale } = useLocale();
  const primaryName = locale === "zh" ? style.nameZh : style.nameEn;
  const secondaryName = locale === "zh" ? style.nameEn : style.nameZh;
  const coverImage = style.previewImages[0];
  const imageAlt =
    locale === "zh"
      ? (coverImage?.altZh ?? primaryName)
      : (coverImage?.altEn ?? primaryName);

  return (
    <div
      className={`group relative aspect-[4/3] overflow-hidden border border-[var(--line-strong)] ${
        compact ? "min-h-0" : "min-h-0"
      }`}
      style={{
        background: `linear-gradient(135deg, ${style.preview.accent} 0%, ${style.preview.surface} 44%, var(--surface-ink) 100%)`,
      }}
    >
      {coverImage ? (
        <>
          <img
            src={coverImage.src}
            alt={imageAlt}
            width={coverImage.width}
            height={coverImage.height}
            className="absolute inset-0 block h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.035]"
            loading={compact ? "lazy" : "eager"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(8%_0.018_226/0.14)_0%,oklch(8%_0.018_226/0.06)_30%,oklch(8%_0.018_226/0.8)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(8%_0.018_226/0.62),transparent_48%)]" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/8" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(100%_0_0/0.12)_0,transparent_1px),linear-gradient(0deg,oklch(100%_0_0/0.08)_0,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,oklch(8%_0.018_226/0.34),transparent)]" />
        </>
      )}
      {bottomSlot ? (
        <div className="absolute right-4 bottom-4 left-4 z-10">
          {bottomSlot}
        </div>
      ) : null}
      <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span
            className={`border border-white/20 bg-[oklch(10%_0.018_226/0.56)] px-2.5 py-1 font-semibold text-white/88 shadow-[0_12px_30px_oklch(5%_0.01_220/0.26)] ${
              topLeftLabel
                ? "min-w-0 max-w-[78%] break-words text-sm leading-6"
                : "text-[0.68rem] uppercase tracking-[0.12em]"
            }`}
          >
            {topLeftLabel ?? style.preview.label}
          </span>
          <div className="flex items-start gap-2">
            {style.previewImages.length > 1 ? (
              <span className="border border-white/20 bg-[oklch(10%_0.018_226/0.48)] px-2.5 py-1 text-[0.68rem] text-white/76">
                {style.previewImages.length} views
              </span>
            ) : null}
            {topRightSlot ??
              (showRatio ? (
                <span className="border border-white/20 bg-[oklch(10%_0.018_226/0.48)] px-2.5 py-1 text-[0.68rem] text-white/76">
                  {style.recommendedRatios[0]}
                </span>
              ) : null)}
          </div>
        </div>
        <div className="max-w-sm space-y-2">
          {showNames ? (
            <>
              <p className="text-[0.72rem] uppercase tracking-[0.12em] text-white/70">
                {secondaryName}
              </p>
              <h3
                className={`font-display leading-none text-white ${
                  compact ? "text-[1.65rem]" : "text-[2.2rem]"
                }`}
              >
                {primaryName}
              </h3>
            </>
          ) : null}
          {showFeatureSummary ? (
            <p className="max-w-sm text-sm leading-6 text-white/82">
              {style.visualFeatures.slice(0, compact ? 2 : 3).join(" · ")}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
