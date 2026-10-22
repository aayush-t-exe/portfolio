# Portfolio: plan

Owner: Aayush Thakur · Brief: `S:\Projects\Portfolio-v4\BRIEF.md` (2026-10-22)

## v4: the visual rebuild

**Why.** v3 was well engineered but read as beige, flat and text-heavy, with almost no motion and a
lot of AI talk. v4 has to make an Indian campus/startup recruiter and a US startup founder think
"this person is good" within 5 seconds, and still load fast and work on phones.

**Concept: "Zen-Z red on black", a cinematic product portfolio.** Aayush's edge is that he solo-built
and runs a real consumer app, so the site is built like a premium launch page for it, using Zen-Z's
own brand as the identity, and one object (a CSS-3D phone running the real app) travels through
the page.

### References looked at (screenshots on disk) and what each gives
| Reference | Taken | Not taken |
| --- | --- | --- |
| Dennis Snellenberg | Giant name marquee that follows scroll velocity, layered behind the hero object; project index rows with a cursor-following preview card; magnetic round button; curved edge into the footer; local time in the footer; stacked image cards on mobile | Grey studio palette |
| Dhruv Parmar | Solid + outline type idea, live IST clock, count-up stats, section label in the corner | Blueprint HUD clutter; his mobile hero is an empty grid |
| Masab Qurban | Dark ↔ light section reveals with a shaped edge, big counters, a pinned rail of large device mockups (used on the Zen-Z case page) | Stock-photo device scenes |
| heysai.dev | Pinned "what I do" list with a highlight bar stepping down while the visual on the right swaps (the Zen-Z booking flow) | Terminal pastiche |
| Het Patel | Pills orbiting a glowing centre on rings (the stack, around the red Z); sticky stacking cards (PrelimsDaily); loads instantly | Purple/cyan gradient |
| Naresh Khatri | One object that travels between sections (a phone here, in CSS 3D, no three.js) | WebGL weight |
| Sharif | Nav showing the current section ("03 — Work"), top progress bar, full-bleed accent band with a marquee | Serif editorial look (v3 already left it) |
| Swaraj Singh | Achievements as a visual section; Devanagari greeting | 8–10 s preloader (ours ≤ 1.5 s, once per session) |
| Cyd Stumpel | Sticker/badge cards with personality, giant red type on cream | — |
| Current v3 | Its facts, case content and the payment-loop dot | Beige, small grey stats, the AI section |

