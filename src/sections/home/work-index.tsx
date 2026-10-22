import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/icons";
import { Phone } from "@/components/ui/phone";
import { projects, routes } from "@/lib/site";
import { screens } from "@/sections/home/zenz-data";
import admin from "@/assets/zenz/admin-band.png";
import zenzSite from "@/assets/v4/brand/zen-z-site.webp";
import zGlossy from "@/assets/v4/brand/z-glossy.webp";
import today from "@/assets/prelims/today.jpg";
import quiz from "@/assets/prelims/quiz.jpg";

type Row = {
  name: string;
  role: string;
  year: string;
  href: string;
  external?: boolean;
  /** Preview card background (each project gets its own colour). */
  bg: string;
  visual: ReactNode;
};

const rows: Row[] = [
  {
    name: "Zen-Z app",
    role: "Founder & CTO · sole engineer",
    year: "2026",
    href: routes.zenz,
    bg: "#e10600",
    visual: (
      <div className="relative grid size-full place-items-center">
        <Image src={zGlossy} alt="" sizes="200px" className="absolute top-1/2 left-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 opacity-30 mix-blend-multiply" />
        <Phone shots={[screens.home]} sizes="140px" className="relative w-[34%] rotate-[-6deg]" />
      </div>
    ),
  },
  {
    name: "Zen-Z admin dashboard",
    role: "Next.js · matching board, moderation, payments queue",
    year: "2026",
    href: `${routes.zenz}#built`,
    bg: "#e9e3d5",
    visual: (
      <div className="grid size-full place-items-center p-[8%]">
        <Image src={admin} alt="" sizes="360px" className="w-full rounded-lg shadow-[0_20px_40px_-16px_rgb(0_0_0/0.45)]" />
      </div>
    ),
  },
  {
    name: "zen-z.site",
    role: "Marketing site · design & build",
    year: "2026",
    href: projects.zenz.url,
    external: true,
    bg: "#16132a",
    visual: (
      <div className="grid size-full place-items-center p-[8%]">
        <Image src={zenzSite} alt="" sizes="360px" className="w-full rounded-lg ring-1 ring-white/10" />
      </div>
    ),
  },
  {
    name: "PrelimsDaily",
    role: "UPSC practice app · built in a day",
    year: "2026",
    href: routes.prelims,
    bg: "#f3efe6",
    visual: (
      <div className="flex size-full items-center justify-center gap-[5%]">
        <Phone shots={[{ src: today, alt: "" }]} sizes="130px" className="w-[30%] -rotate-[5deg]" />
        <Phone shots={[{ src: quiz, alt: "" }]} sizes="130px" className="w-[30%] translate-y-[6%] rotate-[4deg]" />
      </div>
    ),
  },
];

/**
 * 04 Selected work (Dennis-style). Desktop: big rows; a preview card follows the cursor and its
 * strip slides to the hovered row (motion chunk; focus mirrors hover). Phones: stacked image
 * cards. Rows are real links either way.
 */
export function WorkIndex() {
  return (
    <section id="work" data-section="04 — Work" aria-labelledby="work-title" className="relative py-24 md:py-36">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">
              <span className="text-red-text">04</span> — Selected work
            </p>
            <h2 id="work-title" className="h2 mt-5" data-split>
              Selected work.
            </h2>
          </div>
          <p className="label hidden md:block">Role · Year</p>
        </div>

        <ul className="work-list mt-12 md:mt-16" data-work-list>
          {rows.map((r, i) => (
            <li key={r.name} className="border-line md:border-t md:last:border-b">
              <Link
                href={r.href}
                {...(r.external ? { target: "_blank", rel: "noopener" } : {})}
                className="work-row group block py-6 md:grid md:grid-cols-12 md:items-center md:gap-6 md:py-10"
                data-work-row={i}
                data-cursor="View"
              >
                {/* Phones: the image card */}
                <div className="mb-5 aspect-[4/3] overflow-hidden rounded-[20px] md:hidden" style={{ background: r.bg }} aria-hidden>
                  {r.visual}
                </div>
                <span className="display block text-[clamp(2rem,5.6vw,5.25rem)] leading-[0.95] tracking-[-0.04em] transition-[transform,color] duration-500 ease-[var(--ease-expo)] md:col-span-8 md:group-hover:translate-x-4">
                  {r.name}
                  {r.external ? (
                    <>
                      <ArrowUpRight size={28} className="ml-2 inline align-top text-red-text" />
                      <span className="sr-only"> (opens in new tab)</span>
                    </>
                  ) : null}
                </span>
                <span className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3 text-[0.9375rem] text-muted md:col-span-4 md:mt-0 md:border-0 md:pt-0">
                  <span>{r.role}</span>
                  <span className="font-mono text-sm tabular-nums">{r.year}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* The floating preview (desktop, fine pointer, motion allowed). */}
      <div aria-hidden data-work-preview className="work-preview pointer-events-none fixed top-0 left-0 z-40 hidden h-[17rem] w-[22rem] overflow-hidden rounded-[18px] md:block">
        <div data-work-strip className="h-full">
          {rows.map((r) => (
            <div key={r.name} className="h-full" style={{ background: r.bg }}>
              {r.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
