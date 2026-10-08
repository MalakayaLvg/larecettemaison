import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { accentButtonClassName, containerClassName, SectionHeading, SlopeCut, slopedSectionClassName } from "@/components/home/Section";
import { episodeHref, formatDuration, getHomeEpisodes } from "@/lib/episodes";

// Figma "07 — Podcast à la une" (V4, node 186:251): cut-out tomato with the microphone photo
// inside it (public/illustrations/accueil-tomate-podcast.svg, Figma export of "Group 5") on a
// lime bowl, "Saison N" sticker, latest episodes on the right. Positions in the visual are
// percentages of its 880×952 box (x=-20, y=-77.5 in the 832px left column).
export async function PodcastFeature() {
  const episodes = await getHomeEpisodes(3);
  const season = episodes[0]?.season;

  return (
    <section className={`${slopedSectionClassName} bg-ink text-white`}>
      <div className={`${containerClassName} relative grid items-center gap-16 lg:grid-cols-[832fr_832fr] lg:gap-24`}>
        <div className="relative mx-auto aspect-[880/952] w-full max-w-[880px] lg:-mt-[9.3%] lg:-ml-[2.4%] lg:w-[105.8%] lg:max-w-none lg:self-start">
          <Image
            src="/illustrations/accueil-tomate-podcast.svg"
            alt="Main tenant un micro à bonnette verte « La Recette » dans une tomate découpée"
            width={647}
            height={820}
            className="absolute top-0 left-[13.18%] w-[73.52%]"
          />
          <Image
            src="/deco/bol-podcast-lime.svg"
            alt=""
            width={880}
            height={283}
            className="absolute top-[70.27%] left-0 w-full"
          />
          {season && (
            <p className="absolute top-[2.68%] left-[min(82.2%,calc(100%-100px))] flex aspect-square w-[19.32%] min-w-[100px] -rotate-10 items-center justify-center rounded-full border-2 border-ink bg-accent text-center font-display text-lg leading-none font-extrabold text-ink shadow-cut-brand sm:text-2xl">
              Saison {season}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-8">
          <SectionHeading
            onDark
            eyebrow="Le podcast"
            stickerClassName="shadow-cut-sm-brand"
            title="La Recette, le podcast de l'alimentation durable : à écouter sans modération"
          />
          <p className="max-w-[720px] text-lg leading-[1.2] lg:text-[22px]">
            La Recette est un podcast qui donne la parole à des producteur·ices, chef·fes, artisan·es
            ou entrepreneur·ses engagé·es dans une alimentation durable. Au menu : leurs idées, leurs
            gestes, leurs réussites.
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
