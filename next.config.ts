import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Scaffold defaults turned off: every route is static, and in Lighthouse runs partial
  // prefetching added main-thread work during load (TBT spikes).
  cacheComponents: false,
  partialPrefetching: false,
  images: {
    formats: ["image/avif", "image/webp"],
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
