import { facts, pages, projects, routes, site, stack } from "@/lib/site";

/**
 * Structured data, one graph per route. Entities have stable `@id`s on the canonical origin,
 * so the home page can define the Person once and case pages can point at it.
 */
const id = (hash: string, path: string = routes.home) => `${site.url}${path === "/" ? "/" : path}#${hash}`;

const ids = {
  person: id("person"),
  org: id("zen-z-org"),
  website: id("website"),
  zenzApp: id("app", routes.zenz),
  prelimsCode: id("code", routes.prelims),
};

const person = {
  "@type": "Person",
  "@id": ids.person,
  name: site.name,
  givenName: "Aayush",
  familyName: "Thakur",
  url: site.url,
  email: `mailto:${site.email}`,
  image: `${site.url}${site.image}`,
  jobTitle: "Founder & CTO",
  seeks: { "@type": "Demand", description: site.lookingFor },
  description: site.description,
  worksFor: { "@id": ids.org },
  affiliation: { "@type": "CollegeOrUniversity", name: site.education.school, url: site.education.schoolUrl },
  address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
  sameAs: [site.github, site.linkedin],
  // Single source: the stack list in site.ts.
  knowsAbout: [...stack.filter((t) => t.layer !== "Tools").map((t) => t.name), "Row-level security", "Payment webhooks"],
  award: [`${facts.sih}, Smart India Hackathon internal round`],
};

const org = {
  "@type": "Organization",
  "@id": ids.org,
  name: projects.zenz.name,
  url: projects.zenz.url,
  founder: { "@id": ids.person },
  sameAs: [projects.zenz.playStoreUrl, projects.zenz.instagram, projects.zenz.sourceUrl],
};

const website = {
  "@type": "WebSite",
  "@id": ids.website,
  url: site.url,
  name: site.name,
  inLanguage: "en",
  publisher: { "@id": ids.person },
};

const zenzApp = {
  "@type": "SoftwareApplication",
  "@id": ids.zenzApp,
  name: projects.zenz.name,
  url: projects.zenz.url,
  applicationCategory: "SocialNetworkingApplication",
  operatingSystem: "Android, iOS (PWA) and web",
  installUrl: projects.zenz.playStoreUrl,
  downloadUrl: projects.zenz.playStoreUrl,
  sameAs: [projects.zenz.playStoreUrl, projects.zenz.sourceUrl],
  publisher: { "@id": ids.org },
  description:
    "A campus social app that matches college students into small groups of strangers for cafés, dinners, movies and sports. Built with React Native (Expo), Next.js and Supabase, with PayU payments verified server-side.",
  creator: { "@id": ids.person },
  author: { "@id": ids.person },
};

const prelimsCode = {
  // SoftwareSourceCode (not SoftwareApplication): the public artifact is the repo.
  "@type": "SoftwareSourceCode",
  "@id": ids.prelimsCode,
  name: projects.prelims.name,
  url: projects.prelims.url,
  codeRepository: projects.prelims.url,
  programmingLanguage: "TypeScript",
  runtimePlatform: "React Native (Expo)",
  description: `A React Native + TypeScript UPSC Prelims daily-practice app with streaks, reminders, Reanimated animations and ${facts.prelims.tests} unit tests, built in ${facts.prelims.buildTime}.`,
  creator: { "@id": ids.person },
  author: { "@id": ids.person },
};

/** A case or sub page: WebPage + breadcrumb, about one entity, by the Person. */
function subPage(path: string, name: string, description: string, about: object[]) {
  const url = `${site.url}${path}`;
  return [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: "en",
      isPartOf: { "@id": ids.website },
      author: { "@id": ids.person },
      ...(about.length ? { about: about.map((a) => ({ "@id": (a as { "@id": string })["@id"] })) } : {}),
      dateModified: site.updated,
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: site.url },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
    // Slim copies of the entities the page points at, so each page validates on its own.
    { "@type": "Person", "@id": ids.person, name: site.name, url: site.url, sameAs: person.sameAs },
    ...(JSON.stringify(about).includes(ids.org) ? [{ "@type": "Organization", "@id": ids.org, name: org.name, url: org.url }] : []),
    ...about,
  ];
}

export const graphs = {
  home: [
    person,
    org,
    website,
    {
      "@type": "ProfilePage",
      "@id": id("profile"),
      url: site.url,
      name: site.title,
      isPartOf: { "@id": ids.website },
      mainEntity: { "@id": ids.person },
      dateModified: site.updated,
      hasPart: [routes.zenz, routes.prelims].map((p) => ({ "@id": `${site.url}${p}#webpage` })),
    },
  ],
  zenz: subPage(routes.zenz, pages.zenz.title, pages.zenz.description, [zenzApp]),
  prelims: subPage(routes.prelims, pages.prelims.title, pages.prelims.description, [prelimsCode]),
  stack: subPage(routes.stack, pages.stack.title, pages.stack.description, []),
};

export function JsonLd({ graph }: { graph: object[] }) {
  const data = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
