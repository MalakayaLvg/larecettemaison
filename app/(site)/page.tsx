import { ActionFields } from "@/components/home/ActionFields";
import { BowlCta } from "@/components/home/BowlCta";
import { FeaturedExperiences } from "@/components/home/FeaturedExperiences";
import { Hero } from "@/components/home/Hero";
import { MissionSection } from "@/components/home/MissionSection";
import { PodcastFeature } from "@/components/home/PodcastFeature";
import { PodcastStats } from "@/components/home/PodcastStats";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TopicsBand } from "@/components/home/TopicsBand";
import { UpcomingSessions } from "@/components/home/UpcomingSessions";

// Figma "Accueil — UI Desktop 1920 · V3" (node 129:90). Header (01) and footer (11) are in the
// site layout.

export default function HomePage() {
  return (
    <>
      {/* 02 — Hero, 02b — Bandeau rubriques */}
      <Hero />
      <TopicsBand />

      {/* 03 — Mission */}
      <MissionSection />

      {/* 04 — Champs d'action */}
      <ActionFields />

      {/* 05 — Expériences à la une */}
      <FeaturedExperiences />

      {/* 06 — Prochaines sessions */}
      <UpcomingSessions allDatesHref="/experiences" />

      {/* 07 — Podcast à la une */}
      <PodcastFeature />

      {/* 08 — Chiffres podcast */}
      <PodcastStats />

      {/* 09 — Avis */}
      <TestimonialsSection />

      {/* 10 — CTA final */}
      <BowlCta />
    </>
  );
}
