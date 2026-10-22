import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * Server-split words that rise out of a mask on first paint (CSS: .rise / .mask-word).
 * `marks` wraps chosen words (by index) in a highlight. Screen readers get the plain text.
 */
export function RiseText({
  text,
  marks = [],
  markClass = "text-red-text",
  start = 0,
}: {
  text: string;
  marks?: number[];
  markClass?: string;
  /** Index offset, to continue a stagger across elements. */
  start?: number;
}): ReactNode {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="rise">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="mask-word" style={{ "--i": i + start } as CSSProperties}>
              <span className={marks.includes(i) ? markClass : undefined}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </>
  );
}
