/**
 * Brand glyphs for the stack ledger: Simple Icons v16.35.0 (CC0-1.0, https://simpleicons.org).
 * Each glyph is a tiny SVG in public/stack-icons/, applied as a CSS mask: a mask image is only
 * fetched once its element is styled, so nothing loads until the Stack section renders, and
 * ~20 kB of path data stays out of the HTML and RSC payload.
 * `hex` is the brand colour, shown only on hover; null = text colour (black logos that would
 * vanish in dark mode).
 */
export const stackIcons = {
  typescript: { hex: "#3178C6" },
  expo: { hex: null },
  nextdotjs: { hex: null },
  tailwindcss: { hex: "#06B6D4" },
  supabase: { hex: "#3FCF8E" },
  postgresql: { hex: "#4169E1" },
  deno: { hex: null },
  sentry: { hex: "#362D59" },
  vercel: { hex: null },
  githubactions: { hex: "#2088FF" },
  vitest: { hex: "#00FF74" },
  jest: { hex: "#C21325" },
  claude: { hex: "#D97757" },
  cursor: { hex: null },
  brevo: { hex: "#0B996E" },
} as const;

export type StackIcon = keyof typeof stackIcons;
