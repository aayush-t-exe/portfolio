import { Body, CaseHeader, Chapter, Lead } from "@/components/case";
import { CodeBlock } from "@/components/code-block";
import { BrowserFrame, Caption, PhoneFrame } from "@/components/frames";
import { ArrowUpRight } from "@/components/icons";
import { projects } from "@/lib/site";
import { stagger } from "@/lib/stagger";
import { ZenZArchitecture } from "@/sections/zenz-architecture";

const zenz = projects.zenz;

const VERIFY_SKETCH = `
// supabase/functions/payu-webhook: simplified sketch, not the production file
Deno.serve(async (req) => {
  const p = Object.fromEntries(await req.formData());

  // 1. Log every call first, before trusting any of it.
  await db.from("payment_webhooks").insert({ txnid: p.txnid, payload: p });

  // 2. Recompute PayU's reverse hash with our secret salt (SHA-512).
  const expected = await sha512([
    SALT, p.status, "", "", "", "", "",
    p.udf5, p.udf4, p.udf3, p.udf2, p.udf1,
    p.email, p.firstname, p.productinfo, p.amount, p.txnid, KEY,
  ].join("|"));

  // 3. A bad signature confirms nothing.
  if (expected !== p.hash) return new Response("invalid signature", { status: 401 });

  // 4. Only a verified success marks the booking as paid.
  if (p.status === "success") await confirmBooking(p.txnid);

  return new Response("ok");
});
`;

