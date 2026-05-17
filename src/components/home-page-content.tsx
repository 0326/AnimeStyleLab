"use client";

import Link from "next/link";

import { categories } from "@/data/categories";
import { featuredStyles } from "@/data/styles";

import { useLocale } from "./locale-provider";
import { PreviewTile } from "./preview-tile";
import { StyleCard } from "./style-card";

export function HomePageContent() {
  const { dictionary, locale } = useLocale();
  const heroStyle = featuredStyles[0];
  const supportStyles = featuredStyles.slice(1, 4);

  return (
    <div className="space-y-16 py-10">
      <section className="section-frame grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
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
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {dictionary.home.metrics.map(([label, value]) => (
              <Metric key={label} label={label} value={value} />
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <Link
            href={`/styles/${heroStyle.slug}`}
            className="panel overflow-hidden transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-strong)]"
          >
            <PreviewTile style={heroStyle} />
          </Link>
          <div className="grid gap-4 md:grid-cols-3">
            {supportStyles.map((style) => (
              <Link
                key={style.slug}
                href={`/styles/${style.slug}`}
                className="panel overflow-hidden transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-strong)]"
              >
                <PreviewTile
                  style={style}
                  compact
                  showRatio={false}
                  showFeatureSummary={false}
                />
              </Link>
            ))}
          </div>
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredStyles.map((style) => (
            <StyleCard key={style.slug} style={style} />
          ))}
        </div>
      </section>

      <section className="section-frame grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="panel p-8">
          <p className="eyebrow">{dictionary.home.flowEyebrow}</p>
          <h2 className="mt-3 font-display text-4xl text-white">
            {dictionary.home.flowTitle}
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[oklch(78%_0.026_226)]">
            {dictionary.home.flowSteps.map((step) => (
              <p key={step}>{step}</p>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.id} className="panel p-6">
              <p className="eyebrow">
                {locale === "zh" ? category.nameEn : category.nameZh}
              </p>
              <h3 className="mt-3 font-display text-3xl text-white">
                {locale === "zh" ? category.nameZh : category.nameEn}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[oklch(78%_0.026_226)]">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

type MetricProps = {
  label: string;
  value: string;
};

function Metric({ label, value }: MetricProps) {
  return (
    <div className="border border-[var(--line)] bg-[var(--surface-soft)] p-5">
      <p className="text-xs uppercase tracking-[0.12em] text-[oklch(70%_0.026_226)]">
        {label}
      </p>
      <p className="mt-3 text-sm leading-6 text-white">{value}</p>
    </div>
  );
}
