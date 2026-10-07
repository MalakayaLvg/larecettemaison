import { getPayloadClient } from "@/lib/payload";

export async function getTestimonials(limit = 3) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "testimonials", sort: "-createdAt", limit });
  return docs;
}
