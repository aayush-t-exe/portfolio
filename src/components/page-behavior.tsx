"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";

/**
 * The page's only client island (renders nothing). Everything visual lives in CSS; this
 * component flips attributes, delegates a few clicks and runs one WAAPI sequence:
 *
 * 1. Reveal: `[data-reveal]` gets `data-shown` the first time it enters the viewport.
 *    Setting `data-reveal-ready` tells the pre-paint failsafe in layout.tsx that we're alive.
 * 2. Anchor jumps: sections use `content-visibility: auto`, so a native jump lands
 *    off-target. For same-page anchor clicks we render everything (`html.cv-off`), mark
 *    content above the target as already shown, then scroll ourselves.
 * 3. The payment loop: a dot travels "create order →" and back "← signed webhook" along
 *    `[data-pulse]` tracks, twice, when the diagram first comes into view.
 * 4. Phone rails: mouse users can drag them; the edge fade goes once the end is reached.
 *    Layout is only read inside scroll/pointer events, never at mount (no forced reflow).
 * 5. Scroll-spy: the nav link for the section crossing the reading band gets aria-current.
 * 6. Delegated clicks: the theme toggle ([data-theme-toggle], light → dark → system) and
 *    copy-email buttons ([data-copy-email]). Both are server-rendered; only this hydrates.
 *
 * It lives in the root layout (which persists across client navigations), so it re-scans
 * whenever the path changes.
 */
export function PageBehavior() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-reveal-ready", "");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A saved theme overrides the OS; keep the browser chrome colour in step with it.
    const saved = root.dataset.theme as keyof typeof THEME_COLOR | undefined;
    if (saved) document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLOR[saved]));

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

    // Scroll-spy over the nav's sections. Sections don't overlap, so at most one is in the
    // thin band; when none is (hero, proof strip), nothing is current.
    const spyLinks = [...document.querySelectorAll<HTMLAnchorElement>("a[data-spy]")];
    const inBand = new Set<string>();
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        for (const a of spyLinks) {
          if (inBand.has(a.dataset.spy!)) a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    spyLinks.forEach((a) => {
      const section = document.getElementById(a.dataset.spy!);
      if (section) spy.observe(section);
    });

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const toggle = target?.closest?.("[data-theme-toggle]");
      if (toggle) return cycleTheme(reduce);
      const copy = target?.closest?.<HTMLElement>("[data-copy-email]");
      if (copy) return void copyEmail(copy);

      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = target?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.origin !== location.origin || link.pathname !== location.pathname || !link.hash) return;
      const section = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!section) return;

      e.preventDefault();
      root.classList.add("cv-off");
      showAbove(section);
      requestAnimationFrame(() => {
        section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        if (location.hash !== link.hash) history.pushState(null, "", link.hash);
        // Match native anchor behaviour: the next Tab continues from the section.
        if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
        section.focus({ preventScroll: true });
      });
    };
    document.addEventListener("click", onClick);
    const cleanRails = [...document.querySelectorAll<HTMLElement>(".rail")].map(dragToScroll);

    return () => {
      reveal.disconnect();
      pulse.disconnect();
      spy.disconnect();
      document.removeEventListener("click", onClick);
      cleanRails.forEach((clean) => clean());
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

/** Mouse drag-to-scroll for a horizontal rail (touch and trackpads scroll natively). */
function dragToScroll(rail: HTMLElement) {
  let startX = 0;
  let startLeft = 0;
  let dragging = false;

  const onScroll = () => {
    rail.toggleAttribute("data-end", rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8);
  };
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    dragging = true;
    startX = e.clientX;
    startLeft = rail.scrollLeft;
    rail.style.scrollSnapType = "none";
    rail.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (dragging) rail.scrollLeft = startLeft - (e.clientX - startX);
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    rail.style.scrollSnapType = "";
  };

  rail.addEventListener("scroll", onScroll, { passive: true });
  rail.addEventListener("pointerdown", onDown);
  rail.addEventListener("pointermove", onMove);
  rail.addEventListener("pointerup", onUp);
  rail.addEventListener("pointercancel", onUp);
  return () => {
    rail.removeEventListener("scroll", onScroll);
    rail.removeEventListener("pointerdown", onDown);
    rail.removeEventListener("pointermove", onMove);
    rail.removeEventListener("pointerup", onUp);
    rail.removeEventListener("pointercancel", onUp);
  };
}

type ThemePref = "light" | "dark" | "system";
const THEME_COLOR = { light: "#f4f2ed", dark: "#0e0e0c" } as const;

/** light → dark → system → light. "system" clears the override and follows the OS. */
function cycleTheme(reduce: boolean) {
  const root = document.documentElement;
  const current = (root.dataset.themePref as ThemePref | undefined) ?? "system";
  const next: ThemePref = current === "light" ? "dark" : current === "dark" ? "system" : "light";
  const apply = () => {
    root.dataset.themePref = next;
    if (next === "system") delete root.dataset.theme;
    else root.dataset.theme = next;
    // Keep the mobile browser chrome in step with what's on screen.
    const resolved = next === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : next;
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute("content", next === "system" ? (m.media.includes("dark") ? THEME_COLOR.dark : THEME_COLOR.light) : THEME_COLOR[resolved]));
    try {
      if (next === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {}
  };
  if (!reduce && "startViewTransition" in document) document.startViewTransition(apply);
  else apply();
}

const copyTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

async function copyEmail(button: HTMLElement) {
  const email = button.dataset.copyEmail!;
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    // Clipboard can be blocked (insecure context, permissions). Fall back to mailto.
    window.location.href = `mailto:${email}`;
    return;
  }
  const status = button.nextElementSibling;
  button.setAttribute("data-copied", "");
  if (status) status.textContent = "Email address copied to clipboard";
  clearTimeout(copyTimers.get(button));
  copyTimers.set(
    button,
    setTimeout(() => {
      button.removeAttribute("data-copied");
      if (status) status.textContent = "";
    }, 1800),
  );
}
