"use client";

import { useState } from "react";

import { useLocale } from "./locale-provider";
import { WallpaperWorkbench } from "./wallpaper-workbench";
import { WorkbenchDrawer } from "./workbench-drawer";

export function WallpaperPageContent() {
  const { dictionary } = useLocale();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="section-frame space-y-8 py-10">
      <div className="flex items-start justify-between gap-6">
        <div className="max-w-4xl">
          <p className="eyebrow">{dictionary.wallpaper.eyebrow}</p>
          <h1 className="mt-3 font-display text-6xl text-white">
            {dictionary.wallpaper.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[oklch(80%_0.026_226)]">
            {dictionary.wallpaper.intro}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="button-secondary shrink-0"
        >
          {dictionary.actions.myPrompts}
        </button>
      </div>
      <WallpaperWorkbench />
      <WorkbenchDrawer
        defaultSource="wallpaper"
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
