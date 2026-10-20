import type { CSSProperties } from "react";
import type { Schematic as Kind } from "@/lib/image-slots";

/**
 * Stand-ins for screenshots that haven't been added yet: line-drawn schematics of each
 * screen in the site's palette, pre-rendered to tiny WebPs in public/schematics.
 *
 * They're CSS backgrounds rather than <img> on purpose: a background only loads once its
 * element is actually styled, so art inside a content-visibility-skipped section (or for
 * the inactive theme) is never fetched during page load.
 */
export function Schematic({ kind }: { kind: Kind }) {
  return (
    <div
      aria-hidden
      className="schematic absolute inset-0"
      style={
        {
          "--schematic-light": `url(/schematics/${kind}-light.webp)`,
          "--schematic-dark": `url(/schematics/${kind}-dark.webp)`,
        } as CSSProperties
      }
    />
  );
}
