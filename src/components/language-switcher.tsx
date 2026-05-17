"use client";

import { locales } from "@/i18n/config";

import { useLocale } from "./locale-provider";

export function LanguageSwitcher() {
  const { dictionary, locale, setLocale } = useLocale();

  return (
    <nav
      aria-label={dictionary.nav.language}
      className="flex items-center border border-[var(--line)] bg-[var(--surface-soft)] p-1"
    >
      {locales.map((item) => {
        const isActive = item === locale;
        const label =
          item === "en" ? dictionary.nav.english : dictionary.nav.chinese;

        return (
          <button
            type="button"
            key={item}
            aria-current={isActive ? "true" : undefined}
            onClick={() => setLocale(item)}
            className={`border px-3 py-1.5 text-xs font-medium transition ${
              isActive
                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--surface-ink)]"
                : "border-transparent text-[oklch(78%_0.026_226)] hover:bg-[var(--surface)] hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
