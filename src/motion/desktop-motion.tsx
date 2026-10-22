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
if (process.env.NODE_ENV !== "production") Object.assign(window, { __ST: ScrollTrigger });

/**
 * Desktop motion, loaded lazily by MotionGate (≥768px, motion allowed). One Lenis instance
 * synced to GSAP's ticker, then every page's ScrollTriggers and pointer effects, set up inside
 * `useGSAP` + `gsap.matchMedia()` so they revert on unmount, on route change and when the media
 * conditions stop matching.
 */
export default function DesktopMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, autoRaf: false, anchors: { offset: -88 } });
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
      const mm = gsap.matchMedia();
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
      // Fonts and late images change layout: measure again once they settle.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh, { once: true });
      window.__lenis?.resize();
      return () => {
        mm.revert();
        window.removeEventListener("load", refresh);
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
