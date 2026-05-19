"use client";

import { useState } from "react";

type PromptModelTab<TTabId extends string> = {
  id: TTabId;
  label: string;
};

type PromptModelTabsProps<TTabId extends string> = {
  tabs: Array<PromptModelTab<TTabId>>;
  defaultTabId?: TTabId;
  renderHeader?: (
    activeTabId: TTabId,
    tabList: React.ReactNode,
  ) => React.ReactNode;
  renderPanel: (activeTabId: TTabId) => React.ReactNode;
};

export function PromptModelTabs<TTabId extends string>({
  tabs,
  defaultTabId,
  renderHeader,
  renderPanel,
}: PromptModelTabsProps<TTabId>) {
  const [activeTabId, setActiveTabId] = useState<TTabId>(
    defaultTabId ?? tabs[0].id,
  );

  const tabList = (
    <div
      role="tablist"
      aria-label="Prompt model tabs"
      className="inline-flex items-end gap-5 border-b border-[var(--line)]"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTabId(tab.id)}
            className={`relative -mb-px border-b px-0 pb-3 text-sm font-medium transition ${
              isActive
                ? "border-[var(--accent)] text-white"
                : "border-transparent text-[oklch(72%_0.026_226)] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div>
      {renderHeader ? renderHeader(activeTabId, tabList) : tabList}
      <div className="mt-4">{renderPanel(activeTabId)}</div>
    </div>
  );
}
