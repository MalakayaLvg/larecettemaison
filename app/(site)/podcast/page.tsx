import type { Metadata } from "next";
import Link from "next/link";
import { EpisodeCard } from "@/components/EpisodeCard";
import { PageIntro } from "@/components/PageIntro";
import { getEpisodeList, getSeasons } from "@/lib/episodes";

export const metadata: Metadata = {
  title: "Podcast",
  description: "La recette, le podcast de l'alimentation durable.",
};

export default async function PodcastPage(props: PageProps<"/podcast">) {
  const { saison } = await props.searchParams;
  const seasons = await getSeasons();
  // Unknown or missing ?saison= falls back to all episodes.
  const selected = seasons.find((season) => String(season) === saison);
  const episodes = await getEpisodeList(selected);

  return (
    <>
      <PageIntro title="La recette Podcast">
        <p>
          Les rencontres avec celles et ceux qui font bouger l&apos;alimentation
          durable.
        </p>
      </PageIntro>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <nav aria-label="Filtrer par saison" className="mb-8">
          <ul className="flex flex-wrap gap-2 text-sm">
            <SeasonLink href="/podcast" active={!selected}>
              Toutes
            </SeasonLink>
            {seasons.map((season) => (
              <SeasonLink
                key={season}
                href={`/podcast?saison=${season}`}
                active={season === selected}
              >
                Saison {season}
              </SeasonLink>
            ))}
          </ul>
        </nav>

        {episodes.length === 0 ? (
          <p className="opacity-70">Aucun épisode pour le moment.</p>
        ) : (
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <li key={episode.slug}>
                <EpisodeCard episode={episode} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function SeasonLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`block rounded-full border px-4 py-1.5 ${
          active
            ? "border-foreground bg-foreground text-background"
            : "border-black/15 hover:border-foreground"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
