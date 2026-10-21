import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { facts, site } from "@/lib/site";

/** Shared renderer for every route's opengraph-image and twitter-image (1200 × 630). */

// Read at build time, when the image routes are prerendered.
const file = (path: string) => readFileSync(join(process.cwd(), "src/assets", path));
const dataUri = (path: string, type = "image/jpeg") => `data:${type};base64,${file(path).toString("base64")}`;

export const ogSize = { width: 1200, height: 630 };

const paper = "#f4f2ed";
const ink = "#161512";
const muted = "#5b5850";
const line = "#dedad1";
const stage = "#121211";

type Variant = "home" | "zenz" | "prelims";

export function renderOgImage(variant: Variant) {
  const fonts = [
    { name: "Geist", data: file("fonts/Geist-Regular.ttf"), weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: file("fonts/Geist-Medium.ttf"), weight: 500 as const, style: "normal" as const },
    { name: "Geist Mono", data: file("fonts/GeistMono-Regular.ttf"), weight: 400 as const, style: "normal" as const },
    { name: "Schibsted", data: file("fonts/SchibstedGrotesk-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
  ];
  const body = variant === "home" ? <Home /> : <Case variant={variant} />;
  return new ImageResponse(body, { ...ogSize, fonts });
}

/** A phone with a real screenshot, for the right-hand side. */
function Phone({ src, width, top, left, light }: { src: string; width: number; top: number; left: number; light?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        display: "flex",
        padding: 6,
        borderRadius: 40,
        background: "#0c0c0b",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.12)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img>. */}
      <img src={src} width={width - 12} style={{ borderRadius: 34, background: light ? "#f7f7f5" : "#000" }} alt="" />
    </div>
  );
}

function Home() {
  const z = facts.zenz;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: paper, color: ink, fontFamily: "Geist" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 0 56px 68px", width: 720 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img>. */}
          <img src={dataUri("about/byline.jpg")} width={72} height={72} style={{ borderRadius: 16 }} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.01em" }}>{site.name}</div>
            <div style={{ fontFamily: "Geist Mono", fontSize: 18, color: muted }}>Founder-engineer · Jaipur, IST · Open to work</div>
          </div>
        </div>
        <div style={{ display: "flex", fontFamily: "Schibsted", fontSize: 64, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.02 }}>
          I built Zen-Z solo: a live campus app with paying users.
        </div>
        <div
          style={{
            display: "flex",
            gap: 26,
            fontFamily: "Geist Mono",
            fontSize: 20,
            color: muted,
            borderTop: `1px solid ${line}`,
            paddingTop: 24,
          }}
        >
          <span style={{ color: ink }}>{z.users} users in 2 days</span>
          <span>{z.revenue} revenue</span>
          <span>
            {z.claudeCommits}/{z.commits} commits with Claude
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, padding: "40px 40px 40px 8px" }}>
        <div style={{ display: "flex", position: "relative", flex: 1, borderRadius: 28, background: stage, overflow: "hidden" }}>
          <Phone src={dataUri("zenz/flow-5-plan.jpg")} width={190} top={110} left={200} />
          <Phone src={dataUri("zenz/home.jpg")} width={230} top={70} left={44} />
        </div>
      </div>
    </div>
  );
}

const cases = {
  zenz: {
    name: "Zen-Z",
    line: "A campus app built solo: React Native, Next.js admin, Supabase and PayU.",
    proof: `${facts.zenz.users} users in 2 days · ${facts.zenz.tables} tables, RLS on all · live on Google Play`,
    phones: [
      { src: "zenz/flow-6-pay.jpg", width: 220, top: 120, left: 210 },
      { src: "zenz/home.jpg", width: 250, top: 60, left: 20 },
    ],
    light: false,
  },
  prelims: {
    name: "PrelimsDaily",
    line: "A UPSC daily-practice app, from empty repo to tested app in one day.",
    proof: `${facts.prelims.tests} unit tests · offline · Expo + TypeScript`,
    phones: [
      { src: "prelims/result.jpg", width: 220, top: 120, left: 210 },
      { src: "prelims/quiz.jpg", width: 250, top: 60, left: 20 },
    ],
    light: true,
  },
};

function Case({ variant }: { variant: Exclude<Variant, "home"> }) {
  const c = cases[variant];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: stage, color: "#f1efe9", fontFamily: "Geist" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 0 56px 68px", width: 700 }}>
        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 20, color: "#a39f96" }}>
          Case study · {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontFamily: "Schibsted", fontSize: 112, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 0.95 }}>{c.name}</div>
          <div style={{ fontSize: 34, color: "#c9c5bc", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{c.line}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Geist Mono",
            fontSize: 19,
            color: "#a39f96",
            borderTop: "1px solid #2a2926",
            paddingTop: 24,
          }}
        >
          {c.proof}
        </div>
      </div>
      <div style={{ display: "flex", position: "relative", flex: 1, overflow: "hidden" }}>
        {c.phones.map((p) => (
          <Phone key={p.src} src={dataUri(p.src)} width={p.width} top={p.top} left={p.left} light={c.light} />
        ))}
      </div>
    </div>
  );
}
