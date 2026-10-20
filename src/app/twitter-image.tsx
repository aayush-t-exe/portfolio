import { renderOgImage } from "@/lib/og-image";

export const alt = "Aayush Thakur: founder-engineer who ships real products fast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
