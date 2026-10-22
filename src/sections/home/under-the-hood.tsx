import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Architecture } from "@/components/zenz-architecture";
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
