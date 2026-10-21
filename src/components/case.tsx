import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@/components/icons";

export type TocItem = { id: string; label: string };

/** The view-timeline name for a chapter; the TOC's progress lines read the same names. */
const timeline = (id: string) => `--ch-${id}`;

/**
 * A case page: header, lead media, sticky table of contents, chapters, next link.
 * `timeline-scope` on the wrapper lets the TOC (outside the chapters) read each chapter's
 * view timeline, so the progress lines are pure CSS.
 */
export function CasePage({ toc, children }: { toc: TocItem[]; children: ReactNode }) {
  return (
    <div className="case-page" style={{ timelineScope: toc.map((t) => timeline(t.id)).join(", ") } as CSSProperties}>
      {children}
    </div>
  );
}

export function CaseHeader({
  eyebrow,
  name,
  tagline,
  tldr,
  meta,
  actions,
  media,
}: {
  eyebrow: string;
  name: string;
  tagline: ReactNode;
  /** Problem / Built / Result, for skimmers. */
  tldr: Array<{ term: string; value: ReactNode }>;
  meta: Array<{ term: string; value: ReactNode }>;
  actions?: ReactNode;
  /** The lead image: the same component as the home page's work card (it morphs). */
  media: ReactNode;
}) {
  return (
    <header className="container-page pt-8 md:pt-12">
      <Link
        href="/#work"
        className="press -ml-2 inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft size={15} />
        All work
      </Link>
      <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="text-sm text-muted">{eyebrow}</p>
          <h1 className="mt-3 text-[clamp(3rem,8vw,5.75rem)] leading-[0.92] font-semibold tracking-[-0.05em]">{name}</h1>
          <p className="mt-5 max-w-[30ch] text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.2] font-medium tracking-[-0.025em] text-muted">
            {tagline}
          </p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        <div className="lg:col-span-5 lg:pt-2">
          <dl className="space-y-3 text-[0.9375rem] leading-relaxed">
            {tldr.map((t) => (
              <div key={t.term} className="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt className="font-medium">{t.term}</dt>
                <dd className="text-muted">{t.value}</dd>
              </div>
            ))}
          </dl>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
            {meta.map((m) => (
              <div key={m.term}>
                <dt className="text-sm text-muted">{m.term}</dt>
                <dd className="mt-0.5 text-[0.9375rem] leading-snug">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="mt-10 md:mt-14">{media}</div>
    </header>
  );
}

/**
 * Table of contents: a static row on mobile, sticky under the site header from md. Each item's
 * underline fills as its chapter scrolls past (scroll-driven, CSS only; hidden where unsupported
 * or with reduced motion). Numbered, because order matters here.
 */
export function CaseToc({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="On this page" className="case-toc mt-12 border-y border-line md:sticky md:top-16 md:z-40 md:mt-16">
      <ol className="toc-scroll container-page flex gap-6 overflow-x-auto md:gap-8">
        {items.map((t, i) => (
          <li key={t.id} className="shrink-0">
            <a
              href={`#${t.id}`}
              className="relative flex h-11 items-center gap-2 text-sm whitespace-nowrap text-muted transition-colors hover:text-fg"
            >
              <span className="font-mono text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {t.label}
              <span aria-hidden className="absolute inset-x-0 -bottom-px h-px">
                <span className="toc-fill absolute inset-0 origin-left" style={{ animationTimeline: timeline(t.id) } as CSSProperties} />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** A chapter of a case study: its title on the left, the story on the right, then wide content. */
export function Chapter({
  id,
  title,
  children,
  wide,
}: {
  id: string;
  title: string;
  children: ReactNode;
  /** Full-width content under the chapter (diagrams, galleries). */
  wide?: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="chapter grid gap-6 border-t border-line pt-10 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8 md:pt-14 md:first:pt-0"
      style={{ viewTimelineName: timeline(id) } as CSSProperties}
    >
      <div className="md:col-span-3">
        <h2 id={`${id}-title`} className="text-sm font-medium">
          {title}
        </h2>
      </div>
      <div className="min-w-0 md:col-span-9">{children}</div>
      {wide ? <div className="min-w-0 md:col-span-12 md:mt-4">{wide}</div> : null}
    </section>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[40ch] text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.25] font-medium tracking-[-0.025em]">
      {children}
    </p>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mt-5 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-fg ${className}`}
    >
      {children}
    </div>
  );
}

/** End of a case page: where to go next. */
export function NextLinks({ links }: { links: Array<{ href: string; label: string; note: string }> }) {
  return (
    <nav aria-label="More" className="container-page mt-24 grid gap-4 border-t border-line pt-10 sm:grid-cols-2 md:mt-32">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="card-link press group flex items-center justify-between gap-4 rounded-[16px] border border-line p-5 sm:p-6"
        >
          <span>
            <span className="block text-sm text-muted">{l.note}</span>
            <span className="mt-1 block text-xl font-medium tracking-[-0.02em]">{l.label}</span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-muted transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
        </Link>
      ))}
    </nav>
  );
}
