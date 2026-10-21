import { ArrowDown, Download } from "@/components/icons";
import { CopyEmail } from "@/components/copy-email";
import { site } from "@/lib/site";
import { stagger } from "@/lib/stagger";
import { ShipLog } from "@/sections/ship-log";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <GridBackdrop />
      <div className="container-page relative grid gap-14 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="enter label inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-3 normal-case">
            <span className="pulse-dot relative size-1.5 rounded-full bg-accent" aria-hidden />
            <span className="text-fg">Founder &amp; CTO, <span className="whitespace-nowrap">Zen-Z</span></span>
            <span aria-hidden className="text-faint">
              /
            </span>
            {site.location}
          </p>

          {/* The H1 and intro are LCP candidates: they paint immediately and are never faded in. */}
          <h1
            id="hero-title"
            className="mt-7 text-[clamp(3rem,9vw,6.25rem)] leading-[0.92] font-medium tracking-[-0.045em]"
          >
            <span className="sr-only">{site.name}, founder-engineer. </span>I ship{" "}
            <span className="serif-em pr-[0.04em] text-[1.08em] tracking-[-0.02em]">real</span>{" "}
            products, fast.
          </h1>

          {/* Like the H1, the intro paints immediately: it's the LCP element on mobile. */}
          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            I&rsquo;m Aayush, a founder-engineer. I built{" "}
            <a href="#zen-z" className="link whitespace-nowrap text-fg">
              Zen-Z
            </a>{" "}
            on my own (the app, admin panel, backend and payments), and it reached{" "}
            <strong className="font-medium text-fg">150+ users in its first two days</strong>. I
            work AI-native with Claude Code and Cursor, and I understand every line I ship.
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={stagger(2)}>
            <a href="#work" className="btn btn-primary press">
              See the work
              <ArrowDown size={16} />
            </a>
            <a href={site.resume} download className="btn btn-ghost press">
              <Download size={16} />
              Resume
            </a>
            <CopyEmail
              email={site.email}
              className="-ml-2 h-11 rounded-full px-2 font-mono text-[0.8125rem] text-muted hover:text-fg sm:ml-1"
            />
          </div>
        </div>

        <div className="enter lg:col-span-5 lg:pt-4" style={stagger(3)}>
          <ShipLog />
        </div>
      </div>
    </section>
  );
}

/** Faint column guides behind the hero, fading out downward. One element, drawn in CSS. */
function GridBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="hero-guides container-page h-full" />
    </div>
  );
}
