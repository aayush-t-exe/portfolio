import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "The stack Aayush Thakur ships with, and where each tool shipped";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("stack");
}
