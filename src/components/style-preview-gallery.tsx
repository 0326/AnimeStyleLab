"use client";

import Image from "next/image";
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

  if (images.length === 0) {
    return <PreviewTile style={style} />;
  }

  const currentImage = images[activeIndex] ?? images[0];
  const currentAlt = locale === "zh" ? currentImage.altZh : currentImage.altEn;

  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden border border-[var(--line-strong)] bg-[var(--surface-ink)]">
        <Image
          key={currentImage.src}
          src={currentImage.src}
          alt={currentAlt}
          width={currentImage.width}
          height={currentImage.height}
          className="aspect-[4/3] w-full object-cover"
          sizes="(min-width: 1280px) 44vw, 100vw"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_58%,oklch(8%_0.018_226/0.72)_100%)]" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
          <span className="border border-white/24 bg-[oklch(10%_0.018_226/0.62)] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/84">
            {currentImage.label}
          </span>
          {images.length > 1 ? (
            <div className="flex items-center gap-2">
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
            </div>
          ) : null}
        </div>
        <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
          <div className="max-w-md">
            <p className="text-[0.72rem] uppercase tracking-[0.12em] text-white/72">
              {currentImage.focus}
            </p>
            <p className="mt-2 font-display text-2xl text-white">
              {locale === "zh" ? style.nameZh : style.nameEn}
            </p>
          </div>
          <span className="border border-white/20 bg-[oklch(10%_0.018_226/0.58)] px-2.5 py-1 text-[0.68rem] text-white/76">
            {activeIndex + 1}/{images.length}
          </span>
        </div>
      </div>

      {images.length > 1 ? (
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
                    ? "border-[var(--accent)] bg-[var(--surface-strong)]"
                    : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={alt}
                  width={image.width}
                  height={image.height}
                  className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.02]"
                  sizes="(min-width: 1280px) 14vw, 30vw"
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
      ) : null}
    </section>
  );
}
