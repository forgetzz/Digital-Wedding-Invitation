
"use client";

import { useLayoutEffect, useRef, useState } from "react";

import InvitationCover from "@/components/invitation/InvitationCover";
import InvitationHome from "@/components/invitation/InvitationHome";
import CoupleSection from "@/components/invitation/CoupleSection";
import StorySection from "@/components/invitation/StorySection";
import EventSection from "@/components/invitation/EventSection";
import GallerySection from "@/components/invitation/GallerySection";
import RSVPSection from "@/components/invitation/RSVPSection";
import GuestList from "@/components/invitation/GuestList";
import ClosingSection from "@/components/invitation/ClosingSection";

import BackgroundMusic from "@/components/invitation/BackgroundMusic";

import InvitationMenu, {
  PageId,
} from "@/components/navigation/InvitationMenu";

import {
  pageEnter,
  pageExit,
} from "@/components/animations/gsapAnimations";

const PAGE_ORDER: PageId[] = [
  "home",
  "couple",
  "story",
  "event",
  "gallery",
  "rsvp",
  "guest-list",
  "closing",
];

export default function Page() {
  const [stage, setStage] = useState<"cover" | "invitation">("cover");
  const [activePage, setActivePage] = useState<PageId>("home");

  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (page: PageId) => {
    if (page === activePage) return;

    if (!containerRef.current) {
      setActivePage(page);
      return;
    }

    pageExit(containerRef.current, () => {
      setActivePage(page);
    });
  };

  const goNext = () => {
    const index = PAGE_ORDER.indexOf(activePage);

    if (index < PAGE_ORDER.length - 1) {
      goTo(PAGE_ORDER[index + 1]);
    }
  };

  const goBack = () => {
    const index = PAGE_ORDER.indexOf(activePage);

    if (index > 0) {
      goTo(PAGE_ORDER[index - 1]);
    }
  };

  useLayoutEffect(() => {
    if (stage !== "invitation") return;
    if (!containerRef.current) return;

    pageEnter(containerRef.current);
  }, [activePage, stage]);

  return (
    <main className="relative h-[100dvh] w-full bg-ivory">
      {/* Background Music */}
      <BackgroundMusic
        isPlaying={stage === "invitation"}
      />

      {/* Cover */}
      {stage === "cover" && (
        <InvitationCover
          onOpen={() => setStage("invitation")}
        />
      )}

      {/* Invitation */}
      {stage === "invitation" && (
        <>
          <InvitationMenu
            active={activePage}
            onNavigate={goTo}
          />

          {activePage === "home" && (
            <InvitationHome
              ref={containerRef}
              onNext={goNext}
            />
          )}

          {activePage === "couple" && (
            <CoupleSection
              ref={containerRef}
              onNext={goNext}
              onBack={goBack}
            />
          )}

          {activePage === "story" && (
            <StorySection
              ref={containerRef}
              onNext={goNext}
              onBack={goBack}
            />
          )}

          {activePage === "event" && (
            <EventSection
              ref={containerRef}
              onNext={goNext}
              onBack={goBack}
            />
          )}

          {activePage === "gallery" && (
            <GallerySection
              ref={containerRef}
              onNext={goNext}
              onBack={goBack}
            />
          )}

          {activePage === "rsvp" && (
            <RSVPSection
              ref={containerRef}
              onNext={goNext}
              onBack={goBack}
            />
          )}

          {activePage === "guest-list" && (
            <GuestList
              ref={containerRef}
              onNext={goNext}
              onBack={goBack}
            />
          )}

          {activePage === "closing" && (
            <ClosingSection
              ref={containerRef}
              onBack={goBack}
              onRestart={() => goTo("home")}
            />
          )}
        </>
      )}
    </main>
  );
}
