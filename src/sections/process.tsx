import { SectionHeading } from "@/components/section-heading";
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

const stack = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "SQL", "Python", "Java"] },
  {
    group: "Frontend & mobile",
    items: ["React Native (Expo)", "React", "Next.js", "Tailwind CSS", "TanStack Query", "Zustand", "Reanimated"],
  },
  {
    group: "Backend & cloud",
    items: ["Supabase", "PostgreSQL + RLS", "Edge Functions", "Realtime", "REST & webhooks", "PayU", "Vercel", "EAS"],
  },
  { group: "Quality", items: ["GitHub Actions CI", "Vitest", "Jest", "pgTAP", "Sentry", "Git"] },
  { group: "AI", items: ["Claude Code", "Cursor"] },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="scroll-mt-16 border-t border-line bg-surface/50 py-20 md:py-32"
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
              <EvidenceClaudeMd />
              <EvidenceCommit />
            </div>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            <h3 data-reveal className="label md:col-span-3 md:pt-1">
              <span className="text-fg">Stack</span> · what I reach for
            </h3>
            <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
              {stack.map((g, i) => (
                <div key={g.group} data-reveal style={stagger(i)}>
                  <dt className="text-sm font-medium">{g.group}</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line bg-surface px-2.5 py-1 text-[0.8125rem] text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A lightly trimmed excerpt of the real CLAUDE.md from the PrelimsDaily repo. */
function EvidenceClaudeMd() {
  return (
    <figure data-reveal className="overflow-hidden rounded-[14px] border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-xs">prelims-daily / CLAUDE.md</span>
        <span className="font-mono text-[10px] text-muted uppercase">excerpt</span>
      </div>
      <div className="space-y-3 p-4 font-mono text-[12px] leading-[1.65] text-muted">
        <p className="text-fg">## Locked rules</p>
        <p>
          - Logic lives in <span className="text-fg">src/logic/</span> as pure functions with tests. UI
          components stay dumb.
          <br />- Dates use the <span className="text-fg">local</span> calendar date, never UTC.
          <br />- Animate transform and opacity, not layout, in hot paths.
        </p>
        <p className="text-fg">## How we work</p>
        <p>
          - Follow BUILD_PLAN.md milestone by milestone. Test, then commit.
          <br />- After each milestone, explain what was built and the one concept worth knowing.{" "}
          <mark className="bg-accent-soft text-fg">Aayush must be able to explain this code.</mark>
        </p>
      </div>
      <figcaption className="sr-only">Excerpt from the CLAUDE.md agent instructions in the PrelimsDaily repository</figcaption>
    </figure>
  );
}

function EvidenceCommit() {
  return (
    <figure data-reveal style={stagger(1)} className="rounded-[14px] border border-line bg-surface p-4">
      <p className="flex items-center gap-2 font-mono text-xs text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        commit <span className="text-fg">98611bf</span>
      </p>
      <blockquote className="mt-2 text-[0.9375rem] leading-snug">
        Fix review findings: dismissTo navigation, serialized reminder scheduling, resilient hydration,
        stricter sanitize, per-day reminder copy, XP chip lifecycle, fresh-first daily fill
      </blockquote>
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        PrelimsDaily: one review pass, seven fixes, before shipping.
      </figcaption>
    </figure>
  );
}
