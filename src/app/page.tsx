import type { Metadata } from "next";
import { Intro } from "@/components/site/intro";
import { JsonLd, graphs } from "@/lib/jsonld";
import { openGraph } from "@/lib/metadata";
import { About } from "@/sections/home/about";
import { Hero } from "@/sections/home/hero";
import { TechMarquee } from "@/sections/home/tech-marquee";
import { UnderTheHood } from "@/sections/home/under-the-hood";
import { ZenzShowcase } from "@/sections/home/zenz-showcase";
import { Work } from "@/sections/home/work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...openGraph, url: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd graph={graphs.home} />
      <Intro />
      <Hero />
      <TechMarquee />
      <ZenzShowcase />
      <UnderTheHood />
      <Work />
      <About />
    </>
  );
}
