"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";

/**
 * The page's only motion island (renders nothing). Everything visual lives in CSS; this
 * component just flips attributes and runs one WAAPI sequence:
 *
 * 1. Reveal: `[data-reveal]` gets `data-shown` the first time it enters the viewport.
 *    Setting `data-reveal-ready` tells the pre-paint failsafe in layout.tsx that we're alive.
 * 2. Anchor jumps: sections use `content-visibility: auto`, so a native jump lands
 *    off-target. For same-page anchor clicks we render everything (`html.cv-off`), mark
 *    content above the target as already shown, then scroll ourselves.
 * 3. The payment loop: a dot travels "create order →" and back "← signed webhook" along
 *    `[data-pulse]` tracks, twice, when the diagram first comes into view.
 *
 * It lives in the root layout (which persists across client navigations), so it re-scans
 * whenever the path changes.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-reveal-ready", "");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Arriving on a hash: everything above the target is already "seen".
    if (location.hash) showAbove(document.getElementById(decodeURIComponent(location.hash.slice(1))));

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => reveal.observe(el));

    const pulse = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          pulse.unobserve(entry.target);
          if (!reduce) runPulse(entry.target as HTMLElement);
        }
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-pulse]").forEach((el) => pulse.observe(el));

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.origin !== location.origin || link.pathname !== location.pathname || !link.hash) return;
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;

      e.preventDefault();
      root.classList.add("cv-off");
      showAbove(target);
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        if (location.hash !== link.hash) history.pushState(null, "", link.hash);
        // Match native anchor behaviour: the next Tab continues from the section.
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      reveal.disconnect();
      pulse.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return null;
}

/** Reveal targets that sit before `target` in the document render as already shown. */
function showAbove(target: Element | null) {
  if (!target) return;
  document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => {
    if (el.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING && !el.contains(target)) {
      el.setAttribute("data-shown", "");
    }
  });
}

/** Out along the track (900ms), hold (300ms), back (900ms); twice, then stop. */
function runPulse(track: HTMLElement) {
  const dot = track.firstElementChild as HTMLElement | null;
  if (!dot) return;
  const horizontal = track.offsetWidth >= track.offsetHeight;
  const distance = (horizontal ? track.offsetWidth : track.offsetHeight) - dot.offsetWidth;
  const at = (d: number) => (horizontal ? `translateX(${d}px)` : `translateY(${d}px)`);
  dot.animate(
    [
      { transform: at(0), opacity: 0, offset: 0, easing: EASE_IN_OUT },
      { transform: at(0), opacity: 1, offset: 0.04, easing: EASE_IN_OUT },
      { transform: at(distance), opacity: 1, offset: 0.43 },
      { transform: at(distance), opacity: 1, offset: 0.57, easing: EASE_IN_OUT },
      { transform: at(0), opacity: 1, offset: 0.96 },
      { transform: at(0), opacity: 0, offset: 1 },
    ],
    { duration: 2100, iterations: 2, delay: 300 },
  );
}
