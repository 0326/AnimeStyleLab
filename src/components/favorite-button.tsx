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
      className={`inline-flex items-center justify-center rounded-full border font-medium transition ${
        isActive
          ? "border-amber-300/70 bg-amber-300/18 text-amber-50"
          : "border-white/15 bg-black/22 text-white hover:border-white/35 hover:bg-black/30"
      } ${compact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}
    >
      {isActive ? buttonLabels.saved : buttonLabels.save}
    </button>
  );
}
