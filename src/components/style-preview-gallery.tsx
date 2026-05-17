"use client";

import { useState } from "react";

import type { AnimeStyle } from "@/data/styles";

import { useLocale } from "./locale-provider";
import { PreviewTile } from "./preview-tile";

type StylePreviewGalleryProps = {
  style: AnimeStyle;
};

export function StylePreviewGallery({ style }: StylePreviewGalleryProps) {
  const { locale } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const images = style.previewImages;
  const hasMultipleImages = images.length > 1;

  if (images.length === 0) {
    return <PreviewTile style={style} />;
  }

  const currentImage = images[activeIndex] ?? images[0];
  const currentAlt = locale === "zh" ? currentImage.altZh : currentImage.altEn;
  const originalImageLabel = locale === "zh" ? "查看原图" : "View original";

  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden border border-[var(--line-strong)] bg-[var(--surface-ink)] shadow-[0_24px_80px_oklch(5%_0.01_220/0.24)]">
        <img
          key={currentImage.src}
          src={currentImage.src}
          alt={currentAlt}
          width={currentImage.width}
          height={currentImage.height}
          className="aspect-[4/3] w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(8%_0.018_226/0.08)_0%,transparent_34%,oklch(8%_0.018_226/0.76)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(8%_0.018_226/0.52),transparent_48%)]" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
          <span className="border border-white/24 bg-[oklch(10%_0.018_226/0.62)] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/84">
            {currentImage.label}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={currentImage.originalSrc}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-white/20 bg-[oklch(10%_0.018_226/0.58)] text-white/90 transition hover:border-white/40 hover:bg-[oklch(15%_0.02_226/0.72)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label={originalImageLabel}
              title={originalImageLabel}
            >
              <span className="sr-only">{originalImageLabel}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              >
                <path d="M2.1 12s3.5-6.5 9.9-6.5S21.9 12 21.9 12s-3.5 6.5-9.9 6.5S2.1 12 2.1 12Z" />
                <circle cx="12" cy="12" r="2.8" />
              </svg>
            </a>
            {hasMultipleImages ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((current) =>
                      current === 0 ? images.length - 1 : current - 1,
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center border border-white/20 bg-[oklch(10%_0.018_226/0.58)] text-lg text-white/90 transition hover:border-white/40 hover:bg-[oklch(15%_0.02_226/0.72)]"
                  aria-label="Previous preview"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((current) =>
                      current === images.length - 1 ? 0 : current + 1,
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center border border-white/20 bg-[oklch(10%_0.018_226/0.58)] text-lg text-white/90 transition hover:border-white/40 hover:bg-[oklch(15%_0.02_226/0.72)]"
                  aria-label="Next preview"
                >
                  ›
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
          <div className="max-w-md">
            <p className="text-[0.72rem] uppercase tracking-[0.12em] text-white/72">
              {currentImage.focus}
            </p>
            <p className="mt-2 font-display text-[2.2rem] leading-none text-white">
              {locale === "zh" ? style.nameZh : style.nameEn}
            </p>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/80">
              {style.visualFeatures.slice(0, 3).join(" · ")}
            </p>
          </div>
          <span className="border border-white/20 bg-[oklch(10%_0.018_226/0.58)] px-2.5 py-1 text-[0.68rem] text-white/76">
            {activeIndex + 1}/{images.length}
          </span>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px]">
        {hasMultipleImages ? (
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => {
              const alt = locale === "zh" ? image.altZh : image.altEn;
              const isActive = index === activeIndex;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group overflow-hidden border text-left transition ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--surface-strong)] shadow-[0_18px_40px_oklch(5%_0.01_220/0.22)]"
                      : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={alt}
                    width={image.width}
                    height={image.height}
                    className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="border-t border-[var(--line)] px-3 py-2">
                    <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[oklch(72%_0.03_226)]">
                      {image.label}
                    </p>
                    <p className="mt-1 text-sm text-white/86">{image.focus}</p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="panel overflow-hidden">
            <PreviewTile
              style={style}
              compact
              showRatio={false}
              showNames={false}
              topLeftLabel={currentImage.label}
              bottomSlot={
                <p className="max-w-sm text-sm leading-6 text-white/78">
                  {style.summary}
                </p>
              }
            />
          </div>
        )}
        <aside className="panel flex flex-col justify-between p-5">
          <div>
            <p className="eyebrow">{currentImage.label}</p>
            <h3 className="mt-3 font-display text-3xl text-white">
              {currentImage.focus}
            </h3>
            <p className="mt-4 text-sm leading-6 text-[oklch(78%_0.026_226)]">
              {currentAlt}
            </p>
          </div>
          <div className="space-y-3 border-t border-[var(--line)] pt-4 text-sm leading-6 text-[oklch(78%_0.026_226)]">
            <p>{style.useCases.slice(0, 3).join(" · ")}</p>
            <p>{style.recommendedRatios.join(" · ")}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
