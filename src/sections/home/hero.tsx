import Image from "next/image";
import type { ReactNode } from "react";
import { CopyEmail } from "@/components/copy-email";
import { ArrowUpRight, Download, Mail } from "@/components/icons";
import { HeroStage } from "@/components/stage";
import { facts, projects, site } from "@/lib/site";
import byline from "@/assets/about/byline.jpg";

const z = facts.zenz;
const proof: Array<{ value: ReactNode; label: string; href?: string }> = [
  { value: "Live", label: "on Google Play", href: projects.zenz.playStoreUrl },
  { value: z.users, label: "users in 2 days" },
  {
    value: (
      <>
        <abbr title="Indian rupees" className="no-underline">
          ₹
        </abbr>
        {z.revenue.replace("₹", "")}
      </>
    ),
    label: "revenue",
  },
  { value: `${z.claudeCommits}/${z.commits}`, label: "commits with Claude", href: projects.zenz.commitsUrl },
];

/**
 * First screen: a person (byline photo), a product (the H1 names it, the stage shows it) and
 * the ask (intent line + CTAs), with one line of proof. Everything here is static except the
 * stage, which enters once. The H1 and sub-line are the LCP candidates: never animated.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-page grid gap-10 pt-6 pb-4 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-16 lg:pb-8">
      <div className="lg:col-span-7">
        <div className="flex items-center gap-4">
          {/* Swap the photo by replacing src/assets/about/byline.jpg (square, head and shoulders). */}
          <Image
            src={byline}
            alt="Portrait of Aayush Thakur"
            sizes="80px"
            loading="eager"
            className="photo size-14 rounded-[22%] object-cover shadow-[0_0_0_1px_var(--line-strong)] lg:size-[76px]"
          />
          <div>
            <p className="text-[1.0625rem] font-medium tracking-[-0.01em]">{site.name}</p>
            <p className="mt-0.5 font-mono text-xs text-muted sm:text-[0.8125rem]">
              Founder-engineer · Jaipur, IST
              <span className="hidden sm:inline"> · </span>
              <span className="block whitespace-nowrap text-fg sm:inline">
                <span aria-hidden className="pulse-dot relative mr-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-accent" />
                Open to work
              </span>
            </p>
          </div>
        </div>

        <h1
          id="hero-title"
          className="mt-6 max-w-[17ch] text-[clamp(2.5rem,5.6vw,4.375rem)] leading-[0.98] font-semibold tracking-[-0.045em] sm:mt-10"
        >
          I built <span className="whitespace-nowrap">Zen-Z</span> solo: a live campus app with paying users.
        </h1>
        <p className="mt-5 max-w-[36rem] text-[1.0625rem] leading-relaxed text-muted sm:mt-6 sm:text-xl sm:leading-relaxed">
          I&rsquo;m a third-year CS student. I build <span className="whitespace-nowrap">AI-native</span> with Claude Code, own payments end to end, and understand
          every line I ship.
        </p>

        <p className="mt-6 max-w-[36rem] leading-relaxed sm:mt-8">
          Looking for <strong className="font-medium">remote internships</strong> (full-stack · AI · product) and{" "}
          <strong className="font-medium">freelance builds</strong>.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <a href={`mailto:${site.email}`} className="btn btn-primary press">
            <Mail size={17} />
            Email me
          </a>
          <a href={site.resume} download className="btn btn-ghost press">
            <Download size={16} />
            Resume
          </a>
          {/* Mobile: an icon button (the raw address doesn't fit); from sm the address shows. */}
          <CopyEmail
            email={site.email}
            className="btn btn-ghost size-11 px-0 text-muted hover:text-fg sm:w-auto sm:border-transparent sm:px-3"
          >
            <span className="hidden font-mono text-[0.8125rem] sm:inline">{site.email}</span>
          </CopyEmail>
        </div>

        {/* One line of proof, as receipts. Every number on the home page appears once. */}
        <ul aria-label="Proof" className="mt-8 grid grid-cols-2 border-t border-line sm:grid-cols-4">
          {proof.map((p, i) => {
            const inner = (
              <>
                <span className="num flex items-start gap-1 text-[1.375rem] leading-none text-fg">
                  {p.value}
                  {p.href ? <ArrowUpRight size={13} className="shrink-0 text-muted" /> : null}
                </span>
                <span className="mt-1.5 block text-[0.8125rem] leading-snug text-muted">{p.label}</span>
              </>
            );
            return (
              <li
                key={p.label}
                className={`py-4 pr-2 ${i % 2 === 1 ? "border-l border-line pl-4" : ""} ${i >= 2 ? "border-t border-line sm:border-t-0" : ""} ${i === 2 ? "sm:border-l sm:pl-4" : ""}`}
              >
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener" className="group block hover:[&_.num]:text-accent">
                    {inner}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="lg:col-span-5">
        <HeroStage />
      </div>
    </section>
  );
}
