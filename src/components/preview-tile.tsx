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
      className={`relative overflow-hidden rounded-[22px] border border-white/10 ${
        compact ? "min-h-56" : "min-h-80"
      }`}
      style={{
        background: `radial-gradient(circle at 18% 18%, ${style.preview.glow} 0%, transparent 32%), linear-gradient(140deg, ${style.preview.accent} 0%, ${style.preview.surface} 48%, #080910 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.14),transparent_26%,transparent_70%,rgba(255,255,255,0.08))]" />
      <div className="absolute inset-0 opacity-35 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_1px,transparent_1px,transparent_18px)]" />
      {bottomSlot ? (
        <div className="absolute right-5 bottom-5 left-5 z-10">
          {bottomSlot}
        </div>
      ) : null}
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/20 bg-black/18 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/78">
            {style.preview.label}
          </span>
          {topRightSlot ??
            (showRatio ? (
              <span className="rounded-full border border-white/16 bg-white/8 px-3 py-1 text-[0.68rem] text-white/72">
                {style.recommendedRatios[0]}
              </span>
            ) : null)}
        </div>
        <div className="max-w-xs space-y-2">
          {showNames ? (
            <>
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/70">
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
