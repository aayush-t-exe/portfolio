import Image from "next/image";
import portrait from "@/assets/about/portrait.jpg";

/**
 * Aayush's photo with a red/black duotone and a halftone screen, done in CSS (see .duotone), so
 * a better photo is a one-file swap: replace src/assets/about/portrait.jpg.
 */
export function Portrait({ className = "", sizes, priority = false }: { className?: string; sizes: string; priority?: boolean }) {
  return (
    <div className={`duotone ${className}`}>
      <Image
        src={portrait}
        alt="Aayush Thakur"
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className="size-full object-cover object-[50%_20%]"
      />
    </div>
  );
}
