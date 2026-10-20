"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One observer for the whole page: any element with `data-reveal` gets `data-shown`
 * the first time it scrolls into view. Styling lives in globals.css. Stagger with
 * `style={stagger(n)}`. Renders nothing.
 *
 * It lives in the root layout, which persists across client navigations, so it re-scans
 * whenever the path changes. Setting `data-reveal-ready` tells the pre-paint failsafe in
 * layout.tsx that the bundle loaded (otherwise hidden content is un-hidden after a few seconds).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute("data-reveal-ready", "");
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
