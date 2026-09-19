"use client";

import { forwardRef } from "react";
import { wedding } from "@/data/wedding";
import FloralDecoration from "@/components/ui/FloralDecoration";
import IslamicPattern from "@/components/ui/IslamicPattern";
import Button from "@/components/ui/Button";

const StorySection = forwardRef<HTMLDivElement, { onNext: () => void; onBack: () => void }>(
  ({ onNext, onBack }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col items-center overflow-y-auto px-6 py-16 gsap-ready"
      >
        <FloralDecoration
          data-floral
          variant="corner"
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 text-gold/70"
        />

        <p data-animate="heading" className="mb-1 text-xs tracking-[0.35em] text-sage-dark">
         perjalanan kami
        </p>
        <h2 data-animate="heading" className="mb-8 font-display text-4xl text-ink">
          dan cerita kami
        </h2>

        <div className="relative w-full max-w-sm">
          <span className="absolute left-[19px] top-2 bottom-2 w-px bg-gold/40" aria-hidden />

          <ul className="flex flex-col gap-10">
            {wedding.story.map((item) => (
              <li key={item.year} data-animate="item" className="relative flex gap-5 pl-0">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-hairline bg-ivory shadow-card">
                  <IslamicPattern variant="star" className="h-5 w-5 text-gold" />
                </div>
                <div className="pt-1">
                  <p className="font-display text-2xl text-gold-dark">{item.year}</p>
                  <p className="mt-1 font-display text-lg text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div data-animate="item" className="mt-10 flex gap-3">
          <Button variant="ghost" className="!text-sage !border-sage/40" onClick={onBack}>
            Back
          </Button>
          <Button variant="solid" onClick={onNext}>
            The Wedding
          </Button>
        </div>

        <FloralDecoration
          data-floral
          variant="sprig"
          className="pointer-events-none absolute -bottom-2 left-2 h-24 w-24 text-sage/60"
        />
      </div>
    );
  }
);

StorySection.displayName = "StorySection";

export default StorySection;
