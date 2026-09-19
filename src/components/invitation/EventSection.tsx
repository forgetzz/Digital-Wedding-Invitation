"use client";

import { forwardRef } from "react";
import { wedding } from "@/data/wedding";
import FloralDecoration from "@/components/ui/FloralDecoration";
import IslamicPattern from "@/components/ui/IslamicPattern";
import Button from "@/components/ui/Button";
import Countdown from "./Countdown";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-gold-dark" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 9H21" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 3V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 3V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-gold-dark" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-gold-dark" aria-hidden>
      <path
        d="M12 21C12 21 19 14.5 19 9.8C19 5.9 15.9 3 12 3C8.1 3 5 5.9 5 9.8C5 14.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const EventSection = forwardRef<HTMLDivElement, { onNext: () => void; onBack: () => void }>(
  ({ onNext, onBack }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col items-center overflow-y-auto px-6 py-16 gsap-ready"
      >
        <FloralDecoration
          data-floral
          variant="corner"
          flip
          className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 text-sage/70"
        />

        <p data-animate="heading" className="mb-1 text-xs tracking-[0.35em] text-sage-dark">
          Save The Date
        </p>
        <h2 data-animate="heading" className="mb-8 font-display text-4xl text-ink">
          The Wedding
        </h2>

        <div data-animate="item" className="mb-10 w-full max-w-sm">
          <Countdown />
        </div>

        <div className="flex w-full max-w-sm flex-col gap-6">
          {wedding.events.map((event) => (
            <div
              key={event.name}
              data-animate="item"
              className="islamic-texture relative overflow-hidden rounded-2xl border-hairline bg-ivory/90 p-6 shadow-card"
            >
              <IslamicPattern
                variant="star"
                className="absolute -right-4 -top-4 h-16 w-16 text-gold/20"
              />
              <p className="font-display text-2xl text-sage-dark">{event.name}</p>
              <div className="mt-4 flex flex-col gap-2.5 text-sm text-ink/80">
                <div className="flex items-center gap-2">
                  <CalendarIcon />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">
                    <PinIcon />
                  </span>
                  <span>
                    <span className="block font-medium text-ink">{event.venue}</span>
                    <span className="block text-ink/60">{event.address}</span>
                  </span>
                </div>
              </div>
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-gold-dark underline underline-offset-4"
              >
                Open Google Maps
              </a>
            </div>
          ))}
        </div>

        <div data-animate="item" className="mt-10 flex gap-3">
          <Button variant="ghost" className="!text-sage !border-sage/40" onClick={onBack}>
            Back
          </Button>
          <Button variant="solid" onClick={onNext}>
            Gallery
          </Button>
        </div>
      </div>
    );
  }
);

EventSection.displayName = "EventSection";

export default EventSection;
