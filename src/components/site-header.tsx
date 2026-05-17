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
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[rgba(6,9,18,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-8 px-8 py-5">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200/25 bg-cyan-300/10 text-sm font-semibold tracking-[0.2em] text-cyan-100">
            ASL
          </div>
          <div>
            <p className="font-display text-2xl text-white">AnimeStyleLab</p>
            <p className="text-xs uppercase tracking-[0.28em] text-white/50">
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
                className="rounded-full border border-transparent px-4 py-2 text-sm text-slate-200 transition hover:border-white/14 hover:bg-white/6 hover:text-white"
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
