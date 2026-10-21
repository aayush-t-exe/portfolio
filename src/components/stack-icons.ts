/**
 * Brand glyphs for the stack ledger: Simple Icons v16.35.0 (CC0-1.0, https://simpleicons.org).
 * Paths live in one same-origin sprite (public/stack-icons.svg), fetched only when the Stack
 * section renders, so 20 kB of path data stays out of the HTML and RSC payload.
 * `hex` is the brand colour, shown only on hover; null = text colour (black logos that would
 * vanish in dark mode).
 */
export const stackIcons = {
  typescript: { title: "TypeScript", hex: "#3178C6" },
  react: { title: "React", hex: "#61DAFB" },
  expo: { title: "Expo", hex: null },
  nextdotjs: { title: "Next.js", hex: null },
  tailwindcss: { title: "Tailwind CSS", hex: "#06B6D4" },
  supabase: { title: "Supabase", hex: "#3FCF8E" },
  postgresql: { title: "PostgreSQL", hex: "#4169E1" },
  deno: { title: "Deno", hex: null },
  sentry: { title: "Sentry", hex: "#362D59" },
  vercel: { title: "Vercel", hex: null },
  githubactions: { title: "GitHub Actions", hex: "#2088FF" },
  vitest: { title: "Vitest", hex: "#00FF74" },
  jest: { title: "Jest", hex: "#C21325" },
  claude: { title: "Claude", hex: "#D97757" },
  cursor: { title: "Cursor", hex: null },
  brevo: { title: "Brevo", hex: "#0B996E" },
} as const;

export type StackIcon = keyof typeof stackIcons;
