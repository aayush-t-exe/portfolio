import { Body, CaseHeader, Chapter, Lead } from "@/components/case";
import { PhoneRail } from "@/components/frames";
import { ArrowUpRight, GitHub } from "@/components/icons";
import { facts, projects } from "@/lib/site";
import { stagger } from "@/lib/stagger";
import today from "@/assets/prelims/today.jpg";
import quiz from "@/assets/prelims/quiz.jpg";
import result from "@/assets/prelims/result.jpg";
import profile from "@/assets/prelims/profile.jpg";
import reminders from "@/assets/prelims/reminders.jpg";

const prelims = projects.prelims;

const screens = [
  {
    image: today,
    title: "Today",
    caption: "Streak flame, daily target ring, week dots and weak-area chips.",
    alt: "PrelimsDaily Today screen: a one-day streak, a completed 5 of 5 target ring, week dots, level 3 progress and weak areas Economy 56% and Polity 57%",
  },
  {
    image: quiz,
    title: "Quiz",
    caption: "Statement-style UPSC questions with instant feedback and an explanation.",
    alt: "PrelimsDaily quiz screen: a statement-based question on Financial Emergency with the correct answer highlighted and an explanation below",
  },
  {
    image: result,
    title: "Result",
    caption: "Animated score ring with count-up XP and streak.",
    alt: "PrelimsDaily result screen: a 60% score ring, 3 of 5 correct, plus 40 XP earned and a one-day streak",
  },
  {
    image: profile,
    title: "Profile",
    caption: "Accuracy, best streak, level and per-subject stats.",
    alt: "PrelimsDaily profile screen: 25 answered, 56% accuracy, best streak 1, level 3, and accuracy bars by subject",
  },
  {
    image: reminders,
    title: "Smart reminders",
    caption: "Reminders that skip the days you've already finished.",
    alt: "PrelimsDaily settings: daily target selector, daily reminder toggle and a note that today's reminder is skipped because the set is done",
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
    body: "The set is seeded by the local date (FNV-1a → mulberry32), so it's identical all day, even after a reinstall. About half the picks come from your two weakest subjects.",
    tradeoff: "With a small bank, repeats come back eventually, in a predictable order.",
  },
  {
    title: "Reminders that know you're done",
    body: "A repeating trigger can't skip today or change its copy. So I re-schedule seven one-off reminders on every relevant change. It works offline, with no server.",
    tradeoff: "The app has to be opened at least once a week to top up the queue.",
  },
  {
    title: "60fps on the UI thread",
    body: "Reanimated drives the ring with animated props and the XP bar with scaleX instead of width, so animations skip layout and the JS thread.",
    tradeoff: "A little more setup than plain layout animation.",
  },
];

export function PrelimsDaily() {
  return (
    <article id="prelimsdaily" aria-labelledby="prelims-title" className="cv-auto [--cv-h:4200px]">
      <CaseHeader
        index="02"
        eyebrow="Built in one day"
        name="PrelimsDaily"
        headingId="prelims-title"
        tagline="A 10-minute daily habit for UPSC Prelims, from empty repo to tested app in a day."
        tldr={[
          { term: "Problem", value: "UPSC aspirants don't fail for lack of material, but for lack of consistency." },
          { term: "Built", value: "An offline daily-practice app with streaks, XP and reminders that adapt, in one day." },
          {
            term: "Result",
            value: `${facts.prelims.tests} passing tests, every trade-off written down, and an installable Android build.`,
          },
        ]}
        meta={[
          { term: "Role", value: "Solo: product, design, code" },
          { term: "Timeline", value: "1 day · Oct 2026" },
          { term: "Platforms", value: "Android, iOS, web (Expo)" },
          { term: "Stack", value: "Expo, TypeScript, Zustand, Reanimated" },
          { term: "Outcome", value: `Shipped with ${facts.prelims.tests} passing tests` },
        ]}
        actions={
          <a href={prelims.url} target="_blank" rel="noopener" className="btn btn-primary press">
            <GitHub size={16} />
            Read the code
            <ArrowUpRight size={16} />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        }
      />

      {/* Gallery: a staggered row on desktop, a swipeable rail on touch */}
      <div className="mt-14 md:mt-20">
        <PhoneRail label="PrelimsDaily screenshots" items={screens} tone="light" />
      </div>

      <div className="mt-16 space-y-16 md:mt-28 md:space-y-24">
        <Chapter title="The brief">
          <Lead>
            &ldquo;Most aspirants don&rsquo;t fail for lack of material. They fail for lack of
            consistency.&rdquo;
          </Lead>
          <Body>
            <p>
              I built PrelimsDaily in <strong>a single day</strong> as part of a startup application:
              one focused question set a day, <strong>streaks with freezes</strong>, a daily target
              ring, XP and levels, and <strong>reminders that adapt to your streak</strong>. It runs
              fully offline on Android, iOS and the web.
            </p>
            <p>
              Fast didn&rsquo;t mean sloppy. The rules live in pure, unit-tested functions, state is
              persisted with a versioned schema that falls back safely if anything is malformed, and a
              root error boundary means a render crash shows a Retry screen, never a white screen.
            </p>
          </Body>
        </Chapter>

        <Chapter title="Decisions"
          wide={
            <ol className="grid gap-4 sm:grid-cols-2">
              {decisions.map((d, i) => (
                <li key={d.title} data-reveal style={stagger(i % 2)} className="card flex flex-col p-5 sm:p-7">
                  <p className="text-xl font-medium tracking-[-0.02em]">{d.title}</p>
                  <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
                  <p className="mt-auto pt-5 text-sm leading-relaxed">
                    <span className="font-mono text-xs text-accent uppercase">Trade-off </span>
                    <span className="text-muted">{d.tradeoff}</span>
                  </p>
                </li>
              ))}
            </ol>
          }
        >
          <Lead>Small app, real engineering. Every trade-off is written down in the README.</Lead>
        </Chapter>

        <Chapter title="Quality">
          <div data-reveal className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-12">
            <p className="text-[clamp(4rem,10vw,7.5rem)] leading-[0.85] font-medium tracking-[-0.06em] tabular-nums">
              {facts.prelims.tests}
              <span className="serif-em ml-2 text-[0.42em] tracking-normal text-muted">tests</span>
            </p>
            <p className="max-w-[46ch] pb-2 text-[1.0625rem] leading-relaxed text-muted">
              Unit tests in {facts.prelims.suites} suites, covering local-date maths, streak
              transitions (continue, freeze, reset, earning freezes), XP and level curves, the daily
              set&rsquo;s determinism, weak-subject weighting and recency rules, and loading saved
              state safely. Strict TypeScript and lint on top.
            </p>
          </div>
        </Chapter>
      </div>
    </article>
  );
}
