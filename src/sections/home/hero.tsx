import Image from "@/components/ui/img";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Phone } from "@/components/ui/phone";
import { RiseText } from "@/components/ui/rise-text";
import { facts, projects, site } from "@/lib/site";
import { heroShots } from "@/sections/home/zenz-data";
import zGlossy from "@/assets/v4/brand/z-glossy.webp";
import readyToMeet from "@/assets/v4/art/home-match-banner.webp";
import star from "@/assets/v4/art/star-dark.webp";
import people from "@/assets/v4/art/home-banner-people.webp";

const z = facts.zenz;

/** Count-up stats: the final value is in the HTML; SiteBehavior counts up to it. */
const stats = [
  { value: z.users, count: "150", label: `users in ${z.usersDays}` },
  { value: z.revenue, count: "33", label: "revenue so far" },
  { value: z.igViews, count: "140", label: "views on Instagram" },
] as const;

const NAME = "Aayush Thakur";

/**
 * 01 Hero. Left: who, the claim, the ask. Right: the tilted phone running Zen-Z over the glossy
 * red Z, with the app's own hand-drawn art as stickers. Behind everything, the name as a giant
 * marquee that follows scroll velocity. The entrance is CSS from first paint.
 * On desktop with motion, this phone is replaced by the travelling phone (same pose), which
 * flies into the Zen-Z section.
 */
