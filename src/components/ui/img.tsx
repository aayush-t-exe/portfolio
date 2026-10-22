import Image, { type ImageProps, type StaticImageData } from "next/image";

const lean = new WeakMap<StaticImageData, StaticImageData>();

/**
 * next/image without the blur placeholder of static imports. Every static import carries a
 * base64 `blurDataURL`, and since Image is a client component it's serialized into each page's
 * RSC payload even though nothing here shows it (~17 kB on the home page). The trimmed object
 * is cached per import, so repeated images still serialize once. Use `next/image` directly for
 * `placeholder="blur"` (the portrait).
 */
export default function Img({ src, alt, ...props }: ImageProps) {
  if (typeof src === "object" && "src" in src && src.blurDataURL) {
    let s = lean.get(src);
    if (!s) lean.set(src, (s = { src: src.src, width: src.width, height: src.height }));
    src = s;
  }
  return <Image src={src} alt={alt} {...props} />;
}
