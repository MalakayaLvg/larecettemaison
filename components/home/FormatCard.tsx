import Link from "next/link";
import Image from "next/image";
import { darkButtonClassName } from "@/components/home/Section";
import type { experienceFormats } from "@/lib/content";

// One of the three experience formats, linking to the list of experiences of that type.
// Figma "Carte — Ateliers de cuisine" (Fiche épisode V4, node 260:230): white card with the
// cut-out shadow and a tilted lime price sticker.
export function FormatCard({
  format,
  title,
  cta,
}: {
  format: (typeof experienceFormats)[number];
  title: string;
  cta?: string;
}) {
  return (
    <Link
      href={`/experiences/${format.type}`}
      className="group flex h-full flex-col overflow-hidden border-2 border-ink bg-white shadow-cut transition-transform hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden lg:h-[380px]">
        <Image
          src={format.photo}
          alt={format.photoAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: format.photoPosition }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 lg:p-8">
        <h3 className="font-display text-2xl leading-[1.25] font-bold group-hover:underline">{title}</h3>
        <p className="text-lg leading-[1.55] text-ink-soft">{format.text}</p>
        <div className="mt-auto flex flex-col items-start gap-6 pt-6">
          {/* Figma "Prix" sticker */}
          <p className="rotate-2 rounded-[4px] border-2 border-ink bg-accent px-4 py-2 text-lg leading-[1.4] font-semibold">
            {format.price}
          </p>
          {cta && <span className={darkButtonClassName}>{cta}</span>}
        </div>
      </div>
    </Link>
  );
}
