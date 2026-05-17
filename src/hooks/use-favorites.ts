"use client";

import { useEffect, useState } from "react";

import { FAVORITES_KEY, readJson, writeJson } from "@/lib/storage";

const FAVORITES_EVENT = "anime-style-lab:favorites-changed";

function readFavorites() {
  return readJson<string[]>(FAVORITES_KEY, []);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    function syncFavorites() {
      setFavorites(readFavorites());
    }

    syncFavorites();
    window.addEventListener("storage", syncFavorites);
    window.addEventListener(FAVORITES_EVENT, syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener(FAVORITES_EVENT, syncFavorites);
    };
  }, []);

  function toggleFavorite(slug: string) {
    const current = readFavorites();
    const next = current.includes(slug)
      ? current.filter((favorite) => favorite !== slug)
      : [...current, slug];

    writeJson(FAVORITES_KEY, next);
    setFavorites(next);
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }

  return {
    favorites,
    favoriteSet: new Set(favorites),
    toggleFavorite,
  };
}
