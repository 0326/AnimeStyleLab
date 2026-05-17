"use client";

import type { ReactNode } from "react";

import type { AnimeStyle } from "@/data/styles";

import { useLocale } from "./locale-provider";

type PreviewTileProps = {
  style: AnimeStyle;
  compact?: boolean;
  showRatio?: boolean;
  showNames?: boolean;
  topRightSlot?: ReactNode;
  bottomSlot?: ReactNode;
};

export function PreviewTile({
  style,
  compact = false,
  showRatio = true,
  showNames = true,
  topRightSlot,
  bottomSlot,
}: PreviewTileProps) {
  const { locale } = useLocale();
  const primaryName = locale === "zh" ? style.nameZh : style.nameEn;
  const secondaryName = locale === "zh" ? style.nameEn : style.nameZh;

  return (
    <div
      className={`relative overflow-hidden border border-[var(--line-strong)] ${
        compact ? "min-h-56" : "min-h-80"
      }`}
      style={{
        background: `linear-gradient(135deg, ${style.preview.accent} 0%, ${style.preview.surface} 44%, var(--surface-ink) 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(100%_0_0/0.12)_0,transparent_1px),linear-gradient(0deg,oklch(100%_0_0/0.08)_0,transparent_1px)] bg-[size:28px_28px]" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,oklch(8%_0.018_226/0.34),transparent)]" />
      {bottomSlot ? (
        <div className="absolute right-5 bottom-5 left-5 z-10">
          {bottomSlot}
        </div>
      ) : null}
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="border border-white/24 bg-[oklch(10%_0.018_226/0.62)] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/84">
            {style.preview.label}
          </span>
          {topRightSlot ??
            (showRatio ? (
              <span className="border border-white/20 bg-[oklch(10%_0.018_226/0.48)] px-2.5 py-1 text-[0.68rem] text-white/76">
                {style.recommendedRatios[0]}
              </span>
            ) : null)}
        </div>
        <div className="max-w-xs space-y-2">
          {showNames ? (
            <>
              <p className="text-[0.72rem] uppercase tracking-[0.12em] text-white/74">
                {secondaryName}
              </p>
              <h3 className="font-display text-2xl leading-none text-white">
                {primaryName}
              </h3>
            </>
          ) : null}
          <p className="max-w-sm text-sm leading-6 text-white/78">
            {style.visualFeatures.slice(0, compact ? 2 : 3).join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
