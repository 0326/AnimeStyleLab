"use client";

import { useFavorites } from "@/hooks/use-favorites";

type FavoriteButtonProps = {
  slug: string;
  labels?: {
    save: string;
    saved: string;
  };
  compact?: boolean;
};

export function FavoriteButton({
  slug,
  labels,
  compact = false,
}: FavoriteButtonProps) {
  const { favoriteSet, toggleFavorite } = useFavorites();
  const isActive = favoriteSet.has(slug);
  const buttonLabels = labels ?? { save: "Save", saved: "Saved" };

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(slug)}
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
