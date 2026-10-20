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
  components/     shared UI: frames (phone/browser), case-study layout, code block, icons…
  lib/            site.ts (all facts and links), image-slots.ts, highlight.ts
  assets/         PrelimsDaily screenshots, fonts (web subsets + TTFs for the OG image)
public/
  images/         drop your own screenshots here (see below)
  schematics/     placeholder art shown until real screenshots exist
  Aayush_Thakur_Resume.pdf
```

All facts, links and the site URL live in [`src/lib/site.ts`](src/lib/site.ts).

## Adding the missing images

Zen-Z screenshots and the portrait use **image slots**. Drop a file with the right name into
`public/images/` (`.png`, `.jpg`, `.webp` or `.avif`) and it replaces the schematic on the
next build, with no code changes. Frames keep a fixed aspect ratio, so swapping images never
shifts the layout.

| File | What | Size |
| --- | --- | --- |
| `public/images/zenz/app-home.png` | Zen-Z app home or plans screen | 1080 × 2284 (portrait phone) |
| `public/images/zenz/app-booking.png` | A step of the booking flow | 1080 × 2284 |
| `public/images/zenz/app-chat.png` | Group chat | 1080 × 2284 |
| `public/images/zenz/admin-board.png` | Admin matching board | 2400 × 1500 (16:10) |
| `public/images/about/portrait.jpg` | Your photo (face in the upper third) | 1200 × 1500 (4:5) |

Phone screenshots are cropped from the top, so any modern phone screenshot (around 9:19) works.
Include the status bar. Run `npm run dev` and the dev build labels each missing slot with its
exact path.

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
