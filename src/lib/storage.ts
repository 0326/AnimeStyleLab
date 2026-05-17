export const FAVORITES_KEY = "anime-style-lab:favorites";
export const WORKBENCH_KEY = "anime-style-lab:workbench";

export type WorkbenchEntry = {
  id: string;
  label: string;
  prompt: string;
  model: "gpt-image" | "nano-banana";
  createdAt: string;
};

function safeWindow() {
  return typeof window !== "undefined" ? window : null;
}

export function readJson<T>(key: string, fallback: T) {
  const currentWindow = safeWindow();
  if (!currentWindow) return fallback;

  try {
    const raw = currentWindow.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  const currentWindow = safeWindow();
  if (!currentWindow) return;
  currentWindow.localStorage.setItem(key, JSON.stringify(value));
}
