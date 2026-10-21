/**
 * Single source of truth for identity, links, facts and SEO.
 * Every number here was checked against the resume or the two repos (campus-social,
 * prelims-daily). Do not add numbers that aren't real; sections read them from here.
 */

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL once you have a custom domain; on Vercel it
 * otherwise falls back to the project's production domain, then to the expected default.
 */
const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://aayushthakur.vercel.app");

export const site = {
  url: rawUrl.replace(/\/$/, ""),
  name: "Aayush Thakur",
  shortName: "Aayush",
  title: "Aayush Thakur: Founder-engineer who ships real products fast",
  /** ≤155 characters, strongest hook first (search snippets truncate). */
  description:
    "Built Zen-Z solo: a live campus app with 150+ users in 2 days and ₹33K+ revenue. Aayush Thakur, founder-engineer who ships fast with AI. Jaipur, India.",
  /** Stable URL for structured data (doesn't change with build hashes). */
  image: "/aayush.jpg",
  location: "Jaipur, India",
  timezone: "IST (UTC+5:30)",
  status: "Open to work · Jaipur (IST)",
  lookingFor:
    "Remote internships in full-stack, AI and product engineering - plus freelance builds (Next.js, React Native, Supabase). Part-time, can start now.",
  email: "aayushthakur8002@gmail.com",
  github: "https://github.com/aayush-t-exe",
  githubHandle: "aayush-t-exe",
  linkedin: "https://www.linkedin.com/in/aayushthakurdev",
  linkedinHandle: "aayushthakurdev",
  resume: "/Aayush_Thakur_Resume.pdf",
  education: {
    school: "Jaipur National University",
    schoolUrl: "https://www.jnujaipur.ac.in",
    /** The one wording used everywhere. */
    line: "B.Tech, Computer Science · Jaipur National University · graduating May 2028",
  },
  /** Bump when content changes meaningfully; used by the sitemap. */
  updated: "2026-10-21",
} as const;

export const projects = {
  zenz: {
    name: "Zen-Z",
    url: "https://zen-z.site",
    urlLabel: "zen-z.site",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.campussocial.app",
    sourceUrl: "https://github.com/aayush-t-exe/Zen-Z",
    /** Public commit log: every Claude co-authored commit carries a Co-Authored-By trailer. */
    commitsUrl: "https://github.com/aayush-t-exe/Zen-Z/commits/main",
    instagram: "https://www.instagram.com/zen_z.app",
    instagramHandle: "@zen_z.app",
  },
  prelims: {
    name: "PrelimsDaily",
    url: "https://github.com/aayush-t-exe/prelims-daily",
  },
} as const;

/** Internal routes. Cards, nav, sitemap, llms.txt and JSON-LD all read these. */
export const routes = {
  home: "/",
  zenz: "/work/zen-z",
  prelims: "/work/prelimsdaily",
  stack: "/stack",
} as const;


/**
 * Numbers quoted on the site. Sources: Aayush (users, revenue), the resume (waitlist,
 * Instagram), and the repos via git and the code (everything else, as of 2026-10-21).
 */
export const facts = {
  zenz: {
    users: "150+",
    usersWindow: "in its first 2 days",
    revenue: "₹33K+",
    waitlist: "65+",
    igFollowers: "550+",
    igViews: "140K+",
    commits: 183,
    claudeCommits: 152,
    commitDays: 33,
    appScreens: 20,
    tables: 28,
    migrations: 102,
    dbFunctions: 41,
    edgeFunctions: 7,
    cronJobs: 3,
    ciJobs: 11,
    testSuites: 37,
    pgtapAssertions: 115,
    /** RLS/authorization bugs the pgTAP tests found (commit 7c88c8f). */
    rlsBugsFound: 3,
    /** Files changed in the same-day incident fix (commit ba11be2). */
    incidentFiles: 14,
  },
  sih: "5th of ~75 teams",
  prelims: {
    tests: 72,
    suites: 5,
  },
} as const;

/** Per-page titles and descriptions (≤155 characters, strongest hook first). */
export const pages = {
  zenz: {
    title: "Zen-Z case study: a campus app built solo",
    description:
      "How Aayush Thakur built Zen-Z solo: React Native app, Next.js admin, Supabase with RLS on every table, PayU payments, and a same-day payment incident fix.",
  },
  prelims: {
    title: "PrelimsDaily case study: a tested app in one day",
    description:
      `PrelimsDaily, a UPSC daily-practice app built in one day by Aayush Thakur: offline streaks, adaptive reminders, deterministic daily sets and ${facts.prelims.tests} unit tests.`,
  },
  stack: {
    title: "Stack: the tools, and where they shipped",
    description:
      "The tools Aayush Thakur ships with, by layer, and which product each one shipped in: Zen-Z, PrelimsDaily or this site. TypeScript, Expo, Supabase and more.",
  },
} as const;

