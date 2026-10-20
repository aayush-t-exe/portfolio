import { highlight } from "@/lib/highlight";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
  // Rendered to one HTML string: far smaller in the page and RSC payload than a span per
  // token. Plain text inherits the <code> colour, and adjacent same-kind tokens are merged.
  const merged: Array<{ kind: string; text: string }> = [];
  for (const t of highlight(code.trim())) {
    const prev = merged.at(-1);
    if (prev && (prev.kind === t.kind || /^\s+$/.test(t.text))) prev.text += t.text;
    else merged.push({ ...t });
  }
  const html = merged
    .map((t) => (t.kind === "plain" ? escape(t.text) : `<span class="tk-${t.kind}">${escape(t.text)}</span>`))
    .join("");
  return (
    <figure className="overflow-hidden rounded-[14px] border border-code-border bg-code-bg shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]">
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
        role="region"
        aria-label={label}
        className="tk-plain overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.7] sm:p-5 sm:text-[13px]"
      >
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  );
}
