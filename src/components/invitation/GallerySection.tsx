"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { wedding } from "@/data/wedding";
import FloralDecoration from "@/components/ui/FloralDecoration";
import Button from "@/components/ui/Button";

const spanClass: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

const GallerySection = forwardRef<HTMLDivElement, { onNext: () => void; onBack: () => void }>(
  ({ onNext, onBack }, ref) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const lightboxRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (openIndex === null || !lightboxRef.current) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          lightboxRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
        );
        gsap.fromTo(
          imageRef.current,
          { scale: 0.85, opacity: 0, rotate: -2 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: "back.out(1.5)" }
        );
      }, lightboxRef);
      return () => ctx.revert();
    }, [openIndex]);

    const closeLightbox = () => {
      if (!lightboxRef.current) return setOpenIndex(null);
      gsap.to(imageRef.current, { scale: 0.9, opacity: 0, duration: 0.25, ease: "power2.in" });
      gsap.to(lightboxRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setOpenIndex(null),
      });
    };

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
          Our Moments
        </p>
        <h2 data-animate="heading" className="mb-8 font-display text-4xl text-ink">
          Gallery
        </h2>

        <div className="grid w-full max-w-md auto-rows-[110px] grid-cols-3 gap-2.5 sm:auto-rows-[130px]">
          {wedding.gallery.map((image, index) => (
            <button
              key={image.src}
              type="button"
              data-animate="item"
              onClick={() => setOpenIndex(index)}
              className={`group relative overflow-hidden rounded-xl border-hairline shadow-card ${
                spanClass[image.span ?? "normal"]
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 33vw, 200px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
            </button>
          ))}
        </div>

        <div data-animate="item" className="mt-10 flex gap-3">
          <Button variant="ghost" className="!text-sage !border-sage/40" onClick={onBack}>
            Back
          </Button>
          <Button variant="solid" onClick={onNext}>
            RSVP
          </Button>
        </div>

        {openIndex !== null && (
          <div
            ref={lightboxRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6"
            onClick={closeLightbox}
          >
            <div
              ref={imageRef}
              className="relative aspect-[3/4] w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={wedding.gallery[openIndex].src}
                alt={wedding.gallery[openIndex].alt}
                fill
                sizes="400px"
                className="rounded-2xl object-cover"
              />
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/50 text-ivory"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    );
  }
);

GallerySection.displayName = "GallerySection";

export default GallerySection;
