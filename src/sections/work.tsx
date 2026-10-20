import { SectionHeading } from "@/components/section-heading";
import { PrelimsDaily } from "@/sections/prelims";
import { ZenZ } from "@/sections/zenz";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16 py-20 md:py-32">
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
          intro="A live startup with paying users, and an app built in a day for a startup application. Each one is the full story: the problem, what I built, the decisions and what happened."
        />

        <div className="mt-20 md:mt-28">
          <ZenZ />
        </div>

        <div aria-hidden className="my-20 flex items-center gap-4 md:my-32">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-xs text-muted">✦</span>
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
