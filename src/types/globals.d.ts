import type Lenis from "lenis";

declare global {
  interface Window {
    /** Set by the desktop motion chunk while it's mounted. */
    __lenis?: Lenis;
  }
}

export {};
