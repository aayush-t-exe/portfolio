import { ArrowUpRight } from "@/components/icons";
import { projects } from "@/lib/site";

const loop = [
  { title: "Plan before code", body: "A written plan first: scope, data model, edge cases, build order." },
  { title: "Give agents rails", body: "Agents work inside rules I write: the stack, the architecture, what not to touch." },
  { title: "Review it like a PR", body: "I read every diff, run the tests and fix findings in their own commit." },
  { title: "Understand what ships", body: "If I can't explain a piece of code, it doesn't ship." },
];

/** How I build with AI: the loop in one line each, and one thing anyone can check. */
export function Ai() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="border-y border-line bg-surface/60 py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 id="ai-title" className="h2 max-w-[12ch]">
            How I build with AI
          </h2>
          <p className="mt-4 max-w-[34ch] leading-relaxed text-muted">
            Claude Code and Cursor write a lot of my code. The decisions, the review and the outcome stay mine.
          </p>
        </div>
        <div className="lg:col-span-8">
          <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {loop.map((s) => (
              <li key={s.title} className="border-t border-line-strong pt-4">
                <h3 className="font-medium tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          {/* Checkable: the trailer is on Zen-Z's public commits. */}
          <a
            href={projects.zenz.commitsUrl}
            target="_blank"
            rel="noopener"
            className="card-link group mt-8 flex flex-col gap-3 rounded-[14px] border border-line bg-bg p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
          >
            <code className="font-mono text-[0.8125rem] break-all text-fg">
              Co-Authored-By: Claude Sonnet 5 &lt;noreply@anthropic.com&gt;
            </code>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted group-hover:text-fg">
              On Zen-Z&rsquo;s public commits
              <ArrowUpRight size={15} />
              <span className="sr-only"> (opens in new tab)</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
