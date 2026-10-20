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
