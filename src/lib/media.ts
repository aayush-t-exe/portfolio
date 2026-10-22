/**
 * The Zen-Z screen recording slot. While this is null, the hero phone crossfades the real
 * screenshots. To switch to the video, drop the files into public/media/ and set:
 *
 *   export const zenzDemo = {
 *     mp4: "/media/zenz-demo.mp4",
 *     webm: "/media/zenz-demo.webm",
 *     poster: "/media/zenz-demo-poster.jpg",
 *   };
 *
 * The video is muted, inline, looped, loads nothing until it's near the screen (poster first)
 * and pauses offscreen (SiteBehavior). It never autoplays under reduced motion.
 */
export const zenzDemo: null | { mp4: string; webm?: string; poster: string } = null;
