/**
 * Single source of truth for identity, links and SEO.
 * Every fact on the site comes from Aayush's brief or his resume. Do not add numbers that aren't real.
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aayushthakur.vercel.app";

export const site = {
  url: rawUrl.replace(/\/$/, ""),
  name: "Aayush Thakur",
  shortName: "Aayush",
  role: "Founder-engineer",
  title: "Aayush Thakur: Founder-engineer who ships real products fast",
  description:
    "Aayush Thakur is a founder-engineer from Jaipur, India. He built Zen-Z, a live campus social app with 150+ users in 2 days and ₹33K+ revenue, solo (React Native, Next.js, Supabase, PayU), and works AI-native with Claude Code and Cursor.",
  location: "Jaipur, India",
  email: "aayushthakur8002@gmail.com",
  github: "https://github.com/aayush-t-exe",
  githubHandle: "aayush-t-exe",
  linkedin: "https://www.linkedin.com/in/aayushthakurdev",
  linkedinHandle: "aayushthakurdev",
  resume: "/Aayush_Thakur_Resume.pdf",
  education: {
    school: "Jaipur National University",
    schoolUrl: "https://www.jnujaipur.ac.in",
    degree: "B.Tech, Computer Science & Engineering",
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
    /** Add the Google Play listing URL here once you have it; the button appears automatically. */
    playStoreUrl: "",
    instagram: "https://www.instagram.com/zen_z.app",
    tagline: "A campus social app that turns strangers into small-group plans.",
  },
  prelims: {
    name: "PrelimsDaily",
    url: "https://github.com/aayush-t-exe/prelims-daily",
    urlLabel: "github.com/aayush-t-exe/prelims-daily",
    tagline: "A 10-minute daily UPSC practice habit, built in a single day.",
  },
} as const;
