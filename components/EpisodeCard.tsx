import Image from "next/image";
import Link from "next/link";
import {
  type EpisodeListItem,
  episodeHref,
  formatDate,
  formatDuration,
} from "@/lib/episodes";

export function EpisodeCard({ episode }: { episode: EpisodeListItem }) {
  const duration = formatDuration(episode.durationSeconds);

  return (
    <Link href={episodeHref(episode)} className="group flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-black/5">
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
      <p className="text-xs uppercase tracking-wide opacity-60">
        Saison {episode.season}
        {episode.number && ` · Épisode ${episode.number}`}
        {duration && ` · ${duration}`}
      </p>
      <h2 className="font-semibold leading-snug group-hover:underline">
        {episode.title}
      </h2>
      <p className="text-sm opacity-60">
        <time dateTime={episode.publishedAt.toISOString()}>
          {formatDate(episode.publishedAt)}
        </time>
      </p>
    </Link>
  );
}
