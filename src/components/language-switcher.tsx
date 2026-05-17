"use client";

import { locales } from "@/i18n/config";

import { useLocale } from "./locale-provider";

export function LanguageSwitcher() {
  const { dictionary, locale, setLocale } = useLocale();

  return (
    <nav
      aria-label={dictionary.nav.language}
      className="flex items-center rounded-full border border-white/10 bg-white/5 p-1"
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
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              isActive
                ? "bg-cyan-100 text-slate-950"
                : "text-slate-300 hover:bg-white/8 hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
