import type { ReactNode } from "react";
import { facts } from "@/lib/site";

const z = facts.zenz;

/**
 * Zen-Z, end to end, in HTML (reflows: a row on desktop, a stack on phones; readable by screen
 * readers). Designed for a cream (.on-paper) ground. The payment connector carries the loop: an
 * order goes out to PayU, a signed webhook comes back (CSS, stopped under reduced motion).
 */
export function Architecture({ className = "mt-14 md:mt-20" }: { className?: string }) {
  return (
    <figure className={className} aria-labelledby="arch-cap" data-fade>
      <div className="grid gap-3 lg:grid-cols-[1fr_6.5rem_1.25fr_7.5rem_0.85fr] lg:items-stretch lg:gap-0">
        <div className="grid gap-3">
          <Node kicker="App" title="React Native + Expo" body={`${z.appScreens} screens · Android, iOS (PWA) and web from one codebase`} />
          <Node kicker="Admin dashboard" title="Next.js" body="Drag-and-drop board to hand-match every group, moderation, analytics" />
        </div>

        <Link2 labels={["auth", "RLS queries", "realtime"]} />

        <div className="rounded-[22px] bg-ink p-5 text-fg sm:p-6">
          <p className="label text-muted">Backend</p>
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
            <p className="label text-white">Payments</p>
            <p className="display mt-2 text-[1.75rem] tracking-[-0.03em]">PayU</p>
          </div>
          <p className="mt-4 text-[0.875rem] leading-snug text-white">
            Orders created on the server. SHA-512 signed webhooks, verified in constant time, confirm the seat.
          </p>
        </div>
      </div>
      <figcaption id="arch-cap" className="mt-4 font-mono text-xs leading-relaxed text-paper-muted">
        Zen-Z, end to end. Everything except the third-party services was designed and built by one person. Tested in
        GitHub Actions; ships to Google Play (EAS) and Vercel.
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
