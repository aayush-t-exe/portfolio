"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { id: "work", label: "Work", className: "" },
  { id: "process", label: "Process", className: "hidden md:inline-flex" },
  { id: "stack", label: "Stack", className: "hidden lg:inline-flex" },
  { id: "about", label: "About", className: "hidden sm:inline-flex" },
  { id: "contact", label: "Contact", className: "" },
] as const;

/** Anchor nav with a quiet scroll-spy: the section crossing the reading band gets aria-current. */
export function NavLinks() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    // Track every section's state so scrolling back into the hero or proof strip clears it.
    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        // Sections don't overlap, so at most one is in the band; take the last in page order.
        setActive(links.map((l) => l.id).findLast((id) => inBand.has(id)) ?? null);
      },
      // A thin band across the upper-middle of the viewport decides "current".
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav aria-label="Primary">
      <ul className="flex items-center">
        {links.map((l) => {
          const isActive = active === l.id;
          return (
            <li key={l.id} className={l.className}>
              {/* "/#id" (not "#id") so the links also work from other routes, like the 404. */}
              <a
                href={`/#${l.id}`}
                aria-current={isActive ? "location" : undefined}
                className="press relative inline-flex h-9 items-center rounded-full px-3 text-sm text-muted transition-colors hover:text-fg aria-[current]:text-fg"
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-[opacity,transform] duration-300 ease-out ${
                    isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
