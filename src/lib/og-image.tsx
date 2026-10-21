import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { facts, site } from "@/lib/site";

/** Shared renderer for opengraph-image and twitter-image (1200 × 630). */

// Read once, at build time, when the image route is prerendered.
const font = (file: string) => readFileSync(join(process.cwd(), "src/assets/fonts", file));

export function renderOgImage() {
  const geist = font("Geist-Regular.ttf");
  const geistMedium = font("Geist-Medium.ttf");
  const mono = font("GeistMono-Regular.ttf");
  const serifItalic = font("InstrumentSerif-Italic.ttf");

  const ink = "#161512";
  const muted = "#5b5850";
  const line = "#dedad1";
  const accent = "#b3320d";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f2ed",
          color: ink,
          fontFamily: "Geist",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: ink,
                color: "#f4f2ed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Geist Mono",
                fontSize: 18,
              }}
            >
              AT
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.01em" }}>{site.name}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "Geist Mono",
              fontSize: 20,
              color: muted,
              background: "#fbfaf7",
              border: `1px solid ${line}`,
              borderRadius: 999,
              padding: "10px 20px",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: accent }} />
            Founder &amp; CTO, Zen-Z
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 116,
              fontWeight: 500,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            I ship&nbsp;
            <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 128, letterSpacing: "-0.02em", fontWeight: 400 }}>
              real
            </span>
            &nbsp;products,
          </div>
          <div style={{ fontSize: 116, fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 1.05 }}>fast.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Geist Mono",
            fontSize: 22,
            color: muted,
            borderTop: `1px solid ${line}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 36 }}>
            <span style={{ color: ink }}>{facts.zenz.users} users in 2 days</span>
            <span>{facts.zenz.revenue} revenue</span>
            <span>built solo</span>
          </div>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: geist, weight: 400, style: "normal" },
        { name: "Geist", data: geistMedium, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
      ],
    },
  );
}
