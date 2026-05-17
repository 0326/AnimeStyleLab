"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label?: string;
  copiedLabel?: string;
};

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/12"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
