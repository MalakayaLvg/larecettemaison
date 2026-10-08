import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/AudioPlayer";
import { EpisodeCard } from "@/components/EpisodeCard";
import { BowlCta } from "@/components/home/BowlCta";
import { FormatCard } from "@/components/home/FormatCard";
import {
  accentButtonClassName,
  buttonClassName,
  containerClassName,
  darkButtonClassName,
  eyebrowClassName,
  SectionHeading,
  SlopeCut,
  slopedSectionClassName,
  Sticker,
} from "@/components/home/Section";
import { experienceFormats } from "@/lib/content";
import { cleanRssDescription, toExcerpt } from "@/lib/episode-description";
import {
  formatDuration,
  getEpisode,
  getOtherEpisodes,
  parseSeasonSegment,
} from "@/lib/episodes";
import { podcastPlatforms } from "@/lib/site";

// Figma "Fiche épisode — UI Desktop 1920" (node 242:340). Header (01) and footer (07) are in the
// site layout. Each section ends with a slanted cut in the colour of the next one.

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

// Figma "Méta": lime label like the eyebrow sticker, without the tilt.
const metaClassName = `${eyebrowClassName} rounded-[4px] border-2 border-ink bg-accent px-3.5 py-1.5 font-bold`;

const shortDate = (date: string) => new Date(date).toLocaleDateString("fr-FR");

