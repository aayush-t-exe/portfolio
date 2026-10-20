import { projects, site } from "@/lib/site";

/** llms.txt (https://llmstxt.org): a plain-text brief for AI search and answer engines. */
export const dynamic = "force-static";
const body = `# Aayush Thakur

> Aayush Thakur is a founder-engineer from Jaipur, India, who ships real products fast with AI. Aayush is the Founder & CTO of Zen-Z (zen-z.site), a live campus social app built solo, and a third-year B.Tech Computer Science student at Jaipur National University (graduating May 2028).

Everything below is factual and matches the portfolio at ${site.url} and the resume linked below.

## Links

- [Portfolio](${site.url}): case studies for Zen-Z and PrelimsDaily, how Aayush works with AI, stack and contact
- [Resume (PDF)](${site.url}${site.resume}): one-page full-stack resume
- [GitHub](${site.github}): source code, including PrelimsDaily
- [LinkedIn](${site.linkedin}): professional profile
- [Zen-Z](${projects.zenz.url}): the live product

## Summary

- Role: Founder & CTO of Zen-Z (Jul 2026 – present). Sole engineer.
- Location: Jaipur, Rajasthan, India (IST, UTC+5:30).
- Education: B.Tech, Computer Science & Engineering, Jaipur National University, expected May 2028.
- Way of working: AI-native. Builds with Claude Code and Cursor, plans before coding, ships fast, and reviews and understands everything that ships.
- Contact: [${site.email}](mailto:${site.email})

## Zen-Z (case study 1)

[Zen-Z](${projects.zenz.url}) is a campus social app that matches college students into small groups of 4–5 strangers for cafés, dinners, movies and sports. It is live on the Google Play Store.

- Results: 150+ users within 2 days of launch; ₹33K+ total revenue; 65+ student waitlist before launch; Instagram @zen_z.app with 550 followers and 140K+ views. Pitched at Jaipur National University's Shark Tank event (Sept 2026).
- Built solo by Aayush:
  - Student app: React Native (Expo) + TypeScript for Android and web, ~25 screens, a 5-step booking flow, realtime group chat, push notifications.
  - Admin panel: Next.js, with a drag-and-drop matching board the team uses to hand-match every group, a moderation queue and analytics charts.
  - Backend: Supabase (PostgreSQL, Auth, Realtime, Edge Functions): a 28-table schema with row-level security on every table, 7 Edge Functions and pg_cron scheduled jobs.
  - Payments: PayU with server-side order creation and signed webhooks.
  - Quality: GitHub Actions CI with 37 test suites (Vitest, Jest, pgTAP); Sentry; 179 commits.
- Payment incident: after launch, a real paid booking got stuck as unpaid. Aayush made the server the only source of payment truth: bookings are confirmed only when PayU's webhook arrives with a valid SHA-512 signature (recomputed server-side with a secret salt), every webhook call is logged, and the client never marks anything as paid. No booking is confirmed without a verified payment.

## PrelimsDaily (case study 2)

[PrelimsDaily](${projects.prelims.url}) is a React Native + TypeScript daily-practice app for UPSC Prelims aspirants, built in a single day for a startup application.

- Features: a daily question set, streaks with freezes, a daily target ring, XP and levels, review of mistakes and bookmarks, and smart local reminders that skip days already completed. Works fully offline.
- Engineering: Expo + Expo Router, Zustand with versioned persistence, Reanimated 4 animations on the UI thread, 66 unit tests.
- Notable decisions: local calendar dates instead of UTC (so Indian users practising before 5:30 AM don't lose streaks); a deterministic daily set seeded by the date (FNV-1a → mulberry32); reminders implemented as seven one-off notifications re-scheduled on change so they can skip completed days.

## Other

- Smart India Hackathon (SIH) internal round: placed 5th of ~75 teams.

## Skills

- Languages: TypeScript, JavaScript, SQL, Python, Java
- Frontend & mobile: React Native (Expo), React, Next.js, Tailwind CSS, TanStack Query, Zustand, Reanimated
- Backend & cloud: Supabase (PostgreSQL, Auth, Realtime, Edge Functions), REST APIs, webhooks, PayU, Vercel, EAS
- Quality & tooling: Git, GitHub Actions, Vitest, Jest, pgTAP, Sentry
- AI tools: Claude Code, Cursor
`;

export function GET() {
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
