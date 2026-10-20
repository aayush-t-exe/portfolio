import type { ReactNode } from "react";
import type { Schematic as Kind } from "@/lib/image-slots";

/**
 * Line-drawn stand-ins for screenshots that haven't been added yet. They are honest
 * (labelled "schematic") and on-brand, so the page still reads as finished.
 */
export function Schematic({ kind }: { kind: Kind }) {
  switch (kind) {
    case "feed":
      return <Feed />;
    case "booking":
      return <Booking />;
    case "chat":
      return <Chat />;
    case "board":
      return <Board />;
    case "portrait":
      return <Portrait />;
  }
}

const Bar = ({ w, className = "" }: { w: string; className?: string }) => (
  <div className={`h-1.5 rounded-full bg-line-strong ${className}`} style={{ width: w }} />
);

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-full flex-col gap-3 bg-surface px-[9%] pt-[14%] pb-[8%]">{children}</div>
  );
}

function Feed() {
  return (
    <PhoneShell>
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Bar w="3.5rem" className="h-2 bg-fg/70" />
          <Bar w="5rem" />
        </div>
        <div className="size-6 rounded-full bg-surface-2 ring-1 ring-line-strong" />
      </div>
      {[0, 1, 2].map((n) => (
        <div key={n} className="rounded-xl border border-line bg-bg p-2.5">
          <div className={`mb-2 h-12 rounded-lg ${n === 0 ? "bg-accent-soft" : "bg-surface-2"}`} />
          <Bar w="70%" className="mb-1.5 bg-fg/50" />
          <Bar w="45%" />
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex -space-x-1.5">
              {[0, 1, 2, 3].map((a) => (
                <span key={a} className="size-3.5 rounded-full border border-bg bg-line-strong" />
              ))}
            </div>
            <span className={`h-3.5 w-9 rounded-full ${n === 0 ? "bg-accent" : "bg-line-strong"}`} />
          </div>
        </div>
      ))}
    </PhoneShell>
  );
}

function Booking() {
  return (
    <PhoneShell>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((s) => (
          <span key={s} className={`h-1 flex-1 rounded-full ${s < 3 ? "bg-accent" : "bg-line"}`} />
        ))}
      </div>
      <Bar w="65%" className="mt-2 h-2.5 bg-fg/70" />
      <Bar w="80%" />
      <div className="mt-1 space-y-2">
        {[0, 1, 2, 3].map((o) => (
          <div
            key={o}
            className={`flex items-center gap-2.5 rounded-xl border bg-bg p-2.5 ${
              o === 1 ? "border-accent" : "border-line"
            }`}
          >
            <span
              className={`size-3.5 shrink-0 rounded-full border ${
                o === 1 ? "border-accent bg-accent" : "border-line-strong"
              }`}
            />
            <div className="flex-1 space-y-1.5">
              <Bar w="60%" className="bg-fg/40" />
              <Bar w="35%" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto h-8 rounded-full bg-fg/85" />
    </PhoneShell>
  );
}

function Chat() {
  const msgs: Array<[side: "l" | "r", w: string]> = [
    ["l", "62%"],
    ["l", "40%"],
    ["r", "55%"],
    ["l", "70%"],
    ["r", "38%"],
    ["r", "60%"],
    ["l", "48%"],
  ];
  return (
    <PhoneShell>
      <div className="flex items-center gap-2 border-b border-line pb-2.5">
        <div className="flex -space-x-1.5">
          {[0, 1, 2, 3].map((a) => (
            <span key={a} className="size-4 rounded-full border border-surface bg-line-strong" />
          ))}
        </div>
        <Bar w="40%" className="bg-fg/50" />
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1.5">
        {msgs.map(([side, w], i) => (
          <div
            key={i}
            className={`h-5 rounded-2xl ${side === "r" ? "self-end bg-accent/85" : "self-start bg-surface-2"}`}
            style={{ width: w }}
          />
        ))}
      </div>
      <div className="flex h-8 items-center rounded-full border border-line bg-bg px-3">
        <Bar w="45%" />
      </div>
    </PhoneShell>
  );
}

function Board() {
  const cols = [3, 2, 4, 1];
  return (
    <div className="flex size-full bg-surface">
      <div className="hidden w-[16%] flex-col gap-2.5 border-r border-line p-[2%] sm:flex">
        <Bar w="70%" className="h-2 bg-fg/60" />
        {[0, 1, 2, 3, 4].map((n) => (
          <Bar key={n} w={`${55 + ((n * 13) % 30)}%`} className={n === 1 ? "bg-accent" : ""} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-[3%] p-[3%]">
        <div className="flex items-center justify-between">
          <Bar w="22%" className="h-2.5 bg-fg/60" />
          <span className="h-4 w-16 rounded-full bg-fg/80" />
        </div>
        <div className="grid flex-1 grid-cols-4 gap-[2%]">
          {cols.map((count, c) => (
            <div key={c} className="flex flex-col gap-[6%] rounded-lg bg-bg p-[6%] ring-1 ring-line">
              <Bar w="50%" className="bg-fg/40" />
              {Array.from({ length: count }).map((_, k) => (
                <div
                  key={k}
                  className={`rounded-md border bg-surface p-[8%] ${
                    c === 2 && k === 1
                      ? "-rotate-2 border-accent shadow-[0_8px_20px_-8px_rgb(0_0_0/0.25)]"
                      : "border-line"
                  }`}
                >
                  <div className="mb-1.5 flex -space-x-1">
                    {[0, 1, 2, 3].map((a) => (
                      <span key={a} className="size-2.5 rounded-full border border-surface bg-line-strong" />
                    ))}
                  </div>
                  <Bar w="70%" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Portrait() {
  return (
    <div className="relative size-full overflow-hidden bg-surface-2">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--line) 0 1px, transparent 1px 12px)",
        }}
      />
      <div className="absolute top-[24%] left-1/2 aspect-square w-[34%] -translate-x-1/2 rounded-full bg-line-strong" />
      <div className="absolute -bottom-[18%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full bg-line-strong" />
    </div>
  );
}
