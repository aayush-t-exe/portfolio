# Portfolio: plan

Owner: Aayush Thakur · Built with Claude Code · Started 2026-10-21

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

1. **Header**: monogram, anchor nav (Work · Process · About · Contact), theme toggle, Resume.
2. **Hero**: status pill ("Founder & CTO @ Zen-Z · Jaipur"); H1 *"I build products people
   actually use, and ship them fast."*; a one-paragraph proof; CTAs (See the work, Resume,
   copy email). On the right, a **ship log** card: a reverse-chronological changelog of real
   milestones, which doubles as the hero visual.
3. **Proof strip**: 150+ users in 2 days · ₹33K+ revenue · 140K+ IG views · 66 tests in one day.
4. **Work**
   - **Case 01, Zen-Z** (hero case study): Problem → What I built (3 surfaces) → Architecture
     diagram (HTML/SVG, not an image) → **Incident: "the booking that paid but didn't"**
     (post-mortem with timeline and a simplified verification code sketch) → Results.
     Placeholders for the screenshots still needed.
   - **Case 02, PrelimsDaily**: built in a day; a phone gallery of 5 real screenshots; 4 engineering
     decisions (local dates not UTC, a seeded daily set, reminder scheduling, UI-thread animation);
     66 tests; GitHub link.
   - **Also**: SIH internal round, 5th of ~75 teams.
5. **How I work with AI**: a 4-step loop (Plan → Build → Review → Ship) with concrete evidence:
   CLAUDE.md/AGENTS.md in repos, a "fix review findings" commit, this site's own PLAN.md.
6. **Stack**: grouped by Languages, Product, Backend, Quality and tooling.
7. **About**: photo placeholder plus a short first-person bio.
8. **Contact**: large email link with copy-to-clipboard, GitHub, LinkedIn, Resume.
9. **Footer**: colophon ("Designed and built by Aayush with Claude Code").

## 5. Content rules
- Only facts from the brief **and the resume PDF the site offers for download** (for example the
  28-table schema with RLS, 7 Edge Functions, 37 CI test suites, 179 commits, ~25 screens,
  admin matching board). No invented numbers, clients or testimonials.
- The PayU verification code is labelled a *simplified sketch*: it shows the technique (SHA-512
  reverse hash and log-before-trust), not production code.
- The incident write-up states only what is known: after launch a real paid booking stayed unpaid;
  the fix moved confirmation to server-side, signature-verified webhooks with every call logged.
  No invented root cause.

## 6. Tech decisions

| Decision | Why |
| --- | --- |
| Next.js 16 App Router, fully static | Every route pre-renders; best TTFB and LCP on Vercel. |
| Tailwind v4 (CSS-first `@theme`) | Tokens in CSS variables, no config file. |
| `next/font/local` with subset fonts | Geist + Geist Mono (variable) and Instrument Serif Italic, subset to the site's characters: ~60 kB, all preloaded, metric-matched fallbacks. |
| No animation library | IntersectionObserver plus CSS transitions covers every effect; saves ~30–50 kB of JS. |
| Own theme toggle (inline pre-paint script) | Avoids `next-themes`; no flash and a ~20-line script. |
| `next/og` for OG/Twitter images | Generated at build; no design tool needed. |
| Placeholder images resolved at build (`fs.existsSync`) | Aayush drops a file into `public/images/...` and it replaces the placeholder automatically. |
| Total runtime deps: `next`, `react`, `react-dom` | Nothing else. |

SEO/AEO: metadata API (title template, description, canonical, OG, Twitter), `sitemap.ts`,
`robots.ts`, JSON-LD (`Person`, `WebSite`, `ProfilePage`, plus `SoftwareApplication` for each
project), `public/llms.txt`, semantic landmarks, a single H1 and a logical H2/H3 outline.

Site URL: `NEXT_PUBLIC_SITE_URL`, defaulting to `https://aayushthakur.vercel.app`.

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
