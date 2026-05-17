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
    <section className="panel rounded-[28px] p-6">
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
              className="rounded-full border border-white/14 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
            >
              {dictionary.actions.saveToWorkbench}
            </button>
          ) : null}
        </div>
      </div>
      <div className="mt-6 rounded-[22px] border border-white/10 bg-slate-950/50 p-5">
        <p className="font-mono text-sm leading-7 text-cyan-50/88">
          {result.prompt}
        </p>
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[22px] border border-white/8 bg-white/4 p-5">
          <p className="eyebrow">{dictionary.builder.structure}</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            {result.structure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[22px] border border-white/8 bg-white/4 p-5">
          <p className="eyebrow">{dictionary.builder.usageNotes}</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
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
                  className="rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-100"
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
