import type { Metadata } from "next";

import { StylesPageContent } from "@/components/styles-page-content";

export const metadata: Metadata = {
  title: "Style Atlas",
  description:
    "Browse 50 anime-inspired style lanes by mood, material, use case, and prompt language.",
};

export default function StylesPage() {
  return <StylesPageContent />;
}
