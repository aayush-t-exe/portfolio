import { coursework, facts, projectNames, projects, site, stack, stackLayers } from "@/lib/site";

/**
 * llms.txt (https://llmstxt.org): a plain-text brief for AI search and answer engines.
 * Generated from site.ts (facts, stack, links), so it can't drift from the page.
 */
export const dynamic = "force-static";

const z = facts.zenz;
const p = facts.prelims;

const stackLines = stackLayers
  .map((layer) => {
    const tools = stack.filter((t) => t.layer === layer);
    return `- ${layer}: ${tools.map((t) => `${t.name} (${t.note}; ${t.usedIn.map((u) => projectNames[u]).join(", ")})`).join("; ")}`;
  })
  .join("\n");

const body = `# ${site.name}

> ${site.name} is a founder-engineer from ${site.location} who ships real products fast with AI. Founder & CTO of [Zen-Z](${projects.zenz.url}), a live campus social app built solo, and a third-year student: ${site.education.line}.

Everything below is factual and matches the portfolio at ${site.url} and the resume linked below.

## Links

- [Portfolio](${site.url}): case studies for Zen-Z and PrelimsDaily, how ${site.shortName} works with AI, stack and contact
- [Resume (PDF)](${site.url}${site.resume}): one-page full-stack resume
- [GitHub](${site.github}): source code, including Zen-Z and PrelimsDaily
- [LinkedIn](${site.linkedin}): professional profile
- [Zen-Z on Google Play](${projects.zenz.playStoreUrl})
- [Zen-Z source](${projects.zenz.sourceUrl})
- [PrelimsDaily source](${projects.prelims.url})

## Summary

- Role: Founder & CTO of Zen-Z (Jul 2026 to now). Sole engineer.
- Location: ${site.location} (${site.timezone}).
- Education: ${site.education.line}.
- Status: ${site.status}. Looking for: ${site.lookingFor}
- Way of working: AI-native. Builds with Claude Code and Cursor, plans before coding, ships fast, and reviews and understands everything that ships. ${z.claudeCommits} of ${z.commits} Zen-Z commits are co-authored with Claude.
- Contact: [${site.email}](mailto:${site.email})

## Zen-Z (case study 1)

[Zen-Z](${projects.zenz.url}) matches college students into small groups of strangers (4–5 people; sports up to 14) for cafés, dinners, movies and sports. Cafés and dinners are free to book (venues pay a commission); movies and sports are paid. Live on [Google Play](${projects.zenz.playStoreUrl}) and the web, and on iOS as a PWA.

- Results: ${z.users} users ${z.usersWindow} after launch; ${z.revenue} total revenue; ${z.waitlist} students on the waitlist before launch; [Instagram ${projects.zenz.instagramHandle}](${projects.zenz.instagram}) with ${z.igFollowers} followers and ${z.igViews} views. Pitched at Jaipur National University's Shark Tank (Sep 2026).
- Built solo: the student app in React Native (Expo) + TypeScript (${z.appScreens} app screens), a Next.js admin panel with a drag-and-drop matching board, and a Supabase backend: ${z.tables} tables with row-level security on every one, ${z.migrations} migrations, ${z.dbFunctions} Postgres functions, ${z.edgeFunctions} Edge Functions and ${z.cronJobs} pg_cron jobs. PayU payments with server-side orders and SHA-512 verified webhooks.
- Quality: a GitHub Actions pipeline of ${z.ciJobs} jobs with ${z.testSuites} test suites (Vitest, Jest, pgTAP), including ${z.pgtapAssertions} pgTAP assertions run against a real hosted Postgres. Writing them found and fixed ${z.rlsBugsFound} RLS/authorization bugs.
- Payment incident (16 Sep 2026): a student's real UPI payment succeeded, but PayU's webhook never arrived and nothing recorded whether it had. The same-day fix (${z.incidentFiles} files) logs every webhook call with its outcome in payment_webhook_events, adds an admin "Needs your attention" queue (unpaid 10+ minutes, or paid but the slot passed), an admin-only admin_mark_booking_paid() RPC covered by a pgTAP test, a WhatsApp support link on the payment screen and a "Payments to check" dashboard count. Earlier (29 Aug) Aayush worked out PayU's real webhook hash for Payment Links (all ten udf fields, constant-time compare) from a live ₹1 transaction, because the public docs are wrong for that case.

## PrelimsDaily (case study 2)

[PrelimsDaily](${projects.prelims.url}) is a React Native + TypeScript daily-practice app for UPSC Prelims, built in a single day for a startup application: streaks with freezes, a daily target ring, XP and levels, review, and reminders that skip finished days. Works fully offline. ${p.tests} unit tests in ${p.suites} suites. Decisions include local calendar dates instead of UTC, a date-seeded deterministic daily set, and reminders scheduled as seven one-off notifications.

## Other

- Smart India Hackathon (SIH) internal round: ${facts.sih}.

## Stack

${stackLines}
- Also (coursework): ${coursework.join(", ")}
`;

export function GET() {
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
