import Image from "next/image";
import Link from "next/link";
import { cardClassName } from "@/components/home/Section";
import { type EpisodeListItem, episodeHref, formatDuration } from "@/lib/episodes";

export function EpisodeCard({ episode }: { episode: EpisodeListItem }) {
  const duration = formatDuration(episode.durationSeconds);

  return (
    <Link href={episodeHref(episode)} className={`${cardClassName} group h-full`}>
      {/* Square: the Ausha covers carry the guest's name, cropping them would cut it. */}
      <div className="relative aspect-square overflow-hidden bg-foreground/10">
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
      <div className="flex flex-1 flex-col gap-3 px-6 pt-3 pb-6">
        <h3 className="text-xl font-black leading-snug group-hover:underline">{episode.title}</h3>
        <p className="font-medium opacity-70">
          Saison {episode.season}
          {duration && ` · ${duration}`} ·{" "}
          <time dateTime={episode.publishedAt}>
            {new Date(episode.publishedAt).toLocaleDateString("fr-FR")}
          </time>
        </p>
      </div>
    </Link>
  );
}
