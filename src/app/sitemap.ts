import type { MetadataRoute } from "next";

import { styles } from "@/data/styles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://anime-style-lab.example/",
      priority: 1,
    },
    {
      url: "https://anime-style-lab.example/styles",
      priority: 0.9,
    },
    {
      url: "https://anime-style-lab.example/builder",
      priority: 0.9,
    },
    {
      url: "https://anime-style-lab.example/wallpaper",
      priority: 0.8,
    },
    ...styles.map((style) => ({
      url: `https://anime-style-lab.example/styles/${style.slug}`,
      priority: 0.7,
    })),
  ];
}
