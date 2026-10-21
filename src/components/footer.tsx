import { projects, site } from "@/lib/site";

/** Inlined at build time from next.config.ts. Empty when unknown; the item is then left out. */
const build = {
  sha: process.env.BUILD_SHA ?? "",
  dirty: process.env.BUILD_DIRTY === "1",
  time: process.env.BUILD_TIME ?? "",
  repo: process.env.BUILD_REPO ?? "",
  onVercel: process.env.BUILD_ON_VERCEL === "1",
};

const builtOn = build.time
  ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(
      new Date(build.time),
    )
  : "";

/**
 * The signature element: a live status / build receipt, true values only.
 * - Jaipur time: computed in the browser (PageBehavior fills [data-clock]); hidden without JS.
 * - JS: what this page actually loaded, from Resource Timing (encoded bytes of same-origin
 *   scripts), measured after load; hidden until then.
 * - Commit and build time: from the build. "deployed" only on Vercel, otherwise "built"; a
 *   dirty local tree is marked. The relative time ("3h ago") is computed client-side.
 */
export function Footer() {
  const shortSha = build.sha.slice(0, 7);
  return (
    <footer className="border-t border-line">
      <div className="container-page py-8 text-sm text-muted">
        <ul aria-label="Build receipt" className="receipt flex flex-wrap gap-y-1.5 font-mono text-xs leading-relaxed">
          <li data-clock-line hidden>
            Jaipur <time data-clock className="text-fg tabular-nums" /> IST
          </li>
          <li>
            <a href={projects.zenz.playStoreUrl} target="_blank" rel="noopener" className="link">
              Zen-Z live on Google Play<span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
          <li>built with Next.js</li>
          <li data-js-weight hidden>
            <span className="text-fg tabular-nums" data-js-kb /> kB of JS loaded
          </li>
          {shortSha ? (
            <li>
              {build.onVercel ? "deployed" : "built"}{" "}
              {build.repo ? (
                <a href={`${build.repo}/commit/${build.sha}`} target="_blank" rel="noopener" className="link text-fg">
                  {shortSha}
                  <span className="sr-only"> (commit, opens in new tab)</span>
                </a>
              ) : (
                <span className="text-fg">{shortSha}</span>
              )}
              {build.dirty ? " + local changes" : ""}
              {builtOn ? (
                <>
                  ,{" "}
                  <time data-ago dateTime={build.time}>
                    on {builtOn}
                  </time>
                </>
              ) : null}
            </li>
          ) : null}
        </ul>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p>© 2026 {site.name}. Designed and built in Jaipur.</p>
          <a href="#top" className="press rounded-full hover:text-fg">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
