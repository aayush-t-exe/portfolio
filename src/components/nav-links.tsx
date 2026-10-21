const links = [
  { id: "work", label: "Work", className: "" },
  { id: "process", label: "Process", className: "hidden md:inline-flex" },
  { id: "stack", label: "Stack", className: "hidden lg:inline-flex" },
  { id: "about", label: "About", className: "hidden sm:inline-flex" },
  { id: "contact", label: "Contact", className: "" },
] as const;

/**
 * Anchor nav. The quiet scroll-spy (aria-current on the section in the reading band) is
 * run by PageBehavior; the dot is styled from aria-current in CSS. "/#id" (not "#id") so
 * the links also work from other routes, like the 404.
 */
export function NavLinks() {
  return (
    <nav aria-label="Primary">
      <ul className="flex items-center">
        {links.map((l) => (
          <li key={l.id} className={l.className}>
            <a
              href={`/#${l.id}`}
              data-spy={l.id}
              className="press relative inline-flex h-9 items-center rounded-full px-3 text-sm text-muted transition-colors hover:text-fg aria-[current]:text-fg"
            >
              {l.label}
              <span aria-hidden className="spy-dot absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
