import { Body } from "@/components/case";
import { CodeBlock } from "@/components/code-block";
import { facts } from "@/lib/site";

const z = facts.zenz;

/**
 * The Zen-Z payment incident, told fix-first (dates and details from the repo: commits 69cfaa4,
 * ba11be2, e2e8bdf; migrations 0096-0098; pgTAP test 019).
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

const shipped = [
  <>
    Every webhook call is logged with its outcome in <code className="font-mono text-[0.85em] text-fg">payment_webhook_events</code>.
  </>,
  <>
    An admin <span className="text-fg">&ldquo;Needs your attention&rdquo;</span> queue: unpaid for 10+ minutes, or paid but the slot has passed.
  </>,
  <>
    An admin-only <code className="font-mono text-[0.85em] text-fg">admin_mark_booking_paid()</code> RPC, covered by a pgTAP test, a
    WhatsApp support link on the payment screen and a &ldquo;Payments to check&rdquo; count on the dashboard.
  </>,
];

const timeline = [
  { t: "Paid", d: "A student's real UPI payment succeeds." },
  { t: "No webhook", d: "PayU never calls back, and webhook calls aren't logged yet." },
  { t: "Traced", d: "Same day: confirmed the payment in PayU; no webhook had been logged." },
  { t: `Fixed · ${z.incidentFiles} files`, d: "Shipped the fix the same afternoon." },
];

export function Incident() {
  return (
    <div>
      <p className="mt-6 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-red px-3 py-1 font-mono text-xs text-white uppercase">{z.incidentDate}</span>
        <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-muted uppercase">Fixed the same day</span>
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        <div className="rounded-[22px] bg-red p-6 text-white sm:p-8 lg:col-span-7" data-fade>
          <p className="label text-white">What shipped that day</p>
          <ul className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed [overflow-wrap:anywhere] [&_code]:text-white [&_span]:text-white">
            {shipped.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="mt-[0.55em] size-2 shrink-0 rounded-full bg-white" />
                <span className="text-white">{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-[22px] border border-line p-6 sm:p-8 lg:col-span-5" data-fade>
          <p className="label">The guarantee now</p>
          <p className="display mt-5 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.05] tracking-[-0.03em]">
            No booking is confirmed without a verified payment, every webhook call is on record, and anything stuck reaches the admin queue.
          </p>
        </div>
      </div>

      <h3 className="display mt-16 text-[1.75rem] tracking-[-0.03em]">What happened</h3>
      <ol className="incident-line relative mt-8 grid gap-6 sm:grid-cols-4 sm:gap-4">
        {timeline.map((n, i) => (
          <li key={n.t} className="relative pl-6 sm:pt-7 sm:pl-0">
            <span aria-hidden className={`absolute top-1.5 left-0 size-3 rounded-full ring-4 ring-ink sm:top-0 ${i === 3 ? "bg-red" : "bg-fg"}`} />
            <p className={`font-medium ${i === 3 ? "text-red-text" : ""}`}>{n.t}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{n.d}</p>
          </li>
        ))}
      </ol>

      <Body className="mt-10">
        <p>
          The verification was already in place: PayU&rsquo;s docs give the wrong webhook hash for Payment Links, so on {z.hashFixDay} I worked out
          the real one from a live ₹1 transaction, and only a signed, server-verified webhook could confirm a booking. On {z.incidentDay},
          a student&rsquo;s UPI payment went through but <strong>PayU&rsquo;s webhook never landed, and webhook calls weren&rsquo;t logged
          yet</strong>, so there was no trail and the booking still showed unpaid.
        </p>
        <p>
          <strong>A week later</strong>, checkout moved to its own tab and the booking re-checks itself when the student returns (Payment Links
          never redirect back). Cancel-then-pay on a stale tab is logged for a manual refund, not confirmed.
        </p>
      </Body>

      <div className="mt-10" data-fade>
        <CodeBlock code={VERIFY_SKETCH} filename="payu-webhook/index.ts" badge="simplified sketch" label="Simplified sketch of the PayU webhook handler" />
      </div>
    </div>
  );
}
