import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { accentButtonClassName, containerClassName, SectionHeading, SlopeCut, slopedSectionClassName } from "@/components/home/Section";
import { episodeHref, formatDuration, getHomeEpisodes } from "@/lib/episodes";
import podcastPhoto from "@/public/images/home/podcast-feature.jpg";

// Figma "07 — Podcast à la une" (V4, node 186:251): tilted photo on a lime bowl with a
// "Saison N" sticker, latest episodes on the right. Positions in the visual are percentages
// of the 860×867 design box.
export async function PodcastFeature() {
  const episodes = await getHomeEpisodes(3);
  const season = episodes[0]?.season;

  return (
    <section className={`${slopedSectionClassName} bg-ink text-white`}>
      <Image
        src="/deco/rond-vert.svg"
        alt=""
        width={207}
        height={207}
        className="pointer-events-none absolute -top-[58px] -right-[55px] w-[150px] lg:w-[207px]"
      />
      <div className={`${containerClassName} relative grid items-center gap-16 lg:grid-cols-[832fr_832fr] lg:gap-24`}>
        <div className="relative mx-auto aspect-[860/867] w-full max-w-[860px]">
          <Image
            src="/deco/bol-large.svg"
            alt=""
            width={880}
            height={284}
            className="absolute top-[68.5%] left-[-2.3%] w-[102.3%] max-w-none"
          />
          <div className="absolute top-[4.6%] left-[3.5%] aspect-square w-[86%] rotate-4 overflow-hidden">
            <Image
              src={podcastPhoto}
              alt="Micro à bonnette jaune et enregistreur audio posés sur une table"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[72%_50%]"
            />
          </div>
          {season && (
            <p className="absolute -top-[6%] left-[78%] flex aspect-square w-[19.8%] min-w-[100px] -rotate-10 items-center justify-center rounded-full border-2 border-ink bg-accent text-center font-display text-lg leading-none font-extrabold text-ink shadow-cut-brand sm:text-2xl">
              Saison {season}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-8">
          <SectionHeading onDark poster eyebrow="Le podcast" title="La Recette, le podcast de l'alimentation durable" />
          <p className="max-w-[720px] text-lg leading-[1.2] lg:text-[22px]">
            La Recette est un podcast qui donne la parole à des producteur·ices, chef·fes, artisan·es
            ou entrepreneur·ses engagé·es dans une alimentation durable.
          </p>
          {episodes.length > 0 && (
            <ul className="w-full">
              {episodes.map((episode) => {
                const duration = formatDuration(episode.durationSeconds);
                return (
                  <li key={episode.slug} className="border-t border-white">
                    <Link href={episodeHref(episode)} className="group flex items-center gap-6 py-8">
                      <span
                        aria-hidden
                        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition-colors group-hover:bg-white"
                      >
                        <ArrowRightIcon />
                      </span>
                      <span className="flex-1 space-y-2">
                        <span className="block font-display text-2xl leading-[1.25] font-bold group-hover:underline">
                          {episode.title}
                        </span>
                        <span className="block text-lg leading-[1.4] font-semibold text-accent">
                          Saison {episode.season}
                          {duration && ` · ${duration}`} ·{" "}
                          <time dateTime={episode.publishedAt}>
                            {new Date(episode.publishedAt).toLocaleDateString("fr-FR")}
                          </time>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          <Link href="/podcast" className={`${accentButtonClassName}`}>
            Écouter le podcast
          </Link>
        </div>
      </div>
      <SlopeCut color="vert" />
    </section>
  );
}
