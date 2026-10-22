import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Scaffold defaults turned off: every route is static, and in Lighthouse runs partial
  // prefetching added main-thread work during load (TBT spikes).
  cacheComponents: false,
  partialPrefetching: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Fewer, better-placed widths than the defaults (15): shorter srcsets in every <img>, and
    // phone screens on phones land on 384/512 instead of 640.
    deviceSizes: [512, 640, 828, 1080, 1440, 1920],
    imageSizes: [64, 96, 160, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
