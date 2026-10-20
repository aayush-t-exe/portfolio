import { CopyEmail } from "@/components/copy-email";
import { ArrowDown, ArrowUpRight, Download, GitHub, LinkedIn, Mail } from "@/components/icons";
import { site } from "@/lib/site";
import { stagger } from "@/lib/stagger";

export function Contact() {
  const links = [
    { href: site.github, label: "GitHub", handle: site.githubHandle, Icon: GitHub, external: true },
    { href: site.linkedin, label: "LinkedIn", handle: site.linkedinHandle, Icon: LinkedIn, external: true },
    { href: site.resume, label: "Resume", handle: "PDF, 1 page", Icon: Download, download: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="cv-auto border-t border-line bg-surface/50 py-20 [--cv-h:900px] md:py-32">
      <div className="container-page">
        <p data-reveal className="label flex items-center gap-3">
          <span className="text-fg">04</span>
          <span aria-hidden className="rule-draw h-px w-6 bg-line-strong" />
          Contact
        </p>
        <h2
          id="contact-title"
          data-reveal
          style={stagger(1)}
          className="mt-8 max-w-[14ch] text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.05em]"
        >
          Have something worth <span className="serif-em">building?</span>
        </h2>
        <p data-reveal style={stagger(2)} className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
          Email is the fastest way to reach me. Tell me what you&rsquo;re building and where I could help.
        </p>

        <div data-reveal style={stagger(3)} className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a href={`mailto:${site.email}`} className="btn btn-primary press h-14 px-6 text-base">
            <Mail size={18} />
            {site.email}
          </a>
          <CopyEmail
            email={site.email}
            className="btn btn-ghost h-14 px-5 text-base"
          >
            <span>Copy email</span>
          </CopyEmail>
        </div>

        <ul data-reveal style={stagger(4)} className="mt-16 grid border-t border-line sm:grid-cols-3">
          {links.map(({ href, label, handle, Icon, external, download }) => (
            <li key={label} className="border-b border-line sm:border-b-0 sm:[&:first-child>a]:pl-0 sm:[&:not(:first-child)]:border-l">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener me" } : {})}
                {...(download ? { download: true } : {})}
                className="group flex items-center justify-between gap-4 py-5 sm:px-5"
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className="text-muted transition-colors group-hover:text-fg" />
                  <span>
                    <span className="block font-medium">{label}</span>
                    <span className="block font-mono text-xs text-muted">{handle}</span>
                  </span>
                </span>
                {download ? (
                  <ArrowDown
                    size={18}
                    className="text-muted transition-transform duration-300 ease-out group-hover:translate-y-0.5 group-hover:text-fg"
                  />
                ) : (
                  <ArrowUpRight
                    size={18}
                    className="text-muted transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
