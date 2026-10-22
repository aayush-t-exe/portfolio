import { setupHeroPointer, setupJourney, setupStack, setupWorkPreview } from "@/motion/home";

type Opts = { fine: boolean; pathname: string };
type Cleanup = () => void;

/** Page-specific motion: each setup looks for its own section and does nothing without it. */
export function setupPages({ fine, pathname }: Opts): Cleanup {
  const cleanups: Array<Cleanup | void> = [];
  if (pathname === "/") {
    cleanups.push(setupJourney(), setupStack());
    if (fine) cleanups.push(setupHeroPointer(), setupWorkPreview());
  }
  return () => cleanups.forEach((c) => c?.());
}
