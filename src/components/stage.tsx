import Image from "next/image";
import { ViewTransition, type ReactNode } from "react";
import { BrowserFrame, PhoneFrame } from "@/components/frames";
import adminBand from "@/assets/zenz/admin-band.png";
import zenzHome from "@/assets/zenz/home.jpg";
import zenzPlan from "@/assets/zenz/flow-5-plan.jpg";
import zenzPay from "@/assets/zenz/flow-6-pay.jpg";
import zenzIcon from "@/assets/zenz/icon.png";
import today from "@/assets/prelims/today.jpg";
import quiz from "@/assets/prelims/quiz.jpg";
import result from "@/assets/prelims/result.jpg";

/**
 * Product "stages" (after Samuel Kraft's project panels): the same near-black panel in both
 * themes, so the products' own UI carries the colour, and the light page gets contrast.
 */
export function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`stage relative overflow-hidden rounded-[22px] ${className}`}>{children}</div>;
}

/**
 * The work-card media and the case page's lead image are the same component under the same
 * view-transition name, so navigating between them morphs one into the other (React
 * <ViewTransition>, activated by next/link navigations). Same aspect ratio on both pages.
 */
function Morph({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}

const mediaBox = "aspect-[4/3] sm:aspect-[16/10]";

/** Zen-Z: the live admin dashboard with the payment screen in front of it. */
export function ZenzMedia({ sizes, eager }: { sizes: { admin: string; phone: string }; eager?: boolean }) {
  return (
    <Morph name="media-zen-z">
      <Stage className={mediaBox}>
        <BrowserFrame
          title="admin.zen-z.site"
          shot={{
            image: adminBand,
            alt: "Zen-Z admin dashboard: pending reports and payments to check, both at zero, with the students and reports tools below",
          }}
          sizes={sizes.admin}
          eager={eager}
          className="absolute top-1/2 left-[6%] w-[68%] -translate-y-1/2"
        />
        <div className="absolute top-1/2 right-[6%] w-[25%] -translate-y-[46%]">
          <PhoneFrame
            tone="dark"
            shot={{
              image: zenzPay,
              alt: "Zen-Z payment screen: 8-Ball Pool, Saturday 10th at 6:00 pm, group of 4, ₹70, with a Pay ₹70 button",
            }}
            sizes={sizes.phone}
            eager={eager}
          />
        </div>
      </Stage>
    </Morph>
  );
}

/** PrelimsDaily: three light screens, the quiz in front. */
export function PrelimsMedia({ sizes, eager }: { sizes: string; eager?: boolean }) {
  const side = "absolute top-[16%] w-[23%]";
  return (
    <Morph name="media-prelimsdaily">
      <Stage className={mediaBox}>
        <div className={`${side} left-[9%]`}>
          <PhoneFrame
            tone="light"
            shot={{
              image: today,
              alt: "PrelimsDaily Today screen: a one-day streak, a completed 5 of 5 target ring and week dots",
            }}
            sizes={sizes}
            eager={eager}
          />
        </div>
        <div className={`${side} right-[9%]`}>
          <PhoneFrame
            tone="light"
            shot={{ image: result, alt: "PrelimsDaily result screen: a 60% score ring, 3 of 5 correct, plus 40 XP earned" }}
            sizes={sizes}
            eager={eager}
          />
        </div>
        <div className="absolute top-[9%] left-1/2 w-[27%] -translate-x-1/2">
          <PhoneFrame
            tone="light"
            shot={{
              image: quiz,
              alt: "PrelimsDaily quiz screen: a statement-based question on Financial Emergency with the correct answer highlighted",
            }}
            sizes={sizes}
            eager={eager}
          />
        </div>
      </Stage>
    </Morph>
  );
}

/**
 * The hero's product visual: Zen-Z's home screen, with the booking summary behind it. The
 * phones rise from the bottom edge and are cropped by it, which keeps the stage short.
 */
export function HeroStage() {
  return (
    <Stage className="stage-enter aspect-[5/4] sm:aspect-[4/3] lg:aspect-[9/10]">
      <p className="absolute top-5 left-5 z-10 flex items-center gap-2.5 text-sm text-white sm:top-6 sm:left-6">
        <Image src={zenzIcon} alt="" width={28} height={28} className="size-7 rounded-[8px]" />
        <span className="font-medium">Zen-Z</span>
        <span className="text-white/60">campus social app</span>
      </p>
      <div className="absolute top-[24%] right-[9%] w-[34%] opacity-60 lg:top-[19%] lg:w-[38%]">
        <PhoneFrame
          tone="dark"
          shot={{ image: zenzPlan, alt: "" }}
          sizes="(min-width: 1024px) 190px, 34vw"
        />
      </div>
      <div className="absolute top-[16%] left-[12%] w-[44%] lg:top-[13%] lg:w-[50%]">
        <PhoneFrame
          tone="dark"
          shot={{
            image: zenzHome,
            alt: "Zen-Z home screen: Welcome Aayush, with Cafés, Dinners, Movies and Sports to pick from",
          }}
          sizes="(min-width: 1024px) 250px, 44vw"
          eager
        />
      </div>
    </Stage>
  );
}
