import { Fragment, type ReactNode } from "react";

/**
 * Keeps "Zen-Z" from breaking at its hyphen on narrow screens. (No bundled font has a
 * non-breaking hyphen glyph, and a word joiner would pollute copy/paste and search.)
 */
export function nb(text: string): ReactNode {
  const parts = text.split("Zen-Z");
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 ? <span className="whitespace-nowrap">Zen-Z</span> : null}
      {part}
    </Fragment>
  ));
}
