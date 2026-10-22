import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, GitHub } from "@/components/icons";
import { Phone } from "@/components/ui/phone";
import { facts, projects, routes } from "@/lib/site";
import today from "@/assets/prelims/today.jpg";
import quiz from "@/assets/prelims/quiz.jpg";
import result from "@/assets/prelims/result.jpg";
import profile from "@/assets/prelims/profile.jpg";
import reminders from "@/assets/prelims/reminders.jpg";

const p = facts.prelims;

const shot = {
  today: { src: today, alt: "PrelimsDaily Today screen: streak, daily target ring and weak areas" },
  quiz: { src: quiz, alt: "PrelimsDaily quiz: a statement-style UPSC question with its explanation" },
  result: { src: result, alt: "PrelimsDaily result: 60% ring, XP earned and streak" },
  profile: { src: profile, alt: "PrelimsDaily profile: accuracy, best streak, level and accuracy by subject" },
  reminders: { src: reminders, alt: "PrelimsDaily settings: daily target, reminder toggle and a note that today's reminder is skipped" },
};

const cards: Array<{ kicker: string; big: string; title: string; body: ReactNode; phones: ReactNode }> = [
  {
    kicker: "01 · The brief",
    big: p.buildTime,
    title: "From an empty repo to a tested app.",
    body: (
      <>
        Built for a startup application: one focused UPSC Prelims question set a day, streaks with freezes, a daily target
        ring, XP and levels. React Native + TypeScript, fully offline.
      </>
    ),
    phones: (
      <div className="flex w-full max-w-[34rem] items-center justify-center">
        <Phone shots={[shot.quiz]} sizes="(min-width: 768px) 13vw, 30vw" className="z-0 w-[30%] translate-x-[18%] -rotate-[9deg]" />
        <Phone shots={[shot.today]} sizes="(min-width: 768px) 15vw, 36vw" className="z-10 w-[36%]" />
        <Phone shots={[shot.result]} sizes="(min-width: 768px) 13vw, 30vw" className="z-0 w-[30%] -translate-x-[18%] rotate-[9deg]" />
      </div>
    ),
  },
  {
    kicker: "02 · Quality",
    big: `${p.tests} tests`,
    title: "Fast didn't mean sloppy.",
    body: (
      <>
        {p.tests} unit tests in {p.suites} suites: local-date maths (never UTC, so a 5 AM session can&rsquo;t land on
        &ldquo;yesterday&rdquo;), streak transitions, XP curves, and a daily set seeded by the date so it&rsquo;s identical all day.
      </>
    ),
    phones: (
      <div className="flex w-full max-w-[30rem] items-center justify-center gap-[6%]">
        <Phone shots={[shot.profile]} sizes="(min-width: 768px) 14vw, 34vw" className="w-[34%] -rotate-[4deg]" />
        <Phone shots={[shot.quiz]} sizes="(min-width: 768px) 14vw, 34vw" className="w-[34%] translate-y-[8%] rotate-[4deg]" />
      </div>
    ),
  },
  {
    kicker: "03 · Detail",
    big: "Offline",
    title: "Reminders that know you're done.",
    body: (
      <>
        A repeating notification can&rsquo;t skip today, so the app re-schedules seven one-off reminders whenever anything
        changes. Finish today&rsquo;s set and today&rsquo;s reminder is gone. No server needed.
      </>
    ),
    phones: (
      <div className="flex w-full max-w-[34rem] items-center justify-center">
        <Phone shots={[shot.reminders]} sizes="(min-width: 768px) 16vw, 40vw" className="w-[40%] rotate-[3deg]" />
      </div>
    ),
  },
];

/**
 * 05 PrelimsDaily: three sticky cards that stack (Het Patel). Desktop with motion: the card
 * underneath scales to 0.92 and dims as the next one arrives. Phones: plain stacked cards.
 */
export function PrelimsStack() {
  return (
    <section id="prelims" data-section="05 — PrelimsDaily" aria-labelledby="prelims-title" className="relative pb-24 md:pb-36">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="label">
              <span className="text-red-text">05</span> — PrelimsDaily
            </p>
            <h2 id="prelims-title" className="h2 mt-5" data-split>
              A tested app, built in a day.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Link href={routes.prelims} className="btn btn-cream press" data-magnetic>
              <span data-magnetic-label>
                Case study <ArrowRight size={17} />
              </span>
            </Link>
            <a href={projects.prelims.url} target="_blank" rel="noopener" className="btn btn-ghost press" data-magnetic>
              <span data-magnetic-label>
                <GitHub size={16} /> Code<span className="sr-only"> (opens in new tab)</span>
              </span>
            </a>
          </div>
        </div>

        <ol className="mt-12 space-y-6 md:mt-16 md:space-y-0" data-stack>
          {cards.map((c, i) => (
            <li
              key={c.kicker}
              data-stack-card
              className="stack-card on-paper grid origin-top overflow-hidden rounded-[28px] md:sticky md:mb-[14vh] md:last:mb-0 md:min-h-[min(36rem,74svh)] md:grid-cols-2 md:[top:calc(6rem+var(--i)*1.75rem)]"
              style={{ "--i": i } as CSSProperties}
            >
              <div className="flex flex-col p-6 sm:p-10 md:p-12">
                <p className="label">{c.kicker}</p>
                <p className="num mt-6 text-[clamp(3.5rem,8vw,7rem)] leading-[0.85] text-red">{c.big}</p>
                <h3 className="display mt-5 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.02] tracking-[-0.035em]">{c.title}</h3>
                <p className="mt-4 max-w-[46ch] text-[1rem] leading-relaxed text-paper-muted">{c.body}</p>
              </div>
              <div className="relative flex items-center justify-center bg-paper-2 px-6 py-10 md:py-12">{c.phones}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
