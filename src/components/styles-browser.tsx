"use client";

import { useDeferredValue, useState } from "react";

import { categories } from "@/data/categories";
import { type AnimeStyle, allTags, allUseCases, styles } from "@/data/styles";
import { useFavorites } from "@/hooks/use-favorites";

import { useLocale } from "./locale-provider";
import { StyleCard } from "./style-card";

function matchesQuery(style: AnimeStyle, query: string) {
  const haystack = [
    style.nameZh,
    style.nameEn,
    style.summary,
    ...style.tags,
    ...style.visualFeatures,
    ...style.promptKeywords,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function StylesBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");
  const [useCase, setUseCase] = useState("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const { favoriteSet } = useFavorites();
  const { dictionary, locale } = useLocale();

  const filteredStyles = styles.filter((style) => {
    if (category !== "all" && style.category !== category) return false;
    if (tag !== "all" && !style.tags.includes(tag)) return false;
    if (useCase !== "all" && !style.useCases.includes(useCase)) return false;
    if (savedOnly && !favoriteSet.has(style.slug)) return false;
    if (deferredQuery && !matchesQuery(style, deferredQuery)) return false;
    return true;
  });

  return (
    <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="panel sticky top-28 h-fit rounded-[28px] p-5">
        <div>
          <p className="eyebrow">{dictionary.styles.filtersEyebrow}</p>
          <h2 className="mt-3 font-display text-3xl text-white">
            {dictionary.styles.filtersTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {dictionary.styles.filtersIntro}
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">
              {dictionary.styles.search}
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dictionary.styles.searchPlaceholder}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40"
            />
          </label>
          <FilterSelect
            label={dictionary.styles.category}
            value={category}
            onChange={setCategory}
            options={[
              { value: "all", label: dictionary.styles.allCategories },
              ...categories.map((item) => ({
                value: item.id,
                label: locale === "zh" ? item.nameZh : item.nameEn,
              })),
            ]}
          />
          <FilterSelect
            label={dictionary.styles.tag}
            value={tag}
            onChange={setTag}
            options={[
              { value: "all", label: dictionary.styles.allTags },
              ...allTags.map((item) => ({ value: item, label: item })),
            ]}
          />
          <FilterSelect
            label={dictionary.styles.useCase}
            value={useCase}
            onChange={setUseCase}
            options={[
              { value: "all", label: dictionary.styles.allUseCases },
              ...allUseCases.map((item) => ({ value: item, label: item })),
            ]}
          />
          <button
            type="button"
            onClick={() => setSavedOnly((current) => !current)}
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
              savedOnly
                ? "border-amber-300/45 bg-amber-300/12 text-amber-100"
                : "border-white/10 bg-white/4 text-slate-200 hover:border-white/22 hover:bg-white/6"
            }`}
          >
            {dictionary.styles.savedOnly}
            <span>
              {savedOnly ? dictionary.styles.on : dictionary.styles.off}
            </span>
          </button>
        </div>
      </aside>
      <section>
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{dictionary.styles.results}</p>
            <h2 className="mt-2 font-display text-4xl text-white">
              {dictionary.styles.resultsTitle.replace(
                "{count}",
                String(filteredStyles.length),
              )}
            </h2>
          </div>
          <p className="max-w-xl text-right text-sm leading-6 text-slate-300">
            {dictionary.styles.resultsIntro}
          </p>
        </div>
        {filteredStyles.length ? (
          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {filteredStyles.map((style) => (
              <StyleCard key={style.slug} style={style} />
            ))}
          </div>
        ) : (
          <div className="panel rounded-[30px] p-10">
            <p className="eyebrow">{dictionary.styles.noMatchEyebrow}</p>
            <h3 className="mt-3 font-display text-3xl text-white">
              {dictionary.styles.noMatchTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              {dictionary.styles.noMatchBody}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
};

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40"
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
