import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cleanRssDescription, toExcerpt } from "@/lib/episode-description";
import {
  formatDate,
  formatDuration,
  getEpisode,
  parseSeasonSegment,
} from "@/lib/episodes";
import { proseClassName } from "@/lib/prose";

type Props = PageProps<"/podcast/[saison]/[slug]">;

async function findEpisode(props: Props) {
  const { saison, slug } = await props.params;
  const season = parseSeasonSegment(saison);
  const episode = season === null ? undefined : await getEpisode(season, slug);
  if (!episode) notFound();
  return episode;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const episode = await findEpisode(props);
  const description = toExcerpt(
    episode.summary ?? cleanRssDescription(episode.rssDescription ?? ""),
  );

  return {
    title: episode.title,
    description,
    openGraph: {
      type: "article",
      title: episode.title,
      description,
      images: episode.imageUrl ? [episode.imageUrl] : undefined,
    },
  };
}

export default async function EpisodePage(props: Props) {
  const episode = await findEpisode(props);
  const duration = formatDuration(episode.durationSeconds);
  const platforms = [
    { label: "Spotify", href: episode.spotifyUrl },
    { label: "Apple Podcasts", href: episode.appleUrl },
    { label: "Deezer", href: episode.deezerUrl },
    { label: "YouTube", href: episode.youtubeUrl },
  ].filter((platform): platform is { label: string; href: string } =>
    Boolean(platform.href),
  );

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/podcast" className="text-sm opacity-70 hover:underline">
        ← Tous les épisodes
      </Link>

      <header className="mt-6 grid items-end gap-8 sm:grid-cols-[240px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-black/5">
          {episode.imageUrl && (
            <Image
              src={episode.imageUrl}
              alt=""
              fill
              priority
              sizes="(min-width: 640px) 240px, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide opacity-60">
            Saison {episode.season}
            {episode.number && ` · Épisode ${episode.number}`}
            {duration && ` · ${duration}`}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {episode.title}
          </h1>
          {episode.guestName && (
            <p className="mt-3">
              Avec <strong>{episode.guestName}</strong>
              {episode.guestRole && `, ${episode.guestRole}`}
            </p>
          )}
          <p className="mt-3 text-sm opacity-60">
            <time dateTime={episode.publishedAt}>
              {formatDate(episode.publishedAt)}
            </time>
          </p>
        </div>
      </header>

      <audio
        controls
        preload="none"
        src={episode.audioUrl}
        className="mt-8 w-full"
      >
        <a href={episode.audioUrl}>Télécharger l&apos;épisode</a>
      </audio>

      {platforms.length > 0 && (
        <nav aria-label="Écouter sur" className="mt-6">
          <ul className="flex flex-wrap gap-2 text-sm">
            {platforms.map((platform) => (
              <li key={platform.label}>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full border border-black/15 px-4 py-1.5 hover:border-foreground"
                >
                  {platform.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <EpisodeDescription
        summary={episode.summary}
        rssDescription={episode.rssDescription}
      />
    </article>
  );
}

const descriptionClassName = `mt-10 ${proseClassName}`;

// The hand-written summary (plain text, paragraphs separated by blank lines) wins over the
// description synced from Ausha.
function EpisodeDescription({
  summary,
  rssDescription,
}: {
  summary?: string | null;
  rssDescription?: string | null;
}) {
  if (summary) {
    return (
      <div className={descriptionClassName}>
        {summary.split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  }

  const html = cleanRssDescription(rssDescription ?? "");
  if (!html) return null;
  return (
    <div
      className={descriptionClassName}
      // Sanitized in cleanRssDescription: only basic formatting tags and http(s)/mailto links.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