export default async function EpisodePage(props: Props) {
  const episode = await findEpisode(props);
  const otherEpisodes = await getOtherEpisodes(episode.slug, 3);
  const duration = formatDuration(episode.durationSeconds);
  // Episode-specific links when filled in the admin, otherwise the show's pages.
  const episodeLinks = [
    { label: "Spotify", href: episode.spotifyUrl },
    { label: "Apple Podcasts", href: episode.appleUrl },
    { label: "Deezer", href: episode.deezerUrl },
    { label: "YouTube", href: episode.youtubeUrl },
  ];
  const platforms = episodeLinks.map((link) => ({
    label: link.label,
    href: link.href || podcastPlatforms.find((platform) => platform.label === link.label)!.href,
  }));
  const extracts = episode.extracts ?? [];

  return (
    <>
      {/* 02 — Lecteur. Positions in the visual are percentages of the 660×640 design box. */}
      <section className="relative overflow-hidden bg-brand">
        <Image
          src="/deco/tomate-illustree.svg"
          alt=""
          width={316}
          height={400}
          className="pointer-events-none absolute -top-[150px] -right-[88px] hidden w-[200px] -rotate-15 sm:block lg:w-[316px]"
        />

        <div
          className={`${containerClassName} relative grid items-start gap-16 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[1004fr_660fr] lg:gap-24 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
        >
          <div className="flex flex-col items-start gap-7">
            <Sticker>
              <Link href="/podcast" className="hover:underline">
                Podcast
              </Link>{" "}
              · Saison {episode.season}
              {episode.number && ` · Épisode ${episode.number}`}
            </Sticker>
            <h1 className="font-display text-[clamp(2.5rem,3.75vw,4.5rem)] leading-[0.95] font-extrabold">
              {episode.title}
            </h1>
            <p className="flex flex-wrap gap-4">
              {duration && <span className={metaClassName}>{duration}</span>}
              <time dateTime={episode.publishedAt} className={metaClassName}>
                {shortDate(episode.publishedAt)}
              </time>
            </p>
            <EpisodeDescription summary={episode.summary} rssDescription={episode.rssDescription} />
            <nav aria-label="Écouter sur">
              <ul className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <li key={platform.label}>
                    <a
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={darkButtonClassName}
                    >
                      {platform.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mx-auto flex w-full max-w-[660px] flex-col gap-6 lg:sticky lg:top-8">
            <div className="relative mt-[12%] aspect-[660/640] w-full lg:mt-0">
              <div className="absolute -top-[11.5%] left-[6.1%] aspect-square w-[81.8%] -rotate-[4.05deg] overflow-hidden bg-brand-subtle">
                {episode.imageUrl && (
                  <Image
                    src={episode.imageUrl}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 30vw, 80vw"
                    className="object-cover"
                  />
                )}
              </div>
              <Image
                src="/deco/bol-podcast.svg"
                alt=""
                width={640}
                height={206}
                className="absolute top-[64.06%] left-0 w-[96.97%]"
              />
            </div>
            <AudioPlayer src={episode.audioUrl} title={episode.title} />
          </div>
        </div>

        <SlopeCut color={extracts.length > 0 ? "vert-clair" : "blanc"} />
      </section>

      {/* 03 — Extraits */}
      {extracts.length > 0 && (
        <section className={`${slopedSectionClassName} bg-brand-subtle`}>
          <div className={`${containerClassName} relative flex flex-col gap-12`}>
            <SectionHeading eyebrow="Extraits" title="Les extraits de l'épisode, pour se mettre en bouche" />
            <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {extracts.map((extract) => {
                const extractDuration = formatDuration(extract.durationSeconds);
                const extractTitle = `${extract.number ? `Extrait ${extract.number} : ` : ""}${extract.title}`;
                return (
                  <li
                    key={extract.guid}
                    className="flex flex-col gap-4 border-2 border-ink bg-white p-6 shadow-cut lg:p-8"
                  >
                    <h3 className="font-display text-2xl leading-[1.25] font-bold">{extractTitle}</h3>
                    <p className="flex-1 text-lg leading-[1.4] font-semibold text-ink-soft">
                      {extractDuration && `${extractDuration} · `}
                      <time dateTime={extract.publishedAt}>{shortDate(extract.publishedAt)}</time>
                    </p>
                    <AudioPlayer src={extract.audioUrl} title={extractTitle} />
                  </li>
                );
              })}
            </ul>
          </div>
          <SlopeCut color="blanc" />
        </section>
      )}

      {/* 04 — De l'écoute à l'assiette */}
      <section className={slopedSectionClassName}>
        <div className={`${containerClassName} relative flex flex-col items-start gap-12`}>
          <SectionHeading
            eyebrow="Les expériences"
            title="De l'écoute à l'assiette : vivez nos expériences à Lyon"
          />
          <ul className="grid w-full gap-8 md:grid-cols-3">
            {experienceFormats.map((format) => (
              <li key={format.type}>
                <FormatCard format={format} title={format.longTitle} />
              </li>
            ))}
          </ul>
          <Link href="/devis" className={buttonClassName}>
            Demander un devis
          </Link>
        </div>
        <SlopeCut color={otherEpisodes.length > 0 ? "vert" : "vert-clair"} />
      </section>

      {/* 05 — Autres épisodes */}
      {otherEpisodes.length > 0 && (
        <section className={`${slopedSectionClassName} bg-brand`}>
          <div className={`${containerClassName} relative flex flex-col items-start gap-12`}>
            <SectionHeading
              onDark
              eyebrow="Le podcast"
              title="Encore faim ? D'autres épisodes du podcast La Recette à écouter"
            />
            <ul className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {otherEpisodes.map((other) => (
                <li key={other.slug}>
                  <EpisodeCard episode={other} cta="En savoir plus" />
                </li>
              ))}
            </ul>
            <Link href="/podcast" className={accentButtonClassName}>
              Voir tous les épisodes
            </Link>
          </div>
          <SlopeCut color="vert-clair" />
        </section>
      )}

      {/* 10 — CTA final */}
      <BowlCta
        theme="illustre"
        poster={false}
        title="Un team building écoresponsable à Lyon : mettez vos équipes à la même table"
      />
    </>
  );
}

// The hand-written summary (plain text, paragraphs separated by blank lines) wins over the
// description synced from Ausha.
function EpisodeDescription({
  summary,
  rssDescription,
}: {
  summary?: string | null;
  rssDescription?: string | null;
}) {
  // Figma: Nunito Medium 22px, 16px between paragraphs. Child elements are styled from the
  // container since the Ausha HTML isn't ours (see lib/prose.ts).
  const className =
    "space-y-4 text-lg leading-[1.2] font-medium lg:text-[22px] [&_a]:underline [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5";
  if (summary) {
    return (
      <div className={className}>
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
      className={className}
      // Sanitized in cleanRssDescription: only basic formatting tags and http(s)/mailto links.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
