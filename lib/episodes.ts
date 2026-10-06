import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { episodes } from "@/db/schema";

export async function getSeasons(): Promise<number[]> {
  const rows = await db
    .selectDistinct({ season: episodes.season })
    .from(episodes)
    .orderBy(episodes.season);
  return rows.map((row) => row.season);
}

// Only the fields needed by the episode cards.
export async function getEpisodeList(season?: number) {
  return db
    .select({
      slug: episodes.slug,
      title: episodes.title,
      season: episodes.season,
      number: episodes.number,
      publishedAt: episodes.publishedAt,
      durationSeconds: episodes.durationSeconds,
      imageUrl: episodes.imageUrl,
    })
    .from(episodes)
    .where(season ? eq(episodes.season, season) : undefined)
    .orderBy(desc(episodes.publishedAt));
}

export type EpisodeListItem = Awaited<ReturnType<typeof getEpisodeList>>[number];

export function episodeHref(episode: { season: number; slug: string }) {
  return `/podcast/saison-${episode.season}/${episode.slug}`;
}

// 3198 -> "53 min", 4035 -> "1 h 07"
export function formatDuration(seconds: number | null) {
  if (!seconds) return null;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, "0")}`;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
