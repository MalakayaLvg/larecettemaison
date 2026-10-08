import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BowlPhoto } from "@/components/home/BowlPhoto";
import {
  buttonClassName,
  containerClassName,
  darkButtonClassName,
  eyebrowClassName,
  SectionHeading,
  SlopeCut,
  slopedSectionClassName,
  Sticker,
} from "@/components/home/Section";
import { TestimonialCards } from "@/components/home/TestimonialCards";
import { formatEuros, formatSessionDate, formatSessionTime, getBookableSessions } from "@/lib/bookings";
import { experienceHref, getExperience, getOtherExperiences, populatedImages } from "@/lib/experiences";
import { proseClassName } from "@/lib/prose";
import { experienceTypes, isExperienceType } from "@/lib/site";
import { getTestimonials } from "@/lib/testimonials";

// Figma "Fiche atelier — UI Desktop 1920" (node 293:283), in the orange palette, used for every
// experience type. Sections without content in the admin are hidden; each section's slanted cut
// takes the colour of the next section shown.

type Props = PageProps<"/experiences/[type]/[slug]">;

type Slope = React.ComponentProps<typeof SlopeCut>["color"];

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

// Orange "Souligné" under the section titles.
const underline = "bg-highlight";

const twoDigits = (index: number) => String(index + 1).padStart(2, "0");

// An emptied rich text field still holds an empty paragraph: look for actual text.
function hasText(node: unknown): boolean {
  if (!node || typeof node !== "object") return false;
  const { text, children, root } = node as { text?: string; children?: unknown[]; root?: unknown };
  return Boolean(text?.trim()) || Boolean(children?.some(hasText)) || hasText(root);
}

// Figma "Méta": lime labels, alternately tilted.
const metaClassName = `${eyebrowClassName} rounded-[4px] border-2 border-ink bg-accent px-3.5 py-1.5 font-bold`;

