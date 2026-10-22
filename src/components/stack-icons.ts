/**
 * Brand glyphs: Simple Icons v16 (CC0-1.0, https://simpleicons.org).
 * Each glyph is a tiny SVG in public/stack-icons/, applied as a CSS mask: a mask image is only
 * fetched once its element is styled, so nothing loads until the element renders, and the path
 * data stays out of the HTML and RSC payload.
 * `hex` is the brand colour (null = text colour, for black logos that would vanish on ink).
 */
export const stackIcons = {
  typescript: { hex: "#3178C6" },
  react: { hex: "#61DAFB" },
  expo: { hex: null },
  nextdotjs: { hex: null },
  tailwindcss: { hex: "#06B6D4" },
  reactquery: { hex: "#FF4154" },
  supabase: { hex: "#3FCF8E" },
  postgresql: { hex: "#4169E1" },
  deno: { hex: null },
  sentry: { hex: "#A79FCB" },
  vercel: { hex: null },
  githubactions: { hex: "#2088FF" },
  vitest: { hex: "#00FF74" },
  jest: { hex: "#C21325" },
  brevo: { hex: "#0B996E" },
  git: { hex: "#F05032" },
  github: { hex: null },
} as const;

export type StackIcon = keyof typeof stackIcons;
