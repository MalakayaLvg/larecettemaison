import type { Payload } from "payload";
import { fetchMainEpisodes } from "@/lib/podcast-feed";

// Idempotent (keyed on guid). Never overwrites slug or the fields edited in the admin
// (summary, guest, platform links, featured).
export async function syncPodcastEpisodes(payload: Payload) {
  const feedEpisodes = await fetchMainEpisodes();
  const { docs: existing } = await payload.find({
    collection: "episodes",
    select: { guid: true, slug: true },
    pagination: false,
  });
  const idByGuid = new Map(existing.map((doc) => [doc.guid, doc.id]));
  const takenSlugs = new Set(existing.map((doc) => doc.slug));

  let created = 0;
  for (const { slug, guid, publishedAt, ...synced } of feedEpisodes) {
    const data = { ...synced, publishedAt: publishedAt.toISOString() };
    const id = idByGuid.get(guid);
    if (id !== undefined) {
      await payload.update({ collection: "episodes", id, data });
      continue;
    }

    const uniqueSlug = nextFreeSlug(slug, takenSlugs);
    takenSlugs.add(uniqueSlug);
    await payload.create({ collection: "episodes", data: { ...data, guid, slug: uniqueSlug } });
    created++;
  }

  return { inFeed: feedEpisodes.length, created };
}

// A new episode can share its title (and so its slug) with one already published.
function nextFreeSlug(slug: string, taken: Set<string>) {
  if (!taken.has(slug)) return slug;
  let suffix = 2;
  while (taken.has(`${slug}-${suffix}`)) suffix++;
  return `${slug}-${suffix}`;
}
