import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { syncPodcastEpisodes } from "@/lib/podcast-sync";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  const result = await syncPodcastEpisodes(db);
  revalidatePath("/podcast");
  revalidatePath("/podcast/[saison]/[slug]", "page");
  revalidatePath("/");

  return Response.json(result);
}
