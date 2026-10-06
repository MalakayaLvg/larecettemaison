import Image from "next/image";
import Link from "next/link";
import {
  type ExperienceListItem,
  experienceHref,
  populatedImages,
} from "@/lib/experiences";

export function ExperienceCard({ experience }: { experience: ExperienceListItem }) {
  const [cover] = populatedImages(experience.images);

  return (
    <Link href={experienceHref(experience)} className="group flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/5">
        {cover && (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      {experience.duration && (
        <p className="text-xs uppercase tracking-wide opacity-60">{experience.duration}</p>
      )}
      <h2 className="font-semibold leading-snug group-hover:underline">{experience.title}</h2>
      {experience.excerpt && <p className="text-sm opacity-70">{experience.excerpt}</p>}
    </Link>
  );
}
