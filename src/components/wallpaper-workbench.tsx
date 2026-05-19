"use client";

import { useState } from "react";

import { styles } from "@/data/styles";
import { wallpaperPresets } from "@/data/wallpaper-presets";
import { useWorkbench } from "@/hooks/use-workbench";
import { buildWallpaperPrompt } from "@/lib/prompt-builder";

import { useLocale } from "./locale-provider";
import { PromptPanel } from "./prompt-panel";

export function WallpaperWorkbench() {
  const [styleSlug, setStyleSlug] = useState("rainlit-cinematic-anime");
  const [presetId, setPresetId] = useState("desktop");
  const [subject, setSubject] = useState("anime city heroine");
  const { saveEntry } = useWorkbench();
  const { dictionary, locale } = useLocale();

  const style = styles.find((item) => item.slug === styleSlug) ?? styles[0];
  const preset =
    wallpaperPresets.find((item) => item.id === presetId) ??
    wallpaperPresets[0];

  const gptPrompt = buildWallpaperPrompt(style, preset, "gpt-image", subject);
  const nanoPrompt = buildWallpaperPrompt(
    style,
    preset,
    "nano-banana",
    subject,
  );

  return (
    <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="panel sticky top-28 h-fit p-5">
        <p className="eyebrow">{dictionary.wallpaper.controlEyebrow}</p>
        <h2 className="mt-3 font-display text-3xl text-white">
          {dictionary.wallpaper.layoutTitle}
        </h2>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[oklch(70%_0.026_226)]">
              {dictionary.wallpaper.subject}
            </span>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="field"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[oklch(70%_0.026_226)]">
              {dictionary.wallpaper.style}
            </span>
            <select
              value={styleSlug}
              onChange={(event) => setStyleSlug(event.target.value)}
              className="field"
            >
              {styles.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {locale === "zh" ? item.nameZh : item.nameEn}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-[oklch(70%_0.026_226)]">
              {dictionary.wallpaper.output}
            </span>
            <select
              value={presetId}
              onChange={(event) => setPresetId(event.target.value)}
              className="field"
            >
              {wallpaperPresets.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} · {item.ratio}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-6 border border-[var(--accent)] bg-[var(--accent-muted)] p-4 text-sm leading-6 text-[oklch(91%_0.05_187)]">
          <p className="font-medium text-white">{preset.label}</p>
          <p className="mt-2">
            {dictionary.wallpaper.ratio}: {preset.ratio}
          </p>
          <p className="mt-2">
            {dictionary.wallpaper.placement}: {preset.placement}
          </p>
        </div>
      </aside>
      <div className="space-y-6">
        <PromptPanel
          onSave={saveEntry}
          outputs={[
            {
              result: gptPrompt,
              model: "gpt-image",
              saveLabel: `${preset.label} · ${locale === "zh" ? style.nameZh : style.nameEn} · GPT Image`,
            },
            {
              result: nanoPrompt,
              model: "nano-banana",
              saveLabel: `${preset.label} · ${locale === "zh" ? style.nameZh : style.nameEn} · Nano Banana`,
            },
          ]}
        />
      </div>
    </div>
  );
}
