import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import avatar from "@/assets/about/avatar.jpg";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50">
      {/* Reading progress: scroll-driven, CSS only (hidden where unsupported or reduced motion). */}
      <span aria-hidden className="reading-progress absolute inset-x-0 top-0 h-0.5 origin-left bg-accent" />
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/" className="press group flex items-center gap-2.5 rounded-md">
            <Avatar />
            <span className="text-[0.9375rem] font-medium tracking-[-0.01em]">{site.name}</span>
          </Link>
          <span className="sr-only">, {site.status}</span>
        </div>

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

/**
 * The face before the name (the full portrait is the second sighting, in About). `alt` is
 * empty because the name beside it labels the link. The status dot is static: the hero
 * pill already pulses.
 */
function Avatar() {
  return (
    <span className="avatar relative size-[30px] shrink-0 sm:size-8" title={site.status}>
      <Image
        src={avatar}
        alt=""
        sizes="32px"
        loading="eager"
        className="size-full rounded-full object-cover shadow-[0_0_0_1px_var(--line-strong)]"
      />
      <span
        aria-hidden
        className="absolute -right-px -bottom-px size-2 rounded-full bg-accent shadow-[0_0_0_2px_var(--bg)]"
      />
    </span>
  );
}
