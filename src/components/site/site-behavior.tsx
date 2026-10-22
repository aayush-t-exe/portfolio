"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The site's always-on behaviour, on every device (the heavy motion is a separate desktop-only
 * chunk). Everything here enhances server-rendered HTML that already reads fine without it:
 * 1. Jaipur time in [data-clock], updated on the minute.
 * 2. Copy-email buttons ([data-copy-email]), delegated.
 * 3. The header's section label and nav `aria-current`, from the [data-section] crossing the
 *    middle of the screen. The desktop chunk scrambles the label when it's loaded.
 * 4. Count-ups for [data-count] stats as they enter (the final value is already in the HTML,
 *    and stays put under reduced motion or when the stat is already on screen).
 * 5. Links inside the mobile menu sheet close it.
 * 6. The case pages' sticky chapter bar turns cream over cream chapters.
 * It lives in the root layout and re-scans whenever the path changes.
 */
export function SiteBehavior() {
  const pathname = usePathname();

  // Decorative CSS loops start once the page has loaded and gone quiet (see .idle in globals.css).
  useEffect(() => {
    const root = document.documentElement;
    const go = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      ric(() => root.classList.add("idle"), { timeout: 1500 });
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // 1. Clock
    const clocks = document.querySelectorAll<HTMLElement>("[data-clock]");
    if (clocks.length) {
      const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
      let timer = 0;
      const tick = () => {
        const now = new Date();
        const t = fmt.format(now);
        clocks.forEach((c) => (c.textContent = t));
        timer = window.setTimeout(tick, 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 50);
      };
      tick();
      cleanups.push(() => clearTimeout(timer));
    }

    // 2 + 5. Delegated clicks
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const copy = t?.closest?.<HTMLElement>("[data-copy-email]");
      if (copy) {
        const email = copy.dataset.copyEmail!;
        const status = copy.nextElementSibling as HTMLElement | null;
        navigator.clipboard?.writeText(email).then(
          () => {
            copy.dataset.copied = "";
            if (status) status.textContent = "Email address copied";
            window.setTimeout(() => {
              delete copy.dataset.copied;
              if (status) status.textContent = "";
            }, 1800);
          },
          () => (location.href = `mailto:${email}`),
        );
        return;
      }
      if (t?.closest?.("[data-close-menu]")) document.getElementById("menu")?.hidePopover?.();
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    // Escape dismisses a stack tooltip (it shows on focus).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (document.activeElement as HTMLElement | null)?.matches?.(".orbit-pill")) {
        (document.activeElement as HTMLElement).blur();
      }
    };
    document.addEventListener("keydown", onKey);
    cleanups.push(() => document.removeEventListener("keydown", onKey));

    // While the mobile menu sheet is open, the page behind it is inert (Tab stays in the sheet).
    const menu = document.getElementById("menu");
    const behind = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>("footer"),
      document.querySelector<HTMLElement>(".site-header-v4 > div"),
    ];
    const onToggle = (e: Event) => {
      const open = (e as ToggleEvent).newState === "open";
      behind.forEach((el) => el && (el.inert = open));
    };
    menu?.addEventListener("toggle", onToggle);
    cleanups.push(() => {
      menu?.removeEventListener("toggle", onToggle);
      behind.forEach((el) => el && (el.inert = false));
    });

    // 3. Section label + nav aria-current
    const label = document.querySelector<HTMLElement>("[data-section-label]");
    const sections = [...document.querySelectorAll<HTMLElement>("[data-section]")];
    const navs = [...document.querySelectorAll<HTMLAnchorElement>("a[data-nav]")];
    if (label) {
      label.textContent = "";
      delete label.dataset.on;
    }
    if (sections.length) {
      const inBand = new Set<HTMLElement>();
      const spy = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) inBand.add(en.target as HTMLElement);
            else inBand.delete(en.target as HTMLElement);
          }
          const current = sections.findLast((s) => inBand.has(s));
          const text = current?.dataset.section ?? "";
          if (label && label.dataset.text !== text) {
            label.dataset.text = text;
            if (text) label.dataset.on = "";
            else delete label.dataset.on;
            // The desktop chunk listens and scrambles; otherwise set the text directly.
            if (!root.classList.contains("has-scramble")) label.textContent = text;
            window.dispatchEvent(new CustomEvent("section-label", { detail: text }));
          }
          for (const a of navs) {
            if (current && a.dataset.nav === current.id) a.setAttribute("aria-current", "location");
            else a.removeAttribute("aria-current");
          }
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      sections.forEach((s) => spy.observe(s));
      cleanups.push(() => {
        spy.disconnect();
        navs.forEach((a) => a.removeAttribute("aria-current"));
      });
    }

    // 6. Case pages: the sticky chapter bar takes the cream tone while a cream chapter is under it.
    const toc = document.querySelector<HTMLElement>(".case-toc");
    const papers = [...document.querySelectorAll<HTMLElement>(".chapter.on-paper")];
    if (toc && papers.length) {
      let tone: IntersectionObserver | undefined;
      const watch = () => {
        tone?.disconnect();
        delete toc.dataset.tone;
        const cs = getComputedStyle(toc);
        if (cs.position !== "sticky") return;
        // A 1px band across the bar's middle.
        const line = Math.round(parseFloat(cs.top) + toc.offsetHeight / 2);
        const under = new Set<Element>();
        tone = new IntersectionObserver(
          (entries) => {
            for (const en of entries) {
              if (en.isIntersecting) under.add(en.target);
              else under.delete(en.target);
            }
            if (under.size) toc.dataset.tone = "paper";
            else delete toc.dataset.tone;
          },
          { rootMargin: `${-line}px 0px ${line + 1 - innerHeight}px 0px` },
        );
        papers.forEach((el) => tone!.observe(el));
      };
      watch();
      window.addEventListener("resize", watch);
      cleanups.push(() => {
        tone?.disconnect();
        window.removeEventListener("resize", watch);
        delete toc.dataset.tone;
      });
    }

    // 4. Count-ups
    if (!reduce) {
      const counters = [...document.querySelectorAll<HTMLElement>("[data-count]")];
      const vh = innerHeight;
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            io.unobserve(en.target);
            countUp(en.target as HTMLElement);
          }
        },
        { threshold: 0.6 },
      );
      for (const el of counters) {
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) continue; // already on screen: leave the real value alone
        el.dataset.final = el.textContent ?? "";
        el.textContent = format(el, 0);
        io.observe(el);
      }
      cleanups.push(() => {
        io.disconnect();
        counters.forEach((el) => {
          if (el.dataset.final != null) el.textContent = el.dataset.final;
        });
      });
    }

    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}

/** "₹33K+" with data-count="33" → prefix "₹", suffix "K+". */
function format(el: HTMLElement, v: number) {
  const final = el.dataset.final ?? el.textContent ?? "";
  const target = el.dataset.count!;
  const i = final.indexOf(target);
  const pre = i >= 0 ? final.slice(0, i) : "";
  const post = i >= 0 ? final.slice(i + target.length) : "";
  return `${pre}${Math.round(v)}${post}`;
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const dur = 1400;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = p < 1 ? format(el, target * eased) : el.dataset.final!;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
