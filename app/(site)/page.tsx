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

// Figma "Accueil — UI Desktop 1920 · V4" (node 186:106). Header (01) and footer (11) are in the
// site layout. Each section ends with a slanted cut in the colour of the next one.

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
      <UpcomingSessions allDatesHref="/experiences" slope />

      {/* 07 — Podcast à la une */}
      <PodcastFeature />

      {/* 08 — Chiffres podcast */}
      <PodcastStats />

      {/* 09 — Avis */}
      <TestimonialsSection home />

      {/* 10 — CTA final */}
      <BowlCta
        theme="chou"
        title="Un team building écoresponsable à Lyon : mettez vos équipes à la même table"
        text="Team buildings, séminaires, afterworks, déjeuners : pour tous vos évènements d'entreprise, on met les petits plats dans les grands. Réponse à votre demande de devis en général sous 48 h."
      />
    </>
  );
}
