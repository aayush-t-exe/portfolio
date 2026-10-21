# aayush-portfolio

The personal site of **Aayush Thakur**, a founder-engineer who ships real products fast with AI.
It's one fast, static page with two case studies (Zen-Z and PrelimsDaily), how I work with AI,
and a way to reach me.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. It was designed
and built with Claude Code, starting from a written plan ([PLAN.md](PLAN.md)).

## Highlights

- **Static by default, one client island.** Every route is prerendered at build time. The only
  client component is `PageBehavior`, which renders nothing: it handles scroll reveal, anchor
  jumps, scroll-spy, the theme toggle, copy-email and rail dragging through attributes and
  event delegation. The nav, toggle and buttons themselves are server components.
- **Three runtime dependencies:** `next`, `react` and `react-dom`. No animation library, no
  theme library and no syntax highlighter. The code sample is highlighted at build time by a
  ~40-line tokenizer in `src/lib/highlight.ts`.
- **Light and dark themes** that follow the OS until you choose one; the toggle cycles light →
  dark → follow system. A pre-paint inline script applies the saved choice, so there's no
  flash, and the toggle crossfades with the View Transitions API.
- **Motion with restraint, CSS first.** Reveals (rise, fade, clip "develop"), a ship-log spine
  that draws on load, hairlines that draw, chapter progress and a reading bar on scroll
  timelines, and one WAAPI sequence: a dot that travels the payment loop in the architecture
  diagram. The H1 and intro (the LCP candidates) never fade in. `prefers-reduced-motion` keeps
  200ms fades and drops everything else.
- **Stack ledger** with a CSS-only project filter (radio inputs and `:has()`), and brand glyphs
  from [Simple Icons](https://simpleicons.org) (CC0) as CSS masks that load only when the
  section renders.
- **Fonts:** Geist, Geist Mono and Instrument Serif Italic, self-hosted and subset to exactly
  the characters the site uses (about 60 kB in total, all preloaded, with metric-matched
  fallbacks so there's no layout shift).
- **SEO and AI search:** full metadata, canonical URL, generated Open Graph and Twitter images,
  `sitemap.xml`, `robots.txt`, a JSON-LD graph (`Person`, `Organization`, `WebSite`,
  `ProfilePage`, `SoftwareApplication`, `SoftwareSourceCode`) and
  [`/llms.txt`](https://llmstxt.org), a route generated from `site.ts`.
- **Accessibility:** semantic landmarks, one H1 and an ordered heading outline, a skip link,
  visible focus rings, keyboard-scrollable regions, and text contrast of at least 4.5:1 in
  both themes.

## Project structure

```
src/
  app/            layout (fonts, metadata, theme script), page, OG/Twitter images,
                  icons, sitemap, robots, manifest, llms.txt, 404
  sections/       one file per page section (hero, work, zenz + incident + architecture,
                  prelims, process, stack, about, contact)
  components/     page-behavior (the one client island), frames (phone, browser, rail),
                  case-study layout, code block, header, nav, theme toggle, icons
  lib/            site.ts (facts, links, stack), metadata.ts, highlight.ts
  assets/         screenshots (zenz, prelims), app icons, portrait, avatar, fonts
public/
  Aayush_Thakur_Resume.pdf, aayush.jpg (stable image for structured data),
  stack-icons/ (Simple Icons, CC0)
```

All facts (every number on the page), links, the stack list and the site URL live in
[`src/lib/site.ts`](src/lib/site.ts). Sections, JSON-LD and llms.txt read from it.

## Images

All screenshots are imported statically from `src/assets/`, so Next.js knows their size
(no layout shift) and serves AVIF/WebP at the right width.

- `src/assets/zenz/`: the admin dashboard band, the app home screen, the six booking-flow
  screens, the app icon and the case-index card.
- `src/assets/prelims/`: PrelimsDaily screens, app icon and case-index card.
- `src/assets/about/`: the 4:5 portrait and the 192px header avatar cropped from it.

Phone screenshots are stored **with the device status bar cropped off** (about the top 5%).
The frame draws a clean one in the app's colours, which keeps notification icons and data
counters off the site. To swap a screen, replace the file with the same name and keep the same
crop.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every route prerendered)
npm run start      # serve the production build
npm run lint
```

`NEXT_PUBLIC_SITE_URL` sets the canonical origin used by canonical URLs, the sitemap, OG tags,
JSON-LD and llms.txt. If it's unset, Vercel's production domain is used, then
`https://aayushthakur.vercel.app`.

## Deploy

Import the repository into [Vercel](https://vercel.com/new). It needs no build configuration
because Vercel detects Next.js. Every push to `main` then deploys automatically.

**Set `NEXT_PUBLIC_SITE_URL` in Vercel** (Project → Settings → Environment Variables, e.g.
`https://aayushthakur.vercel.app` or your custom domain), then redeploy, so every canonical URL
and share card points at the right domain.

## Credits

Geist and Geist Mono by Vercel, and Instrument Serif by Instrument, all under the SIL Open
Font License. Brand glyphs from Simple Icons (CC0). PrelimsDaily screenshots are from
[aayush-t-exe/prelims-daily](https://github.com/aayush-t-exe/prelims-daily).
