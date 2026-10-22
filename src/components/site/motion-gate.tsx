"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

/**
 * Loads the desktop motion chunk (GSAP, ScrollTrigger, SplitText, Lenis) only on wide screens
 * with motion allowed. Phones and reduced-motion users never download it; the page is complete
 * without it.
 */
const DesktopMotion = dynamic(() => import("@/motion/desktop-motion"), { ssr: false });

const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const mq = matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function MotionGate() {
  const on = useSyncExternalStore(subscribe, () => matchMedia(QUERY).matches, () => false);
  return on ? <DesktopMotion /> : null;
}
