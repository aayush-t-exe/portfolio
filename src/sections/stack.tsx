import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft } from "@/components/icons";
import { stackIcons, type StackIcon } from "@/components/stack-icons";
import { coursework, projectNames, stack, stackLayers, type Project } from "@/lib/site";

const filters: Array<{ id: "all" | Project; label: string; short?: string }> = [
  { id: "all", label: "All" },
  { id: "Z", label: "Zen-Z" },
  { id: "P", label: "PrelimsDaily", short: "Prelims" },
  { id: "S", label: "This site" },
];

/**
 * The stack as a ledger: layers as rows, each tool with what it was used for and where it
 * shipped. The filter is plain radio inputs; the sliding pill and the dimming of other
 * projects' tools are CSS (`:has()`), so there's no client JS and no reflow.
 */
export function Stack() {
  const count = (id: "all" | Project) => (id === "all" ? stack.length : stack.filter((t) => t.usedIn.includes(id)).length);
  return (
    <section aria-labelledby="stack-title" className="stack pt-8 md:pt-12">
      <div className="container-page">
        <Link
          href="/#work"
          className="press -ml-2 inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm text-muted hover:text-fg"
        >
          <ArrowLeft size={15} />
          All work
        </Link>
        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-12 md:gap-8">
          <p className="text-sm text-muted md:col-span-3 md:pt-3">What I reach for</p>
          <div className="md:col-span-9">
            <h1 id="stack-title" className="max-w-[18ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
              The stack, and where it shipped.
            </h1>
            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">
              Every tool here shipped in Zen-Z, PrelimsDaily or this site. Pick one to see which.
            </p>
          </div>
        </div>

        <div className="mt-12 md:mt-16 md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-9 md:col-start-4">
            <div
              role="radiogroup"
              aria-label="Highlight tools used in"
              className="stack-filter relative grid grid-cols-4 rounded-full border border-line bg-surface p-1"
            >
              <span aria-hidden className="stack-pill absolute inset-y-1 left-1 rounded-full bg-fg" />
              {filters.map((f) => (
                <label
                  key={f.id}
                  className="relative z-10 flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-full px-2 text-center text-[0.8125rem] font-medium text-muted transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="stack-filter"
                    value={f.id}
                    defaultChecked={f.id === "all"}
                    className="sr-only"
                    data-filter={f.id}
                  />
                  {f.short ? (
                    <>
                      <span className="sm:hidden">{f.short}</span>
                      <span className="hidden truncate sm:inline">{f.label}</span>
                    </>
                  ) : (
                    <span className="truncate">{f.label}</span>
                  )}
                  <span className="font-mono text-xs tabular-nums">
                    {count(f.id)}
                    <span className="sr-only"> tools</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-8 border-t border-line">
              {stackLayers.map((layer) => {
                const tools = stack.filter((t) => t.layer === layer);
                return (
                  <div
                    key={layer}
                    className="grid gap-3 border-b border-line py-5 md:grid-cols-[10rem_1fr] md:gap-6"
                  >
                    <h2 className="label flex items-baseline gap-2 pt-1 md:block">
                      <span className="text-fg">{layer}</span>{" "}
                      <span className="tabular-nums">{tools.length}</span>
                    </h2>
                    <ul className="grid min-w-0 gap-x-6 sm:grid-cols-2">
                      {tools.map((t) => (
                        <li
                          key={t.name}
                          data-z={t.usedIn.includes("Z") || undefined}
                          data-p={t.usedIn.includes("P") || undefined}
                          data-s={t.usedIn.includes("S") || undefined}
                          className="tool -mx-2 flex h-14 min-w-0 items-center gap-3 rounded-[10px] px-2"
                          style={brandStyle(t.icon)}
                        >
                          {t.icon ? (
                            <span
                              aria-hidden
                              className="tool-glyph size-5 shrink-0"
                              style={{ "--glyph": `url(/stack-icons/${t.icon}.svg)` } as CSSProperties}
                            />
                          ) : (
                            <span
                              aria-hidden
                              className="grid size-5 shrink-0 place-items-center rounded-[5px] border border-line-strong font-mono text-[9px] leading-none text-muted"
                            >
                              {t.mono}
                            </span>
                          )}
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[0.9375rem] font-medium">{t.name}</span>
                            <span className="block truncate font-mono text-xs text-muted">{t.note}</span>
                          </span>
                          <span className="sr-only">
                            , used in {t.usedIn.map((p) => projectNames[p]).join(", ")}
                          </span>
                          <span aria-hidden className="flex shrink-0 gap-1">
                            {t.usedIn.map((p) => (
                              <span
                                key={p}
                                title={projectNames[p]}
                                className="tool-chip grid size-6 place-items-center rounded-full border border-line font-mono text-xs text-muted"
                              >
                                {p}
                              </span>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 text-sm text-muted">Also (coursework): {coursework.join(", ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Brand colour for the hover glyph, as a CSS variable (null for black logos). */
function brandStyle(icon: StackIcon | undefined) {
  const hex = icon ? stackIcons[icon].hex : null;
  return hex ? ({ "--brand": hex } as CSSProperties) : undefined;
}
