"use client";

import { forwardRef, useLayoutEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import FloralDecoration from "@/components/ui/FloralDecoration";
import IslamicPattern from "@/components/ui/IslamicPattern";
import Button from "@/components/ui/Button";

type Attendance = "attending" | "not-attending";

type RSVPPayload = {
  name: string;
  guests: number;
  attendance: Attendance;
};

/**
 * Mock submission handler. Swap the body of this function for a real
 * request (e.g. `fetch("/api/rsvp", { method: "POST", body: ... })`) once
 * a backend is available — the calling component doesn't need to change.
 */
async function submitRsvp(payload: RSVPPayload): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  console.log("RSVP submitted (mock):", payload);

  return { ok: true };
}

const RSVPSection = forwardRef<HTMLDivElement, { onNext: () => void; onBack: () => void }>(
  ({ onNext, onBack }, ref) => {
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [attendance, setAttendance] = useState<Attendance>("attending");
    const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

    const successRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (status !== "done" || !successRef.current) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          successRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
        ).fromTo(
          successRef.current?.querySelectorAll("[data-success-item]") ?? [],
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)", stagger: 0.12 },
          "-=0.2"
        );
      }, successRef);
      return () => ctx.revert();
    }, [status]);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!name.trim()) return;
      setStatus("submitting");
      await submitRsvp({ name: name.trim(), guests, attendance });
      setStatus("done");
    };

    return (
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 py-16 gsap-ready"
      >
        <FloralDecoration
          data-floral
          variant="corner"
          flip
          className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 text-gold/70"
        />

        {status !== "done" ? (
          <div className="flex w-full max-w-sm flex-col items-center">
            <p data-animate="heading" className="mb-1 text-xs tracking-[0.35em] text-sage-dark">
              Kindly Reply
            </p>
            <h2 data-animate="heading" className="mb-8 font-display text-4xl text-ink">
              RSVP
            </h2>

            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
              <label data-animate="item" className="flex flex-col gap-1.5">
                <span className="text-xs tracking-[0.15em] text-sage-dark">Your Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="rounded-xl border-hairline bg-ivory/80 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-gold"
                />
              </label>

              <label data-animate="item" className="flex flex-col gap-1.5">
                <span className="text-xs tracking-[0.15em] text-sage-dark">Number of Guests</span>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="rounded-xl border-hairline bg-ivory/80 px-4 py-3 text-sm text-ink outline-none focus:border-gold"
                />
              </label>

              <div data-animate="item" className="flex flex-col gap-1.5">
                <span className="text-xs tracking-[0.15em] text-sage-dark">Attendance</span>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { value: "attending", label: "Will Attend" },
                      { value: "not-attending", label: "Unable to Attend" },
                    ] as const
                  ).map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => setAttendance(option.value)}
                      className={`rounded-xl border px-3 py-3 text-xs tracking-[0.08em] transition-colors ${
                        attendance === option.value
                          ? "border-sage bg-sage text-ivory"
                          : "border-gold/50 bg-ivory/60 text-ink/70"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div data-animate="item" className="mt-2 flex justify-center">
                <Button type="submit" variant="solid" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending..." : "Confirm RSVP"}
                </Button>
              </div>
            </form>

            <div data-animate="item" className="mt-8">
              <Button variant="ghost" className="!text-sage !border-sage/40" onClick={onBack}>
                Back
              </Button>
            </div>
          </div>
        ) : (
          <div ref={successRef} className="flex w-full max-w-sm flex-col items-center text-center">
            <IslamicPattern data-success-item variant="star" className="mb-4 h-12 w-12 text-gold" />
            <h2 data-success-item className="mb-3 font-display text-3xl text-ink">
              Thank You
            </h2>
            <p data-success-item className="mb-8 text-sm leading-relaxed text-ink/70">
              {attendance === "attending"
                ? "We are delighted that you will join us. Your presence means the world to us."
                : "Thank you for letting us know. We will miss you, and hope to celebrate together soon."}
            </p>
            <div data-success-item>
              <Button variant="solid" onClick={onNext}>
                Continue
              </Button>
            </div>
          </div>
        )}

        <FloralDecoration
          data-floral
          variant="sprig"
          className="pointer-events-none absolute -bottom-2 right-4 h-24 w-24 text-sage/60"
        />

        
      </div>
    );
  }
);

RSVPSection.displayName = "RSVPSection";

export default RSVPSection;
