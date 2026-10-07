import type { Metadata } from "next";
import Link from "next/link";
import { EpisodeCard } from "@/components/EpisodeCard";
import { CtaSection } from "@/components/home/CtaSection";
import { Placeholder } from "@/components/home/Placeholder";
import { cardClassName, ghostButtonClassName, Section, StatCard } from "@/components/home/Section";
import { listenerReviews, podcastStats } from "@/lib/content";
import { getEpisodeList, getSeasons } from "@/lib/episodes";
import { podcastPlatforms } from "@/lib/site";

export const metadata: Metadata = {
  title: "Podcast",
  description: "La Recette, le podcast de l'alimentation durable.",
};

// Layout and copy from the Figma wireframe "Podcast — Desktop 1920" (node 1:324).

const PAGE_SIZE = 9;

const chipClassName = "block rounded-full px-4 py-2 font-medium";

export default async function PodcastPage(props: PageProps<"/podcast">) {
  const { saison, nombre } = await props.searchParams;
  const seasons = await getSeasons();
  // Unknown or missing ?saison= falls back to all episodes.
  const selected = seasons.find((season) => String(season) === saison);
  // "Voir plus" adds PAGE_SIZE episodes through ?nombre= (no client-side JS needed).
  const count = Math.max(PAGE_SIZE, Math.min(Number(nombre) || PAGE_SIZE, 200));
  const { episodes, hasMore } = await getEpisodeList(selected, count);

  const listHref = (params: { saison?: number; nombre?: number }) => {
    const query = new URLSearchParams();
    if (params.saison) query.set("saison", String(params.saison));
    if (params.nombre) query.set("nombre", String(params.nombre));
    const search = query.toString();
    return `/podcast${search ? `?${search}` : ""}#episodes`;
  };

  return (
    <>
      {/* 02 — Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="font-medium opacity-70">La Recette, les ingrédients du changement</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">
              La Recette, le podcast de l&apos;alimentation durable
            </h1>
            <p className="max-w-[720px] text-lg opacity-80">
              Dans ce podcast, Julie Van Ossel, journaliste, vous emmène à la rencontre de celles et
              ceux qui façonnent l&apos;alimentation de demain : des chefs, productrices, artisans,
              entrepreneuses qui bousculent les codes pour réinventer notre façon de manger.
            </p>
            <p className="max-w-[720px] text-lg opacity-80">
              Un épisode par mois depuis 2023, trois saisons à ce jour : chaque épisode est enregistré
              en présentiel et s&apos;ouvre sur un reportage immersif.
            </p>
          </div>
          <nav aria-label="Écouter sur">
            <ul className="flex flex-wrap gap-3">
              {podcastPlatforms.map((platform) => (
                <li key={platform.label}>
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${chipClassName} bg-foreground/[0.06] hover:bg-foreground/10`}
                  >
                    {platform.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Placeholder
          label="Image — Visuel du podcast La recette (logo vert actuel)"
          className="h-80 lg:h-[600px]"
        />
      </section>

      {/* 03 — Liste des épisodes */}
      <section id="episodes" className="scroll-mt-8 bg-foreground/[0.04]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 py-16 sm:py-24">
          <h2 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">
            Tous nos podcasts sur l&apos;alimentation durable
          </h2>

          <nav aria-label="Filtrer par saison">
            <ul className="flex flex-wrap gap-3">
              <SeasonChip href={listHref({})} active={!selected}>
                Toutes
              </SeasonChip>
              {[...seasons].reverse().map((season) => (
                <SeasonChip key={season} href={listHref({ saison: season })} active={season === selected}>
                  Saison {season}
                </SeasonChip>
              ))}
            </ul>
          </nav>

          {episodes.length === 0 ? (
            <p className="opacity-70">Aucun épisode pour le moment.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => (
                <li key={episode.slug}>
                  <EpisodeCard episode={episode} />
                </li>
              ))}
            </ul>
          )}

          {hasMore && (
            <Link
              href={listHref({ saison: selected, nombre: count + PAGE_SIZE })}
              scroll={false}
              className={ghostButtonClassName}
            >
              Voir plus d&apos;épisodes
            </Link>
          )}
        </div>
      </section>

      {/* 04 — Chiffres clés */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {podcastStats.map((stat) => (
            <StatCard key={stat.value} {...stat} />
          ))}
        </div>
      </Section>

      {/* 05 — Avis auditeurs */}
      <Section muted title="Ce qu'en disent les auditeur·ices">
        <ul className="grid gap-6 md:grid-cols-3">
          {listenerReviews.map((review) => (
            <li key={review.author} className={cardClassName}>
              <figure className="space-y-3 p-6">
                <blockquote className="opacity-80">« {review.text} »</blockquote>
                <figcaption className="font-medium opacity-70">{review.author}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      {/* 06 — Sponsoring */}
      <CtaSection
        eyebrow="Offre Podcast"
        title="Amplifiez votre impact grâce au podcast"
        text="La recette met son expertise autour de la création éditoriale, la réalisation audio et vidéo au service des acteur·ices de l'alimentation durable : entreprises & organisations."
        primary={{ href: "/studio#devis", label: "Demander un devis" }}
      />
    </>
  );
}

function SeasonChip({
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
        scroll={false}
        aria-current={active ? "page" : undefined}
        className={`${chipClassName} ${
          active ? "bg-foreground text-background" : "bg-background hover:bg-foreground/10"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
