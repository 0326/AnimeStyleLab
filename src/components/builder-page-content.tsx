"use client";

import { BuilderWorkbench } from "./builder-workbench";
import { useLocale } from "./locale-provider";

export function BuilderPageContent() {
  const { dictionary } = useLocale();

  return (
    <div className="section-frame space-y-8 py-10">
      <div className="max-w-4xl">
        <p className="eyebrow">{dictionary.builder.eyebrow}</p>
        <h1 className="mt-3 font-display text-6xl text-white">
          {dictionary.builder.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[oklch(80%_0.026_226)]">
          {dictionary.builder.intro}
        </p>
      </div>
      <BuilderWorkbench />
    </div>
  );
}
