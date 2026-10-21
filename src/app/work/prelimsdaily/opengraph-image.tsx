import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "PrelimsDaily case study by Aayush Thakur: a tested app built in a day";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("prelims");
}
