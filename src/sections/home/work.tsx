import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { PrelimsMedia, ZenzMedia } from "@/components/stage";
import { facts, projects, routes } from "@/lib/site";

/**
 * Three cards: the two products as uniform dark stages (status and outcome, not stack), then
 * the incident, told in two lines. Each stage is the same component as its case page's lead
 * image, so following the card morphs it into place.
 */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="container-page">
        <h2 id="work-title" className="h2">
          Work
        </h2>

        <article aria-labelledby="zenz-card" className="mt-8 grid gap-6 md:mt-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Link href={routes.zenz} aria-hidden tabIndex={-1} className="stage-link block lg:col-span-7">
            <ZenzMedia sizes={{ admin: "(min-width: 1024px) 440px, 64vw", phone: "(min-width: 1024px) 170px, 24vw" }} />
          </Link>
          <div className="lg:col-span-5">
            <Chips items={["Live · Google Play", "PayU · verified webhooks", "Built solo"]} />
            <h3 id="zenz-card" className="h3 mt-5">
              Zen-Z
            </h3>
            <p className="mt-2 text-lg leading-snug text-muted">
              Meeting new people at college shouldn&rsquo;t depend on luck, or on someone volunteering to organise.
            </p>
            <ul className="mt-5 space-y-2 text-[0.9375rem] leading-snug">
              {[
                "Matches students into small groups of strangers for cafés, dinners, movies and sports.",
                "App, admin panel and backend, built solo, with payments confirmed on the server.",
                `A public codebase: ${facts.zenz.testSuites} test suites in CI, row-level security on every table.`,
              ].map((b) => (
                <li key={b} className="flex gap-2.5">
                  <span aria-hidden className="mt-[0.6em] h-px w-2.5 shrink-0 bg-line-strong" />
                  {b}
                </li>
              ))}
            </ul>
            <LinkTrio
              caseStudy={routes.zenz}
              name="Zen-Z"
              visit={{ href: projects.zenz.playStoreUrl, label: "Google Play" }}
              source={projects.zenz.sourceUrl}
            />
          </div>
        </article>

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <article aria-labelledby="prelims-card" className="lg:col-span-7">
            <Link href={routes.prelims} aria-hidden tabIndex={-1} className="stage-link block">
              <PrelimsMedia sizes="(min-width: 1024px) 180px, 26vw" />
            </Link>
            <Chips className="mt-6" items={["Built in 1 day", `${facts.prelims.tests} tests`, "Public repo"]} />
            <h3 id="prelims-card" className="h3 mt-4">
              PrelimsDaily
            </h3>
            <p className="mt-2 text-lg leading-snug text-muted">
              A UPSC daily-practice habit: offline streaks, reminders that know you&rsquo;re done, every trade-off written
              down.
            </p>
            <LinkTrio caseStudy={routes.prelims} name="PrelimsDaily" source={projects.prelims.url} />
          </article>

          <article
            aria-labelledby="incident-card"
            className="card flex flex-col self-start p-6 sm:p-8 lg:col-span-5 lg:mt-0"
          >
            <p className="flex items-center gap-2 font-mono text-xs text-accent uppercase">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Incident · 16 Sep 2026
            </p>
            <h3 id="incident-card" className="mt-5 text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
              A student paid. The app said unpaid.
            </h3>
            <p className="mt-4 leading-relaxed text-muted">
              PayU&rsquo;s webhook never arrived, and nothing recorded whether it had. I shipped the fix the same day: every
              webhook call logged, and a queue for anything stuck.
            </p>
            {/* A plain link (full load): it lands mid-page, so it shouldn't morph the Zen-Z stage. */}
            <a href={`${routes.zenz}#incident`} className="link-arrow group mt-8 self-start">
              Read the incident
              <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Chips({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul aria-label="Status" className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((c, i) => (
        <li key={c} className="chip">
          {i === 0 ? <span aria-hidden className="size-1.5 rounded-full bg-accent" /> : null}
          {c}
        </li>
      ))}
    </ul>
  );
}

/** Case study · Visit · Source. Only links that exist are shown. */
function LinkTrio({
  caseStudy,
  name,
  visit,
  source,
}: {
  caseStudy: string;
  name: string;
  visit?: { href: string; label: string };
  source: string;
}) {
  const ext = (href: string, label: ReactNode, aria: string) => (
    <a href={href} target="_blank" rel="noopener" aria-label={`${aria} (opens in new tab)`} className="btn btn-ghost press h-10 px-4 text-sm">
      {label}
      <ArrowUpRight size={15} />
    </a>
  );
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      <Link href={caseStudy} className="btn btn-primary press h-10 px-4 text-sm">
        Case study<span className="sr-only">: {name}</span>
        <ArrowRight size={15} />
      </Link>
      {visit ? ext(visit.href, "Visit", `Visit ${name} on ${visit.label}`) : null}
      {ext(source, "Source", `Source code of ${name} on GitHub`)}
    </div>
  );
}
