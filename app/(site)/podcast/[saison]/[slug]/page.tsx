import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EpisodeCard } from "@/components/EpisodeCard";
import { FormatCard } from "@/components/home/FormatCard";
import { Placeholder } from "@/components/home/Placeholder";
import { buttonClassName, cardClassName, Section } from "@/components/home/Section";
import { NewsletterForm } from "@/components/NewsletterForm";
import { experienceFormats } from "@/lib/content";
import { cleanRssDescription, toExcerpt } from "@/lib/episode-description";
import {
  formatDuration,
  getEpisode,
  getOtherEpisodes,
  parseSeasonSegment,
} from "@/lib/episodes";
import { proseClassName } from "@/lib/prose";
import { podcastPlatforms } from "@/lib/site";

// Layout from the Figma wireframe "Fiche épisode — Desktop 1920" (node 1:463).

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

const chipClassName = "block rounded-full bg-foreground/[0.06] px-4 py-2 font-medium hover:bg-foreground/10";

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
  const guestPhoto = typeof episode.guestPhoto === "object" ? episode.guestPhoto : null;
  const extracts = episode.extracts ?? [];

  return (
    <>
      {/* 02 — Lecteur */}
      <section className="bg-foreground/[0.04]">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-medium opacity-70">
                <Link href="/podcast" className="hover:underline">
                  Podcast
                </Link>{" "}
                · Saison {episode.season}
                {episode.number && ` · Épisode ${episode.number}`}
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl sm:leading-[60px]">{episode.title}</h1>
              <EpisodeDescription summary={episode.summary} rssDescription={episode.rssDescription} />
            </div>
            <p className="flex gap-6 font-medium opacity-70">
              {duration && <span>{duration}</span>}
              <time dateTime={episode.publishedAt}>{shortDate(episode.publishedAt)}</time>
            </p>
            <nav aria-label="Écouter sur">
              <ul className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <li key={platform.label}>
                    <a href={platform.href} target="_blank" rel="noopener noreferrer" className={chipClassName}>
                      {platform.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-4 lg:sticky lg:top-8">
            <div className="relative aspect-square overflow-hidden rounded bg-foreground/10">
              {episode.imageUrl && (
                <Image
                  src={episode.imageUrl}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <audio controls preload="none" src={episode.audioUrl} className="w-full">
              <a href={episode.audioUrl}>Télécharger l&apos;épisode</a>
            </audio>
          </div>
        </div>
      </section>

      {/* 03 — Invité·e */}
      {episode.guestName && episode.guestBio && (
        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {guestPhoto?.url ? (
              <div className="relative h-80 overflow-hidden rounded lg:h-[480px]">
                <Image
                  src={guestPhoto.url}
                  alt={guestPhoto.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <Placeholder label={`Image — Portrait de ${episode.guestName}`} className="h-80 lg:h-[480px]" />
            )}
            <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">
                Qui est {episode.guestName}
                {episode.guestRole && `, ${episode.guestRole}`} ?
              </h2>
              <p className="whitespace-pre-line text-lg opacity-80">{episode.guestBio}</p>
            </div>
          </div>
        </Section>
      )}

      {/* 04 — Extraits */}
      {extracts.length > 0 && (
        <Section muted title="Les extraits de l'épisode">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {extracts.map((extract) => {
              const extractDuration = formatDuration(extract.durationSeconds);
              return (
                <li key={extract.guid} className={`${cardClassName} gap-3 p-6`}>
                  <h3 className="text-xl font-black leading-snug">
                    {extract.number ? `Extrait ${extract.number} : ` : ""}
                    {extract.title}
                  </h3>
                  <p className="flex-1 font-medium opacity-70">
                    {extractDuration && `${extractDuration} · `}
                    <time dateTime={extract.publishedAt}>{shortDate(extract.publishedAt)}</time>
                  </p>
                  <audio controls preload="none" src={extract.audioUrl} className="w-full" />
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {/* 05 — De l'écoute à l'assiette */}
      <Section eyebrow="Les expériences" title="De l'écoute à l'assiette : vivez nos expériences à Lyon">
        <div className="grid gap-6 md:grid-cols-3">
          {experienceFormats.map((format) => (
            <FormatCard key={format.type} format={format} title={format.longTitle} />
          ))}
        </div>
        <div className="mt-12">
          <Link href="/devis" className={buttonClassName}>
            Demander un devis
          </Link>
        </div>
      </Section>

      {/* 06 — Autres épisodes */}
      {otherEpisodes.length > 0 && (
        <Section muted title="D'autres épisodes du podcast La Recette à écouter">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherEpisodes.map((other) => (
              <li key={other.slug}>
                <EpisodeCard episode={other} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 07 — Newsletter */}
      <Section>
        <div className="mx-auto max-w-xl space-y-8 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">
            Les ingrédients du changement, dans votre boîte mail
          </h2>
          <div className="text-left">
            <NewsletterForm id="newsletter-episode" />
          </div>
        </div>
      </Section>
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
  const className = `text-lg opacity-80 ${proseClassName}`;
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
