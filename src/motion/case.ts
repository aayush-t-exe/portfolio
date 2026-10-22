import gsap from "gsap";

type Cleanup = () => void;

/**
 * Case-page rails: the section pins and vertical scroll moves the row sideways (Masab-style).
 * Only when the row is wider than the screen; otherwise it stays a native scroll row.
 */
export function setupRails(): Cleanup | void {
  const rails = [...document.querySelectorAll<HTMLElement>("[data-rail]")];
  const offs = rails.map((rail) => {
    const track = rail.querySelector<HTMLElement>("[data-rail-track]");
    if (!track) return () => {};
    rail.dataset.railOn = "";
    const distance = () => Math.max(0, track.scrollWidth - innerWidth);
    if (distance() <= 0) {
      delete rail.dataset.railOn;
      return () => {};
    }
    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: rail,
        pin: true,
        start: "center center",
        end: () => `+=${distance()}`,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    return () => {
      delete rail.dataset.railOn;
      gsap.set(track, { clearProps: "transform" });
    };
  });
  return () => offs.forEach((o) => o());
}
