import { SectionHeading } from "@/components/section-heading";
import { facts, projects } from "@/lib/site";
import { stagger } from "@/lib/stagger";

const steps = [
  {
    title: "Plan before code",
    body: "Every build starts as a written plan: scope, data model, edge cases and the order things get built in. PrelimsDaily had a spec and a milestone plan before its first commit. This site started as a PLAN.md.",
  },
  {
    title: "Give agents rails",
    body: "Claude Code and Cursor work inside rules I write: the stack, the architecture, what not to touch. They type fast. I decide what gets built and how.",
  },
  {
    title: "Review it like someone else's PR",
    body: "I read the diffs, run the tests and put the work through a separate review pass. Findings get fixed in their own commit, not waved through.",
  },
  {
    title: "Understand everything that ships",
    body: "My own agent instructions require a plain-English explanation after every milestone. If I can't explain a piece of code, it doesn't ship.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="cv-auto border-t border-line bg-surface/50 py-20 [--cv-h:2600px] md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          index="02"
          label="How I work"
          headingId="process-title"
          title={
            <>
              AI-native, not <span className="serif-em">AI-dependent.</span>
            </>
          }
          intro="I build with Claude Code and Cursor every day. Agents write a lot of my code. The decisions, the review and the outcome stay mine."
        />

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <ol className="md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={stagger(i)}
                className="relative grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-line py-7 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="space-y-4 md:col-span-12 lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-24">
              <EvidenceCoAuthored />
              <EvidencePlan />
              <EvidenceCommit />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/** Checkable in the public Zen-Z repo: count the Co-Authored-By trailers. */
function EvidenceCoAuthored() {
  const z = facts.zenz;
  return (
    <figure data-reveal className="rounded-[14px] border border-line bg-surface p-4">
      <p className="text-[clamp(2rem,4vw,2.5rem)] leading-none font-medium tracking-[-0.04em] tabular-nums">
        {z.claudeCommits}
        <span className="text-muted">/{z.commits}</span>
      </p>
      <figcaption className="mt-2 text-sm leading-snug text-muted">
        <span className="whitespace-nowrap">Zen-Z</span> commits co-authored with Claude, across{" "}
        {z.commitDays} days of work.{" "}
        <a href={projects.zenz.sourceUrl} target="_blank" rel="noopener" className="link text-fg">
          Check the log<span className="sr-only"> (opens in new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}

/** Real lines from this repo's own PLAN.md decision log (public with the site). */
function EvidencePlan() {
  return (
    <figure data-reveal style={stagger(1)} className="overflow-hidden rounded-[14px] border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-xs">portfolio / PLAN.md</span>
        <span className="font-mono text-xs text-muted">decision log</span>
      </div>
      <ul className="space-y-2.5 p-4 font-mono text-[12px] leading-[1.6] text-muted">
        <li>
          - <span className="text-fg">inlineCss</span> tried and reverted: no gain, and it doubled the
          CSS bytes.
        </li>
        <li>- Hero H1 and intro never fade in (they are the LCP candidates).</li>
        <li>
          - Light accent darkened to <span className="text-fg">#B3320D</span> so small accent text on
          tinted pills passes 4.5:1.
        </li>
      </ul>
      <figcaption className="sr-only">Excerpt from the decision log in this site&rsquo;s PLAN.md</figcaption>
    </figure>
  );
}

function EvidenceCommit() {
  return (
    <figure data-reveal style={stagger(2)} className="rounded-[14px] border border-line bg-surface p-4">
      <p className="flex items-center gap-2 font-mono text-xs text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        commit <span className="text-fg">98611bf</span>
      </p>
      <blockquote className="mt-2 text-[0.9375rem] leading-snug">
        Fix review findings: dismissTo navigation, serialized reminder scheduling, resilient hydration,
        stricter sanitize, per-day reminder copy, XP chip lifecycle, fresh-first daily fill
      </blockquote>
      <figcaption className="mt-2 font-mono text-xs text-muted">
        PrelimsDaily: one review pass, seven fixes, before shipping.
      </figcaption>
    </figure>
  );
}