### Design system
- **Canvas:** near-black `--ink #0A0908` (warm), raised `#141210`, `#1D1A17`; hairlines `rgb(239 233 220 / .12)`.
- **Text on dark:** `--fg #EFE9DC` (cream white), `--muted #A39E94` (7.4:1 on ink).
- **Zen-Z red:** `--red #E10600` (sampled range #D20100–#E40200 from the app icon). On ink it is
  3.1:1, so it's used for fills, glows, big type and icons only. Small red text on dark uses
  `--red-text #FF3B30` (5.6:1). White on red is 6.4:1; cream on red 5.3:1.
- **Paper:** `--paper #E9E3D5` (Zen-Z cream) for the alternating light sections; ink text on it,
  `--paper-muted #5C564C` (5.6:1), and `#E10600` works as text on paper (5.0:1).
- **Dark-first, no theme toggle.** The light/dark toggle is gone; the cream sections give the light
  moments, so there's one designed look instead of two half-designed ones.
- **Type:** Archivo variable (display, width 75–125 and weight 600–900, subset, 33 kB), Geist
  (body, variable), Geist Mono (labels, counters, clock). All self-hosted and subset.
- **Shape:** radii 14/20/28px, pill buttons, phone corners 44px. Round magnetic buttons for the
  primary calls.
- **Texture:** fixed film grain (SVG noise, 7% opacity, jittered with `steps(6)`, static under
  reduced motion); red radial glows behind the hero object and the stack's centre.

### Font decision (screenshots of the real hero composition, 1440×900)
Tested Archivo (wdth 112, wght 800), Syne (800) and Clash Display (variable, 600):
- **Syne:** at a heavy weight it is so wide that the headline turns into shapes ("app with real
  users" is hard to read), and its outline shows overlapping contours.
- **Clash Display:** the most character, but the variable file draws overlapping contours in the
  outline name, and tight spacing made the headline cramped. The free licence (ITF FFL) is also
  less clear than OFL.
- **Archivo (chosen):** crisp at 56px and at 200px, clean outlines, and the width axis lets the
  same family set a wide, loud name on desktop and a narrower one on phones. OFL.

### Homepage (top → bottom)
| # | Section | Ground | Motion (desktop) | Mobile / reduced motion |
| --- | --- | --- | --- | --- |
| 00 | Intro: नमस्ते → Hello → red Z, then the overlay lifts with a curved edge. ≤ 1.5 s, once per session, home only, skippable | ink | CSS keyframes from first paint (hero is painted underneath, so LCP isn't blocked) | Same on mobile; skipped under reduced motion |
| 01 | Hero: pill (open to internships · Jaipur · live IST clock), H1, sub-line, Magnetic "See my work" / "Resume", tilted phone over a glowing glossy Z with hand-drawn stickers, giant "AAYUSH THAKUR" marquee behind, count-up stat row | ink | Word rise on first paint (CSS), marquee reacts to scroll velocity, stickers parallax, phone tilts toward the cursor | Phone static below the copy; marquee loops slowly via CSS; stats are final values |
| — | Tech marquee: two tilted bands (red, cream) in opposite directions, logo + name | ink | Speeds up with scroll velocity | CSS loop; static under reduced motion |
| 02 | Zen-Z showcase: the hero phone flies in and pins; the left list steps through Pick an activity → Choose a slot → Set a budget → Pick your group → Pay → Get matched, a red highlight bar moves and the phone screen swaps; activity icons float; then Google Play + case-study links | ink | One master ScrollTrigger: hero pose → pinned stage → flat | No pin: each step is a phone + caption card in a snap row |
| 03 | Under the hood: App → Supabase → PayU + admin, the payment-loop dot, counters; "Real money, real fixes" card (fix-first, a self-drawing line through 3 beats, link to `/work/zen-z#incident`) | paper, with a curved reveal edge | Edge scrub, count-ups, line draw | Stacked vertically; numbers final |
| 04 | Selected work index: Zen-Z app, Zen-Z admin dashboard, zen-z.site, PrelimsDaily (role · year) | ink | Rows with a cursor-following preview card, "View" cursor | Stacked image cards |
| 05 | PrelimsDaily: three sticky stacking cards (built in 1 day · 72 tests · reminders that know you're done) with fanned phones | ink, cream cards | Previous card scales to 0.92 and dims | Plain stacked cards |
| 06 | Stack: tech logos orbit the glossy Z on two rings, tooltip says where each shipped | ink | CSS ring rotation, pauses on hover/focus | Tidy logo grid |
| 07 | About + achievements: duotone portrait, short bio, sticker badges, founder timeline that fills | paper | Stickers drop in, timeline line scrubs | Static |
| 08 | Contact / footer: curved edge flattens into black, giant "LET'S TALK", magnetic round email button, copy email, LinkedIn, GitHub, Resume, live Jaipur time, giant name wordmark, "Built with Next.js" | ink | Edge scrub, magnetic button | Static |

**Global:** Lenis smooth scroll (desktop, motion allowed), top scroll-progress bar (CSS scroll
timeline), nav with the current section number + name (scrambles on change), dot + ring cursor
with "View" / "Drag" labels (fine pointers only), film grain, page transition between home and case
pages (React `<ViewTransition>`: the new page wipes in under a curved edge, ≤ 0.6 s).

### Motion architecture (performance first)
- **Everything is server-rendered and visible without JS.** No CSS hides content waiting for JS.
  The hero entrance is CSS-only (it starts at first paint, so it can't stall on hydration).
- **Desktop motion is one lazy chunk.** A tiny client gate checks
  `(min-width: 768px) and (prefers-reduced-motion: no-preference)` and only then loads
  `DesktopMotion` (GSAP, ScrollTrigger, SplitText, ScrambleText, Lenis) with `next/dynamic`.
  Phones never download GSAP, which keeps mobile Lighthouse in range. Inside the chunk every
  section's setup runs in `useGSAP` + `gsap.matchMedia()` (isDesktop / reduce / fine), so tweens
  and triggers revert on unmount and route change.
- **Reveal states are set by JS, only when motion is allowed,** and only for elements still below
  the fold (anything already on screen is left alone, so nothing flashes). If the chunk fails,
  nothing was ever hidden.
- **Mobile motion is CSS:** scroll-driven fade-ups (`animation-timeline: view()`, guarded by
  `@supports`), CSS marquees, snap rows, plus a small always-on script for the clock, count-ups,
  copy-email and the section label.
- **Reduced motion:** no Lenis, no pins, no scrubs, marquees stopped, intro skipped; at most short
  fades.

### Assets
- `src/assets/v4/brand`: glossy Z (transparent, trimmed), app icon, Play Store feature graphic,
  a real screenshot of zen-z.site (captured 2026-10-22).
- `src/assets/v4/art`: the app's hand-drawn illustrations (hands, gathering, invitation, tables,
  READY TO MEET, booking-time art and characters, banner people, stars, spark), WebP with alpha.
- `src/assets/v4/icons`: the 3D activity icons (cafés, cricket, football, pool, pickleball,
  movies, dinners, sports).
- `src/assets/zenz`, `src/assets/prelims`: the real app screenshots (kept).
- **Portrait:** `src/assets/about/portrait.jpg` with a CSS red/black duotone + halftone treatment,
  so a better photo is a one-file swap.
- **Demo video slot:** `public/media/zenz-demo.mp4` (+ `.webm`, poster). Turned on in one place
  (`src/lib/media.ts`). Until then the phone crossfades the real screenshots.

### [CONFIRM] for Aayush
1. **Commit history:** this repo's history contains "Co-Authored-By: Claude" trailers, which show
   on GitHub. Squash into one fresh initial commit before the first push? (Not done without a yes.)
2. **Linked repos show AI tooling:** the "Source" (Zen-Z) and "Read the code" (PrelimsDaily) buttons
   open repos that contain Co-Authored-By: Claude trailers, a CLAUDE.md, a commit titled "WIP
   checkpoint before Claude account switch" and one titled "Keep local assistant notes out of the
   repo". They sit next to "solo" / "built all of it myself". Keep the links, clean those repos, or
   drop the links?
3. **Commit count:** the Zen-Z repo has 183 commits on HEAD (186 across refs); the resume says 179.
   The case page shows 183. Update the resume, or tell me which number to show.
4. **Screens:** the repo has 20 real app routes; the resume says "~25 screens". The site says 20.
   The resume is the one that overclaims.
5. **Launch date:** the timeline says "Sep 2026: launched on Google Play". Repo evidence (Play Store
   prep 4–6 Sep, launch-day data wipe and JNU launch poster 22–23 Sep) suggests ~23 Sep. Confirm.
6. **"Started Zen-Z, Jul 2026":** site.ts and the resume say July; the first commit is 11 Aug (the
   timeline shows both: "Jul: started", "Aug: first commit").
7. **CGPA 8.5/10** (resume) is shown in About. Remove if you'd rather not show it.
8. **PrelimsDaily on iOS:** only an Android build is distributed, so the site now says "Android and
   web". If you ran it on iOS, say so and I'll add it back.
9. **Portrait:** the current photo gets a red duotone + halftone treatment. Send a better photo
   (4:5) to swap in at `src/assets/about/portrait.jpg`.
10. **Demo recording:** `public/media/zenz-demo.mp4` / `.webm` / poster when ready (see Assets).
11. **zen-z.site role:** listed as "Marketing site · design & build · 2026" (`apps/marketing` in the
   Zen-Z repo).
12. **Intro on phones:** the नमस्ते → Hello intro plays on desktop only; on phones the content
   shows at once (better for mobile LCP). Say if you want it on phones too.

### Results (2026-10-22, local production build, Lighthouse 13.5 with Edge)
This laptop is noisy: identical back-to-back runs swing by up to 40 points from background CPU
load (TBT jumps from ~50 ms to 1–2.9 s on pages that load no motion code). Numbers below are the
clean runs (TBT ≤ 150 ms); every run is in the session log.

| Route | Mobile perf | Desktop perf | A11y | Best practices | SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | 89 | 98 | 100 | 100 | 100 |
| `/work/zen-z` | 94 | 99 | 100 | 100 | 100 |
| `/work/prelimsdaily` | 94–95 | 98–99 | 100 | 100 | 100 |
| `/stack` | 94 | 99 | 100 | 100 | 100 |

Final check after the design rounds: `/` scored 89/89/89 mobile and 98/98 desktop on three and two
consecutive runs. Mobile LCP is the H1 (simulated ~3.7 s on `/`, ~3.1 s elsewhere). The floor on every route is
Next/React's own JS being requested before first paint; `/` adds a longer document and more
images. CLS is 0 everywhere. Check again on PageSpeed Insights after deploying (Vercel's CDN and
cached image optimisation are faster than `next start` on a laptop).

### v4 decision log
- 2026-10-22: Archivo over Syne and Clash Display (see "Font decision").
- 2026-10-22: Theme toggle removed; dark-first with cream sections.
- 2026-10-22: GSAP + Lenis load only on desktop with motion allowed (lazy chunk). Mobile motion
  is CSS. The brief's cookbook uses `useGSAP` everywhere; that still holds inside the chunk.
- 2026-10-22: The hero entrance is CSS-only so it never waits for hydration; the intro overlay is
  CSS too (driven by a class set before first paint), so it ends on time even if JS is slow.
- 2026-10-22: The booking flow shows the real six screens (activity, slot, budget, group, confirm,
  pay). Matching happens after booking, so "then you're matched" is the last step's caption, with
  the app's own READY TO MEET art, not a made-up screen.
- 2026-10-22: Desktop motion is set up on load + idle (with a 2.5 s fallback), reading layout
  before writing. Setting it up during hydration caused a 0.2–2.7 s long task (layout thrash on a
  long page); now TBT on desktop is ~10–30 ms.
- 2026-10-22: Phones: the intro is skipped and the H1 paints at once (it's the LCP element);
  phone screenshots are lazy unless above the fold; no image preloads in the hero; decorative CSS
  loops start when the page is idle. `content-visibility` was tried and removed (small gain, and it
  made Lighthouse's contrast check misread backgrounds).
- 2026-10-22: Design critique (two rounds against the references): proof line in the first screen,
  wipes instead of crossfades between phone screens, always-visible work thumbnails, later and
  lighter dim on the stacked cards, 12 brand-coloured orbit pills, varied achievement stickers
  without repeating hero stats, email circle beside LET'S TALK. Kept the floating nav pills (no
  backdrop band) and the name marquee at the bottom of the first screen.
- 2026-10-22: Copy and a11y reviews (two independent passes) applied: CI and Edge Function claims
  match the repo, the incident is told fix-first and exactly, AA contrast everywhere (small red
  text on cream uses #A80400), keyboard access to the static flow steps and the rail, inert page
  behind the mobile menu.

### Deploy (GitHub + Vercel)
1. Decide [CONFIRM] 1 first. To start with a clean history (optional): `git checkout --orphan
   fresh`, `git add -A`, `git commit -m "Portfolio v4"`, `git branch -D main`, `git branch -m main`.
2. GitHub → New repository → name it (e.g. `portfolio`), Public, **no** README/.gitignore/license →
   Create. Then in `S:\portfolio`: `git remote add origin https://github.com/aayush-t-exe/portfolio.git`
   and `git push -u origin main`.
3. vercel.com → Add New… → Project → Import the `portfolio` repo → Framework preset: Next.js (auto)
   → leave Build/Output settings as they are → Deploy.
4. Project → Settings → Environment Variables → add `NEXT_PUBLIC_SITE_URL` = your production URL
   (e.g. `https://aayushthakur.vercel.app`, or your custom domain) for Production → Save →
   Deployments → ⋯ on the latest → Redeploy.
5. Optional domain: Settings → Domains → add it, follow the DNS records Vercel shows, then update
   `NEXT_PUBLIC_SITE_URL` to it and redeploy.
6. Check: open the site on a phone, run PageSpeed Insights on `/` and `/work/zen-z`, and paste the
   URL into a LinkedIn post composer to see the OG card.

---

## Earlier versions (history)
v1/v2 (2026-10-21) built an editorial "ship log" one-pager; v3 (2026-10-21/22) restructured it into
a short home page plus `/work/zen-z`, `/work/prelimsdaily` and `/stack`, cut the home page from
16,957px to 4,256px on desktop, and reached a11y/SEO/best-practices 100 with desktop performance
~99. Its decision log is in git history (`git show cbbaef5:PLAN.md`). v4 keeps v3's routes, facts
and engineering (static routes, JSON-LD, sitemap, llms.txt, OG images) and replaces the visual layer.
