import type { Metadata } from "next";

import { BuilderPageContent } from "@/components/builder-page-content";

export const metadata: Metadata = {
  title: "Prompt Builder",
  description:
    "Build layered anime prompts for GPT Image and Nano Banana by combining subject, style, lighting, color, and composition.",
};

export default function BuilderPage() {
  return <BuilderPageContent />;
}
