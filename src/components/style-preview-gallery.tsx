"use client";

import { useEffect, useRef, useState } from "react";

import type { AnimeStyle } from "@/data/styles";

import { useLocale } from "./locale-provider";
import { PreviewTile } from "./preview-tile";

type StylePreviewGalleryProps = {
  style: AnimeStyle;
};

export function StylePreviewGallery({ style }: StylePreviewGalleryProps) {
  const { locale } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [loadedOriginals, setLoadedOriginals] = useState<Set<string>>(
    () => new Set(),
  );
  const loadingOriginalsRef = useRef<Set<string>>(new Set());
  const images = style.previewImages;
  const hasMultipleImages = images.length > 1;
  const currentImage = images[activeIndex] ?? images[0] ?? null;
  const currentAlt =
    locale === "zh" ? (currentImage?.altZh ?? "") : (currentImage?.altEn ?? "");
  const currentOriginalSrc = currentImage?.originalSrc ?? "";
  const originalImageLabel = locale === "zh" ? "查看原图" : "View original";
  const currentDisplaySrc =
    currentImage && loadedOriginals.has(currentOriginalSrc)
      ? currentOriginalSrc
      : (currentImage?.src ?? "");

  useEffect(() => {
    if (
      !currentImage ||
      typeof window === "undefined" ||
      loadedOriginals.has(currentOriginalSrc) ||
      loadingOriginalsRef.current.has(currentOriginalSrc)
    ) {
      return;
    }

    const originalImage = new window.Image();
    loadingOriginalsRef.current.add(currentOriginalSrc);
    originalImage.onload = () => {
      loadingOriginalsRef.current.delete(currentOriginalSrc);
      setLoadedOriginals((currentLoaded) => {
        if (currentLoaded.has(currentOriginalSrc)) {
          return currentLoaded;
        }

        const nextLoaded = new Set(currentLoaded);
        nextLoaded.add(currentOriginalSrc);
        return nextLoaded;
      });
    };
    originalImage.onerror = () => {
      loadingOriginalsRef.current.delete(currentOriginalSrc);
    };
    originalImage.src = currentOriginalSrc;
  }, [currentImage, currentOriginalSrc, loadedOriginals]);

  useEffect(() => {
    if (!isPreviewOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewOpen]);

  if (!currentImage) {
    return <PreviewTile style={style} />;
  }

  return (
    <section className="min-w-0 max-w-[600px]">
      <div className="relative aspect-[4/3] overflow-hidden border border-[var(--line-strong)] bg-[var(--surface-ink)] shadow-[0_30px_90px_oklch(5%_0.01_220/0.28)]">
        <img
          key={currentDisplaySrc}
          src={currentDisplaySrc}
          alt={currentAlt}
          width={currentImage.width}
          height={currentImage.height}
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(8%_0.018_226/0.08)_0%,transparent_34%,oklch(8%_0.018_226/0.76)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(8%_0.018_226/0.52),transparent_48%)]" />
        <div className="absolute top-5 right-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
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
            </button>
          </div>
        </div>
        {hasMultipleImages ? (
          <>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) =>
                  current === 0 ? images.length - 1 : current - 1,
                )
              }
              className="absolute top-1/2 left-5 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-[oklch(10%_0.018_226/0.66)] text-2xl text-white/92 backdrop-blur-sm transition hover:border-white/40 hover:bg-[oklch(15%_0.02_226/0.78)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
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
              className="absolute top-1/2 right-5 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 bg-[oklch(10%_0.018_226/0.66)] text-2xl text-white/92 backdrop-blur-sm transition hover:border-white/40 hover:bg-[oklch(15%_0.02_226/0.78)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label="Next preview"
            >
              ›
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <span className="border border-white/20 bg-[oklch(10%_0.018_226/0.58)] px-2.5 py-1 text-[0.68rem] text-white/76">
                {activeIndex + 1}/{images.length}
              </span>
            </div>
          </>
        ) : null}
      </div>
      {isPreviewOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={originalImageLabel}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[oklch(5%_0.01_220/0.88)]"
            aria-label={locale === "zh" ? "关闭预览" : "Close preview"}
            onClick={() => setIsPreviewOpen(false)}
          />
          <button
            type="button"
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-6 right-6 z-30 flex h-11 w-11 items-center justify-center border border-white/20 bg-[oklch(10%_0.018_226/0.72)] text-2xl text-white transition hover:border-white/40 hover:bg-[oklch(15%_0.02_226/0.86)]"
            aria-label={locale === "zh" ? "关闭预览" : "Close preview"}
          >
            ×
          </button>
          {hasMultipleImages ? (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((current) =>
                    current === 0 ? images.length - 1 : current - 1,
                  )
                }
                className="absolute top-1/2 left-6 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/20 bg-[oklch(10%_0.018_226/0.72)] text-3xl text-white transition hover:border-white/40 hover:bg-[oklch(15%_0.02_226/0.86)]"
                aria-label={locale === "zh" ? "上一张预览" : "Previous preview"}
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
                className="absolute top-1/2 right-6 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/20 bg-[oklch(10%_0.018_226/0.72)] text-3xl text-white transition hover:border-white/40 hover:bg-[oklch(15%_0.02_226/0.86)]"
                aria-label={locale === "zh" ? "下一张预览" : "Next preview"}
              >
                ›
              </button>
            </>
          ) : null}
          <div className="relative z-10 h-full w-full p-6">
            <img
              src={currentOriginalSrc}
              alt={currentAlt}
              width={currentImage.width}
              height={currentImage.height}
              className="h-full w-full object-contain shadow-[0_30px_90px_oklch(0%_0_0/0.38)]"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