/** Where a tool shipped: Z = Zen-Z, P = PrelimsDaily, S = this site. */
export type Project = "Z" | "P" | "S";

export const projectNames: Record<Project, string> = { Z: "Zen-Z", P: "PrelimsDaily", S: "This site" };

export const stackLayers = ["Client", "Data & backend", "Payments & infra", "Quality", "AI workflow"] as const;

type Tool = {
  name: string;
  layer: (typeof stackLayers)[number];
  /** Simple Icons slug (see components/stack-icons.ts); a 2-letter mono tile otherwise. */
  icon?: import("@/components/stack-icons").StackIcon;
  mono?: string;
  note: string;
  usedIn: Project[];
};

/** The stack, single source for the Stack ledger, llms.txt and JSON-LD knowsAbout. */
export const stack: Tool[] = [
  { name: "TypeScript", layer: "Client", icon: "typescript", note: "every project, end to end", usedIn: ["Z", "P", "S"] },
  { name: "React Native + Expo", layer: "Client", icon: "expo", note: "Zen-Z app and PrelimsDaily", usedIn: ["Z", "P"] },
  { name: "Next.js", layer: "Client", icon: "nextdotjs", note: "admin panel + this site", usedIn: ["Z", "S"] },
  { name: "Tailwind CSS", layer: "Client", icon: "tailwindcss", note: "this site's design tokens", usedIn: ["S"] },
  { name: "Reanimated", layer: "Client", mono: "Re", note: "60fps ring + XP bar", usedIn: ["P"] },
  { name: "Zustand", layer: "Client", mono: "Zu", note: "state with versioned persistence", usedIn: ["P"] },
  { name: "dnd-kit", layer: "Client", mono: "dk", note: "drag-and-drop matching board", usedIn: ["Z"] },
  { name: "Supabase", layer: "Data & backend", icon: "supabase", note: `auth, realtime, ${facts.zenz.edgeFunctions} Edge Functions`, usedIn: ["Z"] },
  { name: "Postgres + RLS", layer: "Data & backend", icon: "postgresql", note: `${facts.zenz.tables} tables, RLS on every one`, usedIn: ["Z"] },
  { name: "Edge Functions (Deno)", layer: "Data & backend", icon: "deno", note: "payment orders and webhooks", usedIn: ["Z"] },
  { name: "Realtime", layer: "Data & backend", mono: "Rt", note: "group chat", usedIn: ["Z"] },
  { name: "pg_cron", layer: "Data & backend", mono: "cr", note: `${facts.zenz.cronJobs} scheduled jobs`, usedIn: ["Z"] },
  { name: "PayU", layer: "Payments & infra", mono: "Pu", note: "SHA-512 verified webhooks", usedIn: ["Z"] },
  { name: "Vercel", layer: "Payments & infra", icon: "vercel", note: "web hosting", usedIn: ["Z", "S"] },
  { name: "Expo Push", layer: "Payments & infra", icon: "expo", note: "push notifications", usedIn: ["Z"] },
  { name: "EAS Update", layer: "Payments & infra", icon: "expo", note: "over-the-air updates", usedIn: ["Z"] },
  { name: "Brevo", layer: "Payments & infra", icon: "brevo", note: "email OTP sign-in", usedIn: ["Z"] },
  { name: "Sentry", layer: "Payments & infra", icon: "sentry", note: "error monitoring", usedIn: ["Z"] },
  { name: "GitHub Actions", layer: "Quality", icon: "githubactions", note: `${facts.zenz.ciJobs}-job CI pipeline`, usedIn: ["Z"] },
  { name: "Vitest", layer: "Quality", icon: "vitest", note: "admin + Edge Function tests", usedIn: ["Z"] },
  { name: "Jest", layer: "Quality", icon: "jest", note: "mobile app tests", usedIn: ["Z", "P"] },
  { name: "pgTAP", layer: "Quality", mono: "pg", note: `${facts.zenz.pgtapAssertions} DB assertions in CI`, usedIn: ["Z"] },
  { name: "Claude Code", layer: "AI workflow", icon: "claude", note: `co-author on ${facts.zenz.claudeCommits}/${facts.zenz.commits} commits`, usedIn: ["Z", "P", "S"] },
  { name: "Cursor", layer: "AI workflow", icon: "cursor", note: "editor for day-to-day builds", usedIn: ["Z", "P"] },
];

/** Shown muted under the ledger: no shipped evidence, so not in the main list. */
export const coursework = ["Python", "Java"];
