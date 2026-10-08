import Image from "next/image";
import Link from "next/link";
import { darkButtonClassName } from "@/components/home/Section";
import { type EpisodeListItem, episodeHref, formatDuration } from "@/lib/episodes";

// Figma "Card" of "03 — Liste des épisodes" (Podcast V4, node 243:184): white card, navy border
// and cut-out shadow. `cta` adds the "En savoir plus" button of the episode page's "Autres épisodes".
export function EpisodeCard({ episode, cta }: { episode: EpisodeListItem; cta?: string }) {
  const duration = formatDuration(episode.durationSeconds);

  return (
    <Link
      href={episodeHref(episode)}
      className="group flex h-full flex-col overflow-hidden border-2 border-ink bg-white shadow-cut transition-transform hover:-translate-y-1"
    >
      {/* Square: the Ausha covers carry the guest's name, cropping them would cut it. */}
      <div className="relative aspect-square overflow-hidden bg-brand">
        {episode.imageUrl && (
          <Image
            src={episode.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-2xl leading-[1.25] font-bold group-hover:underline">{episode.title}</h3>
        <p className={`text-lg leading-[1.4] font-semibold text-ink-soft ${cta ? "" : "mt-auto"}`}>
          Saison {episode.season}
          {duration && ` · ${duration}`} ·{" "}
          <time dateTime={episode.publishedAt}>
            {new Date(episode.publishedAt).toLocaleDateString("fr-FR")}
          </time>
        </p>
        {cta && (
          <span className="mt-auto pt-6">
            <span className={darkButtonClassName}>{cta}</span>
          </span>
        )}
      </div>
    </Link>
  );
}
