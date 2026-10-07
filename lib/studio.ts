import { getPayloadClient } from "@/lib/payload";

export async function getStudioOffers() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "studio-offers", sort: "createdAt", pagination: false });
  return docs;
}
