import { ArrowDown, Download } from "@/components/icons";
import { CopyEmail } from "@/components/copy-email";
import { site } from "@/lib/site";
import { stagger } from "@/lib/stagger";
import { ShipLog } from "@/sections/ship-log";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <GridBackdrop />
      <div className="container-page relative grid gap-14 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-28 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="enter label inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-3 normal-case">
            <span className="pulse-dot relative size-1.5 rounded-full bg-accent" aria-hidden />
            <span className="text-fg">Founder &amp; CTO, Zen-Z</span>
            <span aria-hidden className="text-faint">
              /
            </span>
            {site.location}
          </p>

          {/* The H1 is the LCP element: it paints immediately and is never faded in. */}
          <h1
            id="hero-title"
            className="mt-7 text-[clamp(3rem,9vw,6.25rem)] leading-[0.92] font-medium tracking-[-0.045em]"
          >
            <span className="sr-only">{site.name}, founder-engineer. </span>I ship{" "}
            <span className="serif-em pr-[0.04em] text-[1.08em] tracking-[-0.02em]">real</span>{" "}
            products, fast.
          </h1>

          <p
            className="enter mt-7 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed"
            style={stagger(1)}
          >
            I&rsquo;m Aayush, a founder-engineer. I built{" "}
            <a href="#zen-z" className="link text-fg">
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
              className="ml-1 h-11 rounded-full px-2 font-mono text-[0.8125rem] text-muted hover:text-fg"
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

/** Faint 12-column guides behind the hero, fading out downward. Pure CSS, no image. */
function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
    >
      <div className="container-page grid h-full grid-cols-4 lg:grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`border-l border-line/50 ${i >= 4 ? "hidden lg:block" : ""} ${
              i === 11 || i === 3 ? "border-r lg:border-r-0" : ""
            } ${i === 11 ? "lg:border-r" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
