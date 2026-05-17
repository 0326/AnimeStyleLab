"use client";

import type { PromptResult, TargetModel } from "@/lib/prompt-builder";
import type { WorkbenchEntry } from "@/lib/storage";

import { CopyButton } from "./copy-button";
import { useLocale } from "./locale-provider";

type PromptPanelProps = {
  result: PromptResult;
  model: TargetModel;
  onSave?: (entry: WorkbenchEntry) => void;
  saveLabel: string;
};

export function PromptPanel({
  result,
  model,
  onSave,
  saveLabel,
}: PromptPanelProps) {
  const { dictionary } = useLocale();

  function handleSave() {
    if (!onSave) return;

    onSave({
      id: crypto.randomUUID(),
      label: saveLabel,
      prompt: result.prompt,
      model,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <section className="panel p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{result.title}</p>
          <h3 className="mt-2 font-display text-3xl text-white">
            {dictionary.builder.outputTitle}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <CopyButton
            value={result.prompt}
            label={dictionary.actions.copyPrompt}
            copiedLabel={dictionary.actions.copied}
          />
          {onSave ? (
            <button
              type="button"
              onClick={handleSave}
              className="button-secondary"
            >
              {dictionary.actions.saveToWorkbench}
            </button>
          ) : null}
        </div>
      </div>
      <div className="mt-6 border border-[var(--line)] bg-[var(--surface-ink)] p-5">
        <p className="font-mono text-sm leading-7 text-[oklch(88%_0.035_187)]">
          {result.prompt}
        </p>
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="border border-[var(--line)] bg-[var(--surface-soft)] p-5">
          <p className="eyebrow">{dictionary.builder.structure}</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[oklch(78%_0.026_226)]">
            {result.structure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface-soft)] p-5">
          <p className="eyebrow">{dictionary.builder.usageNotes}</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[oklch(78%_0.026_226)]">
            {result.usageNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <div className="mt-5">
            <p className="eyebrow">{dictionary.builder.ratios}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.ratioHints.map((ratio) => (
                <span
                  key={ratio}
                  className="tag border-[var(--accent)] bg-[var(--accent-muted)] text-[oklch(91%_0.05_187)]"
                >
                  {ratio}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
