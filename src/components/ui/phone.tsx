import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { zenzDemo } from "@/lib/media";

export type Shot = { src: StaticImageData; alt: string };

/**
 * A CSS phone. `cycle` crossfades the screens on a loop (CSS, stopped under reduced motion);
 * otherwise the first screen shows and JS (or :has() hover) can switch them via [data-shot].
 * `video` swaps the screens for the Zen-Z recording once src/lib/media.ts has one.
 */
export function Phone({
  shots,
  sizes,
  cycle = false,
  video = false,
  priority = false,
  eager = false,
  className = "",
  screenClassName = "",
}: {
  shots: Shot[];
  sizes: string;
  cycle?: boolean;
  video?: boolean;
  priority?: boolean;
  /** Load the first screen eagerly (above the fold). Everything else is lazy. */
  eager?: boolean;
  className?: string;
  screenClassName?: string;
}) {
  const demo = video ? zenzDemo : null;
  return (
    <div className={`phone ${className}`}>
      <div
        className={`phone-screen ${cycle && !demo ? "screen-cycle" : ""} ${screenClassName}`}
        style={{ "--n": shots.length } as CSSProperties}
      >
        {demo ? (
          <video
            className="phone-shot"
            muted
            playsInline
            loop
            preload="none"
            poster={demo.poster}
            data-autoplay
            aria-label="Screen recording of the Zen-Z app"
          >
            {demo.webm ? <source src={demo.webm} type="video/webm" /> : null}
            <source src={demo.mp4} type="video/mp4" />
          </video>
        ) : (
          shots.map((s, i) => (
            <Image
              key={i}
              src={s.src}
              alt={i === 0 ? s.alt : ""}
              aria-hidden={i > 0 || undefined}
              sizes={sizes}
              priority={priority && i === 0}
              loading={priority && i === 0 ? undefined : eager && i === 0 ? "eager" : "lazy"}
              className="phone-shot"
              data-shot={i}
              style={{ "--i": i } as CSSProperties}
            />
          ))
        )}
      </div>
      <span className="phone-island" aria-hidden />
    </div>
  );
}
