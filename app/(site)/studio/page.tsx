import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Studio",
  description: "Sponsoring, production de podcasts et animation d'événements.",
};

export default function StudioPage() {
  return (
    <PageIntro title="La recette Studio">
      <p>Sponsoring (pré-roll, épisode partenaire), production audio/vidéo, animation et enregistrement d&apos;événements.</p>
    </PageIntro>
  );
}
