
"use client";

import { forwardRef, useEffect, useState } from "react";

type Attendance = "attending" | "not-attending";

type RSVP = {
  id: string;
  name: string;
  guests: number;
  attendance: Attendance;
  createdAt: string;
};

type GuestListProps = {
  onNext: () => void;
  onBack: () => void;
};

export const GuestList = forwardRef<HTMLDivElement, GuestListProps>(
  ({ onNext, onBack }, ref) => {
    const [guests, setGuests] = useState<RSVP[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchGuests = async () => {
        try {
          const response = await fetch("/api/rsvp");

          if (!response.ok) {
            throw new Error("Failed to fetch RSVP");
          }

          const data: RSVP[] = await response.json();

          setGuests(data);
        } catch (error) {
          console.error("Failed to load guest list:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchGuests();
    }, []);

    return (
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col overflow-y-auto px-6 py-16"
      >
        <div className="mx-auto flex w-full max-w-sm flex-col">
          {/* Heading */}
          <div className="mb-8 text-center">
            <p className="mb-1 text-xs tracking-[0.35em] text-sage-dark">
              Our Guests
            </p>

            <h2 className="font-display text-4xl text-ink">
              Guest List
            </h2>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-sm text-ink/60">
              Loading guest list...
            </p>
          )}

          {/* Empty */}
          {!loading && guests.length === 0 && (
            <div className="rounded-xl border border-gold/30 bg-ivory/60 p-6 text-center">
              <p className="text-sm text-ink/60">
                No guests have confirmed yet.
              </p>
            </div>
          )}

          {/* Guest List */}
          {!loading && guests.length > 0 && (
            <div className="flex flex-col gap-3">
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="rounded-xl border border-gold/30 bg-ivory/70 px-5 py-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-ink">
                        {guest.name}
                      </h3>

                      {guest.attendance === "attending" && (
                        <p className="mt-1 text-xs text-sage-dark">
                          {guest.guests}{" "}
                          {guest.guests === 1 ? "Guest" : "Guests"}
                        </p>
                      )}
                    </div>

                    <span className="rounded-full bg-sage/15 px-3 py-1 text-[10px] text-sage-dark">
                      {guest.attendance === "attending"
                        ? "Attending"
                        : "Unable to Attend"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-sage/40 px-5 py-3 text-xs text-sage"
            >
              Back
            </button>

            <button
              type="button"
              onClick={onNext}
              className="rounded-xl bg-sage px-5 py-3 text-xs text-ivory"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
);


