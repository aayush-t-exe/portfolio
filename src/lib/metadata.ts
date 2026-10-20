import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Shared Open Graph fields. The home page adds its own `url`; other routes (404) don't get one. */
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
