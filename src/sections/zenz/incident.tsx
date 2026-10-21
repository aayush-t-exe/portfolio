import { Body } from "@/components/case";
import { CodeBlock } from "@/components/code-block";
import { facts } from "@/lib/site";

/**
 * The Zen-Z payment incident, told as it happened (dates and details from the repo:
 * commits 69cfaa4, ba11be2, e2e8bdf; migrations 0096-0098; pgTAP test 019).
 */
const VERIFY_SKETCH = `
Deno.serve(async (req) => {
  const p = Object.fromEntries(await req.formData());

  // PayU's docs show a 5-udf formula. Payment Links really use all ten,
  // confirmed byte for byte against a live ₹1 transaction.
  const expected = await sha512([
    SALT, p.status,
    p.udf10, p.udf9, p.udf8, p.udf7, p.udf6,
    p.udf5, p.udf4, p.udf3, p.udf2, p.udf1,
    p.email, p.firstname, p.productinfo, p.amount, p.txnid, KEY,
  ].join("|"));

  // Constant-time compare: a bad signature confirms nothing.
  if (!timingSafeEqual(expected, p.hash)) return reject(p, "invalid_signature");

  // Cancelled, then paid on a stale tab? Logged, not confirmed.
  const outcome = await settleBooking(p);

  await logEvent(p, outcome);
  return ok();
});

// Best-effort: logging never changes the response.
async function logEvent(p, outcome) {
  try {
    await db.from("payment_webhook_events").insert({ txnid: p.txnid, outcome });
  } catch {}
}
`;

const timeline = [
  { t: "Paid", d: "A real UPI payment succeeds.", tone: "fg" },
  { t: "No webhook, no trace", d: "PayU never calls back. Nothing notices.", tone: "accent" },
  { t: "Same-day fix", d: `${facts.zenz.incidentFiles} files, shipped on ${facts.zenz.incidentDay}.`, tone: "fg" },
  { t: "Every call logged", d: "And a queue for anything stuck.", tone: "fg" },
] as const;

const before = [
  "A booking's paid state rested on one webhook arriving, with no record of the calls.",
  "Fixing a stuck booking meant hand-run SQL.",
];

const after = [
  <>
    Every call is logged with its outcome in <code className="font-mono text-[0.85em] text-fg">payment_webhook_events</code>.
  </>,
  <>
    An admin <span className="text-fg">&ldquo;Needs your attention&rdquo;</span> queue: unpaid 10+ minutes, or paid but the
    slot has passed.
  </>,
  <>
    An admin-only <code className="font-mono text-[0.85em] text-fg">admin_mark_booking_paid()</code> RPC, covered by a
    pgTAP test, and a WhatsApp support link on the payment screen.
  </>,
];

export function Incident() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs font-medium text-accent uppercase">
          Post-launch incident · {facts.zenz.incidentDate}
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-muted uppercase">
          Fixed the same day
        </span>
      </div>
      <p className="font-display mt-5 max-w-[22ch] text-[clamp(1.75rem,3.6vw,2.625rem)] leading-[1.08] tracking-[-0.035em]">
        A student paid. The app said <span className="text-accent">unpaid.</span>
      </p>
      <Body>
        <p>
          The groundwork was careful: PayU&rsquo;s docs give the wrong webhook hash for Payment Links, so on {facts.zenz.hashFixDay} I worked
          out the real one from a live ₹1 transaction. Only a signed, server-verified webhook confirmed a booking.
        </p>
        <p>
          Then, on {facts.zenz.incidentDay}, a student&rsquo;s real UPI payment succeeded, but{" "}
          <strong>PayU&rsquo;s webhook never arrived, and nothing recorded whether it had.</strong> The booking sat as unpaid,
          with no trail to prove otherwise.
        </p>
      </Body>

      {/* Four-node timeline: vertical on mobile, a row on desktop. */}
      <ol data-reveal className="incident-line relative mt-10 grid gap-6 sm:grid-cols-4 sm:gap-4">
        {timeline.map((n) => (
          <li key={n.t} className="relative pl-6 sm:pt-6 sm:pl-0">
            <span
              aria-hidden
              className={`absolute top-1.5 left-0 size-[9px] rounded-full ring-4 ring-bg sm:top-0 ${
                n.tone === "accent" ? "bg-accent" : "bg-fg"
              }`}
            />
            <p className={`font-medium tracking-[-0.01em] ${n.tone === "accent" ? "text-accent" : ""}`}>{n.t}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{n.d}</p>
          </li>
        ))}
      </ol>

      {/* Before / after */}
      <div data-reveal className="mt-10 grid overflow-hidden rounded-[14px] border border-line sm:grid-cols-2">
        <div className="bg-surface-2/60 p-5 sm:p-6">
          <p className="text-sm font-medium text-muted">Before</p>
          <ul className="mt-3 space-y-2.5 text-[0.9375rem] leading-relaxed text-muted">
            {before.map((b) => (
              <li key={b} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.6em] h-px w-2.5 shrink-0 bg-line-strong" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line bg-surface p-5 sm:border-t-0 sm:border-l sm:p-6">
          <p className="text-sm font-medium text-accent">After</p>
          <ul className="mt-3 space-y-2.5 text-[0.9375rem] leading-relaxed text-muted">
            {after.map((a, i) => (
              <li key={i} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.6em] h-px w-2.5 shrink-0 bg-accent" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Body className="mt-8">
        <p>
          <strong>A week later:</strong> checkout opens in its own tab and the booking re-checks itself when the student
          returns (Payment Links never redirect back). Cancel-then-pay on a stale tab is logged for a manual refund, not
          confirmed.
        </p>
      </Body>

      <div data-reveal className="mt-8">
        <CodeBlock
          code={VERIFY_SKETCH}
          filename="payu-webhook/index.ts"
          badge="simplified sketch"
          label="Simplified sketch of the PayU webhook handler"
        />
      </div>

      <p className="mt-6 max-w-[62ch] border-l-2 border-accent pl-4 text-[1.0625rem] leading-relaxed">
        <span className="font-medium">The guarantee now:</span>{" "}
        <span className="text-muted">
          no booking is confirmed without a verified payment, and every payment question can be answered from the logs.
        </span>
      </p>
    </div>
  );
}
