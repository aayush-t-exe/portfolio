import Image from "next/image";
import type { ReactNode } from "react";
import { Portrait } from "@/components/ui/portrait";
import { facts, projects, site } from "@/lib/site";
import star from "@/assets/v4/art/star-side.webp";
import gathering from "@/assets/v4/art/onboarding-gathering.webp";

const z = facts.zenz;

/** True achievements only (site.ts and the resume). */
const badges: Array<{ top: string; big: string; foot: ReactNode; tone: string; tilt: string }> = [
  { top: "JNU Shark Tank", big: "Pitched", foot: `Zen-Z, to a judging panel · ${z.sharkTank}`, tone: "bg-red text-white", tilt: "-rotate-[3deg]" },
  { top: "Smart India Hackathon", big: "5th", foot: "of ~75 teams, internal round", tone: "bg-ink text-fg", tilt: "rotate-[2deg]" },
  { top: "Zen-Z launch", big: z.users, foot: `users ${z.usersWindow}`, tone: "bg-[#f6f1e6] text-paper-ink ring-1 ring-paper-line", tilt: "-rotate-[1.5deg]" },
  {
    top: "Instagram",
    big: z.igViews,
    foot: (
      <>
        views · {z.igFollowers} followers on{" "}
        <a href={projects.zenz.instagram} target="_blank" rel="noopener" className="link">
          {projects.zenz.instagramHandle}
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </>
    ),
    tone: "bg-paper-ink text-fg",
    tilt: "rotate-[3deg]",
  },
  { top: "Before launch", big: z.waitlist, foot: "students on the waitlist", tone: "bg-[#ffd8c9] text-paper-ink", tilt: "-rotate-[2deg]" },
];

const timeline = [
  { when: z.since, what: "Started Zen-Z" },
  { when: z.launched, what: `Launched on Google Play: ${z.users} users in ${z.usersDays}, then the Shark Tank pitch` },
  { when: facts.prelims.built, what: `Built PrelimsDaily in ${facts.prelims.buildTime}` },
  { when: "Now", what: "Open to internships" },
];

/**
 * 07 About (cream): the stylised portrait, a short bio, achievements as sticker cards, and a
 * founder timeline whose line fills as it scrolls past (CSS scroll timeline). The section ends
 * in a curved edge that flattens into the black footer.
 */
export function About() {
  return (
    <section id="about" data-section="07 — About" aria-labelledby="about-title" className="on-paper relative">
      <span aria-hidden data-curve className="absolute inset-x-0 top-0 z-10 h-[9vw] origin-top rounded-b-[50%_100%] bg-ink" />

      <div className="container-page relative pt-[calc(9vw+4rem)] pb-24 md:pb-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="relative self-start md:col-span-5 lg:col-span-4">
            <Portrait className="aspect-[4/5] w-full max-w-[24rem] rounded-[28px]" sizes="(min-width: 768px) 30vw, 90vw" />
            <span className="absolute -bottom-5 left-5 rotate-[-4deg] rounded-full bg-paper-ink px-4 py-2 text-[0.875rem] font-medium text-fg shadow-lg">
              Founder &amp; CTO, Zen-Z
            </span>
            <Image src={star} alt="" aria-hidden sizes="80px" className="absolute -top-6 right-[8%] w-16 rotate-12 md:right-[-2%]" data-parallax="0.3" />
          </div>

          <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
            <p className="label">
              <span className="text-red">07</span> — About
            </p>
            <h2 id="about-title" className="h2 mt-5" data-split>
              Hi, I&rsquo;m Aayush.
            </h2>
            <div className="mt-6 max-w-[54ch] space-y-4 text-[1.125rem] leading-relaxed text-paper-muted [&_strong]:font-medium [&_strong]:text-paper-ink">
              <p>
                I&rsquo;m a third-year <strong>B.Tech CSE student at Jaipur National University</strong> (graduating{" "}
                {site.education.grad}, CGPA {site.education.cgpa}), and the{" "}
                <strong>founder of Zen-Z</strong>. I built all of it myself: the Android and web app, the admin dashboard the
                team uses to match every group, and the Supabase backend with payments.
              </p>
              <p>
                I like owning a problem end to end, from the data model to the message I get when something breaks. Now I&rsquo;m
                looking for an internship where I can do that with a team.
              </p>
            </div>

            <ol className="tl relative mt-10 grid gap-5 sm:grid-cols-4 sm:gap-4">
              <span aria-hidden className="tl-line" />
              {timeline.map((t) => (
                <li key={t.what} className="relative pl-7 sm:pt-7 sm:pl-0">
                  <span aria-hidden className="absolute top-1.5 left-0 size-3 rounded-full bg-red ring-4 ring-paper sm:top-0" />
                  <p className="font-mono text-xs tracking-[0.06em] text-paper-ink uppercase">{t.when}</p>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-paper-muted">{t.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between gap-6">
            <h3 className="display text-[clamp(1.75rem,3vw,2.75rem)] tracking-[-0.035em]">Along the way</h3>
            <Image src={gathering} alt="" aria-hidden sizes="140px" className="hidden w-32 -rotate-6 md:block" />
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5" data-fade-group>
            {badges.map((b) => (
              <li key={b.top} className={`flex min-h-44 flex-col rounded-[22px] p-5 shadow-[0_18px_40px_-24px_rgb(10_9_8/0.5)] ${b.tone} ${b.tilt}`}>
                <span className="font-mono text-[0.6875rem] tracking-[0.06em] uppercase opacity-80">{b.top}</span>
                <span className="num mt-auto pt-6 text-[clamp(2.25rem,3.6vw,3.25rem)] leading-[0.9]">{b.big}</span>
                <span className="mt-2 text-[0.875rem] leading-snug opacity-85">{b.foot}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Curved edge into the footer. */}
      <span aria-hidden data-curve className="absolute inset-x-0 top-full z-10 h-[9vw] origin-top rounded-b-[50%_100%] bg-paper" />
    </section>
  );
}
