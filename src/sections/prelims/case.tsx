import { Body, CaseHero, CasePage, CaseToc, Chapter, NextLinks, type TocItem } from "@/components/case";
import { PrelimsLead } from "@/components/case-media";
import { ArrowUpRight, GitHub } from "@/components/icons";
import { Phone } from "@/components/ui/phone";
import { facts, projects, routes } from "@/lib/site";
import profile from "@/assets/prelims/profile.jpg";
import reminders from "@/assets/prelims/reminders.jpg";

const prelims = projects.prelims;
const p = facts.prelims;

const toc: TocItem[] = [
  { id: "brief", label: "Brief" },
  { id: "decisions", label: "Decisions" },
  { id: "quality", label: "Quality" },
];

const screens = [
  {
    shot: { src: profile, alt: "PrelimsDaily profile screen: 25 answered, 56% accuracy, best streak 1, level 3, and accuracy bars by subject" },
    title: "Profile",
    caption: "Accuracy, best streak, level and per-subject stats.",
  },
  {
    shot: { src: reminders, alt: "PrelimsDaily settings: daily target selector, daily reminder toggle and a note that today's reminder is skipped because the set is done" },
    title: "Smart reminders",
    caption: "Reminders that skip the days you've already finished.",
  },
];

const decisions = [
  {
    title: "Local dates, never UTC",
    body: "Days come from the device's local calendar. With UTC, an Indian student practising before 5:30 AM would land on “yesterday” and could lose their streak.",
    tradeoff: "All day maths goes through small helpers, tested across month, year and leap-year boundaries.",
  },
  {
    title: "A deterministic daily set",
    body: "The set is seeded by the local date (FNV-1a → mulberry32), so it's identical all day, even after a reinstall. Once there's enough data, about half the picks come from your two weakest subjects.",
    tradeoff: "With a small bank, repeats come back eventually, in a predictable order.",
  },
  {
    title: "Reminders that know you're done",
    body: "A repeating trigger can't skip today or change its copy, so the app re-schedules seven one-off reminders on every relevant change. Offline, no server.",
    tradeoff: "The app has to be opened at least once a week to top up the queue.",
  },
  {
    title: "60fps on the UI thread",
    body: "Reanimated drives the ring with animated props and the XP bar with scaleX instead of width, so animations skip layout and the JS thread.",
    tradeoff: "A little more setup than plain layout animation.",
  },
];

export function PrelimsCase() {
  return (
    <CasePage toc={toc}>
      <CaseHero
        label={`Case study · Built in ${p.buildTime}`}
        name="PrelimsDaily"
        tagline="A 10-minute daily habit for UPSC Prelims, from empty repo to tested app in a day."
        actions={
          <a href={prelims.url} target="_blank" rel="noopener" className="btn btn-red press" data-magnetic>
            <span data-magnetic-label>
              <GitHub size={16} /> Read the code <ArrowUpRight size={16} />
              <span className="sr-only"> (opens in new tab)</span>
            </span>
          </a>
        }
        meta={[
          { term: "Role", value: "Solo: product, design, code" },
          { term: "Timeline", value: `${p.buildTime} · ${p.built}` },
          { term: "Platforms", value: "Android and web (Expo)" },
          { term: "Stack", value: "Expo, TypeScript, Zustand, Reanimated" },
        ]}
        media={<PrelimsLead />}
        tldr={[
          { term: "Problem", value: "UPSC aspirants don't fail for lack of material, but for lack of consistency." },
          { term: "Built", value: "An offline daily-practice app with streaks, XP and reminders that adapt, in one day." },
          { term: "Result", value: `${p.tests} passing tests, every trade-off written down, and an installable Android build.` },
        ]}
      />

      <CaseToc items={toc} />

      <Chapter
        id="brief"
        n={1}
        label="The brief"
        title="A habit, not a question bank."
        lead="Most aspirants don't fail for lack of material. They fail for lack of consistency."
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <Body className="lg:col-span-7">
            <p>
              I built PrelimsDaily in <strong>a single day</strong> as part of a startup application: one focused question set a day,{" "}
              <strong>streaks with freezes</strong>, a daily target ring, XP and levels, and <strong>reminders that adapt to your
              streak</strong>. It runs fully offline on Android and the web.
            </p>
            <p>
              The rules live in pure, unit-tested functions, state is persisted with a versioned schema
              that falls back safely if anything is malformed, and a root error boundary means a render crash shows a Retry screen, never
              a white screen.
            </p>
          </Body>
          <ul className="grid grid-cols-2 gap-5 lg:col-span-5">
            {screens.map((s) => (
              <li key={s.title} data-fade>
                <Phone shots={[s.shot]} sizes="(min-width: 1024px) 200px, 44vw" />
                <p className="mt-4 text-sm font-medium">{s.title}</p>
                <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted">{s.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </Chapter>

      <Chapter id="decisions" n={2} label="Decisions" tone="paper" title="Small app, real engineering." lead="Every trade-off is written down in the README.">
        <ol className="mt-12 grid gap-4 sm:grid-cols-2" data-fade-group>
          {decisions.map((d, i) => (
            <li key={d.title} className="flex flex-col rounded-[22px] bg-[#f3eee3] p-6 ring-1 ring-paper-line sm:p-8">
              <span className="font-mono text-xs text-red-deep">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-3 text-[1.6rem] leading-[1.05] tracking-[-0.03em]">{d.title}</h3>
              <p className="mt-3 leading-relaxed text-paper-muted">{d.body}</p>
              <p className="mt-auto pt-6 text-sm leading-relaxed">
                <span className="font-medium text-red-deep">Trade-off: </span>
                <span className="text-paper-muted">{d.tradeoff}</span>
              </p>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter id="quality" n={3} label="Quality" title="72 tests in a one-day build.">
        <div className="mt-12 grid gap-8 md:grid-cols-[auto_1fr] md:items-end md:gap-14">
          <p className="num text-[clamp(6rem,16vw,13rem)] leading-[0.8] text-red-text">
            {p.tests}
            <span className="ml-3 font-sans text-[0.22em] font-medium tracking-normal text-muted">tests</span>
          </p>
          <p className="max-w-[46ch] pb-2 text-[1.0625rem] leading-relaxed text-muted">
            Unit tests in {p.suites} suites, covering local-date maths, streak transitions (continue, freeze, reset, earning freezes), XP and
            level curves, the daily set&rsquo;s determinism, weak-subject weighting and recency rules, and loading saved state safely. Strict
            TypeScript and lint on top.
          </p>
        </div>
      </Chapter>

      <NextLinks
        links={[
          { href: routes.zenz, label: "Zen-Z", note: "Previous case study" },
          { href: routes.stack, label: "The stack", note: "Every tool, and where it shipped" },
        ]}
      />
    </CasePage>
  );
}
