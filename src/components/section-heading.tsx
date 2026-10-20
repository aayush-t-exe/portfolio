import type { ReactNode } from "react";
import { stagger } from "@/lib/stagger";

/**
 * The editorial section opener: a mono index label, then the H2.
 * `id` belongs on the parent <section>; this only renders the heading block.
 */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  headingId,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  headingId: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <p data-reveal className="label flex items-center gap-3 self-start md:col-span-3 md:pt-4">
        <span className="text-fg">{index}</span>
        <span aria-hidden className="h-px w-6 bg-line-strong" />
        {label}
      </p>
      <div className="md:col-span-9">
        <h2
          id={headingId}
          data-reveal
          style={stagger(1)}
          className="max-w-[18ch] text-[clamp(2.125rem,5vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.035em]"
        >
          {title}
        </h2>
        {intro ? (
          <p
            data-reveal
            style={stagger(2)}
            className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted"
          >
            {intro}
          </p>
        ) : null}
      </div>
    </div>
  );
}