export default async function ExperiencePage(props: Props) {
  const experience = await findExperience(props);
  const typeInfo = experienceTypes[experience.type];
  const [others, testimonials, sessions] = await Promise.all([
    getOtherExperiences(experience.type, experience.slug, 2),
    getTestimonials(2),
    experience.bookingPrice ? getBookableSessions(experience.id) : Promise.resolve([]),
  ]);
  const [quote] = testimonials;
  const [cover, ...gallery] = populatedImages(experience.images);
  const hostPhoto = typeof experience.host?.photo === "object" ? experience.host.photo : null;
  const nextSession = sessions.find((session) => session.remaining > 0);
  const price =
    experience.price ?? (experience.bookingPrice ? `${formatEuros(experience.bookingPrice)} par personne` : null);
  const practical = [
    { label: "Durée", value: experience.duration },
    { label: "Lieu", value: experience.practical?.address },
    { label: "Taille du groupe", value: experience.practical?.groupSize },
    { label: "Régimes alimentaires", value: experience.practical?.diets },
    { label: "Accessibilité", value: experience.practical?.accessibility },
    { label: "Annulation", value: experience.practical?.cancellation },
  ].filter((info): info is { label: string; value: string } => Boolean(info.value));
  const program = experience.program ?? [];
  const description = hasText(experience.description) ? experience.description : null;

  // Sections after the hero, in page order, with the colour their predecessor's cut must take.
  const sections: { key: string; shown: boolean; slope: Slope }[] = [
    { key: "infos", shown: practical.length > 0, slope: "blanc" },
    { key: "programme", shown: program.length > 0 || Boolean(description), slope: "orange-pale" },
    { key: "intervenant", shown: Boolean(experience.host?.heading || experience.host?.bio), slope: "marine" },
    { key: "galerie", shown: gallery.length > 0, slope: "blanc" },
    { key: "avis", shown: testimonials.length > 0, slope: "orange" },
    { key: "autres", shown: others.length > 0, slope: "orange-pale" },
  ];
  const shown = (key: string) => sections.some((section) => section.key === key && section.shown);
  // Cut at the bottom of `key`: the colour of the next section shown (none before the footer).
  const slopeAfter = (key: string) => {
    const index = sections.findIndex((section) => section.key === key);
    const next = sections.slice(index + 1).find((section) => section.shown);
    return next && <SlopeCut color={next.slope} />;
  };

  return (
    <>
      {/* 02 — Hero réservation */}
      <section className="relative overflow-hidden bg-highlight-tint">
        <div
          className={`${containerClassName} relative grid items-center gap-12 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,800px)] lg:gap-16 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
        >
          <div className="flex flex-col items-start gap-8">
            <Sticker tone="primary">
              <Link href={`/experiences/${experience.type}`} className="hover:underline">
                {typeInfo.eyebrow}
              </Link>
            </Sticker>
            <h1 className="font-display text-[clamp(2.75rem,5vw,6rem)] leading-[0.95] font-extrabold">
              {experience.title}
            </h1>
            {experience.excerpt && (
              <p className="max-w-[720px] text-lg leading-[1.2] lg:text-[22px]">{experience.excerpt}</p>
            )}
            {(experience.location || experience.duration) && (
              <p className="flex flex-wrap gap-6 pt-2 pl-1.5">
                {experience.location && <span className={`${metaClassName} rotate-2`}>{experience.location}</span>}
                {experience.duration && <span className={`${metaClassName} -rotate-2`}>{experience.duration}</span>}
              </p>
            )}
          </div>

          {/* Bloc réservation */}
          <div className="flex flex-col overflow-hidden border-2 border-ink bg-white shadow-cut">
            <div className="relative h-64 bg-highlight-wash lg:h-[360px]">
              {cover && (
                <Image
                  src={cover.url}
                  alt={cover.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col items-start gap-5 p-6 lg:p-10">
              {nextSession && (
                <p className="font-display text-2xl leading-[1.25] font-bold">
                  Prochaine session : {formatSessionDate(nextSession.startsAt)} à{" "}
                  {formatSessionTime(nextSession.startsAt)} · {nextSession.remaining} place
                  {nextSession.remaining > 1 && "s"} restante{nextSession.remaining > 1 && "s"}
                </p>
              )}
              {experience.availability && (
                <p className="text-lg leading-[1.55] text-ink-soft">Où et quand ? {experience.availability}</p>
              )}
              {price && (
                // Figma "Prix" sticker
                <p className="rotate-2 rounded-[4px] border-2 border-ink bg-accent px-4 py-2 text-lg leading-[1.4] font-semibold">
                  {price}
                </p>
              )}
              {(experience.bookingPrice || experience.onQuote) && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {experience.bookingPrice && (
                    <Link href={`${experienceHref(experience)}/reserver`} className={buttonClassName}>
                      Réserver ma place
                    </Link>
                  )}
                  {experience.onQuote && (
                    <Link href={`/devis?experience=${experience.slug}`} className={darkButtonClassName}>
                      Demander un devis
                    </Link>
                  )}
                </div>
              )}
              {quote && (
                <p className="text-lg leading-[1.55] text-ink-soft">
                  « {quote.text} » {quote.author}
                  {quote.role && `, ${quote.role}`}
                </p>
              )}
            </div>
          </div>
        </div>

        {slopeAfter("hero") ?? <SlopeCut color="marine" />}
        <Image
          src="/deco/chou-orange.svg"
          alt=""
          width={300}
          height={288}
          className="pointer-events-none absolute -bottom-[66px] -left-[85px] hidden w-[200px] -rotate-10 sm:block lg:w-[300px]"
        />
      </section>

      {/* 03 — Infos pratiques */}
      {shown("infos") && (
        <section className={slopedSectionClassName}>
          <div className={`${containerClassName} relative flex flex-col gap-14`}>
            <SectionHeading sticker="primary" underlineClassName={underline} eyebrow="Pratique" title="Infos pratiques" />
            <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {practical.map((info) => (
                <div key={info.label} className="flex flex-col gap-4 border-2 border-ink bg-white p-8 shadow-cut lg:p-10">
                  <dt className="font-display text-2xl leading-[1.25] font-bold">{info.label}</dt>
                  <dd className="text-lg leading-[1.55] whitespace-pre-line text-ink-soft">{info.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {slopeAfter("infos")}
        </section>
      )}

      {/* 04 — Programme (and the free description, when filled) */}
      {shown("programme") && (
        <section className={`${slopedSectionClassName} bg-highlight-wash`}>
          <div className={`${containerClassName} relative flex flex-col gap-14`}>
            <SectionHeading sticker="primary" underlineClassName={underline} eyebrow="Programme" title="Au programme" />
            {description && (
              <RichText data={description} className={`text-lg ${proseClassName}`} />
            )}
            {program.length > 0 && (
              <ol className="grid gap-8 md:grid-cols-3">
                {program.map((step, index) => (
                  <li key={step.id ?? index} className="flex flex-col gap-3 border-t-4 border-ink pt-6">
                    <span className="font-display text-5xl leading-none font-extrabold tracking-[-0.02em] text-highlight-dark">
                      {twoDigits(index)}
                    </span>
                    <p className="text-lg leading-[1.55] text-ink-soft">{step.text}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
          {slopeAfter("programme")}
        </section>
      )}

      {/* 05 — Intervenant·e */}
      {shown("intervenant") && (
        <section className={`${slopedSectionClassName} bg-ink text-white`}>
          <div className={`${containerClassName} relative grid items-center gap-16 lg:grid-cols-[1044fr_620fr] lg:gap-24`}>
            <div className="flex flex-col gap-10">
              <SectionHeading
                onDark
                sticker="primary"
                underlineClassName={underline}
                eyebrow="Intervenant·e"
                title={experience.host?.heading ?? "Rencontrez notre intervenant·e"}
              />
              {experience.host?.bio && (
                <p className="text-lg leading-[1.2] whitespace-pre-line lg:text-[22px]">{experience.host.bio}</p>
              )}
            </div>
            {hostPhoto?.url && (
              <BowlPhoto src={hostPhoto.url} alt={hostPhoto.alt} className="top-[1%] left-[10.2%] -rotate-3" />
            )}
          </div>
          {slopeAfter("intervenant")}
        </section>
      )}

      {/* 06 — Galerie */}
      {shown("galerie") && (
        <section className={slopedSectionClassName}>
          <div className={`${containerClassName} relative flex flex-col gap-14`}>
            <SectionHeading
              sticker="primary"
              underlineClassName={underline}
              eyebrow="Galerie"
              title={`${experience.title} en images`}
            />
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((image) => (
                <li key={image.id} className="relative h-72 overflow-hidden border-2 border-ink bg-highlight-tint shadow-cut lg:h-[440px]">
                  <Image src={image.url} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
          {slopeAfter("galerie")}
        </section>
      )}

      {/* 07 — Avis */}
      {shown("avis") && (
        <section className={`${slopedSectionClassName} bg-highlight-tint`}>
          <div className={`${containerClassName} relative flex flex-col gap-14`}>
            <SectionHeading sticker="ink" underlineClassName="bg-ink" eyebrow="Avis" title="Avis de nos client·es : ils y ont goûté" />
            <TestimonialCards testimonials={testimonials} />
          </div>
          {slopeAfter("avis")}
        </section>
      )}

      {/* 08 — Autre atelier */}
      {shown("autres") && (
        <section className="bg-highlight-wash pt-20 pb-20 lg:pt-32 lg:pb-32">
          <div className={`${containerClassName} flex flex-col gap-14`}>
            <SectionHeading sticker="primary" underlineClassName={underline} eyebrow="À découvrir aussi" title={typeInfo.others} />
            <ul className="flex flex-col gap-10">
              {others.map((other) => {
                const [otherCover] = populatedImages(other.images);
                return (
                  <li key={other.slug}>
                    <Link
                      href={experienceHref(other)}
                      className="group grid overflow-hidden border-2 border-ink bg-white shadow-cut transition-transform hover:-translate-y-1 lg:grid-cols-[700fr_1056fr]"
                    >
                      <div className="relative h-64 bg-highlight-tint lg:h-auto lg:min-h-[400px]">
                        {otherCover && (
                          <Image
                            src={otherCover.url}
                            alt={otherCover.alt}
                            fill
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-center gap-5 p-8 lg:p-14">
                        <h3 className="font-display text-[28px] leading-[1.15] font-bold group-hover:underline lg:text-[32px]">
                          {other.title}
                        </h3>
                        {other.excerpt && <p className="text-lg leading-[1.55] text-ink-soft">{other.excerpt}</p>}
                        <span className={darkButtonClassName}>En savoir plus</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
