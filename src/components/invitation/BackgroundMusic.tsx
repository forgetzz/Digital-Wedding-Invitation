
"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundMusicProps = {
  isPlaying: boolean;
};

export default function BackgroundMusic({
  isPlaying,
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const audio = new Audio("/wedding.mp3");

    audio.loop = true;
    audio.volume = 0.4;

    audioRef.current = audio;

    const startMusic = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // Browser blocked autoplay.
      }

      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };

    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);

    return () => {
      audio.pause();
      audio.currentTime = 0;

      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ivory/80 text-sage-dark shadow-lg backdrop-blur"
    >
      {playing ? "♫" : "♪"}
    </button>
  );
}

