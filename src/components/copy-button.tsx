"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label?: string;
  copiedLabel?: string;
  copySuccessLabel?: string;
  variant?: "default" | "icon" | "overlay";
};

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  copySuccessLabel,
  variant = "default",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (variant === "icon" || variant === "overlay") {
    return (
      <div className="relative">
        {copied ? (
          <span className="pointer-events-none absolute right-0 bottom-[calc(100%+0.6rem)] whitespace-nowrap border border-[var(--accent)] bg-[var(--surface-ink)] px-2.5 py-1 text-xs text-[oklch(91%_0.05_187)] shadow-[0_12px_30px_oklch(5%_0.01_220/0.34)]">
            {copySuccessLabel ?? copiedLabel}
          </span>
        ) : null}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={label}
          title={label}
          className={
            variant === "overlay"
              ? `inline-flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[oklch(9%_0.015_226/0.56)] text-[oklch(82%_0.026_226/0.78)] backdrop-blur-sm transition ${
                  copied
                    ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[oklch(91%_0.05_187)] opacity-100"
                    : "opacity-60 hover:border-[var(--accent)] hover:bg-[oklch(9%_0.015_226/0.88)] hover:text-white hover:opacity-100 focus-visible:opacity-100"
                }`
              : `inline-flex h-10 w-10 items-center justify-center border transition ${
                  copied
                    ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[oklch(91%_0.05_187)]"
                    : "border-[var(--line-strong)] bg-[var(--surface-soft)] text-[oklch(82%_0.026_226)] hover:border-[var(--accent)] hover:bg-[var(--surface)] hover:text-white"
                }`
          }
        >
          <CopyIcon />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={copied ? "button-tonal" : "button-secondary"}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.05rem] w-[1.05rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="10" height="10" rx="1.6" />
      <path d="M6 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1" />
    </svg>
  );
}
