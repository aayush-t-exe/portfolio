import Image from "@/components/ui/img";
import zGlossy from "@/assets/v4/brand/z-glossy.webp";

/**
 * Home intro: नमस्ते → Hello → the red Z, then the panel lifts with a curved edge. Pure CSS
 * (see .intro in globals.css), shown only when the pre-paint script sets `intro` on <html>
 * (first visit this session, motion allowed; shorter on phones). The hero is already painted
 * underneath.
 */
export function Intro() {
  return (
    <div className="intro-panel" aria-hidden>
      <span className="intro-word intro-hi" lang="hi">
        नमस्ते
      </span>
      <span className="intro-word display">Hello</span>
      <span className="intro-word display">
        <Image src={zGlossy} alt="" className="h-[1.1em] w-auto" sizes="120px" />
        <span className="[font-stretch:118%]">Aayush</span>
      </span>
      <p className="label absolute bottom-8 left-1/2 -translate-x-1/2">Jaipur · IST</p>
    </div>
  );
}
