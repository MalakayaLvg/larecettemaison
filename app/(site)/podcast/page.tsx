import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EpisodeCard } from "@/components/EpisodeCard";
import { BowlCta } from "@/components/home/BowlCta";
import { PodcastStats } from "@/components/home/PodcastStats";
import {
  containerClassName,
  darkButtonClassName,
  SectionHeading,
  SlopeCut,
  slopedSectionClassName,
  Sticker,
} from "@/components/home/Section";
import { listenerReviews } from "@/lib/content";
import { getEpisodeList, getSeasons } from "@/lib/episodes";
import { podcastPlatforms } from "@/lib/site";
import podcastPhoto from "@/public/images/home/podcast-feature.jpg";

export const metadata: Metadata = {
  title: "Podcast",
  description: "La Recette, le podcast de l'alimentation durable.",
};

// Figma "Podcast — UI Desktop 1920" (node 242:62). Header (01) and footer (07) are in the
// site layout. Each section ends with a slanted cut in the colour of the next one.

const PAGE_SIZE = 9;

// Listener review cards: slightly tilted, each in its own colours (as on the home page).
const reviewStyles = [
  "rotate-1 bg-brand-subtle shadow-cut",
  "-rotate-1 bg-ink text-white shadow-cut-brand",
  "rotate-1 bg-brand shadow-cut",
];

export default async function PodcastPage(props: PageProps<"/podcast">) {
  const { saison, nombre } = await props.searchParams;
  const seasons = await getSeasons();
  // Unknown or missing ?saison= falls back to all episodes.
  const selected = seasons.find((season) => String(season) === saison);
  // "Voir plus" adds PAGE_SIZE episodes through ?nombre= (no client-side JS needed).
  const count = Math.max(PAGE_SIZE, Math.min(Number(nombre) || PAGE_SIZE, 200));
  const { episodes, hasMore } = await getEpisodeList(selected, count);

  const listHref = (params: { saison?: number; nombre?: number }) => {
    const query = new URLSearchParams();
    if (params.saison) query.set("saison", String(params.saison));
    if (params.nombre) query.set("nombre", String(params.nombre));
    const search = query.toString();
    return `/podcast${search ? `?${search}` : ""}#episodes`;
  };

  return (
    <>
      {/* 02 — Hero. Positions in the visual are percentages of the 660×640 design box. */}
      <section className="relative overflow-hidden bg-brand">
        <Image
          src="/deco/legume.svg"
          alt=""
          width={208}
          height={240}
          className="pointer-events-none absolute bottom-[calc(5vw-40px)] -left-[75px] hidden w-[150px] -rotate-10 sm:block lg:w-[208px]"
        />

        <div
          className={`${containerClassName} relative grid items-center gap-12 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[1036fr_660fr] lg:gap-16 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
        >
          <div className="flex flex-col items-start gap-8">
            <Sticker>La Recette, les ingrédients du changement</Sticker>
            <h1 className="font-display text-[clamp(2.75rem,5vw,6rem)] leading-[0.95] font-extrabold">
              La Recette, le podcast de l&apos;alimentation durable : à écouter sans modération
            </h1>
            <div className="space-y-[1.2em] text-lg leading-[1.2] lg:text-[22px]">
              <p>
                Dans ce podcast, Julie Van Ossel, journaliste, vous emmène à la rencontre de celles et
                ceux qui façonnent l&apos;alimentation de demain : des chefs, productrices, artisans,
                entrepreneuses qui bousculent les codes pour réinventer notre façon de manger.
              </p>
              <p>
                Un épisode par mois depuis 2023, trois saisons à ce jour : chaque épisode est enregistré
                en présentiel et s&apos;ouvre sur un reportage immersif.
              </p>
            </div>
            <nav aria-label="Écouter sur">
              <ul className="flex flex-wrap gap-3">
                {podcastPlatforms.map((platform) => (
                  <li key={platform.label}>
                    <a
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={darkButtonClassName}
                    >
                      {platform.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
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

        <SlopeCut color="vert-clair" />
      </section>

      {/* 03 — Liste des épisodes */}
      <section id="episodes" className={`${slopedSectionClassName} scroll-mt-8 bg-brand-subtle`}>
        <div className={`${containerClassName} relative flex flex-col gap-12`}>
          <SectionHeading
            eyebrow="Le podcast"
            title="Tous nos podcasts sur l'alimentation durable : des épisodes à déguster"
          />

          <nav aria-label="Filtrer par saison">
            <ul className="flex flex-wrap gap-3">
              <SeasonChip href={listHref({})} active={!selected}>
                Toutes
              </SeasonChip>
              {[...seasons].reverse().map((season) => (
                <SeasonChip key={season} href={listHref({ saison: season })} active={season === selected}>
                  Saison {season}
                </SeasonChip>
              ))}
            </ul>
          </nav>

          {episodes.length === 0 ? (
            <p className="text-lg">Aucun épisode pour le moment.</p>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => (
                <li key={episode.slug}>
                  <EpisodeCard episode={episode} />
                </li>
              ))}
            </ul>
          )}

          {hasMore && (
            <Link
              href={listHref({ saison: selected, nombre: count + PAGE_SIZE })}
              scroll={false}
              className={`${darkButtonClassName} self-center`}
            >
              Voir plus d&apos;épisodes
            </Link>
          )}
        </div>
        <SlopeCut color="vert" />
      </section>

      {/* 04 — Chiffres clés (same as the home page) */}
      <PodcastStats />

      {/* 05 — Avis auditeurs */}
      <section className={slopedSectionClassName}>
        <Image
          src="/deco/legume-lime.svg"
          alt=""
          width={208}
          height={240}
          className="pointer-events-none absolute -top-[72px] -right-[30px] w-[160px] -rotate-12 lg:w-[208px]"
        />
        <div className={`${containerClassName} relative space-y-16`}>
          <SectionHeading eyebrow="Avis" title="Ce qu'en disent les auditeur·ices : des oreilles gourmandes" />
          <ul className="grid gap-10 md:grid-cols-3">
            {listenerReviews.map((review, index) => (
              <li key={review.author}>
                <figure
                  className={`flex h-full flex-col gap-6 border-2 border-ink p-8 lg:p-10 ${reviewStyles[index % reviewStyles.length]}`}
                >
                  <blockquote className="font-display text-[22px] leading-[1.4] font-medium lg:text-[26px]">
                    « {review.text} »
                  </blockquote>
                  <figcaption className="text-lg leading-[1.4] font-semibold">{review.author}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <SlopeCut color="vert-clair" />
      </section>

      {/* 10 — CTA final */}
      <BowlCta
        poster={false}
        title="Un team building écoresponsable à Lyon : mettez vos équipes à la même table"
      />
    </>
  );
}

// Figma "filter": navy pill when active, white otherwise.
function SeasonChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        scroll={false}
        aria-current={active ? "page" : undefined}
        className={`block rounded-full border-2 border-ink px-5 py-2 text-lg leading-[1.4] font-semibold transition-colors ${
          active ? "bg-ink text-white" : "bg-white hover:bg-ink hover:text-white"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
