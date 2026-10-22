type Opts = { fine: boolean; pathname: string };
type Cleanup = () => void;

/** Page-specific motion: each setup looks for its own section and does nothing without it. */
export function setupPages({ fine, pathname }: Opts): Cleanup {
  const cleanups: Cleanup[] = [];
  void fine;
  void pathname;
  return () => cleanups.forEach((c) => c());
}
