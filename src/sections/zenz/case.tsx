import { Body, CaseHeader, CasePage, CaseToc, Chapter, Lead, NextLinks, type TocItem } from "@/components/case";
import { Caption, PhoneRail } from "@/components/frames";
import { ArrowUpRight } from "@/components/icons";
import { ZenzMedia } from "@/components/stage";
import { facts, projects, routes } from "@/lib/site";
import { stagger } from "@/lib/stagger";
import { ZenZArchitecture } from "@/sections/zenz/architecture";
import { Incident } from "@/sections/zenz/incident";
import game from "@/assets/zenz/flow-1-game.jpg";
import slot from "@/assets/zenz/flow-2-slot.jpg";
import budget from "@/assets/zenz/flow-3-budget.jpg";
import group from "@/assets/zenz/flow-4-group.jpg";
import plan from "@/assets/zenz/flow-5-plan.jpg";
import pay from "@/assets/zenz/flow-6-pay.jpg";

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
  {
    step: "01",
    image: game,
    title: "Pick a game",
    caption: "Choose what you're in the mood for.",
    alt: "Zen-Z booking, pick a game: Box Cricket, Football, 8-Ball Pool and Pickleball with prices and durations",
  },
  {
    step: "02",
    image: slot,
    title: "Pick a slot",
    caption: "One fixed weekly time, so groups can form.",
    alt: "Zen-Z booking, pick a slot: a fixed weekly slot, Sunday 11th at 5:00 pm, selected",
  },
  {
    step: "03",
    image: budget,
    title: "Set a budget",
    caption: "Used to match similar budgets.",
    alt: "Zen-Z booking, budget range: under ₹200 selected, with ₹200–400 and ₹400+ options",
  },
  {
    step: "04",
    image: group,
    title: "Choose the group",
    caption: "Mixed, women only or men only.",
    alt: "Zen-Z booking, group dynamic: Surprise me (mixed) selected, with Women only and Men only options",
  },
  {
    step: "05",
    image: plan,
    title: "Confirm the plan",
    caption: "Every choice on one screen.",
    alt: "Zen-Z booking summary: Cafés, Sunday 11th at 5:00 pm, group of 4–5 mixed, under ₹200, with a Save my seat button",
  },
  {
    step: "Pay",
    image: pay,
    title: "Pay to hold the seat",
    caption: "The venue is revealed before the event.",
    alt: "Zen-Z payment screen: 8-Ball Pool, Saturday 10th at 6:00 pm, group of 4, ₹70, with a Pay ₹70 button",
  },
];

const external = { target: "_blank", rel: "noopener" } as const;
const newTab = <span className="sr-only"> (opens in new tab)</span>;

export function ZenZCase() {
  return (
    <CasePage toc={toc}>
      <CaseHeader
        eyebrow="Case study · Founder & CTO"
        name="Zen-Z"
        tagline="Small groups of strangers, one plan, and nobody has to be the organiser."
        tldr={[
          { term: "Problem", value: "Meeting new people at college depends on luck, or on someone organising." },
          { term: "Built", value: "The student app, the admin panel and the Supabase backend with PayU payments. Solo." },
          { term: "Result", value: "Live on Google Play with paying users, and a public, tested codebase." },
        ]}
        meta={[
          { term: "Role", value: "Founder & CTO, sole engineer" },
          { term: "Timeline", value: "Jul 2026 – now" },
          { term: "Platforms", value: "Android, iOS (PWA), web, admin" },
          { term: "Stack", value: "React Native, Next.js, Supabase, PayU" },
        ]}
        actions={
          <>
            <a href={zenz.url} {...external} className="btn btn-primary press">
              Visit {zenz.urlLabel}
              <ArrowUpRight size={16} />
              {newTab}
            </a>
            <a href={zenz.playStoreUrl} {...external} className="btn btn-ghost press">
              Google Play
              <ArrowUpRight size={16} />
              {newTab}
            </a>
            <a href={zenz.sourceUrl} {...external} className="btn btn-ghost press">
              Source
              <ArrowUpRight size={16} />
              {newTab}
            </a>
          </>
        }
        media={
          <figure>
            <ZenzMedia eager sizes={{ admin: "(min-width: 1280px) 780px, 64vw", phone: "(min-width: 1280px) 290px, 24vw" }} />
            <Caption>
              The live admin dashboard with its &ldquo;Payments to check&rdquo; queue, and the app&rsquo;s payment screen.
            </Caption>
          </figure>
        }
      />

      <CaseToc items={toc} />

      <div className="container-page mt-14 space-y-16 md:mt-20 md:space-y-24">
        <Chapter id="problem" title="The problem">
          <Lead>
            Meeting new people at college shouldn&rsquo;t depend on luck, or on someone volunteering to organise.
          </Lead>
          <Body>
            <p>
              <span className="whitespace-nowrap">Zen-Z</span> matches college students into <strong>small groups of strangers</strong>{" "}
              (4–5 people; sports up to 14) and gives each group a plan: a café, a dinner, a movie or a game. Cafés and dinners are
              free to book (venues pay a commission); movies and sports are paid. Demand came first:{" "}
              <strong>{z.waitlist} students joined the waitlist</strong> before launch.
            </p>
          </Body>
        </Chapter>

        <Chapter
          id="built"
          title="What I built"
          wide={
            <div className="space-y-14 md:space-y-20">
              <figure>
                <PhoneRail label="The Zen-Z booking flow, step by step" items={flow} tone="dark" numbered />
                <div className="mt-6 md:mt-8">
                  <Caption>The booking flow as it ships: five choices, then payment.</Caption>
                </div>
              </figure>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Surface
                  n="A"
                  name="The student app"
                  stack="React Native (Expo)"
                  points={[
                    `Android, iOS (PWA) and web from one codebase, ${z.appScreens} screens`,
                    "Realtime group chat and push notifications",
                  ]}
                />
                <Surface
                  n="B"
                  name="The admin panel"
                  stack="Next.js"
                  points={["A drag-and-drop board to hand-match every group", "Moderation queue and analytics"]}
                />
                <Surface
                  n="C"
                  name="The backend"
                  stack="Supabase · Deno"
                  points={[`${z.tables} tables, row-level security on every one`, "PayU orders created on the server"]}
                  className="sm:col-span-2 lg:col-span-1"
                />
              </div>
            </div>
          }
        >
          <Lead>Three products, one engineer. I built every surface and I run them in production.</Lead>
          <Body>
            <p>
              I owned the whole system: product decisions, data model, mobile app, internal tools, payments, CI and releases,
              across <strong>{z.commits} commits</strong>.
            </p>
          </Body>
        </Chapter>

        <Chapter id="architecture" title="Architecture" wide={<ZenZArchitecture />}>
          <Lead>Boring, proven parts, wired so that the database enforces the rules.</Lead>
          <Body>
            <p>
              Supabase gives one engineer Postgres, auth, realtime and serverless functions in one place. Access control lives in
              the database: <strong>row-level security on all {z.tables} tables</strong>, so the rules hold even if the app has a
              bug. Anything that touches money runs in Edge Functions, never in the client, and a database trigger seals free
              bookings so the client can&rsquo;t fake a ₹0 price.
            </p>
          </Body>
        </Chapter>

        <Chapter id="incident" title="Incident">
          <Incident />
        </Chapter>

        <Chapter id="results" title="Results" wide={<Results />}>
          <Lead>Real students, real money.</Lead>
          <Body>
            <p>
              <span className="whitespace-nowrap">Zen-Z</span> is live on Google Play, and I pitched it to the judging panel at
              JNU&rsquo;s Shark Tank in September 2026.
            </p>
          </Body>
        </Chapter>
      </div>

      <NextLinks
        links={[
          { href: routes.prelims, label: "PrelimsDaily", note: "Next case study" },
          { href: routes.stack, label: "The stack, and where it shipped", note: "Tools" },
        ]}
      />
    </CasePage>
  );
}

