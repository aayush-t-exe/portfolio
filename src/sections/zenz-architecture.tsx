import type { CSSProperties, ReactNode } from "react";

/**
 * Zen-Z system diagram, built in HTML so it reflows (columns on desktop, a vertical
 * stack on mobile), stays crisp, and is readable by screen readers and search engines.
 */
export function ZenZArchitecture() {
  return (
    <figure data-reveal="clip" style={{ "--clip-r": "16px" } as CSSProperties} aria-labelledby="arch-caption">
      <div className="card overflow-hidden p-3 sm:p-5 lg:p-6">
        <div className="grid gap-2 lg:grid-cols-[1fr_6.5rem_1.3fr_6.5rem_0.9fr] lg:gap-0">
          <Column title="Clients">
            <Node name="Mobile + web app" detail="React Native (Expo), TypeScript" foot="20 app screens · booking flow · push" />
            <Node name="Admin panel" detail="Next.js" foot="Matching board · moderation · analytics" />
          </Column>

          <Connector labels={["auth", "RLS queries", "realtime"]} />

          <Column title="Supabase" emphasis>
            <div className="grid grid-cols-2 gap-2">
              <Node name="Postgres" detail="28 tables, RLS on every one" wide />
              <Node name="Auth" detail="Student accounts" />
              <Node name="Realtime" detail="Group chat" />
              <Node name="Edge Functions" detail="7 serverless functions" accent />
              <Node name="pg_cron" detail="Scheduled jobs" />
            </div>
          </Column>

          <Connector labels={["create order →", "← signed webhook"]} accent />

          <Column title="Services">
            <Node name="PayU" detail="Checkout + webhooks" accent />
            <Node name="Sentry" detail="Error monitoring" />
          </Column>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[10px] border border-dashed border-line-strong px-4 py-3 font-mono text-[11.5px] leading-relaxed text-muted">
          <span className="text-fg">ship</span>
          <span aria-hidden>→</span>
          GitHub Actions CI (37 test suites: Vitest, Jest, pgTAP)
          <span aria-hidden>→</span>
          Google Play + web (Vercel)
          <span className="sm:ml-auto">183 commits</span>
        </div>
      </div>
      <p className="sr-only">
        The mobile and web app and the Next.js admin panel talk to Supabase for authentication,
        database queries protected by row-level security, and realtime group chat. Supabase Edge
        Functions create PayU payment orders on the server and receive PayU&rsquo;s signed webhooks.
        Errors are reported to Sentry.
      </p>
      <figcaption id="arch-caption" className="mt-3 font-mono text-xs leading-relaxed text-muted">
        Fig. 1: Zen-Z architecture. Everything in this diagram was designed and built by one person.
      </figcaption>
    </figure>
  );
}

function Column({
  title,
  emphasis,
  children,
}: {
  title: string;
  emphasis?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-[12px] p-2.5 ${
        emphasis ? "bg-surface-2 ring-1 ring-line-strong" : "bg-bg ring-1 ring-line"
      }`}
    >
      <p className="label px-1 pt-0.5 pb-1">{title}</p>
      {children}
    </div>
  );
}

function Node({
  name,
  detail,
  foot,
  accent,
  wide,
}: {
  name: string;
  detail?: string;
  foot?: string;
  accent?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-[9px] border bg-surface px-3 py-2.5 ${wide ? "col-span-2" : ""} ${
        accent ? "border-accent/60 shadow-[0_0_0_3px_var(--accent-soft)]" : "border-line"
      }`}
    >
      <p className="flex items-center gap-2 text-[0.875rem] font-medium tracking-[-0.01em]">
        {accent ? <span aria-hidden className="size-1.5 rounded-full bg-accent" /> : null}
        {name}
      </p>
      {detail ? <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted">{detail}</p> : null}
      {foot ? <p className="mt-1.5 font-mono text-[10.5px] leading-snug text-muted">{foot}</p> : null}
    </div>
  );
}

function Connector({ labels, accent }: { labels: string[]; accent?: boolean }) {
  const line = accent ? "bg-accent/70" : "bg-line-strong";
  return (
    <div aria-hidden className="relative flex items-center justify-center py-1 lg:py-0">
      {/* mobile: vertical line; desktop: horizontal line */}
      <span className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 lg:hidden ${line}`} />
      <span className={`absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 lg:block ${line}`} />
      {accent ? (
        // The payment loop: Motion sends a dot out along "create order →" and back along
        // "← signed webhook". Vertical on mobile, horizontal on desktop.
        <span
          data-pulse
          className="absolute inset-y-0 left-1/2 -ml-[2.5px] w-[5px] lg:inset-x-0 lg:inset-y-auto lg:top-1/2 lg:-mt-[2.5px] lg:ml-0 lg:h-[5px] lg:w-auto"
        >
          <span className="absolute top-0 left-0 size-[5px] rounded-full bg-accent opacity-0 shadow-[0_0_0_3px_var(--accent-soft)]" />
        </span>
      ) : null}
      <div className="relative flex flex-wrap justify-center gap-1 lg:flex-col lg:items-center">
        {labels.map((l) => (
          <span
            key={l}
            className={`rounded-full border bg-surface px-2 py-0.5 text-center font-mono text-[10px] leading-tight whitespace-nowrap ${
              accent ? "border-accent/50 text-fg" : "border-line text-muted"
            }`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
