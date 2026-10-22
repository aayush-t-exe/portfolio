import { Body, CaseHero, CasePage, CaseToc, Chapter, NextLinks, Rail, type TocItem } from "@/components/case";
import { ZenzLead } from "@/components/case-media";
import { ArrowUpRight } from "@/components/icons";
import { Phone } from "@/components/ui/phone";
import { Architecture } from "@/components/zenz-architecture";
import { facts, projects, routes } from "@/lib/site";
import { screens } from "@/sections/home/zenz-data";
import { Incident } from "@/sections/zenz/incident";

const zenz = projects.zenz;
const z = facts.zenz;

const toc: TocItem[] = [
  { id: "problem", label: "Problem" },
  { id: "built", label: "Built" },
  { id: "architecture", label: "Architecture" },
  { id: "incident", label: "Incident" },
  { id: "results", label: "Results" },
];

/** The booking flow as it ships: five choices, then payment. */
const flow = [
  { title: "Pick a game", caption: "Whatever you're in the mood for.", shot: screens.game },
  { title: "Pick a slot", caption: "One weekly time, so groups form.", shot: screens.slot },
  { title: "Set a budget", caption: "Used to match similar budgets.", shot: screens.budget },
  { title: "Choose the group", caption: "Mixed, women only or men only.", shot: screens.group },
  { title: "Confirm the plan", caption: "Every choice, one screen.", shot: screens.plan },
  { title: "Pay to hold the seat", caption: "The venue is revealed before the event.", shot: screens.pay },
];

const external = { target: "_blank", rel: "noopener" } as const;
const newTab = <span className="sr-only"> (opens in new tab)</span>;

