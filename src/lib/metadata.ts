import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Shared Open Graph fields. Pages add their own `url`; other routes (404) don't get one. */
export const openGraph = {
  type: "profile",
  siteName: site.name,
  title: site.title,
  description: site.description,
  locale: "en_IN",
  firstName: "Aayush",
  lastName: "Thakur",
  username: site.githubHandle,
} satisfies Metadata["openGraph"];

/**
 * Metadata for a sub page: its own title, description, canonical, OG and Twitter fields (the
 * root layout's `twitter` would otherwise leak the home title onto every page). OG images come
 * from the route's own opengraph-image file.
 */
export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", siteName: site.name, locale: "en_IN", url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
