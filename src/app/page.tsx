import type { Metadata } from "next";
import { JsonLd, graphs } from "@/lib/jsonld";
import { openGraph } from "@/lib/metadata";
import { About } from "@/sections/home/about";
import { Contact } from "@/sections/contact";
import { Hero } from "@/sections/home/hero";
import { Work } from "@/sections/home/work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...openGraph, url: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd graph={graphs.home} />
      <Hero />
      <Work />
      <About />
      <Contact />
    </>
  );
}
