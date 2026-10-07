import Image from "next/image";
import Link from "next/link";
import { accentButtonClassName, containerClassName, eyebrowClassName, h2ClassName } from "@/components/home/Section";
import { episodeHref, formatDuration, getHomeEpisodes } from "@/lib/episodes";
import podcastPhoto from "@/public/images/home/podcast-feature.jpg";

// Figma "07 — Podcast à la une" (node 129:298): photo with a "Saison N" sticker, latest
// episodes on the right.
export async function PodcastFeature() {
  const episodes = await getHomeEpisodes(3);
  const season = episodes[0]?.season;

  return (
    <section className="bg-ink text-white">
      <div className={`${containerClassName} grid gap-16 py-20 lg:grid-cols-2 lg:gap-24 lg:py-32`}>
        <div className="relative min-h-80 sm:min-h-[480px]">
          <Image
            src={podcastPhoto}
            alt="Micro à bonnette jaune et enregistreur audio posés sur une table"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-[72%_50%]"
          />
          {season && (
            <p className="absolute -top-10 right-2 flex size-[120px] -rotate-10 items-center justify-center rounded-full border-2 border-ink bg-highlight-subtle font-display text-2xl leading-[1.15] font-bold text-ink sm:-top-[65px] sm:right-[18px] sm:size-[180px] sm:text-[32px]">
              Saison {season}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-8">
          <p className={`${eyebrowClassName} text-accent`}>Le podcast</p>
          <h2 className={h2ClassName}>La Recette, le podcast de l&apos;alimentation durable</h2>
          <p className="max-w-[720px] text-lg leading-[1.5] lg:text-[22px]">
            La Recette est un podcast qui donne la parole à des producteur·ices, chef·fes, artisan·es
            ou entrepreneur·ses engagé·es dans une alimentation durable.
          </p>
          {episodes.length > 0 && (
            <ul className="w-full">
              {episodes.map((episode) => {
                const duration = formatDuration(episode.durationSeconds);
                return (
                  <li key={episode.slug} className="border-t border-white">
                    <Link href={episodeHref(episode)} className="group flex items-center gap-6 py-6">
                      <span
                        aria-hidden
                        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-2xl text-ink transition-colors group-hover:bg-white"
                      >
                        →
                      </span>
                      <span className="flex-1 space-y-2">
                        <span className="block font-display text-2xl leading-[1.25] font-bold group-hover:underline">
                          {episode.title}
                        </span>
                        <span className="block leading-[1.4] text-accent">
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
          <Link href="/podcast" className={accentButtonClassName}>
            Écouter le podcast
          </Link>
        </div>
      </div>
    </section>
  );
}
