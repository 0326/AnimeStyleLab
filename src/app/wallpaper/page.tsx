import type { Metadata } from "next";

import { WallpaperPageContent } from "@/components/wallpaper-page-content";

export const metadata: Metadata = {
  title: "Wallpaper Lab",
  description:
    "Generate wallpaper-focused anime prompts with layout-safe framing, ratio presets, and PC-first prompt outputs.",
};

export default function WallpaperPage() {
  return <WallpaperPageContent />;
}
