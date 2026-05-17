"use client";

import Link from "next/link";

import { LanguageSwitcher } from "./language-switcher";
import { useLocale } from "./locale-provider";

export function SiteHeader() {
  const { dictionary } = useLocale();
  const navItems = [
    { href: "/", label: dictionary.nav.overview },
    { href: "/styles", label: dictionary.nav.styles },
    { href: "/builder", label: dictionary.nav.builder },
    { href: "/wallpaper", label: dictionary.nav.wallpaper },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--surface-ink)]/95">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-8 px-8 py-5">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center border border-[var(--line-strong)] bg-[var(--surface)] text-sm font-semibold tracking-[0.12em] text-[var(--accent)]">
            ASL
          </div>
          <div>
            <p className="font-display text-2xl text-white">AnimeStyleLab</p>
            <p className="text-xs uppercase tracking-[0.12em] text-[oklch(70%_0.028_226)]">
              {dictionary.nav.tagline}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-transparent px-3 py-2 text-sm text-[oklch(82%_0.026_226)] transition hover:border-[var(--line-strong)] hover:bg-[var(--surface)] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
