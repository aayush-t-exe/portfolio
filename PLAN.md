# Portfolio: plan

Owner: Aayush Thakur · Built with Claude Code · Started 2026-10-21

## v3: restructure (from S:\Projects\Portfolio-v3\BRIEF.md, 2026-10-21)

**Verdict carried over from the brief:** good craft, wrong structure. v2's home page was 16,957px
on desktop (18.8 screens), 24,297px on mobile (28.8 screens) and 2,794 words, and its first screen
looked like the 2026 AI-editorial template (Geist + one Instrument Serif italic word, paper,
mono "01 ——" labels).

**Plan**
1. **Routes:** a short `/` plus `/work/zen-z`, `/work/prelimsdaily` and `/stack`. Each case has its
   own metadata, OG image and JSON-LD; the sitemap and llms.txt list them all.
2. **Home, top to bottom:** hero (byline photo, a concrete H1, the ask, one proof line, a dark
   Zen-Z "stage") → three work cards (Zen-Z, PrelimsDaily, the incident teaser) → how I build
   with AI → about + contact (FIG. 01 portrait, looking for, work-with-me menu, live Jaipur
   time) → a full-bleed closing CTA → the footer's build receipt (the one signature element).
   Targets: ≤ ~4,500px desktop, ≤ ~9 mobile screens, ≤ ~600 words, every number once.
3. **Visual system:** retire the serif-italic signature, a grotesk display tested against one
   alternative, tabular mono numbers, far fewer mono labels, no "01 ——" on the home page, dark
   product stages inside the light page, one photo grade.
4. **Motion, about half:** no reading bar, no image settle, no text reveals; only figures and
   cards reveal (300–400ms, ≤ 40ms stagger). The hero stage enters once. The status dot pulses
   three times and stops. Scroll-spy only on `/`, chapter progress only on case pages. New: the
   card → case-page morph (React `<ViewTransition>` + `next/link`, built in, no dependency).
5. **Bugs:** header backdrop dropping out mid-page; the mobile admin caption; overflow, tab
   stops and image `sizes` re-checked.

