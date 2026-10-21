# aayush-portfolio

The personal site of **Aayush Thakur**, who built Zen-Z, a live campus app with paying users,
solo. A short home page (who, the work, how I build with AI, how to reach me) plus a case study
per product and a stack page.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. Designed and built
with Claude Code from a written plan ([PLAN.md](PLAN.md)).

## Routes

| Route | What's there |
| --- | --- |
| `/` | Hero (photo byline, the ask, four proof receipts, a Zen-Z stage), three work cards, how I build with AI, about + contact, closing CTA |
| `/work/zen-z` | The Zen-Z case: problem, what I built, architecture, the payment incident, results. Sticky table of contents with chapter progress |
| `/work/prelimsdaily` | The PrelimsDaily case: the one-day brief, decisions, 72 tests |
| `/stack` | Every tool by layer, filterable by the product it shipped in |
| `/llms.txt` | A plain-text brief for AI search, generated from `site.ts` |

Each route has its own title, description, canonical URL, Open Graph/Twitter image (the two case
pages render their own) and JSON-LD.

## Highlights

- **Static, one client island.** Every route is prerendered. The only client component is
  `PageBehavior` (renders nothing): figure reveals, anchor jumps, home-page scroll-spy, the theme
  toggle, copy-email, rail dragging, the payment-loop dot and the footer's live values.
- **Three runtime dependencies:** `next`, `react`, `react-dom`. No animation, theme or
  highlighting library.
- **The signature: a build receipt in the footer**, true values only. Jaipur's local time
  (computed in the browser), Zen-Z on Google Play, the framework, the JS this page actually
  loaded (from Resource Timing), and the commit plus how long ago it was built. On Vercel it says
  "deployed" and links the commit; locally it says "built" and marks uncommitted changes.
- **Card → case morph.** A work card's stage and the case page's lead image are the same
  component under one React `<ViewTransition>` name, so following a card morphs it into place
  (320ms, ease-out). With reduced motion it's a cross-fade.
- **Motion kept small:** figures and cards reveal once (350ms), the hero stage enters once, the
  status dot pulses three times, case pages show chapter progress on scroll timelines. Text never
  animates; the H1 (the LCP element) paints immediately.
- **Type:** Schibsted Grotesk SemiBold for headlines, Geist for text, Geist Mono for numbers and
  code. Self-hosted, subset to the characters the site uses, about 66 kB in total.
- **Themes:** light and dark follow the OS until you choose; the toggle cycles light → dark →
  system, with no flash (pre-paint script). Product stages are dark in both themes.
- **Accessibility:** landmarks, one H1 per page and an ordered outline, skip link, visible focus,
  keyboard-scrollable rails, 4.5:1 text contrast in both themes.

## Project structure

```
src/
  app/                 layout (fonts, metadata, theme script), home, work/zen-z, work/prelimsdaily,
                       stack, OG/Twitter images, icons, sitemap, robots, manifest, llms.txt, 404
  sections/home/       hero, work cards, how I build with AI, about + contact + closing CTA
  sections/zenz/       the Zen-Z case, its architecture diagram and the incident
  sections/prelims/    the PrelimsDaily case
  sections/stack.tsx   the stack ledger
  components/          page-behavior (the client island), stage (product stages + morph),
                       case (case page layout, TOC, chapters), frames, footer (build receipt),
                       header, nav, theme toggle, copy email, code block, icons
  lib/                 site.ts (facts, links, routes, stack), jsonld.tsx, metadata.ts,
                       og-image.tsx, highlight.ts
```

Every number on the site, every link, the routes and the stack live in
[`src/lib/site.ts`](src/lib/site.ts). Pages, JSON-LD, OG images and llms.txt read from it.

## Photos (easy to swap)

- `src/assets/about/byline.jpg`: the hero byline photo. Square, head and shoulders (currently a
  320px crop of the portrait).
- `src/assets/about/portrait.jpg`: the FIG. 01 portrait in About. 4:5.
- `public/aayush.jpg`: the stable image used in structured data.

Replace a file with the same name and ratio and rebuild. The grade (−10% saturation, slightly
warm) is applied in CSS (`.photo`), so new photos match without editing.

Phone screenshots in `src/assets/zenz` and `src/assets/prelims` are stored with the device status
bar cropped off; the frame draws a clean one.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every route prerendered)
npm run start      # serve the production build
npm run lint
```

## Deploy (GitHub + Vercel)

1. Create an empty GitHub repository (no README), then push this one:
   `git remote add origin https://github.com/<you>/<repo>.git` and `git push -u origin main`.
2. On [vercel.com/new](https://vercel.com/new), import that repository. Vercel detects Next.js;
   keep the defaults and deploy.
3. Project → Settings → Environment Variables: add `NEXT_PUBLIC_SITE_URL` (your production URL,
   e.g. `https://aayushthakur.vercel.app` or a custom domain) for Production, then redeploy.
   It's the canonical origin for canonical URLs, the sitemap, OG tags, JSON-LD and llms.txt
   (fallbacks: Vercel's production domain, then `https://aayushthakur.vercel.app`).
4. The footer's commit link and "deployed" label come from Vercel's system variables
   (`VERCEL_GIT_COMMIT_SHA`, `VERCEL_GIT_REPO_OWNER`, `VERCEL_GIT_REPO_SLUG`), which Vercel sets
   automatically for Git deployments.

## Credits

Geist and Geist Mono by Vercel, Schibsted Grotesk by Schibsted, all under the SIL Open Font
License. Brand glyphs from Simple Icons (CC0). PrelimsDaily screenshots are from
[aayush-t-exe/prelims-daily](https://github.com/aayush-t-exe/prelims-daily).