export function ZenZ() {
  return (
    <article id="zen-z" aria-labelledby="zenz-title" className="scroll-mt-20">
      <CaseHeader
        index="01"
        eyebrow="Founder & CTO"
        name="Zen-Z"
        headingId="zenz-title"
        tagline="Small groups of strangers, one plan, and nobody has to be the organiser."
        meta={[
          { term: "Role", value: "Founder & CTO, sole engineer" },
          { term: "Timeline", value: "Jul 2026 – now" },
          { term: "Platforms", value: "Android (Play Store), web, admin" },
          { term: "Stack", value: "React Native, Next.js, Supabase, PayU" },
        ]}
        actions={
          <>
            <a href={zenz.url} target="_blank" rel="noopener" className="btn btn-primary press">
              Visit {zenz.urlLabel}
              <ArrowUpRight size={16} />
            </a>
            {zenz.playStoreUrl ? (
              <a href={zenz.playStoreUrl} target="_blank" rel="noopener" className="btn btn-ghost press">
                Google Play
                <ArrowUpRight size={16} />
              </a>
            ) : null}
          </>
        }
      />

      {/* Hero composition: admin board with the app overlapping it */}
      <figure data-reveal className="mt-14 md:mt-20">
        <div
          className="relative overflow-hidden rounded-[22px] border border-line bg-surface-2 px-4 pt-6 pb-10 sm:px-10 sm:pt-12 sm:pb-16 lg:px-14"
          style={{
            backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <BrowserFrame
            title="Zen-Z admin · matching board"
            source={{ slot: "zenz/admin-board", alt: "Zen-Z admin panel: the drag-and-drop board used to hand-match students into groups" }}
            className="w-[88%] sm:w-[80%]"
          />
          <PhoneFrame
            source={{ slot: "zenz/app-home", alt: "Zen-Z app home screen showing upcoming group plans" }}
            sizes="(min-width: 1024px) 260px, 30vw"
            className="absolute right-[4%] bottom-[6%] w-[30%] sm:w-[23%] lg:right-[6%] lg:w-[21%]"
          />
        </div>
        <Caption>The admin matching board the team uses to hand-match every group, and the student app.</Caption>
      </figure>

      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <Chapter number="01" title="The problem">
          <Lead>
            Meeting new people at college shouldn&rsquo;t depend on luck, or on someone volunteering to
            organise.
          </Lead>
          <Body>
            <p>
              Zen-Z matches college students into <strong>small groups of 4–5 strangers</strong> and
              gives each group a plan: a café, a dinner, a movie or a game. Students pick a plan, book
              and pay in the app, and get matched into a group.
            </p>
            <p>
              Demand came first: <strong>65+ students joined the waitlist</strong> before launch, and
              Zen-Z&rsquo;s Instagram has grown to <strong>550 followers and 140K+ views</strong>.
            </p>
          </Body>
        </Chapter>

        <Chapter
          number="02"
          title="What I built"
          wide={
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1.15fr_1fr_1fr]">
              <Surface
                n="A"
                name="The student app"
                stack="React Native (Expo) · TypeScript"
                points={[
                  "Android and web from one codebase, ~25 screens",
                  "5-step booking flow, from picking a plan to payment",
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
              <figure className="col-span-full grid grid-cols-2 gap-4 sm:gap-6 lg:hidden">
                <PhoneFrame source={{ slot: "zenz/app-booking", alt: "Zen-Z booking flow" }} sizes="45vw" />
                <PhoneFrame source={{ slot: "zenz/app-chat", alt: "Zen-Z realtime group chat" }} sizes="45vw" />
              </figure>
            </div>
          }
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div>
              <Lead>Three products, one engineer. I built every surface and I run them in production.</Lead>
              <Body>
                <p>
                  As the only engineer, I owned the whole system: product decisions, data model, mobile
                  app, internal tools, payments, CI and releases. Shipped to Google Play and the web
                  across <strong>179 commits</strong>, with <strong>37 test suites</strong> running in CI.
                </p>
              </Body>
            </div>
            <div className="hidden gap-4 lg:flex">
              <PhoneFrame
                source={{ slot: "zenz/app-booking", alt: "Zen-Z booking flow" }}
                sizes="170px"
                className="w-[150px] translate-y-6"
              />
              <PhoneFrame
                source={{ slot: "zenz/app-chat", alt: "Zen-Z realtime group chat" }}
                sizes="170px"
                className="w-[150px]"
              />
            </div>
          </div>
        </Chapter>

        <Chapter number="03" title="Architecture" wide={<ZenZArchitecture />}>
          <Lead>Boring, proven parts, wired so that the database enforces the rules.</Lead>
          <Body>
            <p>
              Supabase gives me Postgres, auth, realtime and serverless functions in one place, which
              is the right trade for a solo founder. Access control lives in the database:{" "}
              <strong>every one of the 28 tables has row-level security</strong>, so the access rules
              hold even if the app has a bug. Anything that touches money runs in Edge
              Functions on the server, never in the client.
            </p>
          </Body>
        </Chapter>

        <Chapter number="04" title="Incident">
          <Incident />
        </Chapter>

        <Chapter number="05" title="Results" wide={<Results />}>
          <Lead>Real students, real money.</Lead>
          <Body>
            <p>
              Zen-Z is live on the Play Store. It reached <strong>150+ users in its first two days</strong>,
              has taken <strong>₹33K+</strong> in revenue so far, and I pitched it to the judging panel at
              JNU&rsquo;s Shark Tank in September 2026.
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
        <span className="font-mono text-[11px] text-muted">{stack}</span>
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

function Incident() {
  return (
    <div>
      <div data-reveal className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] font-medium text-accent uppercase">
          Post-launch incident
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted uppercase">
          Resolved
        </span>
      </div>
      <p
        data-reveal
        style={stagger(1)}
        className="mt-5 max-w-[22ch] text-[clamp(1.75rem,3.6vw,2.625rem)] leading-[1.08] font-medium tracking-[-0.035em]"
      >
        A student paid. The app said <span className="serif-em text-accent">unpaid.</span>
      </p>
      <Body>
        <p>
          After launch, a real booking that had been paid for got stuck as unpaid. A student had paid
          real money and the product told them they hadn&rsquo;t. For an app that asks strangers to
          trust it with their evenings and their money, that is the worst kind of bug.
        </p>
        <p>I rebuilt the payment path around one rule: <strong>the server is the only source of payment truth.</strong></p>
      </Body>

      <ol data-reveal className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          {
            t: "Verify, don't trust",
            d: "Bookings are confirmed only when PayU's webhook arrives with a valid SHA-512 signature, recomputed on the server with a secret salt.",
          },
          {
            t: "Log everything",
            d: "Every webhook call is written to the database before anything else runs, so any payment can be traced end to end.",
          },
          {
            t: "Client stays dumb",
            d: "Orders are created server-side and the app never marks anything as paid. It waits for the server's answer.",
          },
        ].map((s, i) => (
          <li key={s.t} className="rounded-[12px] border border-line bg-surface p-4">
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <p className="mt-2 font-medium tracking-[-0.01em]">{s.t}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.d}</p>
          </li>
        ))}
      </ol>

      <div data-reveal className="mt-8">
        <CodeBlock
          code={VERIFY_SKETCH}
          filename="payu-webhook/index.ts"
          badge="simplified sketch"
          label="Simplified sketch of the PayU webhook handler"
        />
      </div>

      <p data-reveal className="mt-6 max-w-[62ch] border-l-2 border-accent pl-4 text-[1.0625rem] leading-relaxed">
        <span className="font-medium">The guarantee now:</span>{" "}
        <span className="text-muted">
          no booking is confirmed without a verified payment, and every payment question can be
          answered from the logs.
        </span>
      </p>
    </div>
  );
}

function Results() {
  const metrics = [
    { v: "150+", l: "users in the first 2 days after launch" },
    { v: "₹33K+", l: "total revenue so far" },
    { v: "65+", l: "students on the waitlist before launch" },
    { v: "140K+", l: "Instagram views · 550 followers" },
  ];
  const build = ["~25 screens", "28 tables · RLS on all", "7 Edge Functions", "37 test suites in CI", "179 commits"];
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
    </div>
  );
}
