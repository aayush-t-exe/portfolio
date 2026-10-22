import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";
import { facts, routes } from "@/lib/site";

const z = facts.zenz;

const counters = [
  { n: z.tables, l: "Postgres tables, row-level security on every one" },
  { n: z.migrations, l: "SQL migrations" },
  { n: z.edgeFunctions, l: "Edge Functions (payments, webhooks)" },
  { n: z.testSuites, l: "test suites in CI" },
  { n: z.pgtapAssertions, l: "pgTAP assertions against a real database" },
  { n: z.ciJobs, l: "CI jobs on every push" },
];

const beats = [
  { t: "Traced it", d: "A student's UPI payment had gone through, but PayU's webhook never arrived, so the booking still said unpaid." },
  { t: "Fixed it the same day", d: "Every webhook call is now logged with its outcome, admins get a “Needs attention” queue, and a tested, admin-only mark-paid tool." },
  { t: "Closed for good", d: "A payment can't go missing silently any more: anything stuck shows up in the queue within minutes." },
];

/**
 * 03 Under the hood (cream). A curved dark edge flattens as it arrives (Masab-style reveal), then
 * the architecture strip (with the payment loop: an order goes out to PayU, a signed webhook
 * comes back), counters, and the "real money, real fixes" card.
 */
export function UnderTheHood() {
  return (
    <section id="build" data-section="03 — Under the hood" aria-labelledby="build-title" className="on-paper relative overflow-clip">
      <span aria-hidden data-curve className="absolute inset-x-0 top-0 z-10 h-[9vw] origin-top rounded-b-[50%_100%] bg-ink" />

      <div className="container-page relative pt-[calc(9vw+4rem)] pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="label">
              <span className="text-red">03</span> — Under the hood
            </p>
            <h2 id="build-title" className="h2 mt-5" data-split>
              Three products. One engineer.
            </h2>
          </div>
          <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-paper-muted md:col-span-5">
            The student app, the admin dashboard and the backend with payments. Access rules live in the database, so they hold
            even if the app has a bug, and money only moves on the server.
          </p>
        </div>

        <Architecture />

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-paper-line pt-10 md:grid-cols-3 lg:grid-cols-6" data-fade-group>
          {counters.map((c) => (
            <div key={c.l} className="flex flex-col-reverse justify-end gap-2">
              <dt className="text-[0.875rem] leading-snug text-paper-muted">{c.l}</dt>
              <dd className="num text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.9]">
                <span aria-hidden data-count={c.n}>{c.n}</span>
                <span className="sr-only">{c.n}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Real money, real fixes: ownership, told fix-first. */}
        <article aria-labelledby="fix-title" className="relative mt-20 overflow-hidden rounded-[28px] bg-ink p-6 text-fg sm:p-10 md:mt-24 md:p-14" data-fade>
          <div aria-hidden className="pointer-events-none absolute -top-1/2 -right-1/4 size-[70%] rounded-full bg-[radial-gradient(closest-side,rgb(225_6_0/0.28),transparent)]" />
          <div className="relative grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="label text-red-text">Real money, real fixes · {z.incidentDate}</p>
              <h3 id="fix-title" className="display mt-4 text-[clamp(1.9rem,3.4vw,3rem)] leading-[1] tracking-[-0.035em]">
                When a real payment went missing, I fixed it the same day.
              </h3>
              <Link href={`${routes.zenz}#incident`} className="btn btn-cream press mt-8" data-magnetic>
                <span data-magnetic-label>
                  Read how <ArrowRight size={17} />
                </span>
              </Link>
            </div>
            <ol className="fix-beats relative space-y-8 pl-10 lg:col-span-7 lg:pt-2">
              <svg aria-hidden className="absolute top-2 left-[0.6875rem] h-[calc(100%-1rem)] w-1 overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
                <line x1="1" y1="0" x2="1" y2="100" className="stroke-line-strong" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <line x1="1" y1="0" x2="1" y2="100" className="fix-draw stroke-red" strokeWidth="2" vectorEffect="non-scaling-stroke" pathLength={1} />
              </svg>
              {beats.map((b, i) => (
                <li key={b.t} className="relative">
                  <span aria-hidden className="absolute top-1 -left-10 grid size-6 place-items-center rounded-full bg-red font-mono text-[0.6875rem] text-white">
                    {i + 1}
                  </span>
                  <p className="display text-[1.375rem] tracking-[-0.025em]">{b.t}</p>
                  <p className="mt-1.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">{b.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </article>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <figure className="mt-14 md:mt-20" aria-labelledby="arch-cap" data-fade>
      <div className="grid gap-3 lg:grid-cols-[1fr_6.5rem_1.25fr_7.5rem_0.85fr] lg:items-stretch lg:gap-0">
        <div className="grid gap-3">
          <Node kicker="App" title="React Native + Expo" body={`${z.appScreens} screens · Android, iOS (PWA) and web from one codebase`} />
          <Node kicker="Admin dashboard" title="Next.js" body="Drag-and-drop board to hand-match every group, moderation, analytics" />
        </div>

        <Link2 labels={["auth", "RLS queries", "realtime"]} />

        <div className="rounded-[22px] bg-ink p-5 text-fg sm:p-6">
          <p className="label">Backend</p>
          <p className="display mt-2 text-[1.75rem] tracking-[-0.03em]">Supabase</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-[0.875rem] leading-snug">
            <Chip wide strong="Postgres">{z.tables} tables, RLS on every one</Chip>
            <Chip strong="Edge Functions">{z.edgeFunctions}, Deno</Chip>
            <Chip strong="Realtime">group chat</Chip>
            <Chip strong="Auth">email OTP</Chip>
            <Chip strong="pg_cron">{z.cronJobs} jobs</Chip>
          </ul>
        </div>

        <Link2 labels={["create order →", "← signed webhook"]} pay />

        <div className="flex flex-col justify-between rounded-[22px] bg-red p-5 text-white sm:p-6">
          <div>
            <p className="label text-white/80">Payments</p>
            <p className="display mt-2 text-[1.75rem] tracking-[-0.03em]">PayU</p>
          </div>
          <p className="mt-4 text-[0.875rem] leading-snug text-white/90">
            Orders created on the server. SHA-512 signed webhooks, verified in constant time, confirm the seat.
          </p>
        </div>
      </div>
      <figcaption id="arch-cap" className="mt-4 font-mono text-xs leading-relaxed text-paper-muted">
        Zen-Z, end to end. Everything except the third-party services was designed and built by one person. Ships through
        GitHub Actions to Google Play and Vercel.
      </figcaption>
    </figure>
  );
}

function Node({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="rounded-[22px] border border-paper-line bg-[#f3eee3] p-5 sm:p-6">
      <p className="label">{kicker}</p>
      <p className="display mt-2 text-[1.375rem] tracking-[-0.03em]">{title}</p>
      <p className="mt-2 text-[0.875rem] leading-snug text-paper-muted">{body}</p>
    </div>
  );
}

function Chip({ strong, children, wide }: { strong: string; children: ReactNode; wide?: boolean }) {
  return (
    <li className={`rounded-[12px] border border-line bg-ink-2 px-3 py-2.5 ${wide ? "col-span-2" : ""}`}>
      <span className="font-medium">{strong}</span>
      <span className="block text-muted">{children}</span>
    </li>
  );
}

/** A connector. The payment one carries the loop: a dot out to PayU, and back. */
function Link2({ labels, pay }: { labels: string[]; pay?: boolean }) {
  return (
    <div aria-hidden className="relative flex min-h-16 items-center justify-center lg:min-h-0">
      <span className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 lg:hidden ${pay ? "bg-red" : "bg-paper-ink/25"}`} />
      <span className={`absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 lg:block ${pay ? "bg-red" : "bg-paper-ink/25"}`} />
      {pay ? (
        <span className="pay-track absolute inset-y-0 left-1/2 w-0 lg:inset-x-0 lg:inset-y-auto lg:top-1/2 lg:left-0 lg:h-0 lg:w-auto">
          <span className="pay-dot" />
        </span>
      ) : null}
      <span className="relative flex flex-wrap justify-center gap-1 lg:flex-col lg:items-center">
        {labels.map((l) => (
          <span
            key={l}
            className={`rounded-full px-2 py-0.5 font-mono text-[0.6875rem] whitespace-nowrap ${pay ? "bg-red text-white" : "border border-paper-line bg-paper text-paper-muted"}`}
          >
            {l}
          </span>
        ))}
      </span>
    </div>
  );
}
