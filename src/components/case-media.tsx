import Image, { type StaticImageData } from "next/image";
import { Phone } from "@/components/ui/phone";
import { screens } from "@/sections/home/zenz-data";
import admin from "@/assets/zenz/admin-band.png";
import zGlossy from "@/assets/v4/brand/z-glossy.webp";
import today from "@/assets/prelims/today.jpg";
import quiz from "@/assets/prelims/quiz.jpg";
import result from "@/assets/prelims/result.jpg";

/** A minimal browser window around a screenshot. */
export function Browser({ src, alt, url, sizes, priority }: { src: StaticImageData; alt: string; url: string; sizes: string; priority?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-[14px] bg-[#f6f4ef] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-black/20">
      <div className="flex h-8 items-center gap-1.5 border-b border-black/10 px-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[0.6875rem] text-black/50">{url}</span>
      </div>
      <Image src={src} alt={alt} sizes={sizes} priority={priority} className="block w-full" />
    </figure>
  );
}

/** Zen-Z lead: the live admin dashboard, with the plan and payment screens in front. */
export function ZenzLead() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[radial-gradient(120%_90%_at_70%_20%,#3a0605,#0f0b0a_60%)] ring-1 ring-line sm:aspect-[16/9]">
      <Image src={zGlossy} alt="" aria-hidden sizes="40vw" className="absolute top-[-12%] right-[-6%] w-[48%] opacity-40 blur-[2px]" />
      <div className="absolute top-[8%] left-[5%] w-[90%] sm:top-1/2 sm:w-[64%] sm:-translate-y-1/2">
        <Browser
          src={admin}
          url="admin.zen-z.site"
          priority
          sizes="(min-width: 640px) 60vw, 90vw"
          alt="Zen-Z admin dashboard: pending reports and payments to check, both at zero, with the students and reports tools below"
        />
      </div>
      <Phone shots={[screens.plan]} sizes="(min-width: 640px) 16vw, 40vw" className="absolute right-[30%] bottom-[-14%] w-[40%] rotate-[-6deg] sm:right-[19%] sm:bottom-[-10%] sm:w-[19%]" />
      <Phone shots={[screens.pay]} sizes="(min-width: 640px) 16vw, 40vw" className="absolute right-[5%] bottom-[-6%] w-[40%] rotate-[5deg] sm:right-[4%] sm:bottom-[-4%] sm:w-[19%]" />
    </div>
  );
}

/** PrelimsDaily lead: three light screens, the quiz in front. */
export function PrelimsLead() {
  return (
    <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[28px] bg-paper-2 sm:aspect-[16/9]">
      <div className="flex w-[88%] max-w-[46rem] items-center justify-center">
        <Phone shots={[{ src: today, alt: "PrelimsDaily Today screen: a one-day streak, a completed 5 of 5 target ring and week dots" }]} sizes="(min-width: 640px) 18vw, 30vw" className="z-0 w-[30%] translate-x-[14%] -rotate-[8deg]" />
        <Phone shots={[{ src: quiz, alt: "PrelimsDaily quiz: a statement-style question on the Financial Emergency, answered correctly, with its explanation" }]} sizes="(min-width: 640px) 20vw, 36vw" priority className="z-10 w-[36%]" />
        <Phone shots={[{ src: result, alt: "PrelimsDaily result: a 60% ring, +40 XP and a one-day streak" }]} sizes="(min-width: 640px) 18vw, 30vw" className="z-0 w-[30%] -translate-x-[14%] rotate-[8deg]" />
      </div>
    </div>
  );
}
