import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { facts, site, stack, stackLayers } from "@/lib/site";

/** Shared renderer for every route's opengraph-image and twitter-image (1200 × 630), in the v4 look. */

// Read at build time, when the image routes are prerendered.
const file = (path: string) => readFileSync(join(process.cwd(), "src/assets", path));
const dataUri = (path: string, type = "image/jpeg") => `data:${type};base64,${file(path).toString("base64")}`;

export const ogSize = { width: 1200, height: 630 };

const ink = "#0a0908";
const fg = "#efe9dc";
const muted = "#a39e94";
const red = "#e10600";
const redText = "#ff3b30";

type Variant = "home" | "zenz" | "prelims" | "stack";

export function renderOgImage(variant: Variant) {
  const fonts = [
    { name: "Geist", data: file("fonts/Geist-Regular.ttf"), weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: file("fonts/Geist-Medium.ttf"), weight: 500 as const, style: "normal" as const },
    { name: "Geist Mono", data: file("fonts/GeistMono-Regular.ttf"), weight: 400 as const, style: "normal" as const },
    { name: "Archivo", data: file("fonts/Archivo-OG.ttf"), weight: 800 as const, style: "normal" as const },
  ];
  return new ImageResponse(<Card variant={variant} />, { ...ogSize, fonts });
}

function Phone({ src, width, top, left, rotate = 0, light }: { src: string; width: number; top: number; left: number; rotate?: number; light?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        display: "flex",
        padding: 7,
        borderRadius: 42,
        background: "#050505",
        boxShadow: "0 0 0 1.5px #3a3633, 0 40px 80px rgba(0,0,0,0.7)",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img>. */}
      <img src={src} width={width - 14} style={{ borderRadius: 35, background: light ? "#f7f7f5" : "#000" }} alt="" />
    </div>
  );
}

const z = facts.zenz;

const variants = {
  home: {
    kicker: "Open to internships · Jaipur, IST",
    title: site.name,
    line: "I built Zen-Z solo: a live campus app with real users and real revenue.",
    stats: [
      [z.users, `users in ${z.usersDays}`],
      [z.revenue, "revenue"],
      ["Live", "on Google Play"],
    ],
    phones: [
      { src: "zenz/flow-5-plan.jpg", width: 200, top: 150, left: 200, rotate: 8 },
      { src: "zenz/home.jpg", width: 236, top: 96, left: 30, rotate: -6 },
    ],
    light: false,
  },
  zenz: {
    kicker: `Case study · ${site.name}`,
    title: "Zen-Z",
    line: "A campus app built solo: React Native, Next.js admin, Supabase and PayU.",
    stats: [
      [z.users, `users in ${z.usersDays}`],
      [z.revenue, "revenue"],
      [String(z.tables), "tables, all with RLS"],
    ],
    phones: [
      { src: "zenz/flow-6-pay.jpg", width: 200, top: 150, left: 200, rotate: 8 },
      { src: "zenz/flow-1-game.jpg", width: 236, top: 96, left: 30, rotate: -6 },
    ],
    light: false,
  },
  prelims: {
    kicker: `Case study · ${site.name}`,
    title: "PrelimsDaily",
    line: "A UPSC daily-practice app, from empty repo to tested app in one day.",
    stats: [
      [String(facts.prelims.tests), "unit tests"],
      [facts.prelims.buildTime, "to build"],
      ["Offline", "Expo + TypeScript"],
    ],
    phones: [
      { src: "prelims/result.jpg", width: 200, top: 150, left: 200, rotate: 8 },
      { src: "prelims/quiz.jpg", width: 236, top: 96, left: 30, rotate: -6 },
    ],
    light: true,
  },
  stack: {
    kicker: site.name,
    title: "Stack",
    line: "Every tool, by layer, and the product it shipped in.",
    stats: [
      [String(stack.length), "tools"],
      ["3", "products"],
      [String(stackLayers.length), "layers"],
    ],
    phones: [],
    light: false,
  },
} as const;

function Card({ variant }: { variant: Variant }) {
  const v = variants[variant];
  const long = v.title.length > 8;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: ink, backgroundImage: "radial-gradient(circle at 82% 28%, rgba(225,6,0,0.55) 0%, rgba(225,6,0,0.14) 32%, rgba(10,9,8,0) 58%)", color: fg, fontFamily: "Geist", overflow: "hidden" }}>
      {/* The glossy Z, right side, over a red glow (the card background). */}
      {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img>. */}
      <img src={dataUri("v4/brand/z-glossy-og.png", "image/png")} width={440} height={491} style={{ position: "absolute", top: 70, right: 40, opacity: v.phones.length ? 0.9 : 1 }} alt="" />
      <div style={{ position: "absolute", top: 0, right: 0, width: 520, height: 630, display: "flex" }}>
        {v.phones.map((p) => (
          <Phone key={p.src} src={dataUri(p.src)} width={p.width} top={p.top} left={p.left} rotate={p.rotate} light={v.light} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 0 52px 64px", width: 700, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Geist Mono", fontSize: 19, color: muted }}>
          <div style={{ width: 10, height: 10, borderRadius: 99, background: red, display: "flex" }} />
          {v.kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontFamily: "Archivo", fontSize: long ? 84 : 120, letterSpacing: "-0.04em", lineHeight: 0.9, textTransform: "uppercase", display: "flex" }}>
            {v.title}
          </div>
          <div style={{ fontSize: 31, color: "#d7d1c4", letterSpacing: "-0.02em", lineHeight: 1.22, maxWidth: 600, display: "flex" }}>{v.line}</div>
        </div>
        <div style={{ display: "flex", gap: 40, borderTop: "1px solid rgba(239,233,220,0.16)", paddingTop: 22 }}>
          {v.stats.map(([n, l], i) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontFamily: "Archivo", fontSize: 50, letterSpacing: "-0.04em", lineHeight: 1, color: i === v.stats.length - 1 ? redText : fg, display: "flex" }}>{n}</div>
              <div style={{ fontSize: 17, color: muted, display: "flex" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
