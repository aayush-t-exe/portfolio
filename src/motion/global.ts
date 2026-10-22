import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

type Opts = { fine: boolean };
type Cleanup = () => void;

/** On screen right now? Elements already visible are never hidden (nothing flashes). */
export const onScreen = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.top < innerHeight && r.bottom > 0;
};

/**
 * Site-wide motion, driven by data attributes so sections stay server components:
 * - [data-split]       headings: lines rise out of a mask as they enter
 * - [data-fade]        blocks: fade up as they enter ([data-fade-group] staggers its children)
 * - [data-marquee]     loops that speed up with scroll velocity and follow its direction
 * - [data-curve]       curved section edges that flatten as the next section arrives
 * - [data-parallax]    drift at a fraction of the scroll speed
 * - [data-magnetic]    buttons that lean toward the pointer (fine pointers only)
 * - [data-cursor]      areas where the ring cursor shows a label (fine pointers only)
 * - the header's section label scrambles when it changes
 * Runs inside a gsap.matchMedia context, so every tween and trigger reverts with it.
 */
export function setupGlobal({ fine }: Opts): Cleanup {
  const cleanups: Cleanup[] = [];

  // Split-line reveals
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    if (onScreen(el)) return;
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      linesClass: "split-line",
      onSplit: (s) =>
        gsap.from(s.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
    });
  });

  // Fades
  document.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
    if (onScreen(el)) return;
    gsap.from(el, {
      y: 48,
      autoAlpha: 0,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });
  document.querySelectorAll<HTMLElement>("[data-fade-group]").forEach((el) => {
    if (onScreen(el)) return;
    gsap.from(el.children, {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // Velocity marquees: a ticker moves each track; scroll velocity multiplies the speed and the
  // scroll direction flips it, then it eases back to the base speed.
  const marquees = [...document.querySelectorAll<HTMLElement>("[data-marquee]")];
  if (marquees.length) {
    const state = marquees.map((m) => {
      m.classList.add("gsap-marquee");
      const track = m.querySelector<HTMLElement>(".marquee-track")!;
      const base = Number(m.dataset.dir ?? 1);
      const seconds = Number(m.dataset.speed ?? 40);
      const visible = { on: true };
      const st = ScrollTrigger.create({ trigger: m, start: "top bottom", end: "bottom top", onToggle: (s) => (visible.on = s.isActive) });
      return { track, base, perSec: 50 / seconds, x: 0, set: gsap.quickSetter(track, "xPercent"), visible, st };
    });
    let boost = 1;
    let dir = 1;
    const vel = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        dir = self.direction;
        boost = Math.max(boost, 1 + Math.min(Math.abs(self.getVelocity()) / 600, 5));
      },
    });
    const tick = (_t: number, dt: number) => {
      boost += (1 - boost) * Math.min(1, dt / 400);
      for (const s of state) {
        if (!s.visible.on) continue;
        s.x -= s.base * dir * s.perSec * boost * (dt / 1000);
        if (s.x <= -50) s.x += 50;
        if (s.x > 0) s.x -= 50;
        s.set(s.x);
      }
    };
    gsap.ticker.add(tick);
    cleanups.push(() => {
      gsap.ticker.remove(tick);
      vel.kill();
      state.forEach((s) => {
        s.st.kill();
        gsap.set(s.track, { clearProps: "transform" });
      });
      marquees.forEach((m) => m.classList.remove("gsap-marquee"));
    });
  }

  // Curved edges
  document.querySelectorAll<HTMLElement>("[data-curve]").forEach((el) => {
    gsap.fromTo(
      el,
      { scaleY: 1 },
      { scaleY: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 30%", scrub: true } },
    );
  });

  // Parallax drift
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const k = Number(el.dataset.parallax);
    gsap.fromTo(
      el,
      { yPercent: -k * 50 },
      { yPercent: k * 50, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });

  // Section label scramble
  const label = document.querySelector<HTMLElement>("[data-section-label]");
  if (label) {
    document.documentElement.classList.add("has-scramble");
    label.textContent = label.dataset.text ?? "";
    const onLabel = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      if (!text) return;
      gsap.to(label, { duration: 0.6, scrambleText: { text, chars: "upperCase", speed: 0.6 }, ease: "none", overwrite: true });
    };
    window.addEventListener("section-label", onLabel);
    cleanups.push(() => {
      window.removeEventListener("section-label", onLabel);
      document.documentElement.classList.remove("has-scramble");
      label.textContent = label.dataset.text ?? "";
    });
  }

  if (fine) {
    cleanups.push(setupMagnetic(), setupCursor());
  }

  return () => cleanups.forEach((c) => c());
}

function setupMagnetic(): Cleanup {
  const els = [...document.querySelectorAll<HTMLElement>("[data-magnetic]")];
  const offs = els.map((el) => {
    const label = el.querySelector<HTMLElement>("[data-magnetic-label]");
    const strength = Number(el.dataset.magnetic || 0.35);
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      if (label) gsap.to(label, { x: x * strength * 0.45, y: y * strength * 0.45, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    };
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
      if (label) gsap.to(label, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set([el, label].filter(Boolean), { clearProps: "transform" });
    };
  });
  return () => offs.forEach((o) => o());
}

function setupCursor(): Cleanup {
  const root = document.documentElement;
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  const text = document.createElement("span");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  dot.setAttribute("aria-hidden", "true");
  ring.setAttribute("aria-hidden", "true");
  dot.dataset.hidden = ring.dataset.hidden = "";
  ring.append(text);
  document.body.append(dot, ring);
  root.classList.add("has-cursor");

  const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
  const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
  const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
  const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

  let current: Element | null = null;
  const move = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    delete dot.dataset.hidden;
    delete ring.dataset.hidden;
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
    const target = (e.target as Element | null)?.closest?.("[data-cursor]") ?? null;
    if (target !== current) {
      current = target;
      const label = target?.getAttribute("data-cursor");
      if (label) {
        text.textContent = label;
        ring.dataset.label = "";
        dot.dataset.hidden = "";
      } else {
        delete ring.dataset.label;
      }
    }
  };
  const hide = () => {
    dot.dataset.hidden = ring.dataset.hidden = "";
  };
  window.addEventListener("pointermove", move, { passive: true });
  document.documentElement.addEventListener("pointerleave", hide);
  return () => {
    window.removeEventListener("pointermove", move);
    document.documentElement.removeEventListener("pointerleave", hide);
    dot.remove();
    ring.remove();
    root.classList.remove("has-cursor");
  };
}
