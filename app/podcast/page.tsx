import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Podcast",
  description: "La recette, le podcast de l'alimentation durable.",
};

export default function PodcastPage() {
  return (
    <PageIntro title="La recette Podcast">
      <p>Liste des épisodes avec filtre par saison (import RSS Ausha à venir).</p>
    </PageIntro>
  );
}
