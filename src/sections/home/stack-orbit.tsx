import Image from "@/components/ui/img";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "@/components/icons";
import { stackIcons } from "@/components/stack-icons";
import { Glyph } from "@/components/ui/glyph";
import { projectNames, routes, stack } from "@/lib/site";
import zGlossy from "@/assets/v4/brand/z-glossy.webp";

const inner = ["TypeScript", "React Native + Expo", "Next.js", "Supabase", "Postgres + RLS", "PayU"];
const outer = ["Tailwind CSS", "TanStack Query", "Edge Functions (Deno)", "Vercel", "GitHub Actions", "Sentry"];
const shown = new Set([...inner, ...outer]);
const rest = stack.filter((t) => !shown.has(t.name) && t.layer !== "Tools").map((t) => t.name);

const byName = (n: string) => stack.find((t) => t.name === n)!;

function Ring({ names, ring }: { names: string[]; ring: "inner" | "outer" }) {
  return (
    <ul className={`orbit-ring orbit-${ring}`} aria-label={ring === "inner" ? "Core" : "Around it"}>
      {names.map((name, i) => {
        const t = byName(name);
        const id = `tool-${ring}-${i}`;
        return (
          <li key={name} className="orbit-item" style={{ "--a": `${(360 / names.length) * i + (ring === "outer" ? 30 : 0)}deg` } as CSSProperties}>
            <span className="orbit-upright">
              <span tabIndex={0} aria-describedby={id} className="orbit-pill">
                {t.icon ? <Glyph icon={t.icon} className="orbit-glyph text-[1.05em]" style={stackIcons[t.icon].hex ? ({ "--brand": stackIcons[t.icon].hex } as CSSProperties) : undefined} /> : <span aria-hidden className="font-mono text-[0.7em] text-red-text">{t.mono ?? "₹"}</span>}
                {t.name}
              </span>
              <span id={id} role="tooltip" className="orbit-tip">
                <span className="block text-fg">{t.note}</span>
                <span className="mt-0.5 block text-muted">{t.usedIn.map((u) => projectNames[u]).join(" · ")}</span>
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * 06 Stack: the tools orbit the glossy Z on two rings (CSS; paused on hover and focus, still
 * under reduced motion). Each pill's tooltip says what it did and where it shipped. Below lg,
 * the same lists become a grid with that note inline.
 */
export function StackOrbit() {
  return (
    <section id="stack" data-section="06 — Stack" aria-labelledby="stack-title" className="relative overflow-clip pt-16 pb-24 md:pt-20 md:pb-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="label">
            <span className="text-red-text">06</span> — Stack
          </p>
          <h2 id="stack-title" className="h2 mt-5" data-split>
            The stack, and where it shipped.
          </h2>
          <p className="mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted">
            Every tool here shipped in a real product: Zen-Z, PrelimsDaily or this site.
            <span className="hidden lg:inline"> Hover one to see where.</span>
          </p>
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">Also: {rest.join(", ")}.</p>
          <Link href={routes.stack} className="btn btn-ghost press mt-8" data-magnetic>
            <span data-magnetic-label>
              Every tool, by layer <ArrowRight size={17} />
            </span>
          </Link>
        </div>

        <div className="orbit relative lg:col-span-7">
          <div aria-hidden className="orbit-core">
            <span className="absolute inset-[-30%] rounded-full bg-[radial-gradient(closest-side,rgb(225_6_0/0.45),transparent)]" />
            <Image src={zGlossy} alt="" sizes="220px" className="relative w-full" />
          </div>
          <span aria-hidden className="orbit-track orbit-track-inner" />
          <span aria-hidden className="orbit-track orbit-track-outer" />
          <Ring names={inner} ring="inner" />
          <Ring names={outer} ring="outer" />
        </div>
      </div>
    </section>
  );
}
