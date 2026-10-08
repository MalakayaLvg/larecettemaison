import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { BowlCta } from "@/components/home/BowlCta";
import { containerClassName, SlopeCut, slopedSectionClassName, Sticker } from "@/components/home/Section";
import { getArticles } from "@/lib/articles";
import { articleCategories, isArticleCategory } from "@/lib/site";
import heroPhoto from "@/public/images/blog/hero.jpg";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils, recettes et rencontres pour mieux manger : alimentation saine et durable, consommation responsable, produits locaux et de saison.",
};

// Figma "Blog — UI Desktop 1920" (node 298:930). Header (01) and footer (05) are in the site
// layout. Each section ends with a slanted cut in the colour of the next one.

export default async function BlogPage(props: PageProps<"/blog">) {
  const { categorie } = await props.searchParams;
  const selected = isArticleCategory(categorie) ? categorie : undefined;
  const articles = await getArticles(selected);

  return (
    <>
      {/* 02 — Hero. Positions in the visual are percentages of the 660×640 design box. */}
      <section className="relative overflow-hidden bg-brand">
        <div
          className={`${containerClassName} relative grid items-center gap-12 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[1036fr_660fr] lg:gap-16 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
        >
          <div className="flex flex-col items-start gap-8">
            <Sticker>Blog</Sticker>
            <h1 className="font-display text-[clamp(2.75rem,5vw,6rem)] leading-[0.95] font-extrabold">
              Le blog de l&apos;alimentation durable
            </h1>
            <p className="text-lg leading-[1.2] lg:text-[22px]">
              Conseils, recettes et rencontres pour mieux manger : alimentation saine et durable,
              consommation responsable, produits locaux et de saison. Nos articles prolongent les
              épisodes du podcast La Recette et les expériences culinaires à Lyon.
            </p>
          </div>

          <div className="relative mx-auto mt-[6%] aspect-[660/640] w-full max-w-[660px] lg:mt-0">
            <div className="absolute -top-[5.6%] left-[9.1%] aspect-square w-[81.8%] rotate-4 overflow-hidden">
              <Image
                src={heroPhoto}
                alt="Bocaux, épices et légumes de saison posés sur une table d'atelier"
                priority
                fill
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="object-cover"
              />
            </div>
            <Image
              src="/deco/bol-podcast.svg"
              alt=""
              width={640}
              height={206}
              className="absolute top-[64.06%] left-0 w-[96.97%]"
            />
          </div>
        </div>

        <SlopeCut color="blanc" />
        <Image
          src="/deco/tomate-illustree.svg"
          alt=""
          width={229}
          height={290}
          className="pointer-events-none absolute -bottom-[90px] -left-8 hidden w-[150px] -rotate-10 sm:block lg:w-[229px]"
        />
      </section>

      {/* 03 — Articles */}
      <section id="articles" className={`${slopedSectionClassName} scroll-mt-8`}>
        <div className={`${containerClassName} relative flex flex-col gap-14`}>
          <nav aria-label="Filtrer par catégorie">
            <ul className="flex flex-wrap gap-4">
              <CategoryChip href="/blog#articles" active={!selected}>
                Tous les articles
              </CategoryChip>
              {Object.entries(articleCategories).map(([value, label]) => (
                <CategoryChip key={value} href={`/blog?categorie=${value}#articles`} active={value === selected}>
                  {label}
                </CategoryChip>
              ))}
            </ul>
          </nav>

          {articles.length === 0 ? (
            <p className="text-lg">Aucun article pour le moment.</p>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article.slug}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <SlopeCut color="vert-clair" />
      </section>

      {/* 10 — CTA final */}
      <BowlCta
        theme="illustre"
        poster={false}
        title="Un team building écoresponsable à Lyon : mettez vos équipes à la même table"
      />
    </>
  );
}

// Figma "filter": navy pill when active, white otherwise.
function CategoryChip({
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
        className={`block rounded-full border-2 border-ink px-6 py-2.5 text-lg leading-[1.4] font-semibold transition-colors ${
          active ? "bg-ink text-white" : "bg-white hover:bg-ink hover:text-white"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
