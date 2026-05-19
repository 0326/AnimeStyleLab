"use client";

import { useState } from "react";

import {
  colorOptions,
  compositionOptions,
  lightingOptions,
  localizedColorOptions,
  localizedCompositionOptions,
  localizedLightingOptions,
  localizedSubjects,
  localizedUseCaseOptions,
  subjects,
  useCaseOptions,
} from "@/data/prompt-segments";
import { styles } from "@/data/styles";
import { useWorkbench } from "@/hooks/use-workbench";
import { buildPrompt } from "@/lib/prompt-builder";

import { useLocale } from "./locale-provider";
import { PromptPanel } from "./prompt-panel";

type SelectControlProps =
  | {
      label: string;
      value: string;
      onChange: (value: string) => void;
      options: string[];
    }
  | {
      label: string;
      value: string;
      onChange: (value: string) => void;
      options: Array<{ value: string; label: string }>;
    };

function SelectControl(props: SelectControlProps) {
  const options =
    typeof props.options[0] === "string"
      ? (props.options as string[]).map((option) => ({
          value: option,
          label: option,
        }))
      : (props.options as Array<{ value: string; label: string }>);

  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[oklch(70%_0.026_226)]">
        {props.label}
      </span>
      <select
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        className="field"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function BuilderWorkbench() {
  const [subject, setSubject] = useState(subjects[0]);
  const [styleSlug, setStyleSlug] = useState(styles[0].slug);
  const [lighting, setLighting] = useState(lightingOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [composition, setComposition] = useState(compositionOptions[0]);
  const [useCase, setUseCase] = useState(useCaseOptions[0]);
  const { entries, saveEntry } = useWorkbench();
  const { dictionary, locale } = useLocale();
  const localizedLabelKey = locale === "zh" ? "labelZh" : "labelEn";

  const style = styles.find((item) => item.slug === styleSlug) ?? styles[0];
  const gptPrompt = buildPrompt({
    subject,
    style,
    lighting,
    color,
    composition,
    useCase,
    targetModel: "gpt-image",
  });
  const nanoPrompt = buildPrompt({
    subject,
    style,
    lighting,
    color,
    composition,
    useCase,
    targetModel: "nano-banana",
  });

  return (
    <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="panel sticky top-28 h-fit p-5">
        <p className="eyebrow">{dictionary.builder.inputEyebrow}</p>
        <h2 className="mt-3 font-display text-3xl text-white">
          {dictionary.builder.controlsTitle}
        </h2>
        <div className="mt-6 space-y-4">
          <SelectControl
            label={dictionary.builder.subject}
            value={subject}
            onChange={setSubject}
            options={localizedSubjects.map((item) => ({
              value: item.value,
              label: item[localizedLabelKey],
            }))}
          />
          <SelectControl
            label={dictionary.builder.style}
            value={styleSlug}
            onChange={setStyleSlug}
            options={styles.map((item) => ({
              value: item.slug,
              label: locale === "zh" ? item.nameZh : item.nameEn,
            }))}
          />
          <SelectControl
            label={dictionary.builder.lighting}
            value={lighting}
            onChange={setLighting}
            options={localizedLightingOptions.map((item) => ({
              value: item.value,
              label: item[localizedLabelKey],
            }))}
          />
          <SelectControl
            label={dictionary.builder.color}
            value={color}
            onChange={setColor}
            options={localizedColorOptions.map((item) => ({
              value: item.value,
              label: item[localizedLabelKey],
            }))}
          />
          <SelectControl
            label={dictionary.builder.composition}
            value={composition}
            onChange={setComposition}
            options={localizedCompositionOptions.map((item) => ({
              value: item.value,
              label: item[localizedLabelKey],
            }))}
          />
          <SelectControl
            label={dictionary.builder.useCase}
            value={useCase}
            onChange={setUseCase}
            options={localizedUseCaseOptions.map((item) => ({
              value: item.value,
              label: item[localizedLabelKey],
            }))}
          />
        </div>
      </aside>
      <div className="space-y-6">
        <PromptPanel
          onSave={saveEntry}
          outputs={[
            {
              result: gptPrompt,
              model: "gpt-image",
              saveLabel: `${locale === "zh" ? style.nameZh : style.nameEn} · GPT Image`,
            },
            {
              result: nanoPrompt,
              model: "nano-banana",
              saveLabel: `${locale === "zh" ? style.nameZh : style.nameEn} · Nano Banana`,
            },
          ]}
        />
        <section className="panel p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{dictionary.builder.workbenchEyebrow}</p>
              <h3 className="mt-2 font-display text-3xl text-white">
                {dictionary.builder.workbenchTitle}
              </h3>
            </div>
            <p className="text-sm text-[oklch(76%_0.026_226)]">
              {dictionary.builder.workbenchMeta}
            </p>
          </div>
          <div className="mt-6 grid gap-4">
            {entries.length ? (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="border border-[var(--line)] bg-[var(--surface-soft)] p-4"
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
                  </div>
                  <p className="mt-3 font-mono text-xs leading-6 text-[oklch(78%_0.026_226)]">
                    {entry.prompt}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-[oklch(78%_0.026_226)]">
                {dictionary.builder.emptyHistory}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