**Type (Phase 3, decided with screenshots of the hero and work cards):** headlines in
**Schibsted Grotesk SemiBold**, body in Geist, numbers and code in Geist Mono. Tested against
Geist-only and Hanken Grotesk. Geist-only is the look the brief calls the default; Hanken reads as
generic Helvetica. Schibsted's sharp terminals, single-storey-feeling `a`, spurred `G` and flared
`I` give the H1 a voice without a second "accent" typeface. Only the 600 weight is loaded (one
static subset, 20.6 kB, replacing Instrument Serif's 14.5 kB). Instrument Serif is gone.

**Accent:** Zen-Z's own red instead of vermilion (screenshots of both, light and dark). It ties
the site's single accent to the product's icon and badges inside the stages, and it breaks the
paper + vermilion + serif-italic look rameskum.com and others share. `#C8100F` in light (5.3:1 on
paper), `#FF4A3D` in dark (5.8:1 on ink). The closing CTA band is the same deep red in both
themes (white text, 5.9:1), so it doesn't glare in dark mode.

**Bolder option considered:** a single narrow column (Samuel Kraft, Paco, Delba). Rejected for
the hero: at 640px a column can't show the face, the ask and a large product visual in the first
desktop screen. Taken from them instead: uniform dark stages, quiet type, short copy.

**Results (2026-10-22, local production build)**

| | v2 | v3 |
| --- | --- | --- |
| Home height, desktop 1440 | 16,957px (18.8 screens) | 4,256px (4.7 screens) |
| Home height, mobile 390 | 24,297px (28.8 screens) | 6,400px (7.6 screens) |
| Home words (main / page) | 2,794 / 2,839 | 504 / 558 |
| Zen-Z case words | 1,329 (on the home page) | 1,037 on `/work/zen-z` (−22%, evidence kept) |
| Lighthouse mobile perf, same session, interleaved runs | 67–71 | 81–83 |

Lighthouse on this laptop swings widely with load (the same build scored 35–84 on back-to-back
runs). A11y, Best Practices and SEO are 100 on every route, desktop performance medians are 99
on `/` and `/work/zen-z`, and mobile performance lands at 75–89 on clean runs. The remaining
mobile gap is Next/React's own JS (hydration ~300ms at 4× CPU) plus first layout; v3 cut every
other critical-path cost it could (see the decision log). Verify on PageSpeed Insights after
deploy.

### v3 decision log
- 2026-10-21: H1 is "I built Zen-Z solo: a live campus app with paying users." The brief's
  draft said "built and run … solo"; the admin board is used by "the team", so "run it solo"
  isn't claimed. Proof receipts keep "₹33K+ revenue" exactly (with an `abbr` for ₹), not "in
  paid bookings" (cafés and dinners earn venue commission, so revenue isn't only bookings).
- 2026-10-21: Every home number appears once. The brief listed 150+ and 152/183 in both the hero
  and later sections; they stay in the hero receipts, and the AI section shows the real
  `Co-Authored-By` trailer (verbatim from Zen-Z's log, on 102 of the 152) instead of the number.
- 2026-10-21: Stack ledger → `/stack` (not the end of the Zen-Z page): its filter spans three
  products, so it belongs to none of them.
- 2026-10-21: The morph uses React `<ViewTransition>` with `next/link` (built into Next 16.4 +
  React 19.3, no config, no dependency). The incident teaser uses a plain link: it lands mid-page,
  so it shouldn't morph the stage. The back link cross-fades (the pair doesn't re-form there).
- 2026-10-21: The JS weight in the footer is measured in the browser (Resource Timing, encoded
  bytes of same-origin scripts) instead of "from the build": Next 16's build output no longer
  prints per-route sizes, and a value baked in before the build finishes couldn't be true.
- 2026-10-21: Header blur bug: the minifier merged `backdrop-filter` + `-webkit-backdrop-filter`
  and kept only the prefixed one, which Chromium ignores. Only the standard property is written.
- 2026-10-22: Performance: images no longer request `fetchPriority="high"` except the Zen-Z
  dashboard on its case page (desktop LCP); Geist Mono isn't preloaded; `text-wrap: pretty` and
  the global `html:has()` are gone; content-visibility removed (pages are short now).
- 2026-10-22: Copy is pronoun-free wherever Aayush is described in the third person.

---

The sections below describe v1/v2 and are kept for history; where they disagree with the v3
notes above, v3 wins.

## 1. Goal

One page that makes a design-literate startup founder think *"this person ships, and has taste"* within
10 seconds, and that holds up when they go deeper (case studies, code, architecture).

Positioning line: **Founder-engineer who ships real products fast with AI.**
Builder energy, not student energy: lead with shipped products and outcomes. Education is in About
as a fact, not a headline.

## 2. Design directions considered

### A. "Ship Log": editorial engineering *(chosen)*
A warm, paper-and-ink editorial layout that reads like a well-kept engineering log. A grotesk
(Geist) for UI and body, an expressive serif italic (Instrument Serif) for a few emphasised words,
and mono (Geist Mono) for metadata: dates, labels, file names, metrics. Hairline rules and a
visible 12-column rhythm, generous whitespace, and one hot signal colour (vermilion) used sparingly
for "live" and "shipped" moments. Case studies are told like post-mortems: problem → build →
architecture → incident → results.

### B. "Midnight Instrument": dark-first product UI
Linear/Vercel-style: near-black canvas, glow gradients, glassy cards, animated beams. Polished, but
by 2026 it is the default "dev portfolio" look, so it reads as a template, and glow effects cost
contrast and performance.

### C. "Swiss Poster": big-type brutalism
Huge type, strict grid, black/white plus one primary colour, almost no imagery. Memorable and
confident, but cold, and it fights the main asset (app screenshots and a story-driven case study).

### Why A
- **Fits the story.** Aayush's edge is *shipping and owning outcomes*: launch numbers, a real payment
  incident and a fix. An engineering-log voice (timestamps, change logs, post-mortems) shows that
  instead of claiming it.
- **Distinctive without gimmicks.** Serif-italic accents with mono metadata on warm paper is rare
  among developer portfolios and close to the editorial craft of Rauno and Emil Kowalski. It has a
  point of view.
- **Works in both themes.** Paper/ink inverts cleanly to ink/paper; the one accent colour carries
  over in both.
- **Fast.** No WebGL, no glow blur layers, no animation library. Everything is CSS and SVG, which
  makes the Lighthouse 95+ bar achievable.

## 3. Design system

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | warm paper `#F4F2ED` | ink `#0E0E0C` | page |
| `--surface` | `#FBFAF7` | `#161613` | cards |
| `--fg` | `#161512` | `#EEECE6` | text |
| `--muted` | `#5B5850` | `#A39F96` | secondary text (≥ 5.8:1 on every surface) |
| `--line` | `#DEDAD1` | `#2A2926` | hairlines |
| `--accent` | vermilion `#B3320D` | `#FF6A3D` | live dot, key words, focus ring (≥ 4.6:1, incl. tinted pills) |

- Type scale: fluid `clamp()`; display at -0.035em tracking, body 16–17px / 1.6.
- Radius: 14px cards, 999px pills. Shadows: almost none (hairlines plus a 1px inner highlight).
- Motion (Emil Kowalski principles): `--ease-out: cubic-bezier(0.23,1,0.32,1)`. Reveal-on-scroll
  only animates opacity and an 8–12px translate, staggered 60ms. Buttons scale to 0.97 on press.
  Hover effects only on `(hover:hover) and (pointer:fine)`. `prefers-reduced-motion`
  keeps opacity fades, removes motion, and renders the hero log fully.
- Focus: 2px accent outline at 3px offset on every interactive element.

## 4. Information architecture (single page plus a few routes)

1. **Header**: avatar (with an "Open to work · Jaipur (IST)" status dot) and name, anchor nav
   (Work · Process · Stack · About · Contact), theme toggle (light → dark → system), Resume.
2. **Hero**: status pill; H1 *"I ship real products, fast."*; intro; CTAs (See the work,
   Resume, copy email). Beside it, the **ship log**: real milestones with the two products'
   app icons, so the first screen shows products, not just words.
3. **Proof strip**: 150+ users in 2 days · ₹33K+ revenue · 140K+ Instagram views · 1 day / 72 tests.
4. **Work**: a two-card **case index** (composited real screens), then:
   - **Case 01, Zen-Z**: header with a Problem/Built/Result TL;DR and Outcome; the live admin
     dashboard and app → The problem → What I built (booking-flow strip, three surfaces) →
     Architecture (HTML diagram with the payment-loop dot) → **Incident** (16 Sep 2026: timeline,
     before/after, follow-up, race, code sketch) → Results (metrics, under the hood, along the way).
   - **Case 02, PrelimsDaily**: TL;DR; 230px phone rail of 5 real screens; decisions; 72 tests.
   - **Also**: SIH internal round, 5th of ~75 teams.
5. **How I work with AI**: a 4-step loop with checkable evidence: 152/183 Zen-Z commits
   co-authored with Claude, this repo's PLAN.md decision log, PrelimsDaily commit 98611bf.
6. **Stack ledger** (`#stack`): layers as rows, each tool with what it was used for and where it
   shipped (Zen-Z / PrelimsDaily / this site), a CSS-only project filter; coursework line.
7. **About**: portrait ("Fig. 2") plus a short first-person bio and facts.
8. **Contact**: email (mailto + copy), a card with what Aayush is looking for, GitHub, LinkedIn,
   Resume.
9. **Footer**: colophon.

## 5. Content rules
- Every number comes from the brief, the resume PDF (published on the site) or the two repos
  (campus-social, prelims-daily), and lives once in `facts` in `src/lib/site.ts`.
- Verified against the Zen-Z repo on 2026-10-21 (independent fact-check): 183 commits (152
  co-authored with Claude, 33 days), 20 app screens, 28 tables with RLS on all, 102 migrations,
  41 Postgres functions, 7 Edge Functions, 3 pg_cron jobs, 11 CI jobs, 37 suites, 115 pgTAP
  assertions (against a hosted Supabase dev Postgres), group sizes, pricing since 28 Sep, the
  incident commits and dates. Wording deliberately avoided where the repo didn't support it:
  "76 RLS policies" (about 61 are live), "audited" for admin_mark_booking_paid (no audit
  record), "polls" for the 23 Sep fix (it re-checks on tab return).
- The PayU code is labelled a *simplified sketch* of the real handler (real table name, hash
  field order, constant-time compare, best-effort logging, race outcome name).
- "150+ users in 2 days" and "₹33K+ revenue" are Aayush's own figures (confirmed); the repo
  README's "150+ students finished the personality quiz in the first week" is a different
  metric and isn't used.

## 6. Tech decisions

| Decision | Why |
| --- | --- |
| Next.js 16 App Router, fully static | Every route pre-renders; best TTFB and LCP on Vercel. |
| Tailwind v4 (CSS-first `@theme`) | Tokens in CSS variables, no config file. |
| `next/font/local` with subset fonts | Geist + Geist Mono (variable) and Instrument Serif Italic, subset to the site's characters: ~60 kB, all preloaded, metric-matched fallbacks. |
| No animation library | CSS transitions, scroll-driven animations and one WAAPI sequence cover everything. |
| **One client island** (`PageBehavior`) | Reveal, anchors, scroll-spy, theme cycling, copy-email and rail drag via attributes and event delegation; nav, toggle and copy buttons are server components. |
| Own theme handling (inline pre-paint script) | No `next-themes`; no flash; `data-theme-pref` drives the toggle's icon/label in CSS. |
| CSS-only Stack filter | Radio inputs + `:has()`; no JS, no reflow. |
| Stack glyphs as per-icon CSS masks | Simple Icons (CC0) in `public/stack-icons/`; a mask only loads when its element is styled, so nothing is fetched until the section renders, and ~20 kB of paths stay out of the HTML/RSC payload. (The brief asked for inline glyphs; inlining doubled the bytes in HTML + payload, which was the main Lighthouse cost.) |
| `next/og` for OG/Twitter images | Generated at build. |
| Total runtime deps: `next`, `react`, `react-dom` | Nothing else. |

SEO/AEO: metadata API (title template, description ≤155 chars, canonical on the home page only,
OG, Twitter), `sitemap.ts`, `robots.ts`, JSON-LD (`Person` with a stable image, `Organization`
for Zen-Z with `sameAs`, `WebSite`, `ProfilePage`, `SoftwareApplication` with the Play URL,
`SoftwareSourceCode` for PrelimsDaily), `/llms.txt` generated from `site.ts` (a route, not a
file). The web manifest can't be theme-aware (no media queries in the format); browser chrome
colour follows the theme via media-queried `theme-color` metas, synced when the user overrides.

Site URL: `NEXT_PUBLIC_SITE_URL`, else Vercel's production domain, else
`https://aayushthakur.vercel.app`.

## 7. Process
1. Scaffold → tokens and layout → sections one by one (one commit each).
2. Screenshots at 1440 and 390 (Playwright driving the installed Edge) → design critique → fix. ×2+
3. Lighthouse mobile → fix to 95+ in all four categories.
4. Senior-engineer review pass → README → deploy guide.

## 8. Decision log
- 2026-10-21: Chose direction A. Accent is vermilion, not the PrelimsDaily orange, so the brand
  is Aayush's own rather than a project's.
- 2026-10-21: Single long page plus anchors (not per-project routes): founders skim; one URL is
  easier to share. Each case study has its own `id` for deep-linking (`/#zen-z`).
- 2026-10-21: Facts from the downloadable resume are used too (28 tables, 7 Edge Functions,
  37 test suites, 179 commits, ~25 screens), since that PDF is published on the site anyway.
- 2026-10-21: Missing Zen-Z screenshots render as on-brand schematics (pre-rendered WebP, CSS
  backgrounds); dev builds label each slot with its file path and size, production says
  "shown as schematics" once in the caption.
- 2026-10-21: Performance decisions after Lighthouse:
  - Subset, self-hosted fonts instead of Google subsets (the ₹ sign pulled in latin-ext late).
  - `content-visibility: auto` on below-the-fold sections.
  - Hero H1 and intro never fade in (they are the LCP candidates).
  - Code sample rendered as one HTML string, which keeps the DOM and RSC payload small.
  - `inlineCss` tried and reverted: no gain, and it doubled the CSS bytes (style tag + RSC payload).
  - `cacheComponents` and `partialPrefetching` off: one static page, no internal navigation.
- 2026-10-21: Light accent darkened from `#C2370F` to `#B3320D` so small accent text on tinted pills
  passes 4.5:1.
- 2026-10-21: Pronoun-free third-person copy in metadata and llms.txt (Aayush's pronouns weren't
  specified).
- 2026-10-21: Real Zen-Z screenshots and portrait added. The image-slot and schematic system was
  removed (no longer needed). There's no group-chat screenshot, so "What I built" shows the
  booking flow as a six-screen strip (five choices, then payment) instead. The admin crop drops
  the browser chrome; phone crops drop the status bar. The profile screenshot was not used
  because it shows a phone number and personal email.

### v2 (from BRIEF.md: design critique, code/Lighthouse audit, repo fact-check)
- 2026-10-21: Reveal failsafe has its own class (`reveal-armed`); it can no longer hide the
  theme toggle by removing `js`.
- 2026-10-21: Facts corrected against the repos and centralised in `facts` (72 tests / 5 suites,
  183 commits, 20 app screens, group sizes, pricing). Play Store and public Source links added.
- 2026-10-21: Header avatar uses `loading="eager"` (the brief said `priority`, deprecated in
  Next 16); the avatar crop box was moved 14px down so the chin isn't cut.
- 2026-10-21: Motion v2: CSS-first reveal variants, ship-log spine, developing figures, drawn
  hairlines, the payment-loop dot (WAAPI, twice), chapter progress and a reading bar on scroll
  timelines. Reduced motion: 200ms fades only.
- 2026-10-21: Ship-log thumbnails use the real app icons instead of screen crops (legible at
  40px).
- 2026-10-21: The admin dashboard is shown as the band with "Pending reports" and "Payments to
  check" (both 0), plus the Students/Reports tools: any 16:10 crop with the header also showed
  the old "Campus Social" title or this week's low numbers. Below sm, only the phone shows.
- 2026-10-21: Phone rails are 230px snap scrollers at every width (with mouse drag) instead of a
  6-column grid that shrank phones to ~170px.
- 2026-10-21: PrelimsDaily "Result" is vertically centred and "Smart reminders" starts at its
  Settings heading (reframed, no content changed) to avoid empty space and a mid-scroll start.
- 2026-10-21: Jest is tagged for Zen-Z and PrelimsDaily (PrelimsDaily's tests run on jest-expo),
  correcting the brief's "Zen-Z only".
- 2026-10-21: NavLinks, ThemeToggle and CopyEmail became server components; one client island.
- 2026-10-21: Final Lighthouse (local, Edge, simulated mobile): Performance 91–93 on idle runs
  (LCP 3.0–3.2s simulated, observed ~0.4s; TBT 110–190ms), Accessibility/Best Practices/SEO 100;
  desktop 100/100/100/100. The remaining mobile gap is Next's own framework JS (~186 kB gz across
  9 chunks) and the large static HTML + RSC payload of one long page; runs on a loaded laptop
  swing widely (55–93). Verify on PageSpeed Insights after deploy.
