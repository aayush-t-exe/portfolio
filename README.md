# Aayush Thakur: portfolio

The portfolio of Aayush Thakur, founder of [Zen-Z](https://zen-z.site), a campus app live on Google
Play that he built solo. A cinematic home page in Zen-Z's own brand (red on black, with cream
sections), plus case studies for Zen-Z and PrelimsDaily and a stack page.

Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP + Lenis on desktop. Every route is static.

## Routes

| Route | What's there |
| --- | --- |
| `/` | Intro (once per session) → hero with the travelling phone and the name marquee → count-up stats → tech bands → the pinned Zen-Z booking flow → under the hood (architecture, payment loop, the same-day fix) → selected work → PrelimsDaily stacking cards → the orbiting stack → about + achievements → contact |
| `/work/zen-z` | Zen-Z case study: problem, what was built (pinned flow rail), architecture, the payment fix, results |
| `/work/prelimsdaily` | PrelimsDaily case study: the one-day brief, decisions and trade-offs, tests |
| `/stack` | Every tool by layer, filterable by where it shipped (CSS only, no JS) |
| `/llms.txt` | A plain-text brief generated from `site.ts` |

Each route has its own title, description, canonical URL, Open Graph/Twitter image and JSON-LD.

## How it's built

- **Content first, motion second.** All text is server-rendered and readable without JS. The hero
  entrance and the intro are CSS, from first paint, so they never wait for hydration. Scroll
  reveals are set up by JS only when motion is allowed, and never hide something already on screen.
- **Desktop motion is one lazy chunk.** `MotionGate` loads GSAP (ScrollTrigger, SplitText,
  ScrambleText) and Lenis only at ≥768px with motion allowed. Phones never download them; their
  motion is CSS (scroll-driven fades, marquees, snap rows).
- **The travelling phone** is one CSS-3D element: it starts over the hero's phone slot, flies into
  the Zen-Z section as you scroll, pins while the booking flow steps through, then settles flat.
- **Reduced motion:** no Lenis, no pins or scrubs, marquees and orbits stopped, no intro.
- **Type:** Archivo (variable width and weight) for display, Geist for text, Geist Mono for labels
  and numbers. Self-hosted and subset.

## Project structure

```
src/
  app/                 layout (fonts, metadata, pre-paint script), template (page transition),
                       home, work/*, stack, OG/Twitter images, sitemap, robots, manifest, llms.txt
  sections/home/       hero, tech bands, Zen-Z showcase, under the hood, work index,
                       PrelimsDaily stack, stack orbit, about
  sections/zenz/       Zen-Z case + the payment fix
  sections/prelims/    PrelimsDaily case
  sections/stack.tsx   the stack ledger
  components/site/     header, footer (contact), intro, site behaviour, motion gate
  components/ui/       phone, portrait, rise text, glyph
  components/          case layout, case media, architecture, code block, icons
  motion/              the desktop chunk: global effects, home journey, case rails
  lib/                 site.ts (facts, links, stack), media.ts (video slot), jsonld, metadata, og-image
```

Every number, link and tool lives in [`src/lib/site.ts`](src/lib/site.ts).

## Swappable media

- **Portrait:** replace `src/assets/about/portrait.jpg` (4:5). The red duotone and halftone are CSS.
- **Zen-Z screen recording:** put `zenz-demo.mp4`, `zenz-demo.webm` and `zenz-demo-poster.jpg` in
  `public/media/`, then fill in `zenzDemo` in `src/lib/media.ts`. The hero phone switches from the
  screenshot loop to the video (muted, inline, looped, lazy, paused offscreen).
- **Structured-data photo:** `public/aayush.jpg`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every route prerendered)
npm run start      # serve the production build
npm run lint
```

## Deploy

See "Deploy (GitHub + Vercel)" in [PLAN.md](PLAN.md). Set `NEXT_PUBLIC_SITE_URL` to the production
URL; it's the canonical origin for the sitemap, OG tags, JSON-LD and llms.txt.

## Credits

Archivo by Omnibus-Type, Geist and Geist Mono by Vercel, all under the SIL Open Font License. Brand
glyphs from Simple Icons (CC0). Zen-Z art, icons and screenshots are from the Zen-Z app;
PrelimsDaily screenshots from [aayush-t-exe/prelims-daily](https://github.com/aayush-t-exe/prelims-daily).
