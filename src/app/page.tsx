import type { Metadata } from "next";
import { openGraph } from "@/lib/metadata";
import { facts, projects, site, stack } from "@/lib/site";
import { About } from "@/sections/about";
import { Contact } from "@/sections/contact";
import { Hero } from "@/sections/hero";
import { Process } from "@/sections/process";
import { Proof } from "@/sections/proof";
import { Stack } from "@/sections/stack";
import { Work } from "@/sections/work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...openGraph, url: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Proof />
      <Work />
      <Process />
      <Stack />
      <About />
      <Contact />
    </>
  );
}

function JsonLd() {
  const person = `${site.url}/#person`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: site.name,
        givenName: "Aayush",
        familyName: "Thakur",
        url: site.url,
        email: `mailto:${site.email}`,
        image: `${site.url}${site.image}`,
        jobTitle: "Founder & CTO",
        description: site.description,
        worksFor: { "@id": `${site.url}/#zen-z-org` },
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: site.education.school,
          url: site.education.schoolUrl,
        },
        address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
        sameAs: [site.github, site.linkedin],
        // Single source: the stack list in site.ts.
        knowsAbout: [...stack.map((t) => t.name), "Row-level security", "Payment webhooks", "AI-assisted software development"],
        award: [`${facts.sih}, Smart India Hackathon internal round`],
      },
      {
        "@type": "Organization",
        "@id": `${site.url}/#zen-z-org`,
        name: projects.zenz.name,
        url: projects.zenz.url,
        founder: { "@id": person },
        sameAs: [projects.zenz.playStoreUrl, projects.zenz.instagram, projects.zenz.sourceUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": person },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": person },
        dateModified: site.updated,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#zen-z`,
        name: projects.zenz.name,
        url: projects.zenz.url,
        applicationCategory: "SocialNetworkingApplication",
        operatingSystem: "Android, iOS (PWA), Web",
        installUrl: projects.zenz.playStoreUrl,
        downloadUrl: projects.zenz.playStoreUrl,
        sameAs: [projects.zenz.playStoreUrl, projects.zenz.sourceUrl],
        publisher: { "@id": `${site.url}/#zen-z-org` },
        description:
          "A campus social app that matches college students into small groups of strangers for cafés, dinners, movies and sports. Built with React Native (Expo), Next.js and Supabase, with PayU payments verified server-side.",
        creator: { "@id": person },
        author: { "@id": person },
      },
      {
        // SoftwareSourceCode (not SoftwareApplication): the public artifact is the repo.
        "@type": "SoftwareSourceCode",
        "@id": `${site.url}/#prelimsdaily`,
        name: projects.prelims.name,
        url: projects.prelims.url,
        codeRepository: projects.prelims.url,
        programmingLanguage: "TypeScript",
        runtimePlatform: "React Native (Expo)",
        description:
          `A React Native + TypeScript UPSC Prelims daily-practice app with streaks, reminders, Reanimated animations and ${facts.prelims.tests} unit tests, built in a single day.`,
        creator: { "@id": person },
        author: { "@id": person },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
