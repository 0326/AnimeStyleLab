"use client";

import { useEffect, useState } from "react";

export const APP_TOAST_EVENT = "app-toast";

type ToastPayload = {
  message: string;
};

export function showAppToast(message: string) {
  window.dispatchEvent(
    new CustomEvent(APP_TOAST_EVENT, {
      detail: { message },
    }),
  );
}

export function AppToastHost() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timerId = 0;

    function handleToast(event: Event) {
      const customEvent = event as CustomEvent<ToastPayload>;
      setMessage(customEvent.detail.message);
      setVisible(true);
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => setVisible(false), 1800);
    }

    window.addEventListener(APP_TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(APP_TOAST_EVENT, handleToast);
      window.clearTimeout(timerId);
    };
  }, []);

  if (!visible || !message) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div className="border border-[var(--accent)] bg-[var(--surface-ink)] px-4 py-2 text-sm text-[oklch(91%_0.05_187)] shadow-[0_18px_40px_oklch(5%_0.01_220/0.32)]">
        {message}
      </div>
    </div>
  );
}
