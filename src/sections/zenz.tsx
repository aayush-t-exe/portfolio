import type { CSSProperties } from "react";
import { Body, CaseHeader, Chapter, Lead } from "@/components/case";
import { BrowserFrame, Caption, PhoneFrame, PhoneRail } from "@/components/frames";
import { ArrowUpRight } from "@/components/icons";
import { facts, projects } from "@/lib/site";
import { stagger } from "@/lib/stagger";
import { ZenZArchitecture } from "@/sections/zenz-architecture";
import { Incident } from "@/sections/zenz-incident";
import adminBand from "@/assets/zenz/admin-band.png";
import home from "@/assets/zenz/home.jpg";
import game from "@/assets/zenz/flow-1-game.jpg";
import slot from "@/assets/zenz/flow-2-slot.jpg";
import budget from "@/assets/zenz/flow-3-budget.jpg";
import group from "@/assets/zenz/flow-4-group.jpg";
import plan from "@/assets/zenz/flow-5-plan.jpg";
import pay from "@/assets/zenz/flow-6-pay.jpg";

const zenz = projects.zenz;

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
    caption: "Used to match people with similar budgets.",
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



export function ZenZ() {
  return (
    <article id="zen-z" aria-labelledby="zenz-title" className="cv-auto [--cv-h:6000px]">
      <CaseHeader
        index="01"
        eyebrow="Founder & CTO"
        name="Zen-Z"
        headingId="zenz-title"
        tagline="Small groups of strangers, one plan, and nobody has to be the organiser."
        tldr={[
          { term: "Problem", value: "Meeting new people at college depends on luck, or on someone organising." },
          {
            term: "Built",
            value: "The student app (Android, iOS and web), the admin panel and the Supabase backend with PayU payments. Solo.",
          },
          { term: "Result", value: "Live on Google Play with paying users, and a public, tested codebase." },
        ]}
        meta={[
          { term: "Role", value: "Founder & CTO, sole engineer" },
          { term: "Timeline", value: "Jul 2026 – now" },
          { term: "Platforms", value: "Android, iOS (PWA), web, admin" },
          { term: "Stack", value: "React Native, Next.js, Supabase, PayU" },
          { term: "Outcome", value: "Live on Google Play, paying users" },
        ]}
        actions={
          <>
            <a href={zenz.url} target="_blank" rel="noopener" className="btn btn-primary press">
              Visit {zenz.urlLabel}
              <ArrowUpRight size={16} />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href={zenz.playStoreUrl} target="_blank" rel="noopener" className="btn btn-ghost press">
              Google Play
              <ArrowUpRight size={16} />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href={zenz.sourceUrl} target="_blank" rel="noopener" className="btn btn-ghost press">
              Source
              <ArrowUpRight size={16} />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </>
        }
      />

      {/* Hero composition: the live admin dashboard with the student app overlapping it.
          Below sm only the phone shows. The phone settles in after the dashboard (data-follow). */}
      <figure data-reveal="clip" style={{ "--clip-r": "22px" } as CSSProperties} className="mt-14 md:mt-20">
        <div
          className="relative flex justify-center overflow-hidden rounded-[22px] border border-line bg-surface-2 px-4 py-8 sm:aspect-[2/1] sm:items-center sm:justify-start sm:px-[5%] sm:py-0"
          style={{
            backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <BrowserFrame
            title="admin.zen-z.site"
            shot={{
              image: adminBand,
              alt: "Zen-Z admin dashboard: pending reports and payments to check, both at zero, with the students and reports tools below",
            }}
            sizes="(min-width: 1024px) 800px, 72vw"
            className="hidden w-[71%] sm:block"
          />
          <div
            data-follow
            className="w-[62vw] max-w-[260px] sm:absolute sm:top-1/2 sm:right-[6%] sm:w-[19%] sm:max-w-none sm:-translate-y-1/2"
          >
            <PhoneFrame
              tone="dark"
              shot={{
                image: home,
                alt: "Zen-Z app home screen: Welcome Aayush, with Cafés, Dinners, Movies and Sports to pick from",
              }}
              sizes="(min-width: 640px) 22vw, 62vw"
            />
          </div>
        </div>
        <Caption>
          The live admin dashboard, including the &ldquo;Payments to check&rdquo; queue, beside the
          student app&rsquo;s home screen.
        </Caption>
      </figure>

      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <Chapter title="The problem">
          <Lead>
            Meeting new people at college shouldn&rsquo;t depend on luck, or on someone volunteering to
            organise.
          </Lead>
          <Body>
            <p>
              <span className="whitespace-nowrap">Zen-Z</span> matches college students into{" "}
              <strong>small groups of strangers</strong> (4–5 people; sports up to 14) and gives each
              group a plan: a café, a dinner, a movie or a game. Students book in the app and get
              matched into a group. Cafés and dinners are free to book (venues pay a commission);
              movies and sports are paid.
            </p>
            <p>
              Demand came first: <strong>{facts.zenz.waitlist} students joined the waitlist</strong> before
              launch.
            </p>
          </Body>
        </Chapter>

        <Chapter title="What I built"
          wide={
            <div className="space-y-16 md:space-y-20">
            <figure>
              <PhoneRail label="The Zen-Z booking flow, step by step" items={flow} tone="dark" numbered />
              <div className="mt-6 md:mt-8">
                <Caption>The booking flow as it ships: five choices, then payment.</Caption>
              </div>
            </figure>
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1.15fr_1fr_1fr]">
              <Surface
                n="A"
                name="The student app"
                stack="React Native (Expo) · TypeScript"
                points={[
                  `Android, iOS (PWA) and web from one codebase, ${facts.zenz.appScreens} app screens`,
                  "A booking flow of five choices, then payment",
                  "Realtime group chat and push notifications",
                ]}
              />
              <Surface
                n="B"
                name="The admin panel"
                stack="Next.js"
                points={[
                  "Drag-and-drop matching board the team uses to hand-match every group",
                  "Moderation queue",
                  "Analytics charts",
                ]}
              />
              <Surface
                n="C"
                name="The backend"
                stack="Supabase · Postgres · Deno"
                points={[
                  "28-table schema with row-level security on every table",
                  "7 Edge Functions and pg_cron scheduled jobs",
                  "PayU payments with server-side order creation",
                ]}
                className="sm:col-span-2 lg:col-span-1"
              />
            </div>
            </div>
          }
        >
          <Lead>Three products, one engineer. I built every surface and I run them in production.</Lead>
          <Body>
            <p>
              As the only engineer, I owned the whole system: product decisions, data model, mobile
              app, internal tools, payments, CI and releases. Shipped to Google Play and the web
              across <strong>{facts.zenz.commits} commits</strong>, with{" "}
              <strong>{facts.zenz.testSuites} test suites</strong> running in CI.
            </p>
          </Body>
        </Chapter>

        <Chapter title="Architecture" wide={<ZenZArchitecture />}>
          <Lead>Boring, proven parts, wired so that the database enforces the rules.</Lead>
          <Body>
            <p>
              Supabase gives me Postgres, auth, realtime and serverless functions in one place, which
              is the right trade for a solo founder. Access control lives in the database:{" "}
              <strong>every one of the {facts.zenz.tables} tables has row-level security</strong>, so the access rules
              hold even if the app has a bug. Anything that touches money runs in Edge
              Functions on the server, never in the client.
            </p>
            <p>
              The schema grew through <strong>{facts.zenz.migrations} SQL migrations</strong> and{" "}
              <strong>{facts.zenz.dbFunctions} Postgres functions</strong>. {facts.zenz.cronJobs} pg_cron jobs keep it moving: notifications
              flush and venues are revealed every minute, and slots roll over hourly. Free cafés and
              dinners are sealed by a database trigger, so the client can&rsquo;t fake a ₹0 price.
              Profile photos are protected by RLS and a view that leaves the photo column out, in a
              private storage bucket; the database layers are tested.
            </p>
          </Body>
        </Chapter>

        <Chapter title="Incident">
          <Incident />
        </Chapter>

        <Chapter title="Results" wide={<Results />}>
          <Lead>Real students, real money.</Lead>
          <Body>
            <p>
              <span className="whitespace-nowrap">Zen-Z</span> is live on Google Play, and I pitched it
              to the judging panel at JNU&rsquo;s Shark Tank in September 2026.
            </p>
          </Body>
        </Chapter>
      </div>
    </article>
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
        <span className="grid size-7 place-items-center rounded-full border border-line-strong font-mono text-xs">
          {n}
        </span>
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
  const z = facts.zenz;
  const metrics = [
    { v: z.users, l: "users in the first 2 days after launch" },
    { v: z.revenue, l: "total revenue so far" },
    { v: z.waitlist, l: "students on the waitlist before launch" },
    {
      v: z.igViews,
      l: (
        <>
          views on{" "}
          <a href={projects.zenz.instagram} target="_blank" rel="noopener" className="link text-fg">
            Instagram<span className="sr-only"> (opens in new tab)</span>
          </a>{" "}
          · {z.igFollowers} followers
        </>
      ),
    },
  ];
  const build = [
    `${z.appScreens} app screens`,
    `${z.tables} tables · RLS on all`,
    `${z.migrations} migrations`,
    `${z.edgeFunctions} Edge Functions`,
    `${z.ciJobs}-job CI`,
    `${z.pgtapAssertions} pgTAP assertions`,
    `${z.commits} commits · ${z.claudeCommits} with Claude`,
  ];
  const along = [
    "Moved payments from Razorpay to PayU mid-build.",
    "Got past a Play Store rejection by building a reviewer sign-in path.",
    "Ships to iOS as a PWA, tested on BrowserStack; the native app updates over the air with EAS Update.",
    `${z.pgtapAssertions} pgTAP assertions run in CI against a real hosted Postgres. Writing them found and fixed ${z.rlsBugsFound} RLS and authorization bugs, and another test caught a function that anyone with the public key could call to delete any account.`,
  ];
  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div key={m.v} data-reveal style={stagger(i)} className="card flex flex-col-reverse justify-end gap-2 p-5 sm:p-6">
            <dt className="text-sm leading-snug text-muted">{m.l}</dt>
            <dd className="text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-medium tracking-[-0.045em] tabular-nums">
              {m.v}
            </dd>
          </div>
        ))}
      </dl>
      <div data-reveal className="flex flex-wrap items-center gap-2 rounded-[14px] border border-dashed border-line-strong p-4">
        <span className="label mr-2">Under the hood</span>
        {build.map((b) => (
          <span key={b} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs">
            {b}
          </span>
        ))}
      </div>
      <div data-reveal className="rounded-[14px] border border-line p-5 sm:p-6">
        <p className="label">Along the way</p>
        <ul className="mt-3 grid gap-x-8 gap-y-2.5 text-[0.9375rem] leading-relaxed text-muted md:grid-cols-2">
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
