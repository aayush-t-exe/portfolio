import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-4 max-w-[14ch] text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.045em]">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">
        The link might be old, or I might not have built it yet. The work is one click away.
      </p>
      <div className="mt-10">
        <Link href="/#work" className="btn btn-primary press">
          See the work
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
