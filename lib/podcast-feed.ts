import { XMLParser } from "fast-xml-parser";

export const PODCAST_FEED_URL = "https://feed.ausha.co/Zg75JI109Rlm";

export type FeedEpisode = {
  guid: string;
  slug: string;
  title: string;
  season: number;
  number: number | null;
  publishedAt: Date;
  durationSeconds: number | null;
  imageUrl: string | null;
  audioUrl: string;
  rssDescription: string | null;
};

type RawItem = {
  title?: string | number;
  guid?: string | { "#text": string };
  link?: string;
  pubDate?: string;
  description?: string;
  "content:encoded"?: string;
  enclosure?: { "@_url"?: string };
  "itunes:image"?: { "@_href"?: string };
  "itunes:duration"?: string | number;
  "itunes:episodeType"?: string;
  "itunes:season"?: number;
  "itunes:episode"?: number;
};

export async function fetchMainEpisodes(
  url = PODCAST_FEED_URL,
): Promise<FeedEpisode[]> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Flux RSS indisponible (${res.status})`);

  const parser = new XMLParser({
    ignoreAttributes: false,
    isArray: (name) => name === "item",
  });
  const items: RawItem[] = parser.parse(await res.text()).rss.channel.item ?? [];

  const episodes = withoutChaptersOfFullEpisodes(
    items.filter(isMainEpisode).map(toEpisode),
  );
  return withUniqueSlugs(episodes);
}

// The feed mixes full interviews with extracts, replays, teasers, bonus chapters and a trailer.
function isMainEpisode(item: RawItem): boolean {
  const title = String(item.title ?? "");
  return (
    item["itunes:episodeType"] === "full" &&
    !/\[\s*EXTRAIT/i.test(title) &&
    !/^\s*(REPLAY|REDIFFUSION|TEASER)\b/i.test(title) &&
    !String(item.link ?? "").includes("/extrait")
  );
}

// Some interviews were published both as "CHAPITRE n - Guest" and "EPISODE COMPLET - Guest":
// keep only the full version. Interviews that only exist in chapters are kept as is.
function withoutChaptersOfFullEpisodes(episodes: FeedEpisode[]): FeedEpisode[] {
  const guestsWithFullEpisode = episodes
    .map((e) => /^\s*EPISODE COMPLET\s*-\s*([^,:]+)/i.exec(e.title)?.[1])
    .filter((guest): guest is string => Boolean(guest))
    .map(slugify);

  return episodes.filter(
    (e) =>
      !/^\s*CHAPITRE\b/i.test(e.title) ||
      !guestsWithFullEpisode.some((guest) => slugify(e.title).includes(guest)),
  );
}

function toEpisode(item: RawItem): FeedEpisode {
  const title = String(item.title).trim();
  const guid = typeof item.guid === "object" ? item.guid["#text"] : item.guid;
  const audioUrl = item.enclosure?.["@_url"];
  if (!guid || !audioUrl) throw new Error(`Épisode incomplet dans le flux : ${title}`);

  return {
    guid: String(guid),
    slug: slugify(title.split(":")[0]),
    title,
    season: Number(item["itunes:season"] ?? 1),
    number: item["itunes:episode"] ? Number(item["itunes:episode"]) : null,
    publishedAt: new Date(item.pubDate ?? Date.now()),
    durationSeconds: parseDuration(item["itunes:duration"]),
    imageUrl: item["itunes:image"]?.["@_href"] ?? null,
    audioUrl,
    rssDescription: item["content:encoded"] ?? item.description ?? null,
  };
}

// "06:48", "1:02:03" or a raw number of seconds.
function parseDuration(value: string | number | undefined): number | null {
  if (value === undefined || value === "") return null;
  return String(value)
    .split(":")
    .reduce((total, part) => total * 60 + Number(part), 0);
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&amp;/g, "et")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

function withUniqueSlugs(episodes: FeedEpisode[]): FeedEpisode[] {
  const seen = new Map<string, number>();
  return episodes.map((episode) => {
    const count = (seen.get(episode.slug) ?? 0) + 1;
    seen.set(episode.slug, count);
    return count === 1 ? episode : { ...episode, slug: `${episode.slug}-${count}` };
  });
}
