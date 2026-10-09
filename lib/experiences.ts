import { cache } from "react";
import type { Media } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";
import type { ExperienceType } from "@/lib/site";

// depth: 1 populates `images` with the Media documents (url, alt, size) instead of ids.

export async function getExperiencesByType(type: ExperienceType) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "experiences",
    where: { type: { equals: type } },
    sort: "title",
    pagination: false,
    depth: 1,
    select: {
      slug: true,
      type: true,
      title: true,
      duration: true,
      location: true,
      price: true,
      excerpt: true,
      images: true,
    },
  });
  return docs;
}

// Home page "Prochaines sessions": the most recently updated experiences.
export async function getHomeExperiences(limit = 3) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "experiences",
    sort: "-updatedAt",
    limit,
    select: {
      slug: true,
      type: true,
      title: true,
      duration: true,
      location: true,
      price: true,
      availability: true,
    },
  });
  return docs;
}

// "Nos autres ateliers…" at the bottom of an experience page: same type, current one excluded.
export async function getOtherExperiences(type: ExperienceType, excludeSlug: string, limit = 2) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "experiences",
    where: { and: [{ type: { equals: type } }, { slug: { not_equals: excludeSlug } }] },
    sort: "-updatedAt",
    limit,
    depth: 1,
    select: {
      slug: true,
      type: true,
      title: true,
      duration: true,
      location: true,
      price: true,
      excerpt: true,
      images: true,
    },
  });
  return docs;
}

export type ExperienceListItem = Awaited<ReturnType<typeof getExperiencesByType>>[number];

// Wrapped in cache() so generateMetadata and the page share a single query.
export const getExperience = cache(async (type: ExperienceType, slug: string) => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "experiences",
    where: { type: { equals: type }, slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0];
});

export function experienceHref(experience: { type: string; slug: string }) {
  return `/experiences/${experience.type}/${experience.slug}`;
}

// Images whose upload was deleted come back as bare ids (or null): keep only usable ones.
export function populatedImages(images: (number | Media)[] | null | undefined) {
  return (images ?? []).filter(
    (image): image is Media & { url: string } => typeof image === "object" && Boolean(image?.url),
  );
}
