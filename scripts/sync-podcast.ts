import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { syncPodcastEpisodes } from "@/lib/podcast-sync";

process.loadEnvFile(".env.local");

async function main() {
  const client = postgres(process.env.DATABASE_URL!);
  try {
    const result = await syncPodcastEpisodes(drizzle(client, { casing: "snake_case" }));
    console.log(`${result.inFeed} épisodes dans le flux, ${result.created} nouveaux en base.`);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
