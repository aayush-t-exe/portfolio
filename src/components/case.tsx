import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { RiseText } from "@/components/ui/rise-text";

export type TocItem = { id: string; label: string };

/** The view-timeline name for a chapter; the TOC's progress lines read the same names. */
const timeline = (id: string) => `--ch-${id}`;

/**
 * A case page. `timeline-scope` lets the sticky TOC (outside the chapters) read each chapter's
 * scroll progress, so its underlines fill in pure CSS.
 */
export function CasePage({ toc, children }: { toc: TocItem[]; children: ReactNode }) {
  return (
    <div className="case-page" style={{ timelineScope: toc.map((t) => timeline(t.id)).join(", ") } as CSSProperties}>
      {children}
    </div>
  );
}

/** Case hero: the name as giant display type rising on first paint, the one-line pitch, facts, actions, then the lead media. */
export function CaseHero({
  label,
  name,
  tagline,
  meta,
  actions,
  media,
  tldr,
}: {
  label: string;
  name: string;
  tagline: string;
  meta: Array<{ term: string; value: ReactNode }>;
  actions?: ReactNode;
  media: ReactNode;
  /** Problem / Built / Result, for skimmers. */
  tldr: Array<{ term: string; value: ReactNode }>;
}) {
  return (
    <header className="relative isolate overflow-clip pt-24 md:pt-28" data-section="Case study">
      <div aria-hidden className="pointer-events-none absolute -top-[20%] right-[-10%] -z-10 size-[60vw] rounded-full bg-[radial-gradient(closest-side,rgb(225_6_0/0.22),transparent)]" />
      <div className="container-page">
        <Link
          href="/#work"
          className="press -ml-2 inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm text-muted hover:text-fg"
        >
          <ArrowLeft size={15} />
          All work
        </Link>
        <p className="label mt-8 md:mt-10">{label}</p>
        <h1
          className="display-caps mt-4 leading-[0.84]"
          // Sized by length so the name always fits: ~0.76em per character at this width.
          style={{ fontSize: `min(13rem, calc((100vw - 2 * var(--gutter)) / ${Math.max(5, name.length * 0.76 + 0.3).toFixed(2)}))` }}
        >
          <RiseText text={name} />
        </h1>
        <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-12 lg:items-end">
          <p className="rise-fade max-w-[30ch] text-[clamp(1.4rem,2.5vw,2.1rem)] leading-[1.2] tracking-[-0.02em] lg:col-span-7" style={{ "--d": "200ms" } as CSSProperties}>
            {tagline}
          </p>
          {actions ? (
            <div className="rise-fade flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" style={{ "--d": "280ms" } as CSSProperties}>
              {actions}
            </div>
          ) : null}
        </div>
        <dl className="rise-fade mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 md:grid-cols-4" style={{ "--d": "340ms" } as CSSProperties}>
          {meta.map((m) => (
            <div key={m.term}>
              <dt className="label">{m.term}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-snug">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="rise-fade mt-10 md:mt-14" style={{ "--d": "400ms" } as CSSProperties}>
          {media}
        </div>
        <dl className="mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-6">
          {tldr.map((t) => (
            <div key={t.term} className="border-t-2 border-red pt-4" data-fade>
              <dt className="label text-red-text">{t.term}</dt>
              <dd className="mt-3 text-[1.1875rem] leading-snug">{t.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

/** Sticky chapter nav. Each item's underline fills as its chapter scrolls past (CSS only). */
export function CaseToc({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="On this page" className="case-toc z-40 mt-16 md:sticky md:top-[4.5rem] md:mt-24">
      <div className="container-page">
        <ol className="scroller nav-pill flex w-max max-w-full gap-1 overflow-x-auto rounded-full p-1">
          {items.map((t, i) => (
            <li key={t.id} className="shrink-0">
              <a href={`#${t.id}`} className="relative flex h-9 items-center gap-2 overflow-hidden rounded-full px-3.5 text-sm whitespace-nowrap text-muted transition-colors hover:text-fg">
                <span className="font-mono text-xs text-red-text tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {t.label}
                <span aria-hidden className="absolute inset-x-3 bottom-1 h-px">
                  <span className="toc-fill absolute inset-0 origin-left" style={{ animationTimeline: timeline(t.id) } as CSSProperties} />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

/** A chapter: full-bleed band (ink or cream), numbered label, big heading, lead, then content. */
export function Chapter({
  id,
  n,
  label,
  title,
  lead,
  tone = "ink",
  children,
  bleed,
}: {
  id: string;
  n: number;
  label: string;
  title: string;
  lead?: ReactNode;
  tone?: "ink" | "paper";
  children?: ReactNode;
  /** Full-bleed content after the text column (rails). */
  bleed?: ReactNode;
}) {
  const paper = tone === "paper";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`chapter relative scroll-mt-28 py-20 md:py-32 ${paper ? "on-paper" : ""}`}
      style={{ viewTimelineName: timeline(id) } as CSSProperties}
      data-section={`${String(n).padStart(2, "0")} — ${label}`}
    >
      <div className="container-page">
        <p className="label">
          <span className={paper ? "text-red-deep" : "text-red-text"}>{String(n).padStart(2, "0")}</span> — {label}
        </p>
        <h2 id={`${id}-title`} className="h2 mt-5 max-w-[20ch]" data-split>
          {title}
        </h2>
        {lead ? (
          <p className={`mt-6 max-w-[46ch] text-[clamp(1.2rem,1.9vw,1.6rem)] leading-[1.3] tracking-[-0.015em] ${paper ? "text-paper-ink" : "text-fg"}`}>{lead}</p>
        ) : null}
        {children}
      </div>
      {bleed}
    </section>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mt-6 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted [.on-paper_&]:text-paper-muted [&_strong]:font-medium [&_strong]:text-fg [.on-paper_&_strong]:text-paper-ink ${className}`}>
      {children}
    </div>
  );
}

/** End of a case page: where to go next, as big rows. */
export function NextLinks({ links }: { links: Array<{ href: string; label: string; note: string }> }) {
  return (
    <nav aria-label="More" className="container-page py-20 md:py-28">
      <p className="label">Keep going</p>
      <ul className="mt-6 border-t border-line">
        {links.map((l) => (
          <li key={l.href} className="border-b border-line">
            <Link href={l.href} className="group flex items-center justify-between gap-6 py-7 md:py-9" data-cursor="Open">
              <span>
                <span className="label block">{l.note}</span>
                <span className="display mt-2 block text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-[-0.04em] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3">
                  {l.label}
                </span>
              </span>
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-red group-hover:bg-red md:size-20">
                <ArrowRight size={22} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * A horizontal rail (Masab-style). Desktop with motion: pinned, and vertical scroll moves it
 * sideways. Otherwise: a native scroll-snap row.
 */
export function Rail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div data-rail className="rail relative mt-12 overflow-x-clip md:mt-16">
      <ol data-rail-track aria-label={label} tabIndex={0} className="scroller flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 md:gap-8">
        {children}
      </ol>
    </div>
  );
}
