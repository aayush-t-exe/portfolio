import Image from "next/image";
import { CopyEmail } from "@/components/copy-email";
import { ArrowDown, ArrowUpRight, Download, GitHub, LinkedIn, Mail } from "@/components/icons";
import { site } from "@/lib/site";
import { stagger } from "@/lib/stagger";
import avatar from "@/assets/about/avatar.jpg";

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
          <span className="text-fg">05</span>
          <span aria-hidden className="rule-draw h-px w-6 bg-line-strong" />
          Contact
        </p>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <h2
              id="contact-title"
              data-reveal
              style={stagger(1)}
              className="mt-8 max-w-[15ch] text-[clamp(2.75rem,6.4vw,5.25rem)] leading-[0.94] font-medium tracking-[-0.05em]"
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
          </div>

          <aside
            data-reveal
            style={stagger(4)}
            aria-label="About working with me"
            className="card p-6 lg:col-span-5 lg:mb-1"
          >
            <div className="flex items-center gap-4">
              <Image
                src={avatar}
                alt=""
                width={56}
                height={56}
                className="size-14 rounded-full shadow-[0_0_0_1px_var(--line-strong)]"
              />
              <p className="leading-snug">
                <span className="block font-medium">{site.name}</span>
                <span className="block text-sm text-muted">Jaipur · {site.timezone}</span>
              </p>
            </div>
            <p className="label mt-6">What I&rsquo;m looking for</p>
            <p className="mt-2 leading-relaxed">{site.lookingFor}</p>
          </aside>
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
                    <span className="block font-medium">
                      {label}
                      {external ? <span className="sr-only"> (opens in new tab)</span> : null}
                    </span>
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