function Surface({
  n,
  name,
  stack,
  points,
  className = "",
}: {
  n: string;
  name: string;
  stack: string;
  points: string[];
  className?: string;
}) {
  return (
    <div data-reveal className={`card flex flex-col p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="grid size-7 place-items-center rounded-full border border-line-strong font-mono text-xs">{n}</span>
        <span className="font-mono text-xs text-muted">{stack}</span>
      </div>
      <p className="mt-6 text-xl font-medium tracking-[-0.02em]">{name}</p>
      <ul className="mt-3 space-y-2 text-[0.9375rem] leading-snug text-muted">
        {points.map((p) => (
          <li key={p} className="flex gap-2.5">
            <span aria-hidden className="mt-[0.55em] h-px w-2.5 shrink-0 bg-line-strong" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Results() {
  const metrics = [
    { v: z.users, l: "users in the first 2 days after launch" },
    { v: z.revenue, l: "total revenue so far" },
    { v: z.waitlist, l: "students on the waitlist before launch" },
    {
      v: z.igViews,
      l: (
        <>
          views on{" "}
          <a href={zenz.instagram} {...external} className="link text-fg">
            Instagram{newTab}
          </a>{" "}
          · {z.igFollowers} followers
        </>
      ),
    },
  ];
  // Receipts: label left, number right (tabular mono), like a ledger.
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
    ["Co-authored with Claude", z.claudeCommits],
  ];
  const along = [
    "Moved payments from Razorpay to PayU mid-build.",
    "Got past a Play Store rejection by building a reviewer sign-in path.",
    `The pgTAP tests run in CI against a real hosted Postgres. Writing them found and fixed ${z.rlsBugsFound} RLS and authorization bugs.`,
  ];
  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div key={m.v} data-reveal style={stagger(i)} className="card flex flex-col-reverse justify-end gap-2 p-5 sm:p-6">
            <dt className="text-sm leading-snug text-muted">{m.l}</dt>
            <dd className="num text-[clamp(2.25rem,5vw,3.5rem)] leading-none">{m.v}</dd>
          </div>
        ))}
      </dl>
      <div className="rounded-[14px] border border-line p-5 sm:p-6">
        <p className="text-sm font-medium">Under the hood</p>
        <dl className="mt-3 grid gap-x-10 sm:grid-cols-2">
          {build.map(([label, n]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-[0.9375rem]">
              <dt className="text-muted">{label}</dt>
              <dd className="num text-fg">{n}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-[14px] border border-line p-5 sm:p-6">
        <p className="text-sm font-medium">Along the way</p>
        <ul className="mt-3 grid gap-x-8 gap-y-2.5 text-[0.9375rem] leading-relaxed text-muted md:grid-cols-3">
          {along.map((t) => (
            <li key={t} className="flex gap-2.5">
              <span aria-hidden className="mt-[0.6em] h-px w-2.5 shrink-0 bg-line-strong" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
