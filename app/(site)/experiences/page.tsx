import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BowlCta } from "@/components/home/BowlCta";
import { BowlPhoto } from "@/components/home/BowlPhoto";
import { FormatCard } from "@/components/home/FormatCard";
import {
  containerClassName,
  darkButtonClassName,
  SectionHeading,
  SlopeCut,
  slopedSectionClassName,
  Sticker,
} from "@/components/home/Section";
import { TestimonialCards } from "@/components/home/TestimonialCards";
import { getSessionRows } from "@/components/home/UpcomingSessions";
import { experienceFormats } from "@/lib/content";
import { getTestimonials } from "@/lib/testimonials";
import heroPhoto from "@/public/images/home/hero.jpg";
import approachPhoto from "@/public/images/experiences/approche.jpg";
import commitmentsPhoto from "@/public/images/experiences/engagements.jpg";

export const metadata: Metadata = {
  title: "Expériences",
  description:
    "Ateliers de cuisine, food tours et immersions à Lyon, pour les particuliers et les entreprises.",
};

// Figma "Expériences — UI Desktop 1920" (node 284:234), in the orange palette. Header (01) and
// footer (11) are in the site layout. Each section ends with a slanted cut in the colour of the
// next one.

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

const twoDigits = (index: number) => String(index + 1).padStart(2, "0");

// Orange "Souligné" under the section titles.
const underline = "bg-highlight";

