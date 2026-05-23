"use client";

import { useEffect, useState } from "react";

import { useWorkbench } from "@/hooks/use-workbench";
import type { WorkbenchSource } from "@/lib/storage";

import { CopyButton } from "./copy-button";
import { useLocale } from "./locale-provider";

type WorkbenchDrawerProps = {
  defaultSource: WorkbenchSource;
  isOpen: boolean;
  onClose: () => void;
};

export function WorkbenchDrawer({
  defaultSource,
  isOpen,
  onClose,
}: WorkbenchDrawerProps) {
  const { entries } = useWorkbench();
  const { dictionary } = useLocale();
  const [activeSource, setActiveSource] =
    useState<WorkbenchSource>(defaultSource);
  const filteredEntries = entries.filter(
    (entry) => entry.source === activeSource,
  );

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setActiveSource(defaultSource);
    }
  }, [defaultSource, isOpen]);

  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 bg-[oklch(4%_0.01_220/0.62)] transition-opacity duration-200 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-[34rem] flex-col border-l border-[var(--line-strong)] bg-[var(--surface-ink)] shadow-[-18px_0_48px_oklch(3%_0.01_220/0.42)] transition-transform duration-200 xl:max-w-[38rem] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-6 py-5">
          <div>
            <p className="eyebrow">{dictionary.builder.workbenchEyebrow}</p>
            <h2 className="mt-2 font-display text-3xl text-white">
              {dictionary.builder.workbenchTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[oklch(76%_0.026_226)]">
              {dictionary.builder.workbenchMeta}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[var(--surface-soft)] text-[oklch(78%_0.026_226)] transition hover:border-[var(--accent)] hover:text-white"
            aria-label={dictionary.actions.closeWorkbench}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveSource("builder")}
              className={
                activeSource === "builder" ? "button-tonal" : "button-secondary"
              }
            >
              {dictionary.builder.eyebrow}
            </button>
            <button
              type="button"
              onClick={() => setActiveSource("wallpaper")}
              className={
                activeSource === "wallpaper"
                  ? "button-tonal"
                  : "button-secondary"
              }
            >
              {dictionary.wallpaper.eyebrow}
            </button>
          </div>
          {filteredEntries.length ? (
            <div className="grid gap-4">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="border border-[var(--line)] bg-[var(--surface)] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {entry.label}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[oklch(70%_0.026_226)]">
                        {entry.model}
                      </p>
                    </div>
                    <CopyButton
                      value={entry.prompt}
                      label={dictionary.actions.copyPrompt}
                      copiedLabel={dictionary.actions.copied}
                      copySuccessLabel={dictionary.actions.copyPromptSuccess}
                      feedbackMode="toast"
                      variant="icon"
                    />
                  </div>
                  <p className="mt-3 font-mono text-xs leading-6 text-[oklch(78%_0.026_226)]">
                    {entry.prompt}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[var(--line)] bg-[var(--surface)] p-5">
              <p className="text-sm leading-6 text-[oklch(78%_0.026_226)]">
                {activeSource === "builder"
                  ? dictionary.builder.emptyHistory
                  : dictionary.wallpaper.emptyHistory}
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
