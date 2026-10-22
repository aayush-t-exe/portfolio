"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { setupGlobal } from "@/motion/global";
import { setupPages } from "@/motion/pages";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin);

/**
 * Desktop motion, loaded lazily by MotionGate (≥768px, motion allowed). One Lenis instance
 * synced to GSAP's ticker, then every page's ScrollTriggers and pointer effects, set up inside
 * `useGSAP` + `gsap.matchMedia()` so they revert on unmount, on route change and when the media
 * conditions stop matching.
 */
export default function DesktopMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, autoRaf: false, anchors: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  useGSAP(
    () => {
      // Set up once the page has loaded and gone idle: layout has settled, so the many reads
      // ScrollTrigger and the setups make are cheap, and nothing competes with the first paint.
      // Until then the page is complete and static (the hero phone stays in place, etc.).
      let mm: gsap.MatchMedia | undefined;
      let cancelled = false;
      let handle = 0;
      const run = () => {
        if (cancelled) return;
        mm = gsap.matchMedia();
        mm.add(
          {
            isDesktop: "(min-width: 768px)",
            reduce: "(prefers-reduced-motion: reduce)",
            fine: "(hover: hover) and (pointer: fine)",
          },
          (ctx) => {
            const { isDesktop, reduce, fine } = ctx.conditions as Record<string, boolean>;
            if (reduce || !isDesktop) return;
            const cleanups = [setupGlobal({ fine }), setupPages({ fine, pathname })];
            return () => cleanups.forEach((c) => c?.());
          },
        );
        window.__lenis?.resize();
      };
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 120));
      const schedule = () => (handle = idle(run, { timeout: 1200 }));
      if (document.readyState === "complete") schedule();
      else window.addEventListener("load", schedule, { once: true });
      // Late font swaps change line breaks and heights: measure again.
      document.fonts?.ready.then(() => mm && ScrollTrigger.refresh());
      return () => {
        cancelled = true;
        (window.cancelIdleCallback ?? window.clearTimeout)(handle);
        window.removeEventListener("load", schedule);
        mm?.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
