import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/home/CtaSection";
import { FormatCard } from "@/components/home/FormatCard";
import { Placeholder } from "@/components/home/Placeholder";
import { buttonClassName, cardClassName, Section } from "@/components/home/Section";
import { Steps } from "@/components/home/Steps";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { UpcomingSessions } from "@/components/home/UpcomingSessions";
import { experienceFormats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Expériences",
  description:
    "Ateliers de cuisine, food tours et immersions à Lyon, pour les particuliers et les entreprises.",
};

// Layout and copy from the Figma wireframe "Expériences" (node 80:1158).

const approach = [
  "Dans vos locaux, chez nos partenaires ou en immersion chez nos chef·fes ou producteur·ices.",
  "Format de 2 h jusqu'à une journée complète.",
  "Pour tous vos évènements d'entreprise : team buildings, séminaires, afterworks, déjeuners.",
];

const pillars = [
  { title: "Rencontrer", text: "Rencontrez des acteur·ices inspirant·es." },
  { title: "Découvrir", text: "Découvrez des solutions et techniques culinaires." },
  { title: "Partager", text: "Partagez une expérience collective qui crée des liens." },
];

const commitments = [
  {
    title: "Écoresponsabilité",
    text: "Nos expériences permettent de sensibiliser à une alimentation saine et durable et de favoriser la qualité de vie au travail. Tous les produits sont bruts, locaux, de saison et issus de l'agriculture biologique. Notre matériel et notre vaisselle sont réutilisables, et nous valorisons les biodéchets.",
  },
  {
    title: "Commensalité",
    text: "Nos expériences sont collectives et collaboratives. Elles permettent de fédérer via la transmission de savoir-faire, le partage de connaissances et la coopération.",
  },
];

const faq = [
  {
    question: "Puis-je annuler ma réservation ?",
    answer: "Oui. Une réservation est annulable et remboursable jusqu'à 4 jours avant l'expérience.",
  },
  {
    question: "Les prix sont-ils TTC ?",
    answer:
      "Oui, les prix affichés pour les particuliers sont TTC. Pour les entreprises, les tarifs sont sur devis.",
  },
];

export default function ExperiencesPage() {
  return (
    <>
      {/* 02 — Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="font-medium opacity-70">Ateliers de cuisine, food tours et immersions à Lyon</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">
              Des expériences clés en main et sur mesure
            </h1>
            <p className="max-w-[720px] text-lg opacity-80">
              Des expériences de la graine à l&apos;assiette pour rencontrer, cuisiner, fabriquer et
              cultiver aux côtés de chef·fes, producteur·ices et artisan·es engagé·es.
            </p>
          </div>
          <Link href="/devis" className={buttonClassName}>
            Demander un devis
          </Link>
        </div>
        <Placeholder label="Image — Groupe en atelier ou en balade gustative" className="h-80 lg:h-[600px]" />
      </section>

      {/* 03 — Formats */}
      <Section muted title="Les expériences à Lyon">
        <div className="grid gap-6 md:grid-cols-3">
          {experienceFormats.map((format) => (
            <FormatCard key={format.type} format={format} title={format.longTitle} cta={format.cta} />
          ))}
        </div>
      </Section>

      {/* 04 — Prochaines sessions */}
      <UpcomingSessions />

      {/* 05 — Approche */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">Notre approche</h2>
            <ul className="list-disc space-y-4 pl-5 text-lg opacity-80">
              {approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <Placeholder label="Image — Équipe en teambuilding culinaire" className="h-80 lg:h-[480px]" />
        </div>
      </Section>

      {/* 06 — Piliers */}
      <Section
        title="Des expériences inspirantes et apprenantes"
        intro="Toutes nos expériences sont co-construites en partenariat avec des professionnel·les de l'alimentation et de la gastronomie durable."
      >
        <Steps items={pillars} columns="lg:grid-cols-3" />
      </Section>

      {/* 09 — Engagements */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Placeholder label="Image — Produits bruts, locaux et de saison" className="h-80 lg:h-[560px]" />
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">Nos engagements</h2>
            {commitments.map((commitment) => (
              <div key={commitment.title} className="space-y-4">
                <h3 className="text-xl font-black">{commitment.title}</h3>
                <p className="text-lg opacity-80">{commitment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 08 — Avis */}
      <TestimonialsSection />

      {/* 07 — Entreprises */}
      <CtaSection
        muted
        title="Team building et séminaires sur mesure à Lyon"
        text="Pour les entreprises, il est possible de créer des expériences sur mesure : choix de la date, du nombre de participant·es et du lieu (dans vos locaux pour un atelier, ou dans un quartier proche pour un food tour). Les immersions à la ferme s'adressent pour l'instant essentiellement aux entreprises."
      />

      {/* 10 — FAQ */}
      <Section title="Questions fréquentes sur nos ateliers et food tours à Lyon">
        <dl className="grid gap-6 md:grid-cols-2">
          {faq.map((item) => (
            <div key={item.question} className={`${cardClassName} gap-3 p-6`}>
              <dt className="text-2xl font-black">{item.question}</dt>
              <dd className="text-lg opacity-80">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
