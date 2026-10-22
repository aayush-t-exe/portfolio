import type { StaticImageData } from "next/image";
import Image from "@/components/ui/img";
import { Phone } from "@/components/ui/phone";
import { screens } from "@/sections/home/zenz-data";
import admin from "@/assets/zenz/admin-dashboard.webp";
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
        <span className="ml-3 font-mono text-[0.6875rem] text-black/65">{url}</span>
      </div>
      <Image src={src} alt={alt} sizes={sizes} priority={priority} className="block w-full" />
    </figure>
  );
}

/**
 * Zen-Z lead: the whole admin dashboard in a browser frame (its height follows the screenshot, so
 * nothing is cropped), with the plan and payment screens in front. Phones: the frame on top and
 * the two phones overlapping its lower edge. Wider: the frame on the left, the phones over its
 * right edge, where the dashboard has its own margin.
 */
export function ZenzLead() {
  return (
    <div className="relative isolate overflow-hidden rounded-[28px] bg-[radial-gradient(120%_90%_at_70%_20%,#3a0605,#0f0b0a_60%)] px-[4%] pt-[5%] pb-[7%] ring-1 ring-line sm:py-[4%]">
      <Image src={zGlossy} alt="" aria-hidden sizes="(min-width: 640px) 24vw, 30vw" className="absolute top-[3%] right-[3%] -z-10 w-[30%] opacity-60 sm:top-[5%] sm:w-[24%]" />
      <div className="sm:w-[60%]">
        <Browser
          src={admin}
          url="admin.zen-z.site"
          priority
          sizes="(min-width: 1408px) 790px, (min-width: 640px) 56vw, 92vw"
          alt="Zen-Z admin dashboard: bookings this week by activity, groups formed, unmatched students, pending reports and payments to check, the students, reports, referrals and analytics tools, and the matching queue"
        />
      </div>
      <div className="relative -mt-[8%] flex items-end justify-center gap-[7%] sm:absolute sm:right-[4%] sm:bottom-[9%] sm:mt-0 sm:w-[40%] sm:gap-[3%]">
        <Phone eager shots={[screens.plan]} sizes="(min-width: 1408px) 240px, (min-width: 640px) 18vw, 36vw" className="w-[36%] rotate-[-6deg] sm:w-[46%]" />
        <Phone eager shots={[screens.pay]} sizes="(min-width: 1408px) 240px, (min-width: 640px) 18vw, 36vw" className="mb-[5%] w-[36%] rotate-[5deg] sm:mb-[9%] sm:w-[46%]" />
      </div>
    </div>
  );
}

/** PrelimsDaily lead: three light screens, the quiz in front. */
export function PrelimsLead() {
  return (
    <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[28px] bg-paper-2 sm:aspect-[16/9]">
      <div className="flex w-[88%] max-w-[46rem] items-center justify-center">
        <Phone shots={[{ src: today, alt: "PrelimsDaily Today screen: a one-day streak, a completed 5 of 5 target ring and week dots" }]} sizes="(min-width: 640px) 18vw, 30vw" eager className="z-0 w-[30%] translate-x-[14%] -rotate-[8deg]" />
        <Phone shots={[{ src: quiz, alt: "PrelimsDaily quiz: a statement-style question on the Financial Emergency, answered correctly, with its explanation" }]} sizes="(min-width: 640px) 20vw, 36vw" priority className="z-10 w-[36%]" />
        <Phone shots={[{ src: result, alt: "PrelimsDaily result: a 60% ring, +40 XP and a one-day streak" }]} sizes="(min-width: 640px) 18vw, 30vw" eager className="z-0 w-[30%] -translate-x-[14%] rotate-[8deg]" />
      </div>
    </div>
  );
}
