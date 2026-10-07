import { cache } from "react";
import type { Where } from "payload";
import { getPayloadClient } from "@/lib/payload";
import type { ArticleCategory } from "@/lib/site";

// The local API skips access control: drafts must be filtered out explicitly.
const published: Where = { _status: { equals: "published" } };

export async function getArticles(category?: ArticleCategory) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "articles",
    where: category ? { and: [published, { category: { equals: category } }] } : published,
    sort: "-publishedAt",
    pagination: false,
    depth: 1,
    select: { slug: true, title: true, excerpt: true, cover: true, category: true, episode: true, publishedAt: true },
  });
  return docs;
}

export type ArticleListItem = Awaited<ReturnType<typeof getArticles>>[number];

// Wrapped in cache() so generateMetadata and the page share a single query.
export const getArticle = cache(async (slug: string) => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "articles",
    where: { and: [published, { slug: { equals: slug } }] },
    limit: 1,
    depth: 1,
  });
  return docs[0];
});

export const articleHref = (article: { slug: string }) => `/blog/${article.slug}`;
