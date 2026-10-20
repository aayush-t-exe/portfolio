"use client";

import { useEffect } from "react";

/**
 * Sections below the fold use `content-visibility: auto` with estimated sizes, so a native
 * jump to an in-page anchor lands off-target: the browser fixes the destination before the
 * estimates are replaced by real heights. For same-page anchor clicks we switch skipping off
 * for good (`html.cv-off`), wait a frame for real layout, then scroll ourselves. Direct
 * visits with a hash are handled by the pre-paint script in layout.tsx. Renders nothing.
 */
export function AnchorFix() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.origin !== location.origin || link.pathname !== location.pathname || !link.hash) return;
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;

      e.preventDefault();
      document.documentElement.classList.add("cv-off");
      requestAnimationFrame(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        if (location.hash !== link.hash) history.pushState(null, "", link.hash);
        // Match native anchor behaviour: the next Tab continues from the section.
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
