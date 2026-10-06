import { getPayload } from "payload";
import { syncPodcastEpisodes } from "@/lib/podcast-sync";

process.loadEnvFile(".env.local");

async function main() {
  // Imported after the env file is loaded: the config reads DATABASE_URL when evaluated.
  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });
  try {
    const result = await syncPodcastEpisodes(payload);
    console.log(`${result.inFeed} épisodes dans le flux, ${result.created} nouveaux en base.`);
  } finally {
    await payload.destroy();
  }
}

// Payload keeps handles open even after destroy(), so exit explicitly.
main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