export function ZenZCase() {
  return (
    <CasePage toc={toc}>
      <CaseHero
        label="Case study · Founder & CTO"
        name="Zen-Z"
        tagline="Small groups of strangers, one plan, and nobody has to be the organiser."
        actions={
          <>
            <a href={zenz.url} {...external} className="btn btn-red press" data-magnetic>
              <span data-magnetic-label>
                Visit {zenz.urlLabel} <ArrowUpRight size={16} />
                {newTab}
              </span>
            </a>
            <a href={zenz.playStoreUrl} {...external} className="btn btn-ghost press" data-magnetic>
              <span data-magnetic-label>
                Google Play <ArrowUpRight size={16} />
                {newTab}
              </span>
            </a>
            <a href={zenz.sourceUrl} {...external} className="btn btn-ghost press" data-magnetic>
              <span data-magnetic-label>
                Source <ArrowUpRight size={16} />
                {newTab}
              </span>
            </a>
          </>
        }
        meta={[
          { term: "Role", value: "Founder & CTO, sole engineer" },
          { term: "Timeline", value: `${z.since} – now` },
          { term: "Platforms", value: "Android, iOS (PWA), web, admin" },
          { term: "Stack", value: "React Native, Next.js, Supabase, PayU" },
        ]}
        media={<ZenzLead />}
        tldr={[
          { term: "Problem", value: "Meeting new people at college depends on luck, or on someone organising." },
          { term: "Built", value: "The student app, the admin dashboard and the Supabase backend with PayU payments. Solo." },
          { term: "Result", value: `Live on Google Play: ${z.users} users ${z.usersWindow}, ${z.revenue} revenue.` },
        ]}
      />

      <CaseToc items={toc} />

      <Chapter
        id="problem"
        n={1}
        label="Problem"
        title="Meeting people shouldn't depend on luck."
        lead="Or on someone volunteering to organise."
      >
        <Body>
          <p>
            <span className="whitespace-nowrap">Zen-Z</span> matches college students into <strong>small groups of strangers</strong> (4–5
            people; sports up to 14) and gives each group a plan: a café, a dinner, a movie or a game. Cafés and dinners are free to
            book (venues pay a commission); movies and sports are paid. Demand came first: <strong>{z.waitlist} students joined the
            waitlist</strong> before launch.
          </p>
        </Body>
      </Chapter>

      <Chapter
        id="built"
        n={2}
        label="What I built"
        title="Three products, one engineer."
        lead="Product decisions, data model, app, internal tools, payments, CI and releases."
        bleed={
          <>
            <Rail label="The Zen-Z booking flow, step by step">
              {flow.map((f, i) => (
                <li key={f.title} className="w-[68vw] max-w-[17rem] shrink-0 snap-center md:w-[17rem]">
                  <Phone shots={[f.shot]} sizes="(min-width: 768px) 272px, 68vw" />
                  <p className="label mt-5 text-red-text">{i < 5 ? String(i + 1).padStart(2, "0") : "Pay"}</p>
                  <h3 className="display mt-1 text-[1.5rem] tracking-[-0.03em]">{f.title}</h3>
                  <p className="mt-1 text-[0.9375rem] text-muted">{f.caption}</p>
                </li>
              ))}
            </Rail>
            <div className="container-page mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { n: "A", name: "The student app", stack: "React Native (Expo)", body: `Android, iOS (PWA) and web from one codebase, ${z.appScreens} screens, realtime group chat, push notifications.` },
                { n: "B", name: "The admin dashboard", stack: "Next.js", body: "A drag-and-drop board the team uses to hand-match every group, plus moderation and analytics." },
                { n: "C", name: "The backend", stack: "Supabase · Deno", body: `Postgres with RLS on all ${z.tables} tables, ${z.edgeFunctions} Edge Functions, ${z.cronJobs} cron jobs, PayU payments.` },
              ].map((s) => (
                <div key={s.n} className="card flex flex-col p-6" data-fade>
                  <div className="flex items-center justify-between">
                    <span className="grid size-8 place-items-center rounded-full bg-red font-mono text-xs text-white">{s.n}</span>
                    <span className="font-mono text-xs text-muted">{s.stack}</span>
                  </div>
                  <h3 className="display mt-6 text-[1.5rem] tracking-[-0.03em]">{s.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </>
        }
      />

      <Chapter
        id="architecture"
        n={3}
        label="Architecture"
        tone="paper"
        title="Boring, proven parts. The database enforces the rules."
      >
        <Body>
          <p>
            Access rules live in the database (<strong>row-level security on all {z.tables} tables</strong>), so they hold even if the
            app has a bug. Money only moves in Edge Functions, and a trigger seals free bookings so the client can&rsquo;t fake a ₹0
            price.
          </p>
        </Body>
        <Architecture className="mt-12 md:mt-16" />
      </Chapter>

      <Chapter id="incident" n={4} label="Incident" title="When a real payment went missing, I fixed it the same day.">
        <Incident />
      </Chapter>

      <Chapter id="results" n={5} label="Results" tone="paper" title="Real students, real money." lead={`Live on Google Play, and pitched to the judging panel at JNU's Shark Tank (${z.sharkTank}).`}>
        <Results />
      </Chapter>

      <NextLinks
        links={[
          { href: routes.prelims, label: "PrelimsDaily", note: "Next case study" },
          { href: routes.stack, label: "The stack", note: "Every tool, and where it shipped" },
        ]}
      />
    </CasePage>
  );
}

function Results() {
  const metrics = [
    { v: z.users, l: `users in the first ${z.usersDays} after launch` },
    { v: z.revenue, l: "total revenue so far" },
    { v: z.waitlist, l: "students on the waitlist before launch" },
    { v: z.igViews, l: `views on Instagram · ${z.igFollowers} followers` },
  ];
  const build: Array<[string, number]> = [
    ["Tables, row-level security on every one", z.tables],
    ["SQL migrations", z.migrations],
    ["Postgres functions", z.dbFunctions],
    ["Edge Functions", z.edgeFunctions],
    ["pg_cron jobs", z.cronJobs],
    ["CI jobs", z.ciJobs],
    ["Test suites in CI", z.testSuites],
    ["pgTAP assertions", z.pgtapAssertions],
    ["Commits", z.commits],
  ];
  const along = [
    "Moved payments from Razorpay to PayU mid-build.",
    "Got past a Play Store rejection with a reviewer sign-in path.",
    `Writing the pgTAP tests found and fixed ${z.rlsBugsFound} RLS and authorization bugs.`,
  ];
  return (
    <div className="mt-12 space-y-4 md:mt-16">
      <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-fade-group>
        {metrics.map((m) => (
          <div key={m.v} className="flex flex-col-reverse justify-end gap-3 rounded-[22px] bg-ink p-6 text-fg">
            <dt className="text-sm leading-snug text-muted">{m.l}</dt>
            <dd className="num text-[clamp(2.5rem,5vw,4rem)] leading-[0.9]">{m.v}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[22px] border border-paper-line p-6">
          <p className="label">Under the hood</p>
          <dl className="mt-3">
            {build.map(([label, n]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 border-b border-paper-line py-2.5 text-[0.9375rem] last:border-0">
                <dt className="text-paper-muted">{label}</dt>
                <dd className="num text-lg">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-[22px] border border-paper-line p-6">
          <p className="label">Along the way</p>
          <ul className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed">
            {along.map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-red" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
