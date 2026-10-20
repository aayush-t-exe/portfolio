import { nb } from "@/lib/nobreak";
import { stagger } from "@/lib/stagger";

type Entry = {
  when: string;
  dateTime?: string;
  title: string;
  detail: string;
  tag: "live" | "shipped" | "pitch" | "founded";
  href?: string;
};

/** Real milestones only, newest first. Launch timing isn't dated, so it sits inside "Now". */
const entries: Entry[] = [
  {
    when: "Now",
    title: "Running Zen-Z",
    detail: "Live on the Play Store. 150+ users in its first 2 days, ₹33K+ revenue.",
    tag: "live",
    href: "#zen-z",
  },
  {
    when: "Oct 2026",
    dateTime: "2026-10",
    title: "Shipped PrelimsDaily",
    detail: "A UPSC practice app, built in one day, with 72 unit tests.",
    tag: "shipped",
    href: "#prelimsdaily",
  },
  {
    when: "Sep 2026",
    dateTime: "2026-09",
    title: "Pitched at JNU Shark Tank",
    detail: "Zen-Z in front of the university's judging panel.",
    tag: "pitch",
  },
  {
    when: "Jul 2026",
    dateTime: "2026-07",
    title: "Founded Zen-Z",
    detail: "Started building the app, admin panel and backend, solo.",
    tag: "founded",
  },
];

export function ShipLog() {
  return (
    <div className="card relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <h2 className="font-mono text-xs font-normal text-fg">
          ship-log<span className="text-muted">.md</span>
          <span className="sr-only">: recent milestones</span>
        </h2>
        <p className="font-mono text-xs text-muted">newest first</p>
      </div>
      {/* before: draws the timeline spine behind the dots */}
      <ol className="relative px-5 py-2 before:absolute before:top-6 before:bottom-6 before:left-6 before:w-px before:bg-line">
        {entries.map((e, i) => (
          <li key={e.title} className="enter relative flex gap-4 py-3.5" style={stagger(i + 4)}>
            <span
              aria-hidden
              className={`relative z-10 mt-1.5 size-[9px] shrink-0 rounded-full ring-4 ring-surface ${
                e.tag === "live" ? "pulse-dot bg-accent" : "bg-line-strong"
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[0.9375rem] font-medium tracking-[-0.01em]">
                  {e.href ? (
                    <a href={e.href} className="link">
                      {e.title}
                    </a>
                  ) : (
                    e.title
                  )}
                </h3>
                {e.dateTime ? (
                  <time dateTime={e.dateTime} className="shrink-0 font-mono text-xs text-muted">
                    {e.when}
                  </time>
                ) : (
                  <span className="shrink-0 font-mono text-xs font-medium text-accent">{e.when}</span>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{nb(e.detail)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
