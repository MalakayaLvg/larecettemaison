import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/components/home/Placeholder";
import { cardClassName } from "@/components/home/Section";
import { type ArticleListItem, articleHref } from "@/lib/articles";
import { articleCategories } from "@/lib/site";

export function ArticleCard({ article }: { article: ArticleListItem }) {
  const cover = typeof article.cover === "object" ? article.cover : null;

  return (
    <Link href={articleHref(article)} className={`${cardClassName} group h-full`}>
      {cover?.url ? (
        <div className="relative h-64 overflow-hidden">
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ) : (
        <Placeholder label="Image — Couverture d'article" className="h-64 rounded-none" />
      )}
      <div className="flex flex-1 flex-col gap-3 px-6 pt-3 pb-6">
        <p className="text-sm font-medium opacity-70">
          {articleCategories[article.category]}
          {article.episode && " · Extrait du podcast"}
        </p>
        <h3 className="text-2xl font-black leading-snug group-hover:underline">{article.title}</h3>
        <p className="opacity-80">{article.excerpt}</p>
      </div>
    </Link>
  );
}
