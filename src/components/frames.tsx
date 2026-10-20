import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { imageSlots, resolveSlot, type ImageSlot } from "@/lib/image-slots";
import { Schematic } from "@/components/schematics";

const isDev = process.env.NODE_ENV === "development";

type Source = { image: StaticImageData; alt: string } | { slot: ImageSlot; alt: string };

/**
 * Renders a real image when one exists, otherwise a drawn schematic of the screen.
 * The box always has a fixed aspect ratio, so swapping in the real image never shifts layout.
 */
function Screen({
  source,
  sizes,
  className = "",
}: {
  source: Source;
  sizes: string;
  className?: string;
}) {
  if ("image" in source) {
    return (
      <Image
        src={source.image}
        alt={source.alt}
        sizes={sizes}
        className={`size-full object-cover object-top ${className}`}
      />
    );
  }

  const src = resolveSlot(source.slot);
  if (src) {
    return (
      <Image
        src={src}
        alt={source.alt}
        fill
        sizes={sizes}
        className={`object-cover object-top ${className}`}
      />
    );
  }

  const spec = imageSlots[source.slot];
  return (
    <div
      role="img"
      aria-label={`${spec.label} (schematic, screenshot coming soon)`}
      className="absolute inset-0"
    >
      <Schematic kind={spec.schematic} />
      {/* Loud in development so it can't be missed; in production the figure caption says it. */}
      {isDev ? (
        <div className="absolute inset-x-2 bottom-2 rounded-md border border-dashed border-accent bg-bg/95 p-2 font-mono text-[10px] leading-snug text-fg">
          <span className="block font-semibold text-accent">IMAGE NEEDED</span>
          public/images/{source.slot}.png
          <span className="block text-muted">{spec.size}</span>
        </div>
      ) : null}
    </div>
  );
}

/** A modern phone silhouette at the PrelimsDaily screenshot ratio (540 × 1142). */
export function PhoneFrame({
  source,
  sizes = "(min-width: 1024px) 240px, 60vw",
  className = "",
}: {
  source: Source;
  sizes?: string;
  className?: string;
}) {
  // Real screenshots have no status bar, so we draw one (in the app's own background colour)
  // to keep content clear of the rounded corners. Slot images are expected to include theirs.
  const withStatusBar = "image" in source;
  return (
    <div
      className={`rounded-[2.1rem] bg-[#0c0c0b] p-[5px] shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_30px_60px_-30px_rgb(0_0_0/0.45),0_0_0_1px_var(--line-strong)] ${className}`}
    >
      <div
        className={`relative flex flex-col overflow-hidden rounded-[1.8rem] [container-type:inline-size] ${
          withStatusBar ? "aspect-[540/1212] bg-[#f7f7f5]" : "aspect-[540/1142] bg-surface"
        }`}
      >
        {withStatusBar ? <StatusBar /> : null}
        <div className="relative min-h-0 flex-1">
          <Screen source={source} sizes={sizes} />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div aria-hidden className="flex h-[5.8%] shrink-0 items-center justify-between px-[11%] pt-[1%] text-[#1d2433]">
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
  source,
  title,
  sizes = "(min-width: 1024px) 760px, 92vw",
  className = "",
}: {
  source: Source;
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
      <div className="relative aspect-[16/10] bg-bg">
        <Screen source={source} sizes={sizes} />
      </div>
    </div>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">{children}</figcaption>;
}
