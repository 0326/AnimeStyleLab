"use client";

import type { PromptResult, TargetModel } from "@/lib/prompt-builder";
import type { WorkbenchEntry, WorkbenchSource } from "@/lib/storage";

import { showAppToast } from "./app-toast-host";
import { CopyButton } from "./copy-button";
import { useLocale } from "./locale-provider";
import { PromptModelTabs } from "./prompt-model-tabs";

type PromptPanelOutput = {
  result: PromptResult;
  model: TargetModel;
  saveLabel: string;
};

type PromptPanelProps = {
  outputs: [PromptPanelOutput, PromptPanelOutput];
  onSave?: (entry: WorkbenchEntry) => void;
  saveSource: WorkbenchSource;
};

export function PromptPanel({ outputs, onSave, saveSource }: PromptPanelProps) {
  const { dictionary } = useLocale();

  function handleSave(output: PromptPanelOutput) {
    if (!onSave) return;

    onSave({
      id: crypto.randomUUID(),
      label: output.saveLabel,
      prompt: output.result.prompt,
      model: output.model,
      source: saveSource,
      createdAt: new Date().toISOString(),
    });
    showAppToast(dictionary.actions.saveToWorkbenchSuccess);
  }

  return (
    <section className="panel p-6">
      <PromptModelTabs
        tabs={outputs.map((output) => ({
          id: output.model,
          label: output.model === "gpt-image" ? "GPT Image" : "Nano Banana",
        }))}
        renderHeader={(activeTabId, tabList) => {
          const activeOutput =
            outputs.find((output) => output.model === activeTabId) ??
            outputs[0];

          return (
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="eyebrow">{activeOutput.result.title}</p>
                <h3 className="mt-2 font-display text-3xl text-white">
                  {dictionary.builder.outputTitle}
                </h3>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-4">
                {tabList}
                {onSave ? (
                  <button
                    type="button"
                    onClick={() => handleSave(activeOutput)}
                    className="button-secondary"
                  >
                    {dictionary.actions.saveToWorkbench}
                  </button>
                ) : null}
              </div>
            </div>
          );
        }}
        renderPanel={(activeTabId) => {
          const activeOutput =
            outputs.find((output) => output.model === activeTabId) ??
            outputs[0];

          return (
            <>
              <div className="relative border border-[var(--line)] bg-[var(--surface-ink)] p-5 pr-18">
                <div className="absolute right-4 bottom-4">
                  <CopyButton
                    value={activeOutput.result.prompt}
                    label={dictionary.actions.copyPrompt}
                    copiedLabel={dictionary.actions.copied}
                    variant="overlay"
                  />
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-7 text-[oklch(88%_0.035_187)]">
                  {activeOutput.result.prompt}
                </pre>
              </div>
              <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="border border-[var(--line)] bg-[var(--surface-soft)] p-5">
                  <p className="eyebrow">{dictionary.builder.structure}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[oklch(78%_0.026_226)]">
                    {activeOutput.result.structure.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="border border-[var(--line)] bg-[var(--surface-soft)] p-5">
                  <p className="eyebrow">{dictionary.builder.usageNotes}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-[oklch(78%_0.026_226)]">
                    {activeOutput.result.usageNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <p className="eyebrow">{dictionary.builder.ratios}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeOutput.result.ratioHints.map((ratio) => (
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
            </>
          );
        }}
      />
    </section>
  );
}