export function Hero() {
  return (
    <section id="hero" data-section="01 — Intro" aria-labelledby="hero-title" className="relative isolate overflow-clip">
      <div className="relative">
      <div className="container-page relative grid min-h-[max(100svh,44rem)] grid-cols-1 content-start gap-y-12 pt-28 pb-[calc(12.5vw+3rem)] md:grid-cols-12 md:content-center md:pt-24 md:pb-[calc(12.5vw+2rem)]">
        <div className="relative z-10 md:col-span-7 lg:col-span-6">
          <p className="pill rise-fade" style={{ "--d": "0ms" } as CSSProperties}>
            <span className="live-dot" aria-hidden />
            Open to internships
            <span className="text-faint" aria-hidden>·</span>
            <span className="text-muted">
              Jaipur, IST <span data-clock suppressHydrationWarning className="font-mono tabular-nums text-fg" />
            </span>
          </p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(2.3rem,4.9vw,4.9rem)] leading-[0.98] tracking-[-0.04em]">
            <RiseText text="I built Zen-Z solo: a live campus app with real users and real revenue." marks={[2]} />
          </h1>

          <p className="rise-fade mt-6 max-w-[42ch] text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-relaxed text-muted" style={{ "--d": "260ms" } as CSSProperties}>
            I&rsquo;m Zen-Z&rsquo;s founder and only engineer: I built the app, the admin dashboard and the payments backend.
            B.Tech CSE at JNU Jaipur, class of 2028.
          </p>

          <div className="rise-fade mt-8 flex flex-wrap gap-3" style={{ "--d": "340ms" } as CSSProperties}>
            <a href="#zen-z" className="btn btn-red press" data-magnetic>
              <span data-magnetic-label>
                See my work <ArrowRight size={17} />
              </span>
            </a>
            <a href={site.resume} className="btn btn-ghost press" data-magnetic>
              <span data-magnetic-label>
                Resume <span className="font-mono text-xs text-muted">PDF</span>
              </span>
            </a>
          </div>

          {/* Proof in the first screen; the big-number band follows just below. */}
          <p className="rise-fade mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[0.9375rem] text-muted" style={{ "--d": "420ms" } as CSSProperties}>
            <span>
              <strong className="num mr-1.5 text-[1.375rem] text-fg">{z.users}</strong>users in {z.usersDays}
            </span>
            <span>
              <strong className="num mr-1.5 text-[1.375rem] text-fg">{z.revenue}</strong>revenue
            </span>
            <span>
              <strong className="num mr-1.5 text-[1.375rem] text-red-text">Live</strong>on Google Play
            </span>
          </p>
        </div>

        {/* The phone stage. [data-hero-slot] is where the travelling phone starts. */}
        <div className="relative mx-auto w-full max-w-[22rem] md:col-span-5 md:mr-0 md:max-w-none lg:col-span-6">
          <div className="relative mx-auto w-[min(50vw,13.5rem,26svh)] md:w-[clamp(15rem,21vw,19.5rem)]">
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[150%] -translate-x-1/2 -translate-y-[54%] rounded-full bg-[radial-gradient(closest-side,rgb(225_6_0/0.55),rgb(225_6_0/0.12)_55%,transparent)]"
            />
            <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[170%] -translate-x-[46%] -translate-y-[56%]">
              <div data-parallax="-0.15">
                <Image
                  src={zGlossy}
                  alt=""
                  loading="eager"
                  sizes="(min-width: 768px) 34vw, 90vw"
                  className="rise-fade w-full opacity-90"
                  style={{ "--d": "120ms" } as CSSProperties}
                />
              </div>
            </div>
            <div data-hero-slot className="relative">
              <div className="hero-phone rise-fade" style={{ "--d": "200ms" } as CSSProperties}>
                <div className="[transform:perspective(1400px)_rotate(5deg)_rotateY(-22deg)_rotateX(10deg)]">
                  <Phone shots={heroShots} cycle video eager sizes="(min-width: 768px) 20vw, 216px" />
                </div>
              </div>
            </div>

            {/* Stickers: the app's own hand-drawn art. */}
            <span aria-hidden className="absolute bottom-[3%] -left-[40%] z-20 w-[70%] max-w-[16rem] -rotate-[8deg] md:bottom-[2%] md:-left-[88%] md:w-[70%]" data-sticker="0.6">
              <Image
                src={readyToMeet}
                alt=""
                sizes="(min-width: 768px) 220px, 150px"
                className="rise-fade block w-full rounded-2xl shadow-[0_24px_50px_-18px_rgb(0_0_0/0.8)]"
                style={{ "--d": "520ms" } as CSSProperties}
              />
            </span>
            <span aria-hidden className="absolute -top-4 -right-[18%] z-20 w-[26%] max-w-[6rem] rotate-[14deg]" data-sticker="1">
              <Image
                src={star}
                alt=""
                sizes="96px"
                className="rise-fade block w-full invert"
                style={{ "--d": "600ms" } as CSSProperties}
              />
            </span>
            <span aria-hidden className="absolute top-[28%] -right-[40%] z-20 hidden w-[58%] max-w-[12rem] rotate-[6deg] lg:block" data-sticker="0.8">
              <Image
                src={people}
                alt=""
                sizes="200px"
                className="rise-fade block w-full rounded-2xl bg-paper p-2 shadow-[0_24px_50px_-18px_rgb(0_0_0/0.8)]"
                style={{ "--d": "680ms" } as CSSProperties}
              />
            </span>
          </div>
        </div>
      </div>

      {/* The name, as a giant marquee behind the phone. */}
      <div
        aria-hidden
        data-marquee
        data-speed="19"
        className="marquee pointer-events-none absolute inset-x-0 bottom-[0.06em] -z-10 text-[clamp(4.5rem,14vw,15rem)]"
        style={{ "--dur": "20s" } as CSSProperties}
      >
        <div className="marquee-track display-caps text-fg/95 select-none">
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0 items-center pr-[0.25em]">
              {NAME}
              <span className="ml-[0.25em] inline-block h-[0.09em] w-[0.6em] bg-red" />
            </span>
          ))}
        </div>
      </div>
      </div>

      {/* Proof, in big numbers, right under the first screen. */}
      <div className="container-page relative pb-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 md:grid-cols-4 md:pt-10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end gap-2" data-fade>
              <dt className="text-[0.9375rem] leading-snug text-muted">{s.label}</dt>
              <dd className="num text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.9]">
                <span aria-hidden data-count={s.count}>{s.value}</span>
                <span className="sr-only">{s.value}</span>
              </dd>
            </div>
          ))}
          <div className="flex flex-col-reverse justify-end gap-2" data-fade>
            <dt className="sr-only">Store</dt>
            <dd>
              <a href={projects.zenz.playStoreUrl} target="_blank" rel="noopener" className="press group flex flex-col gap-2">
                <span className="num flex items-center gap-2 text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.9] text-red-text">
                  Live
                  <ArrowUpRight size={36} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
                <span className="text-[0.9375rem] leading-snug text-muted group-hover:text-fg">
                  on Google Play<span className="sr-only"> (opens in new tab)</span>
                </span>
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
