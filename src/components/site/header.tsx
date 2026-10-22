import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { site } from "@/lib/site";
import zIcon from "@/assets/v4/brand/z-app-icon.webp";

export const navLinks = [
  { href: "/#zen-z", label: "Zen-Z", n: "02" },
  { href: "/#work", label: "Work", n: "04" },
  { href: "/#about", label: "About", n: "07" },
  { href: "/#contact", label: "Contact", n: "08" },
] as const;

/**
 * Fixed header of floating pills: wordmark, the current section ("02 — Zen-Z", set by
 * SiteBehavior from [data-section]), links and the resume. On phones the links move into a
 * native popover sheet, which opens and closes without any JS.
 */
export function Header() {
  return (
    <header className="site-header-v4">
      <div className="flex items-center justify-between gap-3 px-[var(--gutter)] pt-3 md:pt-4">
        <Link
          href="/"
          className="nav-pill press flex h-11 min-w-0 items-center gap-2.5 rounded-full pr-4 pl-1.5 text-[0.9375rem] font-medium"
          aria-label={`${site.name}, home`}
        >
          <Image src={zIcon} alt="" width={32} height={32} className="size-8 rounded-full" priority={false} />
          <span className="font-display font-extrabold tracking-[-0.02em] [font-stretch:108%]">
            Aayush<span className="max-[399px]:hidden"> Thakur</span>
          </span>
        </Link>

        <p
          className="nav-pill label pointer-events-none absolute left-1/2 hidden h-9 -translate-x-1/2 items-center rounded-full px-4 text-fg opacity-0 transition-opacity duration-300 data-[on]:opacity-100 lg:flex"
          data-section-label
          aria-hidden
        />

        <nav aria-label="Primary" className="flex items-center gap-2">
          <ul className="nav-pill hidden h-11 items-center gap-0.5 rounded-full px-1.5 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="press flex h-8 items-center rounded-full px-3.5 text-[0.9375rem] text-muted transition-colors hover:text-fg aria-[current]:bg-ink-3 aria-[current]:text-fg"
                  data-nav={l.href.slice(2)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.resume}
            className="press flex h-11 items-center gap-1.5 rounded-full bg-fg px-3.5 text-[0.9375rem] font-medium text-ink hover:bg-white sm:px-4"
            data-magnetic
          >
            Resume
            <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            popoverTarget="menu"
            className="nav-pill press grid size-11 place-items-center rounded-full md:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden className="flex w-4.5 flex-col gap-[5px]">
              <span className="h-[1.5px] w-full rounded bg-fg" />
              <span className="h-[1.5px] w-full rounded bg-fg" />
            </span>
          </button>
        </nav>
      </div>

      <div id="menu" popover="auto" className="menu-sheet md:hidden">
        <div className="flex h-full flex-col px-[var(--gutter)] pt-3 pb-8">
          <div className="flex items-center justify-between">
            <span className="label">Menu</span>
            <button
              type="button"
              popoverTarget="menu"
              popoverTargetAction="hide"
              className="nav-pill press grid size-11 place-items-center rounded-full"
              aria-label="Close menu"
            >
              <span aria-hidden className="relative block size-4">
                <span className="absolute top-1/2 left-0 h-[1.5px] w-full rotate-45 rounded bg-fg" />
                <span className="absolute top-1/2 left-0 h-[1.5px] w-full -rotate-45 rounded bg-fg" />
              </span>
            </button>
          </div>
          <ul className="mt-14 space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="display-caps flex items-baseline gap-4 py-2 text-[clamp(2.25rem,11vw,4.5rem)]" data-close-menu>
                  <span className="label text-red-text">{l.n}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 text-muted">
            <p className="flex items-center gap-2 text-fg">
              <span className="live-dot" aria-hidden /> {site.status}
            </p>
            <p className="flex gap-5">
              <a href={site.linkedin} target="_blank" rel="noopener" className="link">
                LinkedIn<span className="sr-only"> (opens in new tab)</span>
              </a>
              <a href={site.github} target="_blank" rel="noopener" className="link">
                GitHub<span className="sr-only"> (opens in new tab)</span>
              </a>
              <a href={`mailto:${site.email}`} className="link">Email</a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
