import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LumaCheckoutButton } from "@/components/LumaCheckoutButton";
import { getExperience, populatedImages } from "@/lib/experiences";
import { proseClassName } from "@/lib/prose";
import { experienceTypes, isExperienceType } from "@/lib/site";

type Props = PageProps<"/experiences/[type]/[slug]">;

async function findExperience(props: Props) {
  const { type, slug } = await props.params;
  const experience = isExperienceType(type) ? await getExperience(type, slug) : undefined;
  if (!experience) notFound();
  return experience;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const experience = await findExperience(props);
  return {
    title: experience.title,
    description: experience.excerpt ?? undefined,
  };
}

export default async function ExperiencePage(props: Props) {
  const experience = await findExperience(props);
  const typeLabel = experienceTypes[experience.type].label;
  const [cover, ...gallery] = populatedImages(experience.images);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href={`/experiences/${experience.type}`}
        className="text-sm opacity-70 hover:underline"
      >
        ← {typeLabel}
      </Link>

      <header className="mt-6">
        <p className="text-xs uppercase tracking-wide opacity-60">
          {typeLabel}
          {experience.duration && ` · ${experience.duration}`}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {experience.title}
        </h1>
        {experience.excerpt && (
          <p className="mt-4 max-w-2xl text-lg opacity-80">{experience.excerpt}</p>
        )}

        {(experience.lumaUrl || experience.onQuote) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {experience.lumaUrl && (
              <LumaCheckoutButton
                href={experience.lumaUrl}
                eventId={experience.lumaEventId}
                className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background hover:opacity-90"
              >
                Réserver
              </LumaCheckoutButton>
            )}
            {experience.onQuote && (
              <Link
                href={`/devis?experience=${experience.slug}`}
                className="rounded-full border border-black/15 px-5 py-2.5 text-sm hover:border-foreground"
              >
                Demander un devis (groupes, entreprises)
              </Link>
            )}
          </div>
        )}
      </header>

      {cover && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg bg-black/5">
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            priority
            sizes="(min-width: 896px) 864px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {experience.description && (
        <RichText data={experience.description} className={`mt-10 ${proseClassName}`} />
      )}

      {gallery.length > 0 && (
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {gallery.map((image) => (
            <li key={image.id} className="relative aspect-square overflow-hidden rounded-lg bg-black/5">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
