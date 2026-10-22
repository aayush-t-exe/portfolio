import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80dvh] flex-col justify-center pt-28 pb-24">
      <p className="display-caps text-[clamp(7rem,26vw,22rem)] text-red">404</p>
      <h1 className="display mt-6 max-w-[16ch] text-[clamp(2rem,5vw,3.75rem)] tracking-[-0.04em]">This page doesn&rsquo;t exist.</h1>
      <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-muted">
        The link might be old, or I might not have built it yet. The work is one click away.
      </p>
      <div className="mt-10">
        <Link href="/#work" className="btn btn-red press">
          See the work <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
