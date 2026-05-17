"use client";

import { useFavorites } from "@/hooks/use-favorites";

type FavoriteButtonProps = {
  slug: string;
  labels?: {
    save: string;
    saved: string;
  };
};

export function FavoriteButton({ slug, labels }: FavoriteButtonProps) {
  const { favoriteSet, toggleFavorite } = useFavorites();
  const isActive = favoriteSet.has(slug);
  const buttonLabels = labels ?? { save: "Save", saved: "Saved" };

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(slug)}
      aria-pressed={isActive}
      className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition ${
        isActive
          ? "border-amber-300/70 bg-amber-300/16 text-amber-100"
          : "border-white/15 bg-white/6 text-white hover:border-white/35 hover:bg-white/10"
      }`}
    >
      {isActive ? buttonLabels.saved : buttonLabels.save}
    </button>
  );
}
