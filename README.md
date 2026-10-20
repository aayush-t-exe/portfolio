# aayush-portfolio

The personal site of **Aayush Thakur**, a founder-engineer who ships real products fast with AI.
It's one fast, static page with two case studies (Zen-Z and PrelimsDaily), how I work with AI,
and a way to reach me.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. It was designed
and built with Claude Code, starting from a written plan ([PLAN.md](PLAN.md)).

## Highlights

- **Static by default.** Every route is prerendered at build time, and the only client
  JavaScript beyond React is four tiny components (scroll-spy nav, theme toggle, copy-email
  button, scroll reveal).
- **Three runtime dependencies:** `next`, `react` and `react-dom`. No animation library, no
  theme library and no syntax highlighter. The code sample is highlighted at build time by a
  ~40-line tokenizer in `src/lib/highlight.ts`.
- **Light and dark themes** that follow the OS until you choose one. A pre-paint inline script
  applies the saved choice, so there's no flash, and the toggle crossfades with the View
  Transitions API.
- **Motion with restraint.** Reveal-on-scroll only animates opacity and a short translate with
  a strong ease-out, and buttons scale to 0.97 when pressed. Text that is a Largest Contentful
  Paint (LCP) candidate never fades in. `prefers-reduced-motion` keeps gentle fades and drops
  all movement.
- **Fonts:** Geist, Geist Mono and Instrument Serif Italic, self-hosted and subset to exactly
  the characters the site uses (about 60 kB in total, all preloaded, with metric-matched
  fallbacks so there's no layout shift).
- **SEO and AI search:** full metadata, canonical URL, generated Open Graph and Twitter images,
  `sitemap.xml`, `robots.txt`, a JSON-LD graph (`Person`, `WebSite`, `ProfilePage`, and
  `SoftwareApplication` for each project) and [`/llms.txt`](https://llmstxt.org).
- **Accessibility:** semantic landmarks, one H1 and an ordered heading outline, a skip link,
  visible focus rings, keyboard-scrollable regions, and text contrast of at least 4.5:1 in
  both themes.

## Project structure

```
src/
  app/            layout (fonts, metadata, theme script), page, OG/Twitter images,
                  icons, sitemap, robots, manifest, llms.txt, 404
  sections/       one file per page section (hero, zenz, prelims, process, about, contact…)
  components/     shared UI: frames (phone, browser, phone rail), case-study layout, code block…
  lib/            site.ts (all facts and links), metadata.ts, highlight.ts
  assets/         screenshots (zenz, prelims), portrait, fonts (web subsets + TTFs for OG)
public/
  Aayush_Thakur_Resume.pdf
```

All facts, links and the site URL live in [`src/lib/site.ts`](src/lib/site.ts).

## Images

All screenshots are imported statically from `src/assets/`, so Next.js knows their size
(no layout shift) and serves AVIF/WebP at the right width.

- `src/assets/zenz/`: the admin dashboard, the app home screen and the six booking-flow
  screens.
- `src/assets/prelims/`: PrelimsDaily screens.
- `src/assets/about/portrait.jpg`: 4:5 portrait.

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

Optional: set `NEXT_PUBLIC_SITE_URL` (for example `https://aayushthakur.vercel.app`) so canonical
URLs, the sitemap, OG tags and llms.txt use your real domain. It defaults to that value.

## Deploy

Import the repository into [Vercel](https://vercel.com/new). It needs no configuration
because Vercel detects Next.js. Every push to `main` then deploys automatically.

## Credits

Geist and Geist Mono by Vercel, and Instrument Serif by Instrument, all under the SIL Open
Font License. PrelimsDaily screenshots are from
[aayush-t-exe/prelims-daily](https://github.com/aayush-t-exe/prelims-daily).
