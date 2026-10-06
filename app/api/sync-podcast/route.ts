import { revalidatePath } from "next/cache";
import { getPayloadClient } from "@/lib/payload";
import { syncPodcastEpisodes } from "@/lib/podcast-sync";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  const result = await syncPodcastEpisodes(await getPayloadClient());
  // Episodes show up on the home page and the podcast pages.
  revalidatePath("/(site)", "layout");

  return Response.json(result);
}
