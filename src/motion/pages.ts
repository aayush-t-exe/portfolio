import { setupHeroPointer, setupJourney } from "@/motion/home";

type Opts = { fine: boolean; pathname: string };
type Cleanup = () => void;

/** Page-specific motion: each setup looks for its own section and does nothing without it. */
export function setupPages({ fine, pathname }: Opts): Cleanup {
  const cleanups: Array<Cleanup | void> = [];
  if (pathname === "/") {
    cleanups.push(setupJourney());
    if (fine) cleanups.push(setupHeroPointer());
  }
  return () => cleanups.forEach((c) => c?.());
}
