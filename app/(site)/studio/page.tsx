import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BowlCta } from "@/components/home/BowlCta";
import { PodcastStatsGrid } from "@/components/home/PodcastStats";
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
import { episodeHref, formatDuration, getEpisode } from "@/lib/episodes";
import { getStudioOffers } from "@/lib/studio";
import podcastPhoto from "@/public/images/home/podcast-feature.jpg";
import juliePhoto from "@/public/images/studio/julie-van-ossel.jpg";

export const metadata: Metadata = {
  title: "Studio",
  description: "Sponsoring, production de podcasts et animation d'événements.",
};

// Figma "Studio — UI Desktop 1920" (node 276:178), in the lime palette. Header (01) and footer
// (09) are in the site layout. Each section ends with a slanted cut in the colour of the next one.

const steps = ["Conception éditoriale", "Enregistrement", "Montage", "Diffusion et communication"];

const twoDigits = (index: number) => String(index + 1).padStart(2, "0");

const cardClassName = "flex h-full flex-col overflow-hidden border-2 border-ink bg-white shadow-cut";

export default async function StudioPage() {
  const [offers, roundTable] = await Promise.all([
    getStudioOffers(),
    // Shown in "Réalisations" with its cover, duration and date when it is in the database.
    getEpisode(2, "table-ronde-alimentation-et-sante"),
  ]);
  const roundTableDuration = roundTable && formatDuration(roundTable.durationSeconds);

  return (
    <>
      {/* 02 — Hero. Positions in the visual are percentages of the 660×640 design box. */}
      <section className="relative overflow-hidden bg-accent-tint">
        <div
          className={`${containerClassName} relative grid items-center gap-12 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[1036fr_660fr] lg:gap-16 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
        >
          <div className="flex flex-col items-start gap-8">
            <Sticker>La Recette Studio : production de podcasts</Sticker>
            <h1 className="font-display text-[clamp(2.75rem,5vw,6rem)] leading-[0.95] font-extrabold">
              Amplifiez votre impact grâce au podcast
            </h1>
            <p className="text-lg leading-[1.2] lg:text-[22px]">
              Création éditoriale, réalisation audio et vidéo : La Recette met son expertise de studio
              de podcast au service des acteur·ices de l&apos;alimentation durable, entreprises et
              organisations.
            </p>
            <Link href="/devis" className={buttonClassName}>
              Demander un devis
            </Link>
          </div>

          <div className="relative mx-auto mt-[6%] aspect-[660/640] w-full max-w-[660px] lg:mt-0">
            <div className="absolute -top-[5.6%] left-[9.1%] aspect-square w-[81.8%] rotate-4 overflow-hidden">
              <Image
                src={podcastPhoto}
                alt="Micro à bonnette jaune et enregistreur audio posés sur une table"
                priority
                fill
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="object-cover object-[72%_50%]"
              />
            </div>
            <Image
              src="/deco/bol-podcast.svg"
              alt=""
              width={640}
              height={206}
              className="absolute top-[64.06%] left-0 w-[96.97%]"
            />
          </div>
        </div>

        <SlopeCut color={offers.length > 0 ? "jaune-pale" : "jaune-clair"} />
        <Image
          src="/deco/carotte.svg"
          alt=""
          width={118}
          height={330}
          className="pointer-events-none absolute -bottom-[110px] left-6 hidden w-[80px] -rotate-25 sm:block lg:w-[118px]"
        />
      </section>

      {/* 03 — Offres */}
      {offers.length > 0 && (
        <section className={`${slopedSectionClassName} bg-accent-wash`}>
          <div className={`${containerClassName} relative flex flex-col gap-12`}>
            <SectionHeading
              eyebrow="Offres"
              title="Trois offres pour faire entendre votre voix en podcast"
              underlineClassName="bg-accent"
            />
            <ul className="grid gap-8 md:grid-cols-3">
              {offers.map((offer, index) => (
                <li
                  key={offer.slug}
                  className="flex flex-col justify-between gap-6 border-2 border-ink bg-white p-8 shadow-cut lg:p-10"
                >
                  <div className="flex flex-col items-start gap-4">
                    {/* Figma "Numéro" */}
                    <span className={`${eyebrowClassName} rounded-[4px] border-2 border-ink bg-ink px-3.5 py-1.5 font-bold text-white`}>
                      {twoDigits(index)}
                    </span>
                    <h3 className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">
                      {twoDigits(index)} · {offer.title}
                    </h3>
                    {offer.description && (
                      <p className="text-lg leading-[1.55] whitespace-pre-line text-ink-soft">{offer.description}</p>
                    )}
                  </div>
                  {/* The quote form opens with this offer preselected. */}
                  <Link href={`/devis?studio=${offer.slug}`} className={`${darkButtonClassName} self-start`}>
                    Demander un devis
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <SlopeCut color="jaune-clair" />
        </section>
      )}

      {/* 04 — Audience du podcast */}
      <section className={`${slopedSectionClassName} bg-accent-tint`}>
        <div className={`${containerClassName} relative flex flex-col gap-14`}>
          <SectionHeading
            eyebrow="Audience"
            title="Une audience engagée, à l'écoute de votre marque"
            underlineClassName="bg-ink"
          />
          <PodcastStatsGrid />
        </div>
        <SlopeCut color="blanc" />
      </section>

      {/* 05 — Process */}
      <section className={slopedSectionClassName}>
        <div className={`${containerClassName} relative flex flex-col gap-14`}>
          <SectionHeading
            eyebrow="Production"
            title="De l'idée à la diffusion : la production de votre podcast"
            underlineClassName="bg-accent"
          />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step} className="flex flex-col gap-3 border-t-4 border-ink pt-6">
                <span className="font-display text-5xl leading-none font-extrabold tracking-[-0.02em] text-accent-dark">
                  {twoDigits(index)}
                </span>
                <span className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <SlopeCut color="jaune" />
      </section>

      {/* 06 — Réalisations */}
      <section className={`${slopedSectionClassName} bg-accent-subtle`}>
        <div className={`${containerClassName} relative flex flex-col gap-12`}>
          <SectionHeading
            eyebrow="Réalisations"
            title="Nos réalisations : podcasts et tables rondes"
            underlineClassName="bg-accent"
          />
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <li className={cardClassName}>
              {/* Figma "Image — À fournir : Réalisation studio" */}
              <div className="flex h-60 items-center justify-center bg-accent px-6 text-center text-[15px] leading-[1.45]">
                Image à venir · Réalisation studio
              </div>
              <h3 className="p-6 font-display text-2xl leading-[1.25] font-bold">
                Un podcast en anglais créé de A à Z pour une association de l&apos;alimentation et de la
                gastronomie
              </h3>
            </li>
            <li>
              <Link
                href={roundTable ? episodeHref(roundTable) : "/podcast/saison-2/table-ronde-alimentation-et-sante"}
                className={`${cardClassName} group transition-transform hover:-translate-y-1`}
              >
                <div className="relative h-60 overflow-hidden bg-accent">
                  {roundTable?.imageUrl && (
                    <Image
                      src={roundTable.imageUrl}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <h3 className="font-display text-2xl leading-[1.25] font-bold group-hover:underline">
                    {roundTable?.title ?? "TABLE-RONDE - Alimentation et santé : un équilibre à trouver ?"}
                  </h3>
                  <p className="text-lg leading-[1.4] font-semibold text-ink-soft">
                    {roundTable ? (
                      <>
                        {roundTableDuration && `${roundTableDuration} · `}
                        <time dateTime={roundTable.publishedAt}>
                          {new Date(roundTable.publishedAt).toLocaleDateString("fr-FR")}
                        </time>
                      </>
                    ) : (
                      "1 h 09 · 06/01/2025"
                    )}
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <SlopeCut color="marine" />
      </section>

      {/* 07 — Expertise. Positions in the visual are percentages of the 620×620 design box. */}
      <section className={`${slopedSectionClassName} bg-ink text-white`}>
        <div className={`${containerClassName} relative grid items-center gap-16 lg:grid-cols-[620fr_1044fr] lg:gap-24`}>
          <div className="relative mx-auto aspect-square w-full max-w-[620px]">
            <Image
              src="/deco/bol-lime.svg"
              alt=""
              width={600}
              height={200}
              className="absolute top-[64.52%] left-0 w-[96.77%]"
            />
            <div className="absolute top-[1%] left-[10.2%] aspect-square w-[83.9%] -rotate-3 overflow-hidden">
              <Image
                src={juliePhoto}
                alt="Julie Van Ossel, productrice de podcasts, en extérieur"
                fill
                sizes="(min-width: 1024px) 28vw, 85vw"
                className="object-cover object-[50%_90%]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <SectionHeading onDark eyebrow="Expertise" title="Productrice et formatrice de podcast" />
            <p className="text-lg leading-[1.2] lg:text-[22px]">
              Je produis et réalise des podcasts sur l&apos;alimentation et la gastronomie pour des
              organismes et des collectivités, et j&apos;enseigne le podcast natif dans des écoles et des
              universités.
            </p>
          </div>
        </div>
        <SlopeCut color="jaune" />
      </section>

      {/* 08 — Sponsoring */}
      <BowlCta
        theme="lime"
        poster={false}
        eyebrow="Offre Podcast"
        title="Amplifiez votre impact grâce au podcast"
        text="Création éditoriale, réalisation audio et vidéo : La Recette met son expertise de studio de podcast au service des acteur·ices de l'alimentation durable, entreprises et organisations."
      />
    </>
  );
}
