"use client";

import { useState } from "react";

import { useFavorites } from "@/hooks/use-favorites";

type FavoriteButtonProps = {
  slug: string;
  labels?: {
    save: string;
    saved: string;
    savedSuccess?: string;
    removedSuccess?: string;
  };
  compact?: boolean;
  variant?: "default" | "icon";
};

export function FavoriteButton({
  slug,
  labels,
  compact = false,
  variant = "default",
}: FavoriteButtonProps) {
  const { favoriteSet, toggleFavorite } = useFavorites();
  const [notice, setNotice] = useState<string | null>(null);
  const isActive = favoriteSet.has(slug);
  const buttonLabels = labels ?? { save: "Save", saved: "Saved" };

  function handleToggle() {
    const nextActive = !isActive;
    toggleFavorite(slug);
    setNotice(
      nextActive
        ? (buttonLabels.savedSuccess ?? buttonLabels.saved)
        : (buttonLabels.removedSuccess ?? buttonLabels.save),
    );
    window.setTimeout(() => setNotice(null), 1500);
  }

  if (variant === "icon") {
    const iconLabel = isActive ? buttonLabels.saved : buttonLabels.save;

    return (
      <div className="relative">
        {notice ? (
          <span className="pointer-events-none absolute right-0 bottom-[calc(100%+0.6rem)] whitespace-nowrap border border-[var(--warning)] bg-[var(--surface-ink)] px-2.5 py-1 text-xs text-[oklch(90%_0.07_78)] shadow-[0_12px_30px_oklch(5%_0.01_220/0.34)]">
            {notice}
          </span>
        ) : null}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={iconLabel}
          aria-pressed={isActive}
          title={iconLabel}
          className={`inline-flex h-10 w-10 items-center justify-center border transition ${
            isActive
              ? "border-[var(--warning)] bg-[oklch(24%_0.045_78)] text-[oklch(90%_0.07_78)]"
              : "border-[var(--line-strong)] bg-[var(--surface-soft)] text-[oklch(82%_0.026_226)] hover:border-[var(--warning)] hover:bg-[var(--surface)] hover:text-white"
          }`}
        >
          <HeartIcon filled={isActive} />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isActive}
      className={`inline-flex items-center justify-center border font-medium transition ${
        isActive
          ? "border-[var(--warning)] bg-[oklch(24%_0.045_78)] text-[oklch(90%_0.07_78)]"
          : "border-[var(--line-strong)] bg-[var(--surface-ink)] text-white hover:border-white hover:bg-[var(--surface)]"
      } ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
    >
      {isActive ? buttonLabels.saved : buttonLabels.save}
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.05rem] w-[1.05rem]"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.5 4.8 13.7a4.8 4.8 0 0 1 6.8-6.8L12 7.3l.4-.4a4.8 4.8 0 0 1 6.8 6.8Z" />
    </svg>
  );
}
