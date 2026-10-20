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
  className = "",
}: {
  shot: Shot;
  /** The app's UI: "light" (PrelimsDaily) or "dark" (Zen-Z). */
  tone: "light" | "dark";
  sizes?: string;
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
            className="size-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div aria-hidden className="flex h-[5.8%] shrink-0 items-center justify-between px-[11%] pt-[1%]">
      <span className="text-[4cqw] leading-none font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-[1.2cqw]">
        <i className="h-[2.2cqw] w-[3.6cqw] rounded-[0.5cqw] bg-current opacity-80" />
        <i className="size-[2.2cqw] rounded-full bg-current opacity-80" />
        <i className="h-[2.2cqw] w-[4.6cqw] rounded-[0.7cqw] border border-current opacity-80" />
      </span>
    </div>
  );
}

/** Minimal browser chrome for desktop screenshots (16:10). */
export function BrowserFrame({
  shot,
  title,
  sizes = "(min-width: 1024px) 760px, 92vw",
  className = "",
}: {
  shot: Shot;
  title: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`card overflow-hidden rounded-[14px] p-0 ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-line bg-surface px-3.5">
        <span aria-hidden className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-line-strong" />
          <i className="size-2.5 rounded-full bg-line-strong" />
          <i className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="truncate font-mono text-[11px] text-muted">{title}</span>
      </div>
      <div className="dim-in-dark relative aspect-[16/10] bg-white">
        <Image src={shot.image} alt={shot.alt} sizes={sizes} className="size-full object-cover object-top" />
      </div>
    </div>
  );
}

/**
 * A row of phone screens: a swipeable rail on touch, a grid from md up.
 * `numbered` adds step labels (for flows); otherwise alternate screens are offset.
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
  const cols = items.length === 6 ? "md:grid-cols-6" : "md:grid-cols-5";
  return (
    <ul
      tabIndex={0}
      aria-label={label}
      className={`rail scroller -mx-[clamp(1.25rem,4vw,2.5rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] pt-2 pb-6 md:mx-0 md:grid ${cols} md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:gap-6`}
    >
      {items.map((s, i) => (
        <li
          key={s.title}
          data-reveal="clip"
          style={stagger(i)}
          className={`w-[62vw] max-w-[260px] shrink-0 snap-center md:w-auto md:max-w-none ${
            !numbered && i % 2 === 1 ? "md:translate-y-10" : ""
          }`}
        >
          <figure>
            {numbered ? (
              <p className="mb-3 flex items-center gap-2 font-mono text-xs text-muted">
                <span className={s.step === "Pay" ? "text-accent" : "text-fg"}>{s.step}</span>
                <span aria-hidden className="rule-draw h-px flex-1 bg-line-strong" />
              </p>
            ) : null}
            <PhoneFrame shot={s} tone={tone} sizes={`(min-width: 768px) ${numbered ? "16vw" : "20vw"}, 62vw`} />
            <figcaption className="mt-4">
              <span className="block text-sm font-medium">{s.title}</span>
              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{s.caption}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">{children}</figcaption>;
}
