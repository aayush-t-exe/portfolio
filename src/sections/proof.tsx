import type { ReactNode } from "react";
import { nb } from "@/lib/nobreak";
import { facts, projects } from "@/lib/site";
import { stagger } from "@/lib/stagger";

const z = facts.zenz;

const stats: Array<{ value: string; label: ReactNode }> = [
  { value: z.users, label: nb(`users in Zen-Z’s first 2 days`) },
  { value: z.revenue, label: nb("total revenue for Zen-Z so far") },
  {
    value: z.igViews,
    label: (
      <>
        views on{" "}
        <a href={projects.zenz.instagram} target="_blank" rel="noopener" className="link text-fg">
          <span className="whitespace-nowrap">Zen-Z</span> Instagram
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        , {z.igFollowers} followers
      </>
    ),
  },
  { value: "1 day", label: `to build PrelimsDaily, with ${facts.prelims.tests} tests` },
];

export function Proof() {
  return (
    <section aria-label="Results at a glance" className="border-y border-line bg-surface/60">
      <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.value}
            data-reveal
            style={stagger(i)}
            className={`flex flex-col-reverse gap-1.5 py-7 pr-4 sm:py-9 ${
              i % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : ""
            } ${i === 2 ? "lg:border-l lg:pl-8" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <dt className="text-sm leading-snug text-muted">{s.label}</dt>
            <dd className="text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-medium tracking-[-0.04em] tabular-nums">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
