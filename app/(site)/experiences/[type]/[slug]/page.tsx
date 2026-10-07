import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Placeholder } from "@/components/home/Placeholder";
import {
  buttonClassName,
  cardClassName,
  ghostButtonClassName,
  Section,
} from "@/components/home/Section";
import { Steps } from "@/components/home/Steps";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LumaCheckoutButton } from "@/components/LumaCheckoutButton";
import { getExperience, getOtherExperiences, populatedImages } from "@/lib/experiences";
import { proseClassName } from "@/lib/prose";
import { experienceTypes, isExperienceType } from "@/lib/site";
import { getTestimonials } from "@/lib/testimonials";

// Layout from the Figma wireframe "Fiche atelier — Desktop 1920" (node 1:860), used for
// every experience type. Sections without content in the admin are hidden.

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
  const typeInfo = experienceTypes[experience.type];
  const [others, [quote]] = await Promise.all([
    getOtherExperiences(experience.type, experience.slug, 2),
    getTestimonials(1),
  ]);
  const [cover, ...gallery] = populatedImages(experience.images);
  const hostPhoto = typeof experience.host?.photo === "object" ? experience.host.photo : null;
  const practical = [
    { label: "Durée", value: experience.duration },
    { label: "Lieu", value: experience.practical?.address },
    { label: "Taille du groupe", value: experience.practical?.groupSize },
    { label: "Régimes alimentaires", value: experience.practical?.diets },
    { label: "Accessibilité", value: experience.practical?.accessibility },
    { label: "Annulation", value: experience.practical?.cancellation },
  ].filter((info): info is { label: string; value: string } => Boolean(info.value));
  const program = experience.program ?? [];

  return (
    <>
      {/* 02 — Hero réservation */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="font-medium opacity-70">
              <Link href={`/experiences/${experience.type}`} className="hover:underline">
                {typeInfo.eyebrow}
              </Link>
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">{experience.title}</h1>
            {experience.excerpt && <p className="max-w-[720px] text-lg opacity-80">{experience.excerpt}</p>}
          </div>
          {(experience.location || experience.duration) && (
            <p className="flex gap-6 font-medium opacity-70">
              {experience.location && <span>{experience.location}</span>}
              {experience.duration && <span>{experience.duration}</span>}
            </p>
          )}
        </div>

        {/* Bloc réservation */}
        <div className={cardClassName}>
          {cover ? (
            <div className="relative h-80">
              <Image src={cover.url} alt={cover.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>
          ) : (
            <Placeholder label={`Image — ${experience.title}`} className="h-80 rounded-none" />
          )}
          <div className="space-y-3 px-6 pt-3 pb-6">
            {experience.availability && (
              <p className="font-medium opacity-70">Où et quand ? {experience.availability}</p>
            )}
            {experience.price && <p className="text-lg font-bold">{experience.price}</p>}
            {(experience.lumaUrl || experience.onQuote) && (
              <div className="flex flex-wrap gap-3 pt-1">
                {experience.lumaUrl && (
                  <LumaCheckoutButton href={experience.lumaUrl} eventId={experience.lumaEventId} className={buttonClassName}>
                    Réserver ma place
                  </LumaCheckoutButton>
                )}
                {experience.onQuote && (
                  <Link href={`/devis?experience=${experience.slug}`} className={ghostButtonClassName}>
                    Demander un devis
                  </Link>
                )}
              </div>
            )}
            {quote && (
              <p className="pt-2 font-medium opacity-70">
                « {quote.text} » {quote.author}
                {quote.role && `, ${quote.role}`}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 03 — Infos pratiques */}
      {practical.length > 0 && (
        <Section muted title="Infos pratiques">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practical.map((info) => (
              <div key={info.label} className="space-y-3 border-t border-black/15 pt-6">
                <dt className="text-lg font-medium opacity-70">{info.label}</dt>
                <dd className="whitespace-pre-line opacity-80">{info.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {/* 04 — Programme (and the free description, when filled) */}
      {(program.length > 0 || experience.description) && (
        <Section title="Au programme">
          {experience.description && (
            <RichText data={experience.description} className={`mb-12 text-lg ${proseClassName}`} />
          )}
          {program.length > 0 && (
            <Steps items={program.map((step) => ({ text: step.text }))} columns="lg:grid-cols-3" />
          )}
        </Section>
      )}

      {/* 05 — Intervenante */}
      {(experience.host?.heading || experience.host?.bio) && (
        <Section muted>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              {experience.host.heading && (
                <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">
                  {experience.host.heading}
                </h2>
              )}
              {experience.host.bio && <p className="whitespace-pre-line text-lg opacity-80">{experience.host.bio}</p>}
            </div>
            {hostPhoto?.url ? (
              <div className="relative h-80 overflow-hidden rounded lg:h-[440px]">
                <Image src={hostPhoto.url} alt={hostPhoto.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            ) : (
              <Placeholder label="Image — Portrait de l'intervenant·e" className="h-80 lg:h-[440px]" />
            )}
          </div>
        </Section>
      )}

      {/* 06 — Galerie */}
      {gallery.length > 0 && (
        <Section title={`${experience.title} en images`}>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {gallery.map((image) => (
              <li key={image.id} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-foreground/10">
                <Image src={image.url} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 07 — Avis */}
      <TestimonialsSection muted />

      {/* 08 — Autre atelier */}
      {others.length > 0 && (
        <Section title={typeInfo.others}>
          <ul className="grid gap-6 md:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <ExperienceCard experience={other} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
