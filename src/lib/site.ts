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
  role: "Founder-engineer",
  title: "Aayush Thakur: Founder-engineer who ships real products fast",
  description:
    "Founder-engineer from Jaipur, India. Aayush Thakur built Zen-Z solo, a live campus social app with 150+ users in its first 2 days and ₹33K+ revenue (React Native, Next.js, Supabase, PayU), and works AI-native with Claude Code and Cursor.",
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
    graduation: "May 2028",
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
    instagram: "https://www.instagram.com/zen_z.app",
    instagramHandle: "@zen_z.app",
  },
  prelims: {
    name: "PrelimsDaily",
    url: "https://github.com/aayush-t-exe/prelims-daily",
    urlLabel: "github.com/aayush-t-exe/prelims-daily",
  },
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
    adminScreens: 11,
    marketingPages: 10,
    tables: 28,
    migrations: 102,
    dbFunctions: 41,
    edgeFunctions: 7,
    cronJobs: 3,
    ciJobs: 11,
    testSuites: 37,
    pgtapAssertions: 115,
  },
  prelims: {
    tests: 72,
    suites: 5,
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
  { name: "Supabase", layer: "Data & backend", icon: "supabase", note: "auth, realtime, 7 Edge Functions", usedIn: ["Z"] },
  { name: "Postgres + RLS", layer: "Data & backend", icon: "postgresql", note: "28 tables, RLS on every one", usedIn: ["Z"] },
  { name: "Edge Functions (Deno)", layer: "Data & backend", icon: "deno", note: "payment orders and webhooks", usedIn: ["Z"] },
  { name: "Realtime", layer: "Data & backend", mono: "Rt", note: "group chat", usedIn: ["Z"] },
  { name: "pg_cron", layer: "Data & backend", mono: "cr", note: "3 scheduled jobs", usedIn: ["Z"] },
  { name: "PayU", layer: "Payments & infra", mono: "Pu", note: "SHA-512 verified webhooks", usedIn: ["Z"] },
  { name: "Vercel", layer: "Payments & infra", icon: "vercel", note: "web hosting", usedIn: ["Z", "S"] },
  { name: "Expo Push", layer: "Payments & infra", icon: "expo", note: "push notifications", usedIn: ["Z"] },
  { name: "EAS Update", layer: "Payments & infra", icon: "expo", note: "over-the-air updates", usedIn: ["Z"] },
  { name: "Brevo", layer: "Payments & infra", icon: "brevo", note: "email OTP sign-in", usedIn: ["Z"] },
  { name: "Sentry", layer: "Payments & infra", icon: "sentry", note: "error monitoring", usedIn: ["Z"] },
  { name: "GitHub Actions", layer: "Quality", icon: "githubactions", note: "11-job CI pipeline", usedIn: ["Z"] },
  { name: "Vitest", layer: "Quality", icon: "vitest", note: "admin + Edge Function tests", usedIn: ["Z"] },
  { name: "Jest", layer: "Quality", icon: "jest", note: "mobile app tests", usedIn: ["Z", "P"] },
  { name: "pgTAP", layer: "Quality", mono: "pg", note: "115 DB assertions in CI", usedIn: ["Z"] },
  { name: "Claude Code", layer: "AI workflow", icon: "claude", note: "co-author on 152 of 183 Zen-Z commits", usedIn: ["Z", "P", "S"] },
  { name: "Cursor", layer: "AI workflow", icon: "cursor", note: "editor for day-to-day builds", usedIn: ["Z", "P"] },
];

/** Shown muted under the ledger: no shipped evidence, so not in the main list. */
export const coursework = ["Python", "Java"];
