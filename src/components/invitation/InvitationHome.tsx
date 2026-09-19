"use client";

import { forwardRef } from "react";
import { wedding } from "@/data/wedding";
import FloralDecoration from "@/components/ui/FloralDecoration";
import IslamicPattern from "@/components/ui/IslamicPattern";
import Button from "@/components/ui/Button";

const InvitationHome = forwardRef<
  HTMLDivElement,
  { onNext: () => void }
>(({ onNext }, ref) => {
  return (
    <div
      ref={ref}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 py-16 gsap-ready"
    >
      <FloralDecoration
        data-floral
        variant="corner"
        className="pointer-events-none absolute -left-6 -top-6 h-32 w-32 text-sage/80"
      />
      <FloralDecoration
        data-floral
        variant="corner"
        flip
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-gold/80"
      />

      <div className="flex w-full max-w-md flex-col items-center text-center">
        <IslamicPattern
          data-floral
          variant="star"
          className="mb-6 h-10 w-10 text-gold"
        />

        <p data-animate="item" className="mb-6 max-w-xs text-sm leading-relaxed text-sage-dark">
          {wedding.greeting}
        </p>

        <p data-animate="heading" className="mb-2 text-xs tracking-[0.35em] text-sage-dark">
          The Wedding of
        </p>

        <h1 data-animate="heading" className="mb-3 font-display text-5xl text-ink sm:text-6xl">
          {wedding.couple.bride.firstName}
          <span className="mx-2 text-gold">&</span>
          {wedding.couple.groom.firstName}
        </h1>

        <p data-animate="item" className="mb-8 text-sm tracking-[0.2em] text-ink/70">
          {wedding.weddingDateLabel}
        </p>

        <IslamicPattern
          data-animate="item"
          variant="divider"
          className="mb-8 h-4 w-40 text-gold"
        />

        <div
          data-animate="item"
          className="mb-2 rounded-2xl border-hairline bg-beige-light/60 px-6 py-6 shadow-card"
        >
          <p dir="rtl" className="mb-3 font-display text-xl leading-loose text-sage-dark">
            {wedding.quote.arabic}
          </p>
          <p className="mb-2 text-sm italic leading-relaxed text-ink/80">
            {wedding.quote.translation}
          </p>
          <p className="text-xs tracking-[0.15em] text-gold-dark">{wedding.quote.source}</p>
        </div>

        <div data-animate="item" className="mt-8">
          <Button variant="outline" onClick={onNext}>
            Meet the Couple
          </Button>
        </div>
      </div>

      <FloralDecoration
        data-floral
        variant="corner"
        flip
        className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rotate-180 text-gold/80"
      />
      <FloralDecoration
        data-floral
        variant="corner"
        className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rotate-180 text-sage/80"
      />
    </div>
  );
});

InvitationHome.displayName = "InvitationHome";

export default InvitationHome;
