import type { CSSProperties } from "react";
import type { StackIcon } from "@/components/stack-icons";

/** A Simple Icons glyph, drawn as a CSS mask in the current text colour. */
export function Glyph({ icon, className = "", style }: { icon: StackIcon; className?: string; style?: CSSProperties }) {
  return <span aria-hidden className={`glyph ${className}`} style={{ ...style, "--glyph": `url(/stack-icons/${icon}.svg)` } as CSSProperties} />;
}
