"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { wedding } from "@/data/wedding";
import FloralDecoration from "@/components/ui/FloralDecoration";
import IslamicPattern from "@/components/ui/IslamicPattern";
import Button from "@/components/ui/Button";

const Profile = ({
  name,
  parents,
  photo,
  align,
}: {
  name: string;
  parents: string;
  photo: string;
  align: "left" | "right";
}) => (
  <div
    data-animate="item"
    className={`flex flex-col items-center gap-4 ${align === "right" ? "sm:flex-row-reverse" : "sm:flex-row"} sm:text-left text-center`}
  >
    <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
      <div className="absolute inset-0 rounded-organic border-2 border-gold/70" />
      <div className="absolute inset-2 overflow-hidden rounded-organic">
        <Image src={photo} alt={name} fill sizes="144px" className="object-cover" />
      </div>
    </div>
    <div>
      <p className="font-display text-2xl text-ink">{name}</p>
      <p className="mt-1 text-xs tracking-[0.1em] text-sage-dark">{parents}</p>
    </div>
  </div>
);

const CoupleSection = forwardRef<HTMLDivElement, { onNext: () => void; onBack: () => void }>(
  ({ onNext, onBack }, ref) => {
    return (
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 py-16 gsap-ready"
      >
        <FloralDecoration
          data-floral
          variant="branch"
          className="pointer-events-none absolute left-1/2 top-4 h-10 w-48 -translate-x-1/2 text-gold/70"
        />

        <div className="flex w-full max-w-md flex-col items-center">
          <p data-animate="heading" className="mb-1 text-xs tracking-[0.35em] text-sage-dark">
            The Bride & Groom
          </p>
          <IslamicPattern data-animate="heading" variant="divider" className="mb-8 h-4 w-40 text-gold" />

          <div className="flex w-full flex-col gap-8">
            <Profile
              align="left"
              name={wedding.couple.bride.fullName}
              parents={wedding.couple.bride.parents}
              photo={wedding.couple.bride.photo}
            />

            <div data-animate="item" className="flex items-center justify-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold/50" />
              <IslamicPattern variant="star" className="h-6 w-6" />
              <span className="h-px w-10 bg-gold/50" />
            </div>

            <Profile
              align="right"
              name={wedding.couple.groom.fullName}
              parents={wedding.couple.groom.parents}
              photo={wedding.couple.groom.photo}
            />
          </div>

          <div data-animate="item" className="mt-10 flex gap-3">
            <Button variant="ghost" className="!text-sage !border-sage/40" onClick={onBack}>
              Back
            </Button>
            <Button variant="solid" onClick={onNext}>
              Our Story
            </Button>
          </div>
        </div>

        <FloralDecoration
          data-floral
          variant="sprig"
          className="pointer-events-none absolute -bottom-4 right-4 h-24 w-24 text-sage/70"
        />
      </div>
    );
  }
);

CoupleSection.displayName = "CoupleSection";

export default CoupleSection;
