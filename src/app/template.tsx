import { ViewTransition, type ReactNode } from "react";

/**
 * Page transition: templates remount on navigation, so the old page leaves (it dims and drifts up)
 * while the new one wipes in under a curved edge (CSS in globals.css, off under reduced motion).
 * Browsers without view transitions just swap pages.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
