import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Section } from "@/components/home/Section";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getArticles } from "@/lib/articles";
import { articleCategories, isArticleCategory } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils, recettes et rencontres pour mieux manger : alimentation saine et durable, consommation responsable, produits locaux et de saison.",
};

// Layout and copy from the Figma wireframe "Blog — Desktop 1920" (node 14:276).

const chipClassName = "block rounded-full px-4 py-2 font-medium";

export default async function BlogPage(props: PageProps<"/blog">) {
  const { categorie } = await props.searchParams;
  const selected = isArticleCategory(categorie) ? categorie : undefined;
  const articles = await getArticles(selected);

  return (
    <>
      {/* 02 — Hero */}
      <section className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-center sm:py-24">
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">
          Le blog de l&apos;alimentation durable
        </h1>
        <p className="text-lg opacity-80">
          Conseils, recettes et rencontres pour mieux manger : alimentation saine et durable,
          consommation responsable, produits locaux et de saison. Nos articles prolongent les épisodes
          du podcast La Recette et les expériences culinaires à Lyon.
        </p>
      </section>

      {/* 03 — Articles */}
      <section id="articles" className="scroll-mt-8 bg-foreground/[0.04]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 py-16 sm:py-24">
          <nav aria-label="Filtrer par catégorie">
            <ul className="flex flex-wrap gap-3">
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
            <p className="opacity-70">Aucun article pour le moment.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article.slug}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 04 — Newsletter */}
      <Section>
        <div className="mx-auto max-w-xl space-y-8 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">
            Les ingrédients du changement, dans votre boîte mail
          </h2>
          <div className="text-left">
            <NewsletterForm id="newsletter-blog" />
          </div>
        </div>
      </Section>
    </>
  );
}

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
        className={`${chipClassName} ${
          active ? "bg-foreground text-background" : "bg-background hover:bg-foreground/10"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
