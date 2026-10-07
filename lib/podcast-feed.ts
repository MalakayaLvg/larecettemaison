import { XMLParser } from "fast-xml-parser";
import { slugify } from "@/lib/slugify";

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

export type FeedExtract = {
  guid: string;
  // Without the "[EXTRAIT n - Guest] -" prefix.
  title: string;
  number: number | null;
  publishedAt: Date;
  durationSeconds: number | null;
  audioUrl: string;
  // Slugified raw title, used to find the episode the extract comes from.
  matchText: string;
};

export async function fetchPodcastFeed(url = PODCAST_FEED_URL) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Flux RSS indisponible (${res.status})`);

  const parser = new XMLParser({
    ignoreAttributes: false,
    isArray: (name) => name === "item",
  });
  const items: RawItem[] = parser.parse(await res.text()).rss.channel.item ?? [];

  const episodes = withUniqueSlugs(
    withoutChaptersOfFullEpisodes(items.filter(isMainEpisode).map(toEpisode)),
  );
  const extracts = items.filter(isExtract).map(toExtract);
  return { episodes, extracts };
}

function isExtract(item: RawItem): boolean {
  return /\[\s*EXTRAIT/i.test(String(item.title ?? "")) && Boolean(item.enclosure?.["@_url"]);
}

// "REPLAY - [EXTRAIT 2 - Camille Labro ] - Comment éduquer…" -> number 2, title "Comment éduquer…"
function toExtract(item: RawItem): FeedExtract {
  const raw = String(item.title).trim();
  const number = /\[\s*EXTRAIT\s*(\d+)/i.exec(raw)?.[1];
  const title = raw
    .replace(/^.*?\[\s*EXTRAIT[^\]]*\]/i, "")
    .replace(/^[\s\-–:]+/, "")
    .trim();
  const guid = typeof item.guid === "object" ? item.guid["#text"] : item.guid;
  return {
    guid: String(guid ?? item.enclosure?.["@_url"]),
    title: title || raw,
    number: number ? Number(number) : null,
    publishedAt: new Date(item.pubDate ?? Date.now()),
    durationSeconds: parseDuration(item["itunes:duration"]),
    audioUrl: item.enclosure!["@_url"]!,
    matchText: slugify(raw),
  };
}

// The guest's name starts the episode title: "Jean Marie Pédron, cueilleur d'algues : …"
// or "Etienne Rozand - Hape & Lipopette : …".
function guestKey(title: string) {
  return slugify(title.split(/[,:]| - /)[0]);
}

// Each extract goes to the most recent episode published before it whose guest is named in
// the extract's title. Returns extracts grouped by episode guid, oldest first.
export function groupExtractsByEpisode(
  episodes: Pick<FeedEpisode, "guid" | "title" | "publishedAt">[],
  extracts: FeedExtract[],
) {
  const byEpisode = new Map<string, FeedExtract[]>();
  const candidates = episodes
    .map((episode) => ({ ...episode, key: guestKey(episode.title) }))
    // Two words at least ("prenom-nom"), so a generic one-word title can't match everything.
    .filter((episode) => episode.key.includes("-"))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  for (const extract of extracts) {
    const episode = candidates.find(
      (candidate) =>
        candidate.publishedAt <= extract.publishedAt && extract.matchText.includes(candidate.key),
    );
    if (!episode) continue;
    byEpisode.set(episode.guid, [...(byEpisode.get(episode.guid) ?? []), extract]);
  }
  for (const list of byEpisode.values()) {
    list.sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime());
  }
  return byEpisode;
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


function withUniqueSlugs(episodes: FeedEpisode[]): FeedEpisode[] {
  const seen = new Map<string, number>();
  return episodes.map((episode) => {
    const count = (seen.get(episode.slug) ?? 0) + 1;
    seen.set(episode.slug, count);
    return count === 1 ? episode : { ...episode, slug: `${episode.slug}-${count}` };
  });
}
