import type { StackIcon } from "@/components/stack-icons";
import { Glyph } from "@/components/ui/glyph";

type Item = { name: string; icon?: StackIcon };

/** Only tools that shipped in Zen-Z, PrelimsDaily or this site. */
const rowA: Item[] = [
  { name: "React Native", icon: "react" },
  { name: "Expo", icon: "expo" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Supabase", icon: "supabase" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "PayU" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
];
const rowB: Item[] = [
  { name: "TanStack Query", icon: "reactquery" },
  { name: "Edge Functions", icon: "deno" },
  { name: "GitHub Actions", icon: "githubactions" },
  { name: "Vitest", icon: "vitest" },
  { name: "Jest", icon: "jest" },
  { name: "Sentry", icon: "sentry" },
  { name: "Vercel", icon: "vercel" },
  { name: "Git", icon: "git" },
];

function Band({ items, dir, className, speed }: { items: Item[]; dir: 1 | -1; className: string; speed: number }) {
  return (
    <div data-marquee data-dir={dir} data-speed={speed} className={`marquee py-4 md:py-5 ${className}`} style={{ ["--dur" as string]: `${speed}s` }}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
            {items.map((t) => (
              <li
                key={t.name}
                className="display flex items-center gap-3 px-5 text-[clamp(1.5rem,3vw,2.5rem)] leading-none tracking-[-0.03em] md:px-7"
              >
                {t.icon ? <Glyph icon={t.icon} className="text-[0.8em]" /> : <span aria-hidden className="font-mono text-[0.45em] tracking-normal">₹</span>}
                {t.name}
                <span aria-hidden className="ml-5 inline-block size-[0.2em] rotate-45 bg-current md:ml-7" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/**
 * The stack as two tilted bands crossing in opposite directions. They speed up with scroll
 * velocity (desktop) and loop in CSS on phones; stopped under reduced motion.
 */
export function TechMarquee() {
  return (
    <section aria-label="Tools I ship with" className="relative z-[1] -my-6 overflow-clip py-14 md:py-24">
      <Band items={rowA} dir={1} speed={17} className="relative z-[2] -rotate-[3deg] scale-x-110 bg-red text-white" />
      <Band items={rowB} dir={-1} speed={20} className="relative -mt-4 rotate-[2.5deg] scale-x-110 bg-paper text-paper-ink md:-mt-16" />
    </section>
  );
}
