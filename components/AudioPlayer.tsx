"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const formatTime = (seconds: number) => {
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
};

// Figma "Lecteur audio" (Fiche épisode V4, node 260:194): white pill with a lime play button,
// the elapsed time, a seek track and a "⋮" that downloads the file. Drives a hidden <audio>.
export function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      // Only one player at a time (the episode and its extracts are on the same page).
      document.querySelectorAll("audio").forEach((other) => other !== audio && other.pause());
      void audio.play();
    } else {
      audio.pause();
    }
  };

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(event.target.value);
    setCurrent(audio.currentTime);
  };

  return (
    <div className="flex h-20 w-full items-center gap-4 rounded-full border-2 border-ink bg-white px-4 shadow-cut-sm sm:h-[100px] sm:px-6">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Mettre en pause « ${title} »` : `Écouter « ${title} »`}
        className="shrink-0 rounded-full transition-transform hover:scale-105"
      >
        <Image src={playing ? "/icons/pause.svg" : "/icons/play.svg"} alt="" width={52} height={52} />
      </button>
      <span className="shrink-0 text-lg leading-[1.4] font-semibold tabular-nums">{formatTime(current)}</span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={1}
        value={current}
        onChange={seek}
        disabled={!duration}
        aria-label="Position dans l'audio"
        className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-[2px] bg-ink disabled:cursor-default [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ink [&::-moz-range-thumb]:bg-accent [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-accent"
      />
      <a
        href={src}
        download
        aria-label={`Télécharger « ${title} »`}
        className="flex h-8 w-4 shrink-0 items-center justify-center"
      >
        <Image src="/icons/options.svg" alt="" width={4} height={18} />
      </a>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          const { duration } = event.currentTarget;
          setDuration(Number.isFinite(duration) ? duration : 0);
        }}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
