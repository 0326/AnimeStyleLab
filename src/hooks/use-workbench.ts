"use client";

import { useEffect, useState } from "react";

import {
  readJson,
  WORKBENCH_KEY,
  type WorkbenchEntry,
  type WorkbenchSource,
  writeJson,
} from "@/lib/storage";

const WORKBENCH_EVENT = "anime-style-lab:workbench-changed";

function readEntries() {
  const rawEntries = readJson<
    Array<WorkbenchEntry | Omit<WorkbenchEntry, "source">>
  >(WORKBENCH_KEY, []);

  return rawEntries.map((entry) => ({
    ...entry,
    source: ("source" in entry ? entry.source : "builder") as WorkbenchSource,
  }));
}

export function useWorkbench() {
  const [entries, setEntries] = useState<WorkbenchEntry[]>([]);

  useEffect(() => {
    function syncEntries() {
      setEntries(readEntries());
    }

    syncEntries();
    window.addEventListener("storage", syncEntries);
    window.addEventListener(WORKBENCH_EVENT, syncEntries);

    return () => {
      window.removeEventListener("storage", syncEntries);
      window.removeEventListener(WORKBENCH_EVENT, syncEntries);
    };
  }, []);

  function saveEntry(entry: WorkbenchEntry) {
    const next = [entry, ...readEntries()].slice(0, 12);
    writeJson(WORKBENCH_KEY, next);
    setEntries(next);
    window.dispatchEvent(new Event(WORKBENCH_EVENT));
  }

  return { entries, saveEntry };
}
