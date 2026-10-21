import type { CSSProperties } from "react";

/** Stagger index for `[data-reveal]` (40ms per step, capped at 3 steps). */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
