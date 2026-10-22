import type { Shot } from "@/components/ui/phone";
import game from "@/assets/zenz/flow-1-game.jpg";
import slot from "@/assets/zenz/flow-2-slot.jpg";
import budget from "@/assets/zenz/flow-3-budget.jpg";
import group from "@/assets/zenz/flow-4-group.jpg";
import plan from "@/assets/zenz/flow-5-plan.jpg";
import pay from "@/assets/zenz/flow-6-pay.jpg";
import home from "@/assets/zenz/home.jpg";

export const screens = {
  home: { src: home, alt: "Zen-Z home screen: Cafés, Dinners, Movies and Sports, and a Ready to meet card" },
  game: { src: game, alt: "Zen-Z booking, pick a game: Box Cricket, Football, 8-Ball Pool and Pickleball with prices" },
  slot: { src: slot, alt: "Zen-Z booking, pick a slot: a fixed weekly slot, Sunday 11th at 5:00 pm, selected" },
  budget: { src: budget, alt: "Zen-Z booking, budget range: under ₹200 selected, with ₹200–400 and ₹400+ options" },
  group: { src: group, alt: "Zen-Z booking, group dynamic: Surprise me (mixed) selected, with Women only and Men only" },
  plan: { src: plan, alt: "Zen-Z booking summary: Cafés, Sunday 11th at 5:00 pm, group of 4–5, under ₹200, Save my seat" },
  pay: { src: pay, alt: "Zen-Z payment screen: 8-Ball Pool, Saturday 10th at 6:00 pm, group of 4, ₹70, Pay ₹70" },
} satisfies Record<string, Shot>;

/** The hero phone's loop. */
export const heroShots: Shot[] = [screens.home, screens.game, screens.slot, screens.plan, screens.pay];

/** The booking flow as it ships, one screen per step. */
export const steps: Array<{ title: string; body: string; shot: Shot }> = [
  { title: "Pick an activity", body: "A café, a dinner, a movie, or a game: box cricket, football, 8-ball pool, pickleball.", shot: screens.game },
  { title: "Choose a slot", body: "One fixed weekly time, so groups actually fill up.", shot: screens.slot },
  { title: "Set a budget", body: "Under ₹200, ₹200–400 or ₹400+, used to match people who spend alike.", shot: screens.budget },
  { title: "Pick your group", body: "Mixed, women only or men only.", shot: screens.group },
  { title: "Pay", body: "Movies and games are paid through PayU. A seat is confirmed only by a signed, server-verified webhook.", shot: screens.pay },
  { title: "Get matched", body: "A small group of students who haven't met yet. The venue is revealed before the event.", shot: screens.home },
];
