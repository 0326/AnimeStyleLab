"use client";

import { useLocale } from "./locale-provider";
import { StylesBrowser } from "./styles-browser";

export function StylesPageContent() {
  const { dictionary } = useLocale();

  return (
    <div className="section-frame space-y-8 py-10">
      <div className="max-w-4xl">
        <p className="eyebrow">{dictionary.styles.eyebrow}</p>
        <h1 className="mt-3 font-display text-6xl text-white">
          {dictionary.styles.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[oklch(80%_0.026_226)]">
          {dictionary.styles.intro}
        </p>
      </div>
      <StylesBrowser />
    </div>
  );
}
