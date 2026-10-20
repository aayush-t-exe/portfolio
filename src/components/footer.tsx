import { ArrowUp } from "@/components/icons";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>
            <span className="text-fg">© 2026 {site.name}.</span> Designed and built in Jaipur.
          </p>
          <p className="font-mono text-xs">
            Next.js · Tailwind · set in Geist &amp; Instrument Serif · shipped with Claude Code
          </p>
        </div>
        <a href="#top" className="press inline-flex items-center gap-2 self-start rounded-full sm:self-auto hover:text-fg">
          Back to top
          <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}
