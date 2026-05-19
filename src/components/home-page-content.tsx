"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { featuredStyles, styles } from "@/data/styles";

import { useLocale } from "./locale-provider";
import { PreviewTile } from "./preview-tile";
import { StyleCard } from "./style-card";

export function HomePageContent() {
  const { dictionary, locale } = useLocale();
  const heroStyles = featuredStyles.slice(0, 4);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const heroStyle = heroStyles[activeHeroIndex] ?? featuredStyles[0];
  const styleCount = String(styles.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroIndex((current) =>
        current === heroStyles.length - 1 ? 0 : current + 1,
      );
    }, 3000);

    return () => window.clearInterval(timer);
  }, [heroStyles.length]);

  return (
    <div className="space-y-16 py-10">
      <section className="section-frame grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="panel-strong p-10">
          <p className="eyebrow">{dictionary.home.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.95] text-white">
            {dictionary.home.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[oklch(80%_0.026_226)]">
            {dictionary.home.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/styles" className="button-primary px-5 py-3">
              {dictionary.home.explore}
            </Link>
            <Link href="/builder" className="button-secondary px-5 py-3">
              {dictionary.home.builder}
            </Link>
            <Link href="/wallpaper" className="button-tonal px-5 py-3">
              {dictionary.home.wallpaper}
            </Link>
          </div>
        </div>

        <div className="panel relative overflow-hidden">
          <Link
            href={`/styles/${heroStyle.slug}`}
            className="block overflow-hidden"
          >
            <PreviewTile style={heroStyle} />
          </Link>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 p-5">
            <div className="pointer-events-auto inline-flex items-center gap-4 border border-white/12 bg-[oklch(10%_0.018_226/0.58)] px-4 py-3 backdrop-blur-sm">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-white/60">
                  {dictionary.home.styleCountLabel}
                </p>
                <p className="mt-1 font-display text-4xl leading-none text-white">
                  {styleCount}
                </p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="space-y-1">
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-white/60">
                  {dictionary.home.promptOutputsLabel}
                </p>
                <p className="text-sm font-semibold text-white">GPT Image 2</p>
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[oklch(74%_0.034_187)]">
                  Nano Banana
                </p>
              </div>
            </div>
          </div>

          <div className="absolute right-5 bottom-5 z-20">
            <div className="flex items-center gap-2 border border-white/12 bg-[oklch(10%_0.018_226/0.5)] px-3 py-2 backdrop-blur-sm">
              {heroStyles.map((style, index) => (
                <button
                  key={style.slug}
                  type="button"
                  onClick={() => setActiveHeroIndex(index)}
                  aria-label={locale === "zh" ? style.nameZh : style.nameEn}
                  className={`h-2.5 transition ${
                    index === activeHeroIndex
                      ? "w-10 bg-white"
                      : "w-5 bg-white/34 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-[linear-gradient(180deg,transparent_0%,oklch(8%_0.018_226/0.86)_100%)]" />
          <div className="absolute inset-y-0 right-0 z-10 w-28 bg-[linear-gradient(270deg,oklch(8%_0.018_226/0.36)_0%,transparent_100%)]" />
        </div>
      </section>

      <section className="section-frame">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{dictionary.home.featuredEyebrow}</p>
            <h2 className="mt-2 font-display text-5xl text-white">
              {dictionary.home.featuredTitle}
            </h2>
          </div>
          <p className="max-w-xl text-right text-sm leading-6 text-[oklch(76%_0.026_226)]">
            {dictionary.home.featuredIntro}
          </p>
        </div>
        <div className="grid gap-6 min-[960px]:grid-cols-3 xl:grid-cols-4">
          {featuredStyles.map((style) => (
            <StyleCard key={style.slug} style={style} />
          ))}
        </div>
      </section>

      <section className="section-frame flex justify-center border border-[var(--line)] bg-[linear-gradient(135deg,oklch(18%_0.022_226)_0%,oklch(13%_0.018_220)_100%)] p-8">
        <Link href="/styles" className="button-primary px-6 py-3">
          {dictionary.home.moreCta}
        </Link>
      </section>
    </div>
  );
}
