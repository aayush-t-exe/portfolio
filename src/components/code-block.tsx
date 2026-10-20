import { highlight, type Token } from "@/lib/highlight";

const COLORS: Record<Token["kind"], string> = {
  comment: "text-[#958f84]",
  string: "text-[#c8d48c]",
  keyword: "text-[#ff8d66]",
  number: "text-[#e9b46a]",
  fn: "text-[#f3f0e9]",
  plain: "text-[#cfcac0]",
};

export function CodeBlock({
  code,
  filename,
  badge,
  label,
}: {
  code: string;
  filename: string;
  badge?: string;
  label: string;
}) {
  const tokens = highlight(code.trim());
  return (
    <figure className="overflow-hidden rounded-[14px] border border-black/40 bg-code-bg shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <span className="font-mono text-xs text-[#cfcac0]">{filename}</span>
        {badge ? (
          <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] tracking-wide text-[#b6b0a5] uppercase">
            {badge}
          </span>
        ) : null}
      </div>
      {/* tabIndex: scrollable regions must be keyboard reachable */}
      <pre
        tabIndex={0}
        aria-label={label}
        className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.7] sm:p-5 sm:text-[13px]"
      >
        <code>
          {tokens.map((t, i) => (
            <span key={i} className={COLORS[t.kind]}>
              {t.text}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
