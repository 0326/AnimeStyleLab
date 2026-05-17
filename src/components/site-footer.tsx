"use client";

import { useLocale } from "./locale-provider";

export function SiteFooter() {
  const { dictionary } = useLocale();

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-8 py-8 text-sm text-[oklch(70%_0.026_226)]">
        <p>{dictionary.footer.note}</p>
        <p>{dictionary.footer.stack}</p>
      </div>
    </footer>
  );
}
