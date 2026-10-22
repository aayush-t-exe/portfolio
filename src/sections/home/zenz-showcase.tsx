import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Phone } from "@/components/ui/phone";
import { projects, routes } from "@/lib/site";
import { steps } from "@/sections/home/zenz-data";
import readyToMeet from "@/assets/v4/art/home-match-banner.webp";
import cricket from "@/assets/v4/icons/cricket.webp";
import football from "@/assets/v4/icons/football.webp";
import pool from "@/assets/v4/icons/pool.webp";
import pickleball from "@/assets/v4/icons/pickleball.webp";

/** The activity icons floating around the phone (the app's own 3D icons). */
const floats = [
  { src: cricket, cls: "top-[6%] left-[8%] w-[16%] -rotate-12", depth: 0.5 },
  { src: football, cls: "top-[14%] right-[6%] w-[14%]", depth: 0.9 },
  { src: pool, cls: "bottom-[16%] left-[2%] w-[13%]", depth: 0.7 },
  { src: pickleball, cls: "bottom-[6%] right-[12%] w-[15%] rotate-12", depth: 1.1 },
];

const n = (i: number) => String(i + 1).padStart(2, "0");

/**
 * 02 Zen-Z. Desktop with motion: the hero's phone flies in, the section pins, and scrolling steps
 * through the booking flow: the red bar moves down the list and the phone swaps screens, then it
 * settles flat. Without JS or with reduced motion, it's a static list (hovering a step swaps the
 * screen, CSS :has()). Phones: a snap row of phone + caption cards.
 */
export function ZenzShowcase() {
  return (
    <section id="zen-z" data-section="02 — Zen-Z" aria-labelledby="zenz-title" className="zz relative z-10">
      <div data-zz-pin className="container-page grid gap-y-10 pt-24 pb-20 md:min-h-svh md:grid-cols-12 md:items-center md:gap-x-8 md:pt-24 md:pb-10">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="label">
            <span className="text-red-text">02</span> — Zen-Z · live on Google Play
          </p>
          <h2 id="zenz-title" className="h2 mt-5 text-[clamp(2.4rem,3.9vw,3.75rem)]" data-split>
            Meet new people in six steps.
          </h2>
          <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-muted md:hidden">
            Zen-Z puts college students into small groups and gives each group a plan. This is the booking flow, exactly as it
            ships.
          </p>

          {/* Desktop list + caption (the mobile cards below carry the same text). */}
          <div className="relative mt-8 hidden md:block">
            <span data-zz-bar aria-hidden className="zz-bar absolute inset-x-0 top-0 h-12 rounded-[14px] bg-red" />
            <ol className="relative">
              {steps.map((s, i) => (
                <li key={s.title} className="zz-step" data-step={i} tabIndex={0}>
                  <span className="label w-8 shrink-0 text-inherit tabular-nums">{n(i)}</span>
                  <span className="display text-[clamp(1.25rem,1.8vw,1.625rem)] leading-none tracking-[-0.03em]">{s.title}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 grid min-h-[3.5rem] max-w-[40ch]" aria-live="off">
              {steps.map((s, i) => (
                <p key={s.title} className="zz-caption text-[0.9375rem] leading-relaxed text-muted [grid-area:1/1]" data-caption={i}>
                  {s.body}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={projects.zenz.playStoreUrl} target="_blank" rel="noopener" className="btn btn-cream press" data-magnetic>
              <span data-magnetic-label>
                <PlayMark /> Get it on Google Play<span className="sr-only"> (opens in new tab)</span>
              </span>
            </a>
            <Link href={routes.zenz} className="btn btn-ghost press" data-magnetic>
              <span data-magnetic-label>
                Read the case study <ArrowRight size={17} />
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop stage: the travelling phone lands here. */}
        <div className="relative hidden h-[min(82svh,48rem)] md:col-span-6 md:block lg:col-span-7" aria-hidden>
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(225_6_0/0.35),transparent)]"
          />
          {floats.map((f, i) => (
            <Image
              key={i}
              src={f.src}
              alt=""
              sizes="120px"
              className={`absolute ${f.cls} drop-shadow-[0_20px_30px_rgb(0_0_0/0.6)]`}
              data-float={f.depth}
            />
          ))}
          <div data-stage-slot className="absolute top-1/2 left-1/2 w-[clamp(15rem,21vw,19.5rem)] -translate-x-1/2 -translate-y-1/2">
            <div data-traveller className="will-change-transform">
              <div className="zz-pose">
                <Phone shots={steps.map((s) => s.shot)} sizes="(min-width: 768px) 21vw, 1px" screenClassName="zz-screen" />
              </div>
            </div>
          </div>
          <Image
            src={readyToMeet}
            alt=""
            sizes="300px"
            data-zz-final
            className="zz-final absolute bottom-[3%] left-[-2%] z-10 w-[30%] max-w-[15rem] -rotate-[7deg] rounded-2xl shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]"
          />
        </div>
      </div>

      {/* Phones: a snap row of steps. */}
      <ol className="scroller -mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-20 md:hidden" aria-label="The Zen-Z booking flow">
        {steps.map((s, i) => (
          <li key={s.title} className="w-[74vw] max-w-[18rem] shrink-0 snap-center" data-fade>
            <Phone shots={[s.shot]} sizes="74vw" />
            <p className="label mt-5 text-red-text">{n(i)}</p>
            <h3 className="display mt-1 text-2xl tracking-[-0.03em]">{s.title}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PlayMark() {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" aria-hidden focusable={false}>
      <path d="M1 1.2 9.2 8.5 1 15.8a1 1 0 0 1-.4-.8V2a1 1 0 0 1 .4-.8Z" fill="#00A0FF" />
      <path d="M11.9 5.9 9.2 8.5 1 1.2l.2-.1a1 1 0 0 1 1 0l9.7 4.8Z" fill="#00F076" />
      <path d="M11.9 11.1 2.2 15.9a1 1 0 0 1-1 0l-.2-.1 8.2-7.3 2.7 2.6Z" fill="#FF3A44" />
      <path d="m15 7.4-3.1-1.5-2.7 2.6 2.7 2.6 3.1-1.5a1.2 1.2 0 0 0 0-2.2Z" fill="#FFD500" />
    </svg>
  );
}

