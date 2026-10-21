import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

/** Name as a wordmark (the face lives in the hero byline), anchor nav, theme, resume. */
export function Header() {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display press -ml-1 rounded-md px-1 text-base tracking-[-0.02em]">
          {site.name}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLinks />
          <ThemeToggle />
          <a href={site.resume} className="btn btn-ghost press hidden h-9 px-3.5 text-sm md:inline-flex" download>
            Resume
            <span aria-hidden className="font-mono text-xs text-muted">
              PDF
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
