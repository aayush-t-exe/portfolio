import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified: site.updated,
    changeFrequency: "monthly" as const,
    priority,
  });
  return [
    page(routes.home, 1),
    page(routes.zenz, 0.9),
    page(routes.prelims, 0.8),
    page(routes.stack, 0.5),
  ];
}
