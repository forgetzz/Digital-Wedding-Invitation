"use client";

import { forwardRef } from "react";
import { wedding } from "@/data/wedding";
import FloralDecoration from "@/components/ui/FloralDecoration";
import IslamicPattern from "@/components/ui/IslamicPattern";
import Button from "@/components/ui/Button";

const ClosingSection = forwardRef<HTMLDivElement, { onBack: () => void; onRestart: () => void }>(
  ({ onBack, onRestart }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 py-16 text-center gsap-ready"
      >
        <FloralDecoration
          data-floral
          variant="corner"
          className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 text-sage/70"
        />
        <FloralDecoration
          data-floral
          variant="corner"
          flip
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 text-gold/70"
        />

        <IslamicPattern data-animate="heading" variant="star" className="mb-6 h-12 w-12 text-gold" />

        <p data-animate="heading" className="mb-6 max-w-xs font-display text-2xl italic leading-snug text-sage-dark">
          &ldquo;{wedding.closing.lead}&rdquo;
        </p>

        <p data-animate="item" className="mb-8 max-w-xs text-sm leading-relaxed text-ink/75">
          {wedding.closing.message}
        </p>

        <h2 data-animate="item" className="mb-2 font-script text-5xl text-gold-dark">
          {wedding.couple.bride.firstName} &amp; {wedding.couple.groom.firstName}
        </h2>
        <p data-animate="item" className="mb-10 text-xs tracking-[0.3em] text-ink/60">
          {wedding.weddingDateLabel}
        </p>

        <div data-animate="item" className="flex gap-3">
          <Button variant="ghost" className="!text-sage !border-sage/40" onClick={onBack}>
            Back
          </Button>
          <Button variant="outline" onClick={onRestart}>
            Home
          </Button>
        </div>

        <FloralDecoration
          data-floral
          variant="branch"
          className="pointer-events-none absolute bottom-6 left-1/2 h-8 w-40 -translate-x-1/2 text-gold/50"
        />
      </div>
    );
  }
);

ClosingSection.displayName = "ClosingSection";

export default ClosingSection;
