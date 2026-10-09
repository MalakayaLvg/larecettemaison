import Image from "next/image";
import Link from "next/link";
import { darkButtonClassName } from "@/components/home/Section";
import {
  type ExperienceListItem,
  experienceHref,
  populatedImages,
} from "@/lib/experiences";

// Same card as the blog and the experience formats: white card with the cut-out shadow, orange
// slot while the experience has no image, duration sticker over the photo and lime price sticker.
export function ExperienceCard({ experience }: { experience: ExperienceListItem }) {
  const [cover] = populatedImages(experience.images);
  const details = [experience.duration, experience.location].filter(Boolean).join(" · ");

  return (
    <Link
      href={experienceHref(experience)}
      className="group flex h-full flex-col overflow-hidden border-2 border-ink bg-white shadow-cut transition-transform hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden bg-highlight-subtle lg:h-[300px]">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Image
            src="/deco/tomate-illustree-orange.svg"
            alt=""
            width={229}
            height={290}
            className="absolute top-1/2 left-1/2 w-28 -translate-1/2 -rotate-10 opacity-80"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 lg:p-8">
        {details && <p className="text-lg leading-[1.4] font-semibold text-ink-soft">{details}</p>}
        <h2 className="font-display text-2xl leading-[1.25] font-bold group-hover:underline">{experience.title}</h2>
        {experience.excerpt && <p className="text-lg leading-[1.55] text-ink-soft">{experience.excerpt}</p>}
        <div className="mt-auto flex flex-col items-start gap-6 pt-6">
          {/* Figma "Prix" sticker */}
          {experience.price && (
            <p className="rotate-2 rounded-[4px] border-2 border-ink bg-accent px-4 py-2 text-lg leading-[1.4] font-semibold">
              {experience.price}
            </p>
          )}
          <span className={darkButtonClassName}>Découvrir</span>
        </div>
      </div>
    </Link>
  );
}
