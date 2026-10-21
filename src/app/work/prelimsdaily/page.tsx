import { JsonLd, graphs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { pages, routes } from "@/lib/site";
import { PrelimsCase } from "@/sections/prelims/case";

export const metadata = pageMetadata({ path: routes.prelims, ...pages.prelims });

export default function PrelimsDailyPage() {
  return (
    <>
      <JsonLd graph={graphs.prelims} />
      <PrelimsCase />
    </>
  );
}
