"use client";

import { useEffect, useRef, useState } from "react";
import { numberTick } from "@/components/animations/gsapAnimations";
import { wedding } from "@/data/wedding";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, new Date(wedding.weddingDate).getTime() - Date.now());
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: Math.floor(seconds % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const refs = useRef<Record<string, HTMLSpanElement | null>>({});
  const prev = useRef<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!time) return;
    UNITS.forEach(({ key }) => {
      if (prev.current && prev.current[key] !== time[key] && refs.current[key]) {
        numberTick(refs.current[key] as HTMLSpanElement);
      }
    });
    prev.current = time;
  }, [time]);

  return (
    <div data-animate="item" className="grid grid-cols-4 gap-2 sm:gap-4">
      {UNITS.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center rounded-2xl border-hairline bg-ivory/80 px-2 py-4 shadow-card sm:px-4"
        >
          <span
            ref={(el) => {
              refs.current[key] = el;
            }}
            className="font-display text-3xl text-sage-dark sm:text-4xl"
          >
            {time ? String(time[key]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
