"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] blocks once they are above the viewport bottom.
 * Position-based (not IntersectionObserver-only) so content can never stay
 * permanently invisible after fast scrolling, anchor jumps or print.
 */
export default function Reveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }

    let frame = 0;

    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.94;
      for (let i = nodes.length - 1; i >= 0; i -= 1) {
        const node = nodes[i];
        const rect = node.getBoundingClientRect();
        if (rect.top < limit) {
          node.classList.add("is-in");
          nodes.splice(i, 1);
        }
      }
      if (!nodes.length) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
