"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { wedding } from "@/data/wedding";
import { openInvitation, floatLoop, textEntrance } from "@/components/animations/gsapAnimations";
import Button from "@/components/ui/Button";
import FloralDecoration from "@/components/ui/FloralDecoration";
import IslamicPattern from "@/components/ui/IslamicPattern";

export default function InvitationCover({ onOpen }: { onOpen: () => void }) {
  const coverRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const floralsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const florals = floralsRef.current?.querySelectorAll("[data-float]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        floralsRef.current?.querySelectorAll("[data-float]") ?? [],
        { opacity: 0, scale: 0.7, rotate: -10 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.1, stagger: 0.12 }
      )
        .fromTo(monogramRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.8 }, 0.3)
        .fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .add(() => {
          if (namesRef.current) textEntrance(namesRef.current.querySelectorAll("span"));
        }, 0.7)
        .fromTo(dateRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 1.0)
        .fromTo(buttonRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 1.15);

      if (florals) {
        florals.forEach((el, i) => floatLoop(el, 0.6 + (i % 3) * 0.2));
      }
    }, coverRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    if (!coverRef.current) return onOpen();
    openInvitation(
      coverRef.current,
      {
        monogram: monogramRef.current,
        eyebrow: eyebrowRef.current,
        names: namesRef.current,
        date: dateRef.current,
        button: buttonRef.current,
        florals: floralsRef.current?.querySelectorAll("[data-float]"),
      },
      onOpen
    );
  };

  return (
    <div
      ref={coverRef}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-ivory px-6"
    >
      <div className="islamic-texture pointer-events-none absolute inset-0 opacity-40" />

      <div ref={floralsRef} className="pointer-events-none absolute inset-0">
        <FloralDecoration
          variant="corner"
          data-float
          className="absolute -left-4 -top-4 h-28 w-28 text-sage sm:h-36 sm:w-36"
        />
        <FloralDecoration
          variant="corner"
          flip
          data-float
          className="absolute -right-4 -top-4 h-28 w-28 text-gold sm:h-36 sm:w-36"
        />
        <FloralDecoration
          variant="corner"
          flip
          data-float
          className="absolute -bottom-4 -left-4 rotate-180 h-28 w-28 text-gold sm:h-36 sm:w-36"
        />
        <FloralDecoration
          variant="corner"
          data-float
          className="absolute -bottom-4 -right-4 rotate-180 h-28 w-28 text-sage sm:h-36 sm:w-36"
        />
      </div>

      <div className="relative flex w-full max-w-sm flex-col items-center border-hairline rounded-[2rem] bg-ivory/70 px-8 py-12 shadow-soft backdrop-blur-sm sm:max-w-md sm:px-14 sm:py-16">
        <div ref={monogramRef} className="mb-6 flex flex-col items-center gap-3">
          <IslamicPattern variant="star" className="h-14 w-14 text-gold" />
          <span className="font-script text-4xl text-sage">{wedding.couple.initials}</span>
        </div>

        <p ref={eyebrowRef} className="mb-3 text-xs tracking-[0.35em] text-sage-dark">
          The Wedding of
        </p>

        <h1 ref={namesRef} className="mb-4 text-center font-display text-5xl leading-tight text-ink sm:text-6xl">
          <span className="inline-block">{wedding.couple.bride.firstName}</span>
          <span className="mx-3 inline-block text-gold">&</span>
          <span className="inline-block">{wedding.couple.groom.firstName}</span>
        </h1>

        <p ref={dateRef} className="mb-10 text-sm tracking-[0.25em] text-ink/70">
          {wedding.weddingDateLabel}
        </p>

        <div ref={buttonRef}>
          <Button variant="solid" onClick={handleOpen}>
            Open Invitation
          </Button>
        </div>
      </div>
    </div>
  );
}
