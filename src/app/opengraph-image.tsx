import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Aayush Thakur: I built Zen-Z solo, a live campus app with paying users";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("home");
}
