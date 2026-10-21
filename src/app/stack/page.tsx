import { JsonLd, graphs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { pages, routes } from "@/lib/site";
import { Stack } from "@/sections/stack";

export const metadata = pageMetadata({ path: routes.stack, ...pages.stack });

export default function StackPage() {
  return (
    <>
      <JsonLd graph={graphs.stack} />
      <Stack />
    </>
  );
}
