import Image from "next/image";
import { CopyEmail } from "@/components/copy-email";
import { ArrowRight, Download, GitHub, LinkedIn, Mail } from "@/components/icons";
import { facts, site } from "@/lib/site";
import portrait from "@/assets/about/portrait.jpg";

const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

/** Work-with-me menu: each option opens an email with the subject filled in. */
const options = [
  { label: "Internship", detail: "Remote, part-time, can start now", subject: "Internship" },
  { label: "Freelance build", detail: "Next.js · React Native · Supabase", subject: "Freelance build" },
  { label: "Just say hi", detail: "Questions, ideas, feedback", subject: "Hi Aayush" },
];

const details = [
  { term: "Studying", value: site.education.line },
  { term: "Based in", value: `Jaipur, India · ${site.timezone}` },
  { term: "Recognition", value: `Smart India Hackathon internal round: ${facts.sih}` },
];

/**
 * About and contact, merged: who (portrait, bio, facts), then how to work together. The local
 * time is filled in client-side by PageBehavior ([data-clock]); without JS it stays hidden.
 */
export function About() {
  return (
    <>
      <section id="about" aria-labelledby="about-title" className="scroll-mt-20 py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* FIG. 01: a captioned photo frame. Swap the photo by replacing src/assets/about/portrait.jpg (4:5). */}
          <figure data-reveal className="w-full max-w-[340px] lg:col-span-4">
            <div className="rounded-[18px] border border-line bg-surface p-2.5 shadow-[var(--shadow)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-surface-2">
                <Image
                  src={portrait}
                  alt="Aayush Thakur smiling, arms crossed, in a blue shirt against green hills"
                  fill
                  sizes="(min-width: 1024px) 320px, 80vw"
                  className="photo object-cover"
                />
                <span className="absolute top-2.5 left-2.5 rounded-[5px] bg-black/55 px-1.5 py-0.5 font-mono text-[0.6875rem] text-white backdrop-blur-sm">
                  FIG. 01
                </span>
              </div>
              <figcaption className="flex justify-between gap-3 px-1 pt-2.5 pb-0.5 font-mono text-xs text-muted">
                <span>{site.name}</span>
                <span>Founder &amp; CTO, Zen-Z</span>
              </figcaption>
            </div>
          </figure>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="about-title" className="h2">
              About
            </h2>
            <div className="mt-6 max-w-[58ch] space-y-4 text-lg leading-relaxed text-muted">
              <p>
                I&rsquo;m a third-year Computer Science student at Jaipur National University, and most of what I know I
                learned by shipping. <span className="whitespace-nowrap">Zen-Z</span> taught me payments, row-level security
                and what real users do to an app after launch.
              </p>
              <p>
                I like owning a problem end to end: deciding what to build, picking the trade-off, writing the code, and
                being the one who gets the message when it breaks.
              </p>
            </div>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {details.map((d) => (
                <div key={d.term} className="grid gap-1 py-3 text-[0.9375rem] sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <dt className="text-muted">{d.term}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>

            <div id="contact" className="scroll-mt-24 pt-14">
              <h2 className="h2">Work with me</h2>
              <p className="mt-4 max-w-[52ch] leading-relaxed">
                <span className="text-muted">What I&rsquo;m looking for: </span>
                {site.lookingFor}
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                {options.map((o) => (
                  <li key={o.label}>
                    <a
                      href={mailto(o.subject)}
                      className="card-link press group flex h-full flex-col rounded-[14px] border border-line p-4"
                    >
                      <span className="flex items-center justify-between font-medium">
                        {o.label}
                        <ArrowRight size={15} className="text-muted transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-1 text-sm text-muted">{o.detail}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                Jaipur, IST (UTC+5:30)
                <span data-clock-line hidden>
                  {" "}
                  · it&rsquo;s <time data-clock className="font-mono text-fg tabular-nums" /> here
                </span>
                . My evening is a US East Coast morning and a European afternoon.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                <li>
                  <CopyEmail email={site.email} className="btn btn-ghost h-10 px-4 text-sm">
                    <Mail size={15} />
                    <span>{site.email}</span>
                  </CopyEmail>
                </li>
                <li>
                  <a href={site.github} target="_blank" rel="noopener me" className="btn btn-ghost press h-10 px-4 text-sm">
                    <GitHub size={15} />
                    GitHub<span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener me" className="btn btn-ghost press h-10 px-4 text-sm">
                    <LinkedIn size={14} />
                    LinkedIn<span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={site.resume} download className="btn btn-ghost press h-10 px-4 text-sm">
                    <Download size={15} />
                    Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed closing CTA. */}
      <section aria-labelledby="cta-title" className="bg-band text-on-band">
        <div className="container-page flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between md:py-20">
          <h2 id="cta-title" className="font-display max-w-[20ch] text-[clamp(1.875rem,4vw,3rem)] leading-[1.02] tracking-[-0.04em]">
            Building something? I&rsquo;d like to help.
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="press inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-on-band px-6 font-medium text-band sm:self-auto"
          >
            Email me
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
