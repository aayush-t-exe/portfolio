import Image, { type StaticImageData } from "next/image";
import { ArrowDown } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { facts } from "@/lib/site";
import { stagger } from "@/lib/stagger";
import { PrelimsDaily } from "@/sections/prelims";
import { ZenZ } from "@/sections/zenz";
import zenzCard from "@/assets/zenz/card.jpg";
import prelimsCard from "@/assets/prelims/card.jpg";

const cases: Array<{ href: string; index: string; name: string; line: string; fact: string; image: StaticImageData; alt: string }> = [
  {
    href: "#zen-z",
    index: "01",
    name: "Zen-Z",
    line: "A live campus social app: small groups of strangers, one plan.",
    fact: `Live on Google Play · ${facts.zenz.commits} commits, solo`,
    image: zenzCard,
    alt: "Three Zen-Z app screens: the home screen, a booking summary and the payment screen",
  },
  {
    href: "#prelimsdaily",
    index: "02",
    name: "PrelimsDaily",
    line: "A daily UPSC practice habit, built in a single day.",
    fact: `1 day · ${facts.prelims.tests} passing tests`,
    image: prelimsCard,
    alt: "Three PrelimsDaily screens: today's streak and target ring, a quiz question with its explanation, and a result",
  },
];

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="01"
          label="Selected work"
          headingId="work-title"
          title={
            <>
              Two products, built end to end and <span className="serif-em">shipped.</span>
            </>
          }
        />

        {/* Case index: founders skim, so each case is one click away. */}
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          {cases.map((c, i) => (
            <li key={c.href} data-reveal style={stagger(i)}>
              <a href={c.href} className="case-card press group block overflow-hidden rounded-[18px] border border-line bg-surface">
                <span className="block overflow-hidden border-b border-line">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    sizes="(min-width: 768px) 560px, 92vw"
                    className="case-card-img aspect-[16/10] w-full object-cover"
                  />
                </span>
                <span className="flex items-end justify-between gap-4 p-5 sm:p-6">
                  <span>
                    <span className="label block">Case {c.index}</span>
                    <span className="mt-2 block text-2xl font-medium tracking-[-0.03em]">{c.name}</span>
                    <span className="mt-1 block text-muted">{c.line}</span>
                    <span className="mt-3 block font-mono text-xs text-fg">{c.fact}</span>
                  </span>
                  <span
                    aria-hidden
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors group-hover:text-fg"
                  >
                    <ArrowDown size={16} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-20 md:mt-28">
          <ZenZ />
        </div>

        <div aria-hidden className="my-20 flex items-center gap-4 md:my-32">
          <span className="h-px flex-1 bg-line" />
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-muted">
            <path d="M5 0 6 4 10 5 6 6 5 10 4 6 0 5 4 4Z" fill="currentColor" />
          </svg>
          <span className="h-px flex-1 bg-line" />
        </div>

        <PrelimsDaily />

        <aside
          data-reveal
          aria-label="Also"
          className="mt-20 flex flex-col gap-4 rounded-[16px] border border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 md:mt-28"
        >
          <div className="flex items-center gap-4">
            <span className="label shrink-0">Also</span>
            <p className="font-medium tracking-[-0.01em]">
              Smart India Hackathon (SIH), internal round
            </p>
          </div>
          <p className="font-mono text-sm text-muted">
            Placed <span className="text-fg">5th</span> of ~75 teams
          </p>
        </aside>
      </div>
    </section>
  );
}
