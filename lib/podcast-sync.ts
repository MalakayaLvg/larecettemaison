import { count, sql } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { episodes } from "@/db/schema";
import { fetchMainEpisodes } from "@/lib/podcast-feed";

type Db = PostgresJsDatabase<Record<string, unknown>>;

// Idempotent (keyed on guid). Never overwrites slug or the fields edited by hand
// (summary, guest, platform links, featured).
export async function syncPodcastEpisodes(db: Db) {
  const feedEpisodes = await fetchMainEpisodes();
  const [{ before }] = await db.select({ before: count() }).from(episodes);

  if (feedEpisodes.length > 0) {
    await db
      .insert(episodes)
      .values(feedEpisodes)
      .onConflictDoUpdate({
        target: episodes.guid,
        set: {
          title: sql`excluded.title`,
          season: sql`excluded.season`,
          number: sql`excluded.number`,
          publishedAt: sql`excluded.published_at`,
          durationSeconds: sql`excluded.duration_seconds`,
          imageUrl: sql`excluded.image_url`,
          audioUrl: sql`excluded.audio_url`,
          rssDescription: sql`excluded.rss_description`,
        },
      });
  }

  const [{ after }] = await db.select({ after: count() }).from(episodes);
  return { inFeed: feedEpisodes.length, created: after - before };
}
