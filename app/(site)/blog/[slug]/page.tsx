import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/home/Section";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getArticle } from "@/lib/articles";
import { episodeHref, formatDate } from "@/lib/episodes";
import { proseClassName } from "@/lib/prose";
import { articleCategories } from "@/lib/site";

// No Figma frame for the article page: built with the blog list's blocks.

type Props = PageProps<"/blog/[slug]">;

async function findArticle(props: Props) {
  const { slug } = await props.params;
  const article = await getArticle(slug);
  if (!article) notFound();
  return article;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const article = await findArticle(props);
  const cover = typeof article.cover === "object" ? article.cover : null;
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      images: cover?.url ? [cover.url] : undefined,
    },
  };
}

export default async function ArticlePage(props: Props) {
  const article = await findArticle(props);
  const cover = typeof article.cover === "object" ? article.cover : null;
  const episode = typeof article.episode === "object" ? article.episode : null;

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <p className="font-medium opacity-70">
          <Link href={`/blog?categorie=${article.category}#articles`} className="hover:underline">
            {articleCategories[article.category]}
          </Link>{" "}
          · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl sm:leading-[60px]">{article.title}</h1>
        <p className="mt-6 text-xl opacity-80">{article.excerpt}</p>

        {cover?.url && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg">
            <Image src={cover.url} alt={cover.alt} fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
          </div>
        )}

        <RichText data={article.content} className={`mt-10 text-lg ${proseClassName}`} />

        {episode && (
          <aside className="mt-12 rounded-lg border border-black/15 p-6">
            <p className="text-sm font-medium opacity-70">Extrait du podcast La Recette</p>
            <Link href={episodeHref(episode)} className="mt-2 block text-xl font-black hover:underline">
              Écouter l&apos;épisode : {episode.title}
            </Link>
          </aside>
        )}

        <p className="mt-12">
          <Link href="/blog" className="font-medium opacity-70 hover:underline">
            ← Tous les articles
          </Link>
        </p>
      </article>

      <Section muted>
        <div className="mx-auto max-w-xl space-y-8 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">
            Les ingrédients du changement, dans votre boîte mail
          </h2>
          <div className="text-left">
            <NewsletterForm id="newsletter-article" />
          </div>
        </div>
      </Section>
    </>
  );
}
