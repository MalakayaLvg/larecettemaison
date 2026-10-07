import type { Metadata } from "next";
import { CtaSection } from "@/components/home/CtaSection";
import { Placeholder } from "@/components/home/Placeholder";
import { cardClassName, Section, StatCard } from "@/components/home/Section";
import { Steps } from "@/components/home/Steps";
import { missionStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Maison La Recette, fondée par Julie Van Ossel : inspirer, sensibiliser et donner le pouvoir d'agir pour accélérer la transition alimentaire.",
};

// Layout and copy from the Figma wireframe "À propos" (node 80:1562).

const missionSteps = [
  {
    title: "Inspirer",
    text: "Inspirer en créant des rencontres avec des acteur·ices du changement qui cultivent, fabriquent, cuisinent de façon durable.",
  },
  {
    title: "Sensibiliser",
    text: "Sensibiliser, en racontant leurs histoires et en mettant en lumière leurs initiatives et leurs pratiques alimentaires durables.",
  },
  {
    title: "Donner le pouvoir d'agir",
    text: "Donner le pouvoir d'agir, en concevant des expériences concrètes pour explorer les coulisses et les solutions de notre alimentation, vers une consommation plus responsable.",
  },
];

const roles = [
  {
    title: "Productrice et formatrice de podcast",
    text: "Je produis et réalise des podcasts sur l'alimentation et la gastronomie pour des organismes et des collectivités. J'enseigne le podcast natif dans des écoles et des universités.",
  },
  {
    title: "Créatrice d'évènements culinaires écoresponsables",
    text: "Je conçois des expériences en partenariat avec des chef·fes, des producteur·ices et des artisan·es : ateliers de cuisine, food tours, immersions à la ferme.",
  },
];

const values = ["Authenticité", "Écoresponsabilité", "Partage"];

export default function AboutPage() {
  return (
    <>
      {/* 02 — Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <p className="font-medium opacity-70">Julie Van Ossel, fondatrice de Maison La Recette</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">
            À propos de Maison La Recette : et si on changeait le monde en mangeant ?
          </h1>
          <p className="max-w-[720px] text-lg opacity-80">
            Nourrir, transmettre, créer des liens, préserver sa santé, protéger la planète : notre
            alimentation a un impact immense, et elle donne à chacun·e le pouvoir d&apos;agir avec sa
            fourchette, au service de la transition écologique.
          </p>
        </div>
        <Placeholder
          label="Image — Photo d'ambiance : rencontre avec un producteur"
          className="h-80 lg:h-[600px]"
        />
      </section>

      {/* 03 — Mission */}
      <Section muted title="La mission de La Recette : accélérer la transition alimentaire">
        <Steps items={missionSteps} columns="lg:grid-cols-3" />
      </Section>

      {/* 04 — Chiffres */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {missionStats.map((stat) => (
            <StatCard key={stat.value} {...stat} />
          ))}
        </div>
      </Section>

      {/* 05 — Fondatrice */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Placeholder
            label="Image — Portrait de Julie Van Ossel (présence discrète)"
            className="h-80 lg:h-[640px]"
          />
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="font-medium opacity-70">Qui je suis</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">
                Journaliste et entrepreneure sociale
              </h2>
            </div>
            <p className="text-lg opacity-80">
              Journaliste, j&apos;ai travaillé pendant 15 ans en télévision, et réalisé de nombreux
              reportages pour Arte, France TV, M6, Euronews, principalement sur des sujets en lien
              avec l&apos;alimentation.
            </p>
            {roles.map((role) => (
              <div key={role.title} className="space-y-4">
                <h3 className="text-xl font-black">{role.title}</h3>
                <p className="text-lg opacity-80">{role.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 — Valeurs */}
      <Section title="Nos valeurs et nos engagements">
        <ul className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <li key={value} className={`${cardClassName} p-6 text-2xl font-black`}>
              {value}
            </li>
          ))}
        </ul>
      </Section>

      {/* 07 — CTA */}
      <CtaSection
        title="Parce que bien manger peut être source de joie"
        primary={{ href: "/podcast", label: "Écouter le podcast" }}
        secondary={{ href: "/devis", label: "Demander un devis" }}
      />
    </>
  );
}
