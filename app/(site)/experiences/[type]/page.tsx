import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceCard } from "@/components/ExperienceCard";
import { BowlCta } from "@/components/home/BowlCta";
import {
  containerClassName,
  darkButtonClassName,
  outlineButtonClassName,
  SlopeCut,
  slopedSectionClassName,
  Sticker,
} from "@/components/home/Section";
import { experienceFormats } from "@/lib/content";
import { getExperiencesByType } from "@/lib/experiences";
import { experienceTypes, isExperienceType } from "@/lib/site";

export async function generateMetadata(
  props: PageProps<"/experiences/[type]">,
): Promise<Metadata> {
  const { type } = await props.params;
  if (!isExperienceType(type)) return {};
  const format = experienceFormats.find((item) => item.type === type);
  return { title: experienceTypes[type].label, description: format?.text };
}

// List of the experiences of one type, in the orange palette of the Expériences page: same hero
// (text and photo of the format), cards with the cut-out shadow, then the orange final CTA.
export default async function ExperienceTypePage(
  props: PageProps<"/experiences/[type]">,
) {
  const { type } = await props.params;
  if (!isExperienceType(type)) notFound();
  const { eyebrow } = experienceTypes[type];
  const format = experienceFormats.find((item) => item.type === type)!;
  const experiences = await getExperiencesByType(type);

  return (
    <>
      {/* Hero. Positions in the visual are percentages of the 660×640 design box. */}
      <section className="relative overflow-hidden bg-highlight-tint">
        <div
          className={`${containerClassName} relative grid items-center gap-12 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[1036fr_660fr] lg:gap-16 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
        >
          <div className="flex flex-col items-start gap-8">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 text-lg font-semibold before:size-4 before:rotate-180 before:bg-current before:content-[''] before:[mask:url(/icons/fleche.svg)_center/contain_no-repeat] hover:underline"
            >
              Toutes les expériences
            </Link>
            <Sticker tone="primary">{eyebrow}</Sticker>
            <h1 className="font-display text-[clamp(2.75rem,5vw,6rem)] leading-[0.95] font-extrabold">
              {format.longTitle}
            </h1>
            <p className="text-lg leading-[1.2] lg:text-[22px]">{format.text}</p>
            <p className="rotate-2 rounded-[4px] border-2 border-ink bg-accent px-4 py-2 text-lg leading-[1.4] font-semibold">
              {format.price}
            </p>
          </div>

          <div className="relative mx-auto mt-[6%] aspect-[660/640] w-full max-w-[660px] lg:mt-0">
            <div className="absolute -top-[5.6%] left-[9.1%] aspect-square w-[81.8%] rotate-4 overflow-hidden">
              <Image
                src={format.photo}
                alt={format.photoAlt}
                priority
                fill
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="object-cover"
                style={{ objectPosition: format.photoPosition }}
              />
            </div>
            <Image
              src="/deco/bol-podcast-orange.svg"
              alt=""
              width={640}
              height={206}
              className="absolute top-[64.06%] left-0 w-[96.97%]"
            />
          </div>
        </div>

        <SlopeCut color="blanc" />
        <Image
          src="/deco/tomate-illustree-orange.svg"
          alt=""
          width={229}
          height={290}
          className="pointer-events-none absolute -bottom-[90px] -left-8 hidden w-[150px] -rotate-10 sm:block lg:w-[229px]"
        />
      </section>

      {/* Experiences */}
      <section className={slopedSectionClassName}>
        <div className={`${containerClassName} relative`}>
          {experiences.length === 0 ? (
            <div className="flex max-w-[720px] flex-col items-start gap-6 border-2 border-ink bg-highlight-wash p-8 shadow-cut lg:p-10">
              <h2 className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">
                Pas encore de date au programme
              </h2>
              <p className="text-lg leading-[1.55] text-ink-soft">
                De nouvelles sessions arrivent bientôt. Écrivez-nous pour être tenu·e au courant,
                ou demandez un devis pour une expérience sur mesure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className={outlineButtonClassName}>
                  Nous contacter
                </Link>
                <Link href="/devis" className={darkButtonClassName}>
                  Demander un devis
                </Link>
              </div>
            </div>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {experiences.map((experience) => (
                <li key={experience.slug}>
                  <ExperienceCard experience={experience} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <SlopeCut color="orange-pale" />
      </section>

      <BowlCta
        theme="orange"
        poster={false}
        title="Un team building écoresponsable à Lyon : mettez vos équipes à la même table"
      />
    </>
  );
}
