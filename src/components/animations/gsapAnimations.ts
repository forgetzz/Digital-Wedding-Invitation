import gsap from "gsap";

/**
 * Central place for every reusable GSAP timeline used across the
 * invitation. Components should call these instead of writing bespoke
 * gsap.to()/timeline() chains inline, so the motion language stays
 * consistent and easy to tune from one file.
 *
 * Every function respects `prefers-reduced-motion` by shortening
 * durations to near-zero via gsap's own reduced-motion check, which is
 * registered once in `registerReducedMotion()`.
 */

let reducedMotionRegistered = false;

export function registerReducedMotion() {
  if (reducedMotionRegistered || typeof window === "undefined") return;
  reducedMotionRegistered = true;

  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (query.matches) {
    gsap.globalTimeline.timeScale(20);
  }
}

const EASE = {
  soft: "power2.out",
  gentle: "sine.inOut",
  elegant: "power3.out",
  bounceSmall: "back.out(1.4)",
};

/** Fade + slide + scale entrance for the opening cover screen. */
export function openInvitation(
  coverEl: HTMLElement,
  targets: {
    monogram?: Element | null;
    eyebrow?: Element | null;
    names?: Element | null;
    date?: Element | null;
    button?: Element | null;
    florals?: Element[] | NodeListOf<Element> | null;
  },
  onComplete?: () => void
) {
  const tl = gsap.timeline({ onComplete });

  if (targets.florals && targets.florals.length) {
    tl.to(
      targets.florals,
      {
        scale: 1.08,
        rotate: 6,
        opacity: 0,
        duration: 0.9,
        ease: EASE.elegant,
        stagger: 0.05,
      },
      0
    );
  }

  tl.to(
    [targets.eyebrow, targets.monogram, targets.names, targets.date, targets.button].filter(
      Boolean
    ),
    {
      opacity: 0,
      y: -16,
      duration: 0.5,
      ease: EASE.soft,
      stagger: 0.04,
    },
    0
  ).to(
    coverEl,
    {
      scale: 1.06,
      opacity: 0,
      duration: 0.9,
      ease: EASE.elegant,
      onComplete: () => {
        coverEl.style.pointerEvents = "none";
      },
    },
    0.1
  );

  return tl;
}

/** Standard entrance for a full invitation "page" when it becomes active. */
export function pageEnter(container: HTMLElement) {
  registerReducedMotion();
  const decorations = container.querySelectorAll("[data-floral]");
  const heading = container.querySelectorAll("[data-animate='heading']");
  const items = container.querySelectorAll("[data-animate='item']");

  const tl = gsap.timeline();

  gsap.set(container, { autoAlpha: 1 });

  if (decorations.length) {
    tl.fromTo(
      decorations,
      { opacity: 0, scale: 0.85, rotate: -8 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: EASE.elegant, stagger: 0.08 },
      0
    );
  }

  if (heading.length) {
    tl.fromTo(
      heading,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, ease: EASE.soft, stagger: 0.08 },
      0.1
    );
  }

  if (items.length) {
    tl.fromTo(
      items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: EASE.soft, stagger: 0.09 },
      0.25
    );
  }

  return tl;
}

/** Exit transition for the current page, resolved via onComplete callback. */
export function pageExit(container: HTMLElement, onComplete?: () => void) {
  const tl = gsap.timeline({ onComplete });

  tl.to(container, {
    opacity: 0,
    y: -18,
    scale: 0.985,
    duration: 0.45,
    ease: "power2.in",
  }).set(container, { autoAlpha: 0 });

  return tl;
}

/** Generic stagger-reveal utility for lists / grids / timelines. */
export function staggerReveal(
  targets: Element[] | NodeListOf<Element> | string,
  opts: { from?: gsap.TweenVars; stagger?: number; delay?: number } = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30, ...opts.from },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: EASE.soft,
      stagger: opts.stagger ?? 0.12,
      delay: opts.delay ?? 0,
    }
  );
}

/** Entrance for decorative floral / geometric ornaments. */
export function floralReveal(
  targets: Element[] | NodeListOf<Element> | string,
  opts: { delay?: number } = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, scale: 0.7, rotate: -12 },
    {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: EASE.bounceSmall,
      stagger: 0.1,
      delay: opts.delay ?? 0,
    }
  );
}

/** Infinite gentle float + rotation loop for background florals. Returns
 *  the tween so callers can `.kill()` it on unmount. */
export function floatLoop(target: Element | Element[], intensity = 1) {
  return gsap.to(target, {
    y: `+=${10 * intensity}`,
    rotate: `+=${3 * intensity}`,
    duration: 4 + Math.random() * 2,
    ease: EASE.gentle,
    repeat: -1,
    yoyo: true,
  });
}

/** Text entrance where each character/word span animates in with a soft
 *  upward reveal — used for titles and quotes. */
export function textEntrance(targets: Element[] | NodeListOf<Element> | string) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 18, filter: "blur(4px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: EASE.soft,
      stagger: 0.06,
    }
  );
}

/** Subtle count-tick animation used by the countdown numbers. */
export function numberTick(target: Element) {
  return gsap.fromTo(
    target,
    { opacity: 0.3, y: -6 },
    { opacity: 1, y: 0, duration: 0.35, ease: EASE.soft }
  );
}
