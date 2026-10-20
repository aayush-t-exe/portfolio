import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="press group flex items-center gap-2.5 rounded-md"
          aria-label={`${site.name}, home`}
        >
          <Monogram />
          <span className="text-[0.9375rem] font-medium tracking-[-0.01em]">{site.name}</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLinks />
          <ThemeToggle />
          <a
            href={site.resume}
            className="btn btn-ghost press hidden h-9 px-3.5 text-sm md:inline-flex"
            download
          >
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

function Monogram() {
  return (
    <span
      aria-hidden
      className="grid size-7 place-items-center rounded-[8px] bg-fg font-mono text-[0.6875rem] font-semibold tracking-tight text-bg"
    >
      AT
    </span>
  );
}
