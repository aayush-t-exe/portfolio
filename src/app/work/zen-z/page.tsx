import { JsonLd, graphs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { pages, routes } from "@/lib/site";
import { ZenZCase } from "@/sections/zenz/case";

export const metadata = pageMetadata({ path: routes.zenz, ...pages.zenz });

export default function ZenZPage() {
  return (
    <>
      <JsonLd graph={graphs.zenz} />
      <ZenZCase />
    </>
  );
}
