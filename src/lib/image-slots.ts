import fs from "node:fs";
import path from "node:path";

/**
 * Images Aayush still needs to provide. Drop a file at `public/images/<slot>.(png|jpg|webp|avif)`
 * and it replaces the schematic placeholder on the next build. No code changes needed.
 */
export const imageSlots = {
  "zenz/app-home": {
    label: "Zen-Z app: home / plans",
    size: "1080 × 2284 px (portrait phone screenshot)",
    schematic: "feed",
  },
  "zenz/app-booking": {
    label: "Zen-Z app: booking flow",
    size: "1080 × 2284 px (portrait phone screenshot)",
    schematic: "booking",
  },
  "zenz/app-chat": {
    label: "Zen-Z app: group chat",
    size: "1080 × 2284 px (portrait phone screenshot)",
    schematic: "chat",
  },
  "zenz/admin-board": {
    label: "Zen-Z admin: matching board",
    size: "2400 × 1500 px (16:10 desktop screenshot)",
    schematic: "board",
  },
  "about/portrait": {
    label: "Portrait of Aayush",
    size: "1200 × 1500 px (4:5, face in upper third)",
    schematic: "portrait",
  },
} as const;

export type ImageSlot = keyof typeof imageSlots;
export type Schematic = (typeof imageSlots)[ImageSlot]["schematic"];

const EXTENSIONS = [".avif", ".webp", ".png", ".jpg", ".jpeg"];

/** True if any of these slots still renders a schematic. */
export function hasMissing(...slots: ImageSlot[]) {
  return slots.some((s) => resolveSlot(s) === null);
}

/** Resolved at build time (the page is statically prerendered). */
export function resolveSlot(slot: ImageSlot): string | null {
  for (const ext of EXTENSIONS) {
    const rel = `/images/${slot}${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
