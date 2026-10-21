import { execSync } from "node:child_process";
import type { NextConfig } from "next";

/**
 * Build receipt for the footer, captured once when the build starts. On Vercel the commit comes
 * from the system env; locally from git, marked dirty if the tree has uncommitted changes. Any
 * value that can't be found stays empty and the footer leaves it out.
 */
const git = (args: string) => {
  try {
    return execSync(`git ${args}`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
};
const vercelSha = process.env.VERCEL_GIT_COMMIT_SHA ?? "";
const sha = vercelSha || git("rev-parse HEAD");
const repo =
  process.env.VERCEL_GIT_PROVIDER === "github" && process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG
    ? `https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`
    : "";

const nextConfig: NextConfig = {
  env: {
    BUILD_SHA: sha,
    BUILD_DIRTY: !vercelSha && sha && git("status --porcelain") ? "1" : "",
    BUILD_TIME: new Date().toISOString(),
    BUILD_REPO: repo,
    BUILD_ON_VERCEL: process.env.VERCEL ? "1" : "",
  },
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
