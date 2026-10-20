import type { CSSProperties } from "react";

/** Stagger index for `[data-reveal]` / `.enter` (each step adds ~70–80ms of delay). */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
