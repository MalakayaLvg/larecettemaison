import Image from "next/image";
import Link from "next/link";
import { type ArticleListItem, articleHref } from "@/lib/articles";
import { articleCategories } from "@/lib/site";

// Figma "Card" of the blog (V4, node 298:975): white card with the cut-out shadow, green slot
// while the article has no cover.
export function ArticleCard({ article }: { article: ArticleListItem }) {
  const cover = typeof article.cover === "object" ? article.cover : null;

  return (
    <Link
      href={articleHref(article)}
      className="group flex h-full flex-col overflow-hidden border-2 border-ink bg-white shadow-cut transition-transform hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden bg-brand lg:h-[300px]">
        {cover?.url && (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 lg:p-8">
        <p className="text-lg leading-[1.4] font-semibold text-ink-soft">
          {articleCategories[article.category]}
          {article.episode && " · Extrait du podcast"}
        </p>
        <h3 className="font-display text-2xl leading-[1.25] font-bold group-hover:underline">{article.title}</h3>
        {article.excerpt && <p className="text-lg leading-[1.4] font-semibold text-ink-soft">{article.excerpt}</p>}
      </div>
    </Link>
  );
}
