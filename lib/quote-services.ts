import "server-only";
import { getPayloadClient } from "@/lib/payload";
import { experienceTypes } from "@/lib/site";

export const OTHER_SERVICE = "autre";

// Options of the "Prestation" select: values are "experience:<slug>", "studio:<slug>" or "autre".
export async function getQuoteServices() {
  const payload = await getPayloadClient();
  const [experiences, studioOffers] = await Promise.all([
    payload.find({
      collection: "experiences",
      where: { onQuote: { equals: true } },
      select: { slug: true, title: true, type: true },
      sort: "title",
      pagination: false,
    }),
    payload.find({
      collection: "studio-offers",
      select: { slug: true, title: true },
      sort: "title",
      pagination: false,
    }),
  ]);

  return [
    {
      group: "Expériences",
      options: experiences.docs.map((doc) => ({
        id: doc.id,
        value: `experience:${doc.slug}`,
        label: `${doc.title} (${experienceTypes[doc.type].label})`,
      })),
    },
    {
      group: "Studio",
      options: studioOffers.docs.map((doc) => ({
        id: doc.id,
        value: `studio:${doc.slug}`,
        label: doc.title,
      })),
    },
  ].filter((group) => group.options.length > 0);
}

export type QuoteServiceGroup = Awaited<ReturnType<typeof getQuoteServices>>[number];
