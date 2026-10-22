import gsap from "gsap";

type Cleanup = () => void;

/** Hero pose of the phone; must match the hero phone's CSS transform. */
const HERO_POSE = { rotation: 5, rotationY: -22, rotationX: 10 };
/** Pose on arrival in the Zen-Z stage; matches .zz-pose. */
const STAGE_POSE = { rotation: -2, rotationY: -14, rotationX: 6 };

/**
 * Hero → Zen-Z: one phone travels from the hero into the pinned Zen-Z stage, then the stage
 * steps through the booking flow while pinned, and the phone settles flat.
 *
 * The phone lives in the Zen-Z stage. Before the pin, a transform places it over the hero's
 * phone slot and eases it home as you scroll. Offsets are measured from containers that are
 * never transformed (slots, section, pinned wrapper), so they stay right on every refresh.
 */
export function setupJourney(): Cleanup | void {
  const heroSlot = document.querySelector<HTMLElement>("[data-hero-slot]");
  const zz = document.querySelector<HTMLElement>(".zz");
  const pinEl = zz?.querySelector<HTMLElement>("[data-zz-pin]");
  const stageSlot = zz?.querySelector<HTMLElement>("[data-stage-slot]");
  const traveller = zz?.querySelector<HTMLElement>("[data-traveller]");
  const pose = traveller?.querySelector<HTMLElement>(".zz-pose");
  if (!heroSlot || !zz || !pinEl || !stageSlot || !traveller || !pose) return;
  // Only when the stage is actually laid out (md and up).
  if (!stageSlot.offsetWidth) return;

  const root = document.documentElement;
  root.classList.add("traveller");

  const shots = [...zz.querySelectorAll<HTMLElement>(".zz-screen [data-shot]")];
  const items = [...zz.querySelectorAll<HTMLElement>(".zz-step")];
  const captions = [...zz.querySelectorAll<HTMLElement>(".zz-caption")];
  const bar = zz.querySelector<HTMLElement>("[data-zz-bar]");
  const finale = zz.querySelector<HTMLElement>("[data-zz-final]");
  const floats = [...zz.querySelectorAll<HTMLElement>("[data-float]")];
  const N = items.length;

  // Geometry (document-independent offsets, see above).
  const centre = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width };
  };
  const delta = () => {
    const h = centre(heroSlot);
    const s = centre(stageSlot);
    const secTop = zz.getBoundingClientRect().top;
    const pinTop = pinEl.getBoundingClientRect().top;
    return { x: h.x - s.x, y: h.y - secTop - (s.y - pinTop), scale: h.w / s.w };
  };

  // 1. Travel: from the hero pose to the stage, over the scroll up to the pin.
  gsap.set(pose, { transformPerspective: 1400, ...HERO_POSE });
  const travel = gsap.timeline({
    scrollTrigger: { trigger: zz, start: 0, end: "top top", scrub: 0.6, invalidateOnRefresh: true },
  });
  travel
    .fromTo(
      traveller,
      // Function values run on every refresh, after pins are reverted, so the slots measure true.
      { x: () => delta().x, y: () => delta().y, scale: () => delta().scale },
      { x: 0, y: 0, scale: 1, ease: "power1.inOut", immediateRender: true },
      0,
    )
    .fromTo(pose, { ...HERO_POSE }, { ...STAGE_POSE, ease: "power1.inOut", immediateRender: true }, 0);

  // 2. The pinned flow.
  zz.dataset.active = "0";
  const setActive = (a: number) => {
    zz.dataset.active = String(a);
    items.forEach((el, i) => (i === a ? (el.dataset.on = "") : delete el.dataset.on));
    captions.forEach((el, i) => (i === a ? (el.dataset.on = "") : delete el.dataset.on));
  };
  setActive(0);
  // Screens wipe up over each other (a crossfade would show two screens at once mid-scrub).
  gsap.set(shots, { autoAlpha: 1, clipPath: (i: number) => (i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)") });
  if (finale) gsap.set(finale, { autoAlpha: 0, y: 30, scale: 0.85 });

  let active = 0;
  const flow = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: pinEl,
      pin: true,
      start: "top top",
      end: () => `+=${(N - 1) * innerHeight * 0.7}`,
      scrub: 0.8,
      invalidateOnRefresh: true,
      snap: { snapTo: 1 / (N - 1), duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: "power2.inOut" },
      onUpdate: (self) => {
        const a = Math.round(self.progress * (N - 1));
        if (a !== active) setActive((active = a));
      },
    },
  });
  for (let i = 1; i < N; i++) {
    const at = i - 1;
    if (bar) flow.to(bar, { y: () => items[i].offsetTop, duration: 1 }, at);
    flow.fromTo(shots[i], { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" }, at + 0.3);
  }
  // Settle flat over the last step; the "Ready to meet" art lands with it.
  flow.to(pose, { rotation: 0, rotationY: 0, rotationX: 0, duration: 1 }, N - 2);
  flow.to(traveller, { scale: 1.06, duration: 1 }, N - 2);
  if (finale) flow.to(finale, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, N - 2 + 0.5);
  floats.forEach((f) => {
    const k = Number(f.dataset.float);
    flow.fromTo(f, { y: 40 * k }, { y: -120 * k, rotation: `+=${12 * k}`, ease: "none", duration: N - 1 }, 0);
  });

  return () => {
    root.classList.remove("traveller");
    delete zz.dataset.active;
    items.forEach((el) => delete el.dataset.on);
    captions.forEach((el) => delete el.dataset.on);
    gsap.set([traveller, pose, ...shots, ...floats, bar, finale].filter(Boolean), { clearProps: "transform,opacity,visibility,clipPath" });
  };
}

/** Hero stickers drift toward the cursor (fine pointers). */
export function setupHeroPointer(): Cleanup | void {
  const hero = document.getElementById("hero");
  const stickers = [...(hero?.querySelectorAll<HTMLElement>("[data-sticker]") ?? [])];
  if (!hero || !stickers.length) return;
  const movers = stickers.map((el) => ({
    k: Number(el.dataset.sticker),
    x: gsap.quickTo(el, "x", { duration: 1, ease: "power3" }),
    y: gsap.quickTo(el, "y", { duration: 1, ease: "power3" }),
  }));
  const move = (e: PointerEvent) => {
    const nx = e.clientX / innerWidth - 0.5;
    const ny = e.clientY / innerHeight - 0.5;
    for (const m of movers) {
      m.x(nx * 36 * m.k);
      m.y(ny * 28 * m.k);
    }
  };
  hero.addEventListener("pointermove", move);
  return () => {
    hero.removeEventListener("pointermove", move);
    gsap.set(stickers, { clearProps: "transform" });
  };
}

/** Work index: a preview card follows the cursor; its strip slides to the hovered row. */
export function setupWorkPreview(): Cleanup | void {
  const list = document.querySelector<HTMLElement>("[data-work-list]");
  const card = document.querySelector<HTMLElement>("[data-work-preview]");
  const strip = card?.querySelector<HTMLElement>("[data-work-strip]");
  if (!list || !card || !strip) return;
  const rows = [...list.querySelectorAll<HTMLElement>("[data-work-row]")];
  gsap.set(card, { xPercent: -50, yPercent: -50, scale: 0.4, autoAlpha: 0 });
  const xTo = gsap.quickTo(card, "x", { duration: 0.7, ease: "power3" });
  const yTo = gsap.quickTo(card, "y", { duration: 0.7, ease: "power3" });
  const show = (i: number) => {
    gsap.to(card, { scale: 1, autoAlpha: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    gsap.to(strip, { yPercent: -100 * i, duration: 0.7, ease: "power3.inOut", overwrite: "auto" });
  };
  const hide = () => gsap.to(card, { scale: 0.4, autoAlpha: 0, duration: 0.35, ease: "power3.in", overwrite: "auto" });
  const move = (e: PointerEvent) => {
    xTo(e.clientX);
    yTo(e.clientY);
  };
  const offs = rows.map((row, i) => {
    const enter = () => show(i);
    const focus = () => {
      // Keyboard: place the card beside the focused row.
      const r = row.getBoundingClientRect();
      gsap.set(card, { x: r.left + r.width * 0.62, y: r.top + r.height / 2 });
      show(i);
    };
    row.addEventListener("pointerenter", enter);
    row.addEventListener("focus", focus);
    row.addEventListener("blur", hide);
    return () => {
      row.removeEventListener("pointerenter", enter);
      row.removeEventListener("focus", focus);
      row.removeEventListener("blur", hide);
    };
  });
  list.addEventListener("pointerleave", hide);
  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("scroll", hide, { passive: true });
  return () => {
    offs.forEach((o) => o());
    list.removeEventListener("pointerleave", hide);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("scroll", hide);
    gsap.set([card, strip], { clearProps: "transform,opacity,visibility" });
  };
}

/** PrelimsDaily: each sticky card shrinks and dims as the next one slides over it. */
export function setupStack(): Cleanup | void {
  const cards = [...document.querySelectorAll<HTMLElement>("[data-stack-card]")];
  if (cards.length < 2 || getComputedStyle(cards[0]).position !== "sticky") return;
  cards.slice(0, -1).forEach((card, i) => {
    gsap.to(card, {
      scale: 0.94,
      filter: "brightness(0.72)",
      ease: "none",
      scrollTrigger: { trigger: cards[i + 1], start: "top 55%", end: "top 15%", scrub: true },
    });
  });
  return () => gsap.set(cards, { clearProps: "transform,filter" });
}