export default async function ExperiencesPage() {
  const [sessions, testimonials] = await Promise.all([getSessionRows(), getTestimonials(3)]);

  return (
    <>
      {/* 02 — Hero. Positions in the visual are percentages of the 660×640 design box. */}
      <section className="relative overflow-hidden bg-highlight-tint">
        <div
          className={`${containerClassName} relative grid items-center gap-12 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[1036fr_660fr] lg:gap-16 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
        >
          <div className="flex flex-col items-start gap-8">
            <Sticker tone="primary">Ateliers de cuisine, food tours et immersions à Lyon</Sticker>
            <h1 className="font-display text-[clamp(2.75rem,5vw,6rem)] leading-[0.95] font-extrabold">
              Des expériences clés en main et sur mesure
            </h1>
            <p className="text-lg leading-[1.2] lg:text-[22px]">
              Des expériences de la graine à l&apos;assiette pour rencontrer, cuisiner, fabriquer et
              cultiver aux côtés de chef·fes, producteur·ices et artisan·es engagé·es.
            </p>
            <Link href="/devis" className={darkButtonClassName}>
              Demander un devis
            </Link>
          </div>

          <div className="relative mx-auto mt-[6%] aspect-[660/640] w-full max-w-[660px] lg:mt-0">
            <div className="absolute -top-[5.6%] left-[9.1%] aspect-square w-[81.8%] rotate-4 overflow-hidden">
              <Image
                src={heroPhoto}
                alt="Bols d'épices et d'herbes fraîches préparés pour un atelier de cuisine"
                priority
                fill
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="object-cover"
              />
            </div>
            <Image
              src="/deco/bol-podcast-orange.svg"
              alt=""
              width={640}
              height={206}
              className="absolute top-[64.06%] left-0 w-[96.97%]"
            />
          </div>
        </div>

        <SlopeCut color="orange-pale" />
        <Image
          src="/deco/tomate-illustree-orange.svg"
          alt=""
          width={229}
          height={290}
          className="pointer-events-none absolute -bottom-[90px] -left-8 hidden w-[150px] -rotate-10 sm:block lg:w-[229px]"
        />
      </section>

      {/* 03 — Formats */}
      <section className={`${slopedSectionClassName} bg-highlight-wash`}>
        <div className={`${containerClassName} relative flex flex-col gap-12 lg:gap-[72px]`}>
          <SectionHeading
            sticker="primary"
            underlineClassName={underline}
            eyebrow="Les expériences"
            title="Les expériences à Lyon : au menu, du concret"
          />
          <ul className="grid gap-10 md:grid-cols-3">
            {experienceFormats.map((format) => (
              <li key={format.type}>
                <FormatCard format={format} title={format.longTitle} cta={format.cta} />
              </li>
            ))}
          </ul>
        </div>
        <SlopeCut color={sessions.length > 0 ? "blanc" : "marine"} />
      </section>

      {/* 04 — Prochaines sessions */}
      {sessions.length > 0 && (
        <section className={slopedSectionClassName}>
          <div className={`${containerClassName} relative flex flex-col gap-14`}>
            <SectionHeading
              sticker="primary"
              underlineClassName={underline}
              eyebrow="Où et quand ?"
              title="Prochaines sessions à Lyon : à vos tabliers !"
            />
            <ul className="grid gap-8 md:grid-cols-3">
              {sessions.map((session) => (
                <li key={session.key}>
                  <Link href={session.href} className="group flex h-full flex-col gap-3 border-t-4 border-ink pt-6">
                    <h3 className="font-display text-2xl leading-[1.25] font-bold group-hover:underline">
                      {session.heading}
                    </h3>
                    {session.details && <p className="text-lg leading-[1.55] text-ink-soft">{session.details}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <SlopeCut color="marine" />
        </section>
      )}

      {/* 05 — Approche. Positions in the visual are percentages of the 620×620 design box. */}
      <section className={`${slopedSectionClassName} bg-ink text-white`}>
        <div className={`${containerClassName} relative grid items-center gap-16 lg:grid-cols-[1044fr_620fr] lg:gap-24`}>
          <div className="flex flex-col gap-10">
            <SectionHeading
              onDark
              sticker="primary"
              underlineClassName={underline}
              eyebrow="Sur mesure"
              title="Notre approche : on vient à vous, ou vous venez à nous"
            />
            <ul className="list-disc space-y-4 pl-6 text-lg leading-[1.2] lg:text-[22px]">
              {approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <BowlPhoto
            src={approachPhoto}
            alt="Une équipe attablée pendant un atelier de dégustation"
            className="top-[1%] left-[10.2%] -rotate-3"
          />
        </div>
        <SlopeCut color="blanc" />
      </section>

      {/* 06 — Piliers */}
      <section className={slopedSectionClassName}>
        <div className={`${containerClassName} relative flex flex-col gap-14`}>
          <div className="flex flex-col gap-6">
            <SectionHeading
              sticker="primary"
              underlineClassName={underline}
              eyebrow="Rencontrer, découvrir, partager"
              title="Des expériences qui nourrissent l'esprit autant que l'assiette"
            />
            <p className="max-w-[720px] text-lg leading-[1.2] lg:text-[22px]">
              Toutes nos expériences sont co-construites en partenariat avec des professionnel·les de
              l&apos;alimentation et de la gastronomie durable.
            </p>
          </div>
          <ol className="grid gap-8 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className="flex flex-col gap-3 border-t-4 border-ink pt-6">
                <span className="font-display text-5xl leading-none font-extrabold tracking-[-0.02em] text-highlight-dark">
                  {twoDigits(index)}
                </span>
                <h3 className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">{pillar.title}</h3>
                <p className="text-lg leading-[1.55] text-ink-soft">{pillar.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <SlopeCut color="orange-clair" />
      </section>

      {/* 07 — Engagements */}
      <section className={`${slopedSectionClassName} bg-highlight-subtle`}>
        <div className={`${containerClassName} relative grid items-center gap-16 lg:grid-cols-[620fr_1044fr] lg:gap-24`}>
          <BowlPhoto
            src={commitmentsPhoto}
            alt="Légumes de saison rôtis servis dans un saladier pendant un atelier"
            className="top-[5.4%] left-[5.8%] rotate-3"
          />
          <div className="flex flex-col gap-8">
            <SectionHeading
              sticker="primary"
              underlineClassName={underline}
              eyebrow="Engagements"
              title="Nos engagements : l'assiette, c'est du sérieux"
            />
            {commitments.map((commitment) => (
              <div key={commitment.title} className="flex flex-col gap-2">
                <h3 className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">{commitment.title}</h3>
                <p className="text-lg leading-[1.2] lg:text-[22px]">{commitment.text}</p>
              </div>
            ))}
          </div>
        </div>
        <SlopeCut color="blanc" />
      </section>

      {/* 08 — Avis (hidden while no testimonial has been entered in the admin) */}
      {testimonials.length > 0 && (
        <section className="pt-20 pb-20 lg:pt-32 lg:pb-32">
          <div className={`${containerClassName} flex flex-col gap-14`}>
            <SectionHeading
              sticker="ink"
              underlineClassName="bg-ink"
              eyebrow="Avis"
              title="Avis de nos client·es : ils y ont goûté"
            />
            <TestimonialCards testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* 10 — FAQ */}
      <section className={`${slopedSectionClassName} bg-highlight-tint`}>
        <div className={`${containerClassName} relative flex flex-col gap-14`}>
          <SectionHeading
            sticker="primary"
            underlineClassName={underline}
            eyebrow="FAQ"
            title="Questions fréquentes sur nos ateliers et food tours à Lyon"
          />
          <dl className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {faq.map((item) => (
              <div key={item.question} className="flex flex-col gap-4 border-2 border-ink bg-white p-8 shadow-cut lg:p-10">
                <dt className="font-display text-2xl leading-[1.25] font-bold">{item.question}</dt>
                <dd className="text-lg leading-[1.55] text-ink-soft">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
        <SlopeCut color="orange-pale" />
      </section>

      {/* 09 — Offre Podcast */}
      <BowlCta
        theme="orange"
        poster={false}
        eyebrow="Offre Podcast"
        title="Amplifiez votre impact grâce au podcast"
        text="Création éditoriale, réalisation audio et vidéo : La Recette met son expertise de studio de podcast au service des acteur·ices de l'alimentation durable, entreprises et organisations."
      />
    </>
  );
}

