import type { ReactNode } from "react";
import { stagger } from "@/lib/stagger";

export function CaseHeader({
  index,
  eyebrow,
  name,
  tagline,
  meta,
  actions,
  headingId,
}: {
  index: string;
  eyebrow: string;
  name: string;
  tagline: ReactNode;
  meta: Array<{ term: string; value: ReactNode }>;
  actions?: ReactNode;
  headingId: string;
}) {
  return (
    <header className="grid gap-10 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-3">
        <p data-reveal className="label">
          <span className="text-fg">Case {index}</span> · {eyebrow}
        </p>
      </div>
      <div className="md:col-span-9">
        <h3
          id={headingId}
          data-reveal
          style={stagger(1)}
          className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] font-medium tracking-[-0.05em]"
        >
          {name}
        </h3>
        <p
          data-reveal
          style={stagger(2)}
          className="serif-em mt-4 max-w-[26ch] text-[clamp(1.5rem,3vw,2.125rem)] leading-[1.15] text-muted"
        >
          {tagline}
        </p>
        <dl
          data-reveal
          style={stagger(3)}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4"
        >
          {meta.map((m) => (
            <div key={m.term}>
              <dt className="label">{m.term}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-snug">{m.value}</dd>
            </div>
          ))}
        </dl>
        {actions ? (
          <div data-reveal style={stagger(4)} className="mt-8 flex flex-wrap gap-3">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}

/** A numbered chapter of a case study: sticky mono label on the left, story on the right. */
export function Chapter({
  number,
  title,
  children,
  wide,
}: {
  number: string;
  title: string;
  children: ReactNode;
  /** Full-width content under the chapter (diagrams, galleries). */
  wide?: ReactNode;
}) {
  return (
    <div className="grid gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-8 md:pt-14">
      <div className="md:col-span-3">
        <h4 className="label md:sticky md:top-24">
          <span className="text-fg">{number}</span> · {title}
        </h4>
      </div>
      <div className="min-w-0 md:col-span-9">{children}</div>
      {wide ? <div className="min-w-0 md:col-span-12 md:mt-4">{wide}</div> : null}
    </div>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p
      data-reveal
      className="max-w-[40ch] text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.25] font-medium tracking-[-0.025em]"
    >
      {children}
    </p>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-reveal
      className={`mt-5 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-fg ${className}`}
    >
      {children}
    </div>
  );
}
