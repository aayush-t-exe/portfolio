import { coursework, facts, projectNames, projects, routes, site, stack, stackLayers } from "@/lib/site";

/**
 * llms.txt (https://llmstxt.org): a plain-text brief for AI search and answer engines.
 * Generated from site.ts (facts, stack, links), so it can't drift from the page.
 */
export const dynamic = "force-static";

const z = facts.zenz;
const p = facts.prelims;

const stackLines = stackLayers
  .filter((layer) => layer !== "Tools")
  .map((layer) => {
    const tools = stack.filter((t) => t.layer === layer);
    return `- ${layer}: ${tools.map((t) => `${t.name} (${t.note}; ${t.usedIn.map((u) => projectNames[u]).join(", ")})`).join("; ")}`;
  })
  .join("\n");

const body = `# ${site.name}

> ${site.name} is a full-stack and mobile engineer from ${site.location}: Founder & CTO of [Zen-Z](${projects.zenz.url}), a campus social app live on Google Play with ${z.users} users ${z.usersWindow} and ${z.revenue} revenue, which ${site.shortName} built solo. Third-year student (${site.education.line}).

Everything below is factual and matches the portfolio at ${site.url} and the resume linked below.

## Links

- [Portfolio](${site.url}): who ${site.shortName} is, the work, and contact
- [Zen-Z case study](${site.url}${routes.zenz}): problem, what was built, architecture, the payment incident, results
- [PrelimsDaily case study](${site.url}${routes.prelims}): the one-day build, its decisions and tests
- [Stack](${site.url}${routes.stack}): every tool, by layer, and which product it shipped in
- [Resume (PDF)](${site.url}${site.resume}): one-page full-stack resume
- [GitHub](${site.github}): source code, including Zen-Z and PrelimsDaily
- [LinkedIn](${site.linkedin}): professional profile
- [Zen-Z on Google Play](${projects.zenz.playStoreUrl})
- [Zen-Z source](${projects.zenz.sourceUrl})
- [PrelimsDaily source](${projects.prelims.url})

## Summary

- Role: Founder & CTO of Zen-Z (${z.since} to now). Sole engineer.
- Location: ${site.location} (${site.timezone}).
- Education: ${site.education.line}.
- Status: ${site.status}. Looking for: ${site.lookingFor}
- Contact: [${site.email}](mailto:${site.email})

## Zen-Z (case study 1)

Full case study: ${site.url}${routes.zenz}

[Zen-Z](${projects.zenz.url}) matches college students into small groups of strangers (4–5 people; sports up to 14) for cafés, dinners, movies and sports. Cafés and dinners are free to book (venues pay a commission); movies and sports are paid. Live on [Google Play](${projects.zenz.playStoreUrl}); runs on Android, iOS (PWA) and web.

- Results: ${z.users} users ${z.usersWindow}; ${z.revenue} total revenue; ${z.waitlist} students on the waitlist before launch; [Instagram ${projects.zenz.instagramHandle}](${projects.zenz.instagram}) with ${z.igFollowers} followers and ${z.igViews} views. Pitched at Jaipur National University's Shark Tank (${z.sharkTank}).
- Built solo: the student app in React Native (Expo) + TypeScript (${z.appScreens} app screens), a Next.js admin dashboard with a drag-and-drop matching board, and a Supabase backend: ${z.tables} tables with row-level security on every one, ${z.migrations} migrations, ${z.dbFunctions} Postgres functions, ${z.edgeFunctions} Edge Functions and ${z.cronJobs} pg_cron jobs. PayU payments with server-side orders and SHA-512 verified webhooks.
- Quality: a GitHub Actions pipeline of ${z.ciJobs} jobs with ${z.testSuites} test suites (Vitest, Jest, pgTAP), including ${z.pgtapAssertions} pgTAP assertions run against a real hosted Postgres. Writing them found and fixed ${z.rlsBugsFound} RLS/authorization bugs.
- Same-day payment fix (${z.incidentDate}): a paid booking never confirmed (the student's UPI payment succeeded, but PayU's webhook never landed and webhook calls weren't logged yet); Aayush fixed it the same day. The fix (${z.incidentFiles} files) logs every webhook call with its outcome in payment_webhook_events, adds an admin "Needs your attention" queue (unpaid 10+ minutes, or paid but the slot passed), an admin-only admin_mark_booking_paid() RPC covered by a pgTAP test, a WhatsApp support link on the payment screen and a "Payments to check" dashboard count. Earlier (${z.hashFixDay}) Aayush worked out PayU's real webhook hash for Payment Links (all ten udf fields, constant-time compare) from a live ₹1 transaction, because the public docs are wrong for that case.

## PrelimsDaily (case study 2)

Full case study: ${site.url}${routes.prelims}

[PrelimsDaily](${projects.prelims.url}) is a React Native + TypeScript daily-practice app for UPSC Prelims, built in ${p.buildTime} for a startup application: streaks with freezes, a daily target ring, XP and levels, review, and reminders that skip finished days. Works fully offline. ${p.tests} unit tests in ${p.suites} suites. Decisions include local calendar dates instead of UTC, a date-seeded deterministic daily set, and reminders scheduled as seven one-off notifications.

## Other

- Smart India Hackathon (SIH) internal round: ${facts.sih}.

## Stack

With filters by product: ${site.url}${routes.stack}

${stackLines}
- Also (coursework): ${coursework.join(", ")}
`;

export function GET() {
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
