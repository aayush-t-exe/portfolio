import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { stagger } from "@/lib/stagger";

export type Shot = { image: StaticImageData; alt: string };

/**
 * A modern phone silhouette. Screenshots are stored with the device status bar cropped off
 * (so notification icons don't leak in); we draw a clean one in the app's own colours,
 * which also keeps content clear of the rounded corners.
 */
export function PhoneFrame({
  shot,
  tone,
  sizes = "(min-width: 1024px) 240px, 60vw",
  eager,
  className = "",
}: {
  shot: Shot;
  /** The app's UI: "light" (PrelimsDaily) or "dark" (Zen-Z). */
  tone: "light" | "dark";
  sizes?: string;
  /** Load now rather than lazily (above the fold, or a morph target that must be ready). */
  eager?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.1rem] bg-[#0c0c0b] p-[5px] shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_30px_60px_-30px_rgb(0_0_0/0.45),0_0_0_1px_var(--line-strong)] ${className}`}
    >
      <div
        className={`relative flex aspect-[540/1212] flex-col overflow-hidden rounded-[1.8rem] [container-type:inline-size] ${
          tone === "light" ? "bg-[#f7f7f5] text-[#1d2433]" : "bg-black text-white"
        }`}
      >
        <StatusBar />
        <div className={`relative min-h-0 flex-1 ${tone === "light" ? "dim-in-dark" : ""}`}>
          <Image
            src={shot.image}
            alt={shot.alt}
            sizes={sizes}
            draggable={false}
            {...(eager ? { loading: "eager" as const } : {})}
            className="size-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

/** One element: the time and the signal/battery glyphs are CSS pseudo-elements (.status-bar). */
function StatusBar() {
  return <div aria-hidden className="status-bar" />;
}

/**
 * Minimal browser chrome for desktop screenshots. The box takes the image's own ratio. The
 * chrome is light whatever the theme (the admin UI is light); in dark mode the whole frame is
 * dimmed so it doesn't glare.
 */
export function BrowserFrame({
  shot,
  title,
  sizes = "(min-width: 1024px) 760px, 92vw",
  eager,
  priority,
  className = "",
}: {
  shot: Shot;
  title: string;
  sizes?: string;
  eager?: boolean;
  /** The page's LCP image (the Zen-Z case page on desktop): fetch at high priority. */
  priority?: boolean;
  className?: string;
}) {
  const ratio = `${shot.image.width} / ${shot.image.height}`;
  return (
    <div
      className={`browser-dim overflow-hidden rounded-[8px] bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6),0_0_0_1px_rgb(255_255_255/0.1)] sm:rounded-[12px] ${className}`}
    >
      <div className="flex h-5 items-center gap-2 border-b border-black/10 bg-[#f1f0ec] px-2 sm:h-8 sm:gap-3 sm:px-3">
        <span aria-hidden className="flex gap-1 sm:gap-1.5">
          <i className="size-1.5 rounded-full bg-black/15 sm:size-2.5" />
          <i className="size-1.5 rounded-full bg-black/15 sm:size-2.5" />
          <i className="size-1.5 rounded-full bg-black/15 sm:size-2.5" />
        </span>
        <span className="truncate font-mono text-[8px] text-[#5b5850] sm:text-xs">{title}</span>
      </div>
      <div className="relative" style={{ aspectRatio: ratio }}>
        <Image
          src={shot.image}
          alt={shot.alt}
          sizes={sizes}
          {...(eager ? { loading: "eager" as const } : {})}
          {...(priority ? { fetchPriority: "high" as const } : {})}
          className="size-full object-cover object-top"
        />
      </div>
    </div>
  );
}

/**
 * A row of phone screens as a horizontal snap scroller at every width: phones stay a
 * legible 230px instead of shrinking to fit the column. Mouse users can drag (see PageBehavior),
 * use the thin scrollbar, or shift+wheel. `numbered` adds step labels (for flows);
 * otherwise alternate screens are offset.
 */
export function PhoneRail({
  label,
  items,
  tone,
  numbered,
}: {
  label: string;
  items: Array<Shot & { title: string; caption: string; step?: string }>;
  tone: "light" | "dark";
  numbered?: boolean;
}) {
  return (
    <div className="rail-wrap relative">
      <p aria-hidden className="mb-3 flex justify-end font-mono text-xs text-muted">
        <span className="rail-hint">drag &rarr;</span>
      </p>
      <ul
        tabIndex={0}
        aria-label={`${label} (scrolls sideways)`}
        className={`rail scroller -mx-[clamp(1.25rem,4vw,2.5rem)] flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,4vw,2.5rem)] gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] pt-2 md:gap-6 ${
          numbered ? "pb-6" : "pb-16"
        }`}
      >
        {items.map((s, i) => (
          <li
            key={s.title}
            data-reveal
            style={stagger(i)}
            className={`w-[min(62vw,260px)] shrink-0 snap-start md:w-[230px] ${
              !numbered && i % 2 === 1 ? "md:translate-y-10" : ""
            }`}
          >
            <figure>
              {numbered ? (
                <p className="mb-3 flex items-center gap-2 font-mono text-xs text-muted">
                  <span className={s.step === "Pay" ? "text-accent" : "text-fg"}>{s.step}</span>
                  <span aria-hidden className="h-px flex-1 bg-line-strong" />
                </p>
              ) : null}
              <PhoneFrame shot={s} tone={tone} sizes="(min-width: 768px) 230px, min(62vw, 260px)" />
              <figcaption className="mt-4">
                <span className="block text-sm font-medium">{s.title}</span>
                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{s.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">{children}</figcaption>;
}
