"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import IslamicPattern from "@/components/ui/IslamicPattern";

export type PageId =
 | "home"
  | "couple"
  | "story"
  | "event"
  | "gallery"
  | "rsvp"
  | "guest-list"
  | "closing";

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "story", label: "Story" },
  { id: "event", label: "Event" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
];

export default function InvitationMenu({
  active,
  onNavigate,
}: {
  active: PageId;
  onNavigate: (page: PageId) => void;
}) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-menu-item]");

    if (open) {
      gsap.set(listRef.current, { autoAlpha: 1 });
      gsap.fromTo(
        listRef.current,
        { scale: 0.9, opacity: 0, transformOrigin: "top right" },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        items,
        { opacity: 0, x: 18 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", stagger: 0.06, delay: 0.05 }
      );
    } else {
      gsap.to(listRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => gsap.set(listRef.current, { autoAlpha: 0 }),
      });
    }
  }, [open]);

  useLayoutEffect(() => {
    gsap.fromTo(
      toggleRef.current,
      { rotate: -90, opacity: 0 },
      { rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }
    );
    // Mount-only entrance for the toggle button; intentionally excludes
    // `open` so it does not replay on every menu toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed right-4 top-4 z-40 sm:right-8 sm:top-8">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full border-hairline bg-ivory/90 shadow-soft backdrop-blur-sm"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <IslamicPattern
            variant="star"
            className={`absolute h-5 w-5 text-gold transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-[1.5px] w-4 bg-sage transition-transform duration-200 ${open ? "rotate-45" : "-translate-y-[5px]"}`}
          />
          <span
            className={`absolute h-[1.5px] w-4 bg-sage transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-[1.5px] w-4 bg-sage transition-transform duration-200 ${open ? "-rotate-45" : "translate-y-[5px]"}`}
          />
        </span>
      </button>

      <div
        ref={listRef}
        className="invisible absolute right-0 mt-3 flex w-48 flex-col overflow-hidden rounded-2xl border-hairline bg-ivory/95 py-2 shadow-soft backdrop-blur-sm"
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            data-menu-item
            type="button"
            onClick={() => {
              onNavigate(item.id);
              setOpen(false);
            }}
            className={`flex items-center justify-between px-5 py-3 text-left text-sm tracking-[0.1em] transition-colors ${
              active === item.id ? "text-gold-dark" : "text-ink/70 hover:text-sage-dark"
            }`}
          >
            {item.label}
            {active === item.id && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
          </button>
        ))}
      </div>
    </div>
  );
}
