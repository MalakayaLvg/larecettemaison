import type { Where } from "payload";
import { cache } from "react";
import { getPayloadClient } from "@/lib/payload";

export async function getSeasons(): Promise<number[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "episodes",
    select: { season: true },
    pagination: false,
  });
  return [...new Set(docs.map((doc) => doc.season))].sort((a, b) => a - b);
}

// Only the fields needed by the episode cards. `hasMore` drives the "Voir plus" link.
export async function getEpisodeList(season?: number, limit = 9) {
  return getEpisodeListWhere(season ? { season: { equals: season } } : undefined, limit);
}

async function getEpisodeListWhere(where: Where | undefined, limit: number) {
  const payload = await getPayloadClient();
  const { docs, hasNextPage } = await payload.find({
    collection: "episodes",
    where,
    sort: "-publishedAt",
    limit,
    select: {
      slug: true,
      title: true,
      season: true,
      number: true,
      publishedAt: true,
      durationSeconds: true,
      imageUrl: true,
    },
  });
  return { episodes: docs, hasMore: hasNextPage };
}

export type EpisodeListItem = Awaited<ReturnType<typeof getEpisodeList>>["episodes"][number];

// Home page: episodes marked "À la une" in the admin first, then the most recent ones.
export async function getHomeEpisodes(limit = 3) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "episodes",
    sort: ["-featured", "-publishedAt"],
    limit,
    select: {
      slug: true,
      title: true,
      season: true,
      publishedAt: true,
      durationSeconds: true,
      imageUrl: true,
    },
  });
  return docs;
}

// "D'autres épisodes" at the bottom of an episode page.
export async function getOtherEpisodes(excludeSlug: string, limit = 3) {
  const { episodes } = await getEpisodeListWhere({ slug: { not_equals: excludeSlug } }, limit);
  return episodes;
}

// Wrapped in cache() so generateMetadata and the page share a single query.
export const getEpisode = cache(async (season: number, slug: string) => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "episodes",
    where: { season: { equals: season }, slug: { equals: slug } },
    limit: 1,
  });
  return docs[0];
});

// "saison-2" -> 2, anything else -> null
export function parseSeasonSegment(segment: string) {
  const match = /^saison-(\d+)$/.exec(segment);
  return match ? Number(match[1]) : null;
}

export function episodeHref(episode: { season: number; slug: string }) {
  return `/podcast/saison-${episode.season}/${episode.slug}`;
}

// 3198 -> "53 min", 4035 -> "1 h 07"
export function formatDuration(seconds: number | null | undefined) {
  if (!seconds) return null;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, "0")}`;
}

// Payload returns dates as ISO strings.
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
