import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";
import { nb } from "@/lib/nobreak";
import { stagger } from "@/lib/stagger";
import portrait from "@/assets/about/portrait.jpg";

const facts = [
  { term: "Based in", value: "Jaipur, India (IST, UTC+5:30)" },
  { term: "Now", value: "Founder & CTO, Zen-Z" },
  { term: "Studying", value: site.education.line },
  { term: "Recognition", value: "SIH internal round: 5th of ~75 teams. Pitched at JNU Shark Tank" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="cv-auto border-t border-line py-20 [--cv-h:1600px] md:py-32">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="About"
          headingId="about-title"
          title={
            <>
              Student by enrolment. <span className="serif-em">Builder</span> by habit.
            </>
          }
        />

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <figure data-reveal className="md:col-span-4 md:col-start-4 lg:col-span-4 lg:col-start-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] border border-line bg-surface-2">
              <Image
                src={portrait}
                alt="Aayush Thakur smiling, arms crossed, in a blue shirt against green hills"
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 30vw, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-muted">Fig. 2: Jaipur, 2026</figcaption>
          </figure>

          <div className="md:col-span-5 lg:col-span-5 lg:col-start-8">
            <div
              data-reveal
              style={stagger(1)}
              className="space-y-5 text-[1.125rem] leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-fg"
            >
              <p>
                I&rsquo;m <strong>Aayush Thakur</strong>, a third-year B.Tech Computer Science student at
                Jaipur National University. Most of what I know I learned by shipping. <span className="whitespace-nowrap">Zen-Z</span> taught me
                payments, row-level security, and what real users do to an app in its first 48 hours.
              </p>
              <p>
                I like owning a problem end to end: deciding what to build, picking the trade-off,
                writing the code, and being the one who gets the message when it breaks. AI tools make me fast;
                taste and care decide what&rsquo;s worth shipping.
              </p>
              <p>
                I&rsquo;d love to work with a small team that moves quickly and sweats the details.
              </p>
            </div>

            <dl data-reveal style={stagger(2)} className="mt-10 divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div key={f.term} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-[0.9375rem]">
                  <dt className="label pt-0.5">{f.term}</dt>
                  <dd>{nb(f.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
