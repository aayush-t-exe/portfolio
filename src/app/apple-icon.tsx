import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const mono = readFileSync(join(process.cwd(), "src/assets/fonts/GeistMono-Regular.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#161512",
          color: "#f4f2ed",
          fontFamily: "Geist Mono",
          fontSize: 72,
          letterSpacing: "-0.04em",
          position: "relative",
        }}
      >
        AT
        <div style={{ position: "absolute", top: 30, right: 30, width: 16, height: 16, borderRadius: 999, background: "#ff6a3d" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Geist Mono", data: mono, weight: 400, style: "normal" }] },
  );
}
