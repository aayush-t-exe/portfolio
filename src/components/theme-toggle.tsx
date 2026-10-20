"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

const THEME_COLOR: Record<Theme, string> = { light: "#f4f2ed", dark: "#0e0e0c" };

/** Keep the mobile browser chrome in sync with a manually chosen theme. */
function syncThemeColor(theme: Theme) {
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute("content", THEME_COLOR[theme]));
}

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Icons are swapped purely in CSS (see .theme-icon rules), so the server render is
 * correct for every visitor and there is no hydration flash.
 */
export function ThemeToggle() {
  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    if (saved === "light" || saved === "dark") syncThemeColor(saved);
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      syncThemeColor(next);
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "startViewTransition" in document) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title="Toggle theme"
      className="theme-toggle press grid size-9 place-items-center rounded-full text-muted hover:text-fg"
    >
      {/* The label names the action and swaps with the icons (pure CSS, like them). */}
      <span className="theme-icon-moon sr-only">Switch to dark theme</span>
      <span className="theme-icon-sun sr-only">Switch to light theme</span>
      <svg
        className="theme-icon-moon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7Z" />
      </svg>
      <svg
        className="theme-icon-sun"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
    </button>
  );
}
