import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Zen-Z case study by Aayush Thakur: a campus app built solo";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("zenz");
}
