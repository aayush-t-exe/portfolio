import { CopyEmail } from "@/components/copy-email";
import { ArrowUpRight, GitHub, LinkedIn } from "@/components/icons";
import { Portrait } from "@/components/ui/portrait";
import { site } from "@/lib/site";

const external = { target: "_blank", rel: "noopener" } as const;

/**
 * Contact + footer, on every page (Dennis-style): a giant "Let's talk", the one ask, a big
 * magnetic round email button on a rule, quick links, live Jaipur time, and the name as a
 * wordmark at the very bottom.
 */
export function SiteFooter() {
  return (
    <footer id="contact" data-section="08 — Contact" className="relative overflow-clip bg-black text-fg">
      <div className="container-page pt-24 md:pt-36">
        <p className="label">
          <span className="text-red-text">08</span> — Contact
        </p>
        <div className="mt-6 flex items-center gap-4 md:gap-7">
          <Portrait className="size-16 shrink-0 rounded-full md:size-28" sizes="112px" />
          <h2 className="display-caps text-[clamp(3.6rem,14vw,13rem)]" data-split>
            Let&rsquo;s talk
          </h2>
        </div>
        <p className="mt-8 max-w-[34ch] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug text-fg">
          {site.lookingFor}
        </p>

        <div className="relative mt-20 mb-24 h-px bg-line-strong md:mt-24 md:mb-28">
          <a
            href={`mailto:${site.email}`}
            data-magnetic="0.4"
            className="press absolute top-1/2 right-0 grid size-36 -translate-y-1/2 place-items-center rounded-full bg-red text-center text-lg font-medium text-white shadow-[0_30px_80px_-20px_rgb(225_6_0/0.7)] hover:bg-[#f20a00] sm:right-[6%] md:size-48 md:text-xl"
          >
            <span data-magnetic-label className="flex flex-col items-center gap-1">
              Email me
              <ArrowUpRight size={20} />
            </span>
          </a>
        </div>

        <ul className="flex flex-wrap gap-2.5">
          <li>
            <CopyEmail email={site.email} className="btn btn-ghost h-12 px-5 text-[0.9375rem]">
              <span className="font-mono text-[0.875rem]">{site.email}</span>
            </CopyEmail>
          </li>
          <li>
            <a href={site.linkedin} {...external} className="btn btn-ghost press h-12 px-5 text-[0.9375rem]">
              <LinkedIn size={15} /> LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
          <li>
            <a href={site.github} {...external} className="btn btn-ghost press h-12 px-5 text-[0.9375rem]">
              <GitHub size={15} /> GitHub<span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
          <li>
            <a href={site.resume} className="btn btn-ghost press h-12 px-5 text-[0.9375rem]">
              Resume <span className="font-mono text-xs text-muted">PDF</span>
            </a>
          </li>
        </ul>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 text-[0.9375rem] md:grid-cols-4">
          <div>
            <dt className="label">Local time</dt>
            <dd className="mt-1.5">
              <span data-clock suppressHydrationWarning className="font-mono tabular-nums" /> IST · Jaipur
            </dd>
          </div>
          <div>
            <dt className="label">Status</dt>
            <dd className="mt-1.5 flex items-center gap-2">
              <span className="live-dot" aria-hidden /> Open to internships
            </dd>
          </div>
          <div>
            <dt className="label">Education</dt>
            <dd className="mt-1.5">{site.education.short}</dd>
          </div>
          <div>
            <dt className="label">Built with</dt>
            <dd className="mt-1.5 text-muted">Next.js · © 2026 {site.name}</dd>
          </div>
        </dl>
      </div>
      <p
        aria-hidden
        className="display-caps mt-14 -mb-[1.6vw] text-center text-[12.4vw] whitespace-nowrap text-fg select-none [font-stretch:88%] md:mt-20"
      >
        Aayush Thakur
      </p>
    </footer>
  );
}
