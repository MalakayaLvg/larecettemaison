import type { Metadata } from "next";
import Image from "next/image";
import { BowlCta } from "@/components/home/BowlCta";
import {
  containerClassName,
  SectionHeading,
  SlopeCut,
  slopedSectionClassName,
  Sticker,
} from "@/components/home/Section";
import { missionStats } from "@/lib/content";
import workshopPhoto from "@/public/images/a-propos/julie-atelier.jpg";
import microphonePhoto from "@/public/images/a-propos/julie-micro.jpg";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Maison La Recette, fondée par Julie Van Ossel : inspirer, sensibiliser et donner le pouvoir d'agir pour accélérer la transition alimentaire.",
};

// Figma "À propos — UI Desktop 1920" (node 304:974). Header (01) and footer (08) are in the site
// layout. Each section ends with a slanted cut in the colour of the next one.

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

// Each value with its coloured dot (Figma "Déco — rond").
const values = [
  { title: "Authenticité", dot: "/deco/pastille-lime.svg" },
  { title: "Écoresponsabilité", dot: "/deco/pastille-vert.svg" },
  { title: "Partage", dot: "/deco/pastille-marine.svg" },
];

// Alternating tilt of the key figures, as in the mockup.
const tilts = ["rotate-1", "-rotate-1", "rotate-1"];

const twoDigits = (index: number) => String(index + 1).padStart(2, "0");

export default function AboutPage() {
  return (
    <>
      {/* 02 — Hero. Positions in the visual are percentages of the 660×640 design box. */}
      <section className="relative overflow-hidden bg-brand">
        <div
          className={`${containerClassName} relative grid items-center gap-12 pt-12 pb-[calc(5vw+5rem)] lg:grid-cols-[1036fr_660fr] lg:gap-16 lg:pt-24 lg:pb-[calc(5vw+8rem)]`}
        >
          <div className="flex flex-col items-start gap-8">
            <Sticker>Julie Van Ossel, fondatrice de Maison La Recette</Sticker>
            <h1 className="font-display text-[clamp(2.5rem,3.75vw,4.5rem)] leading-[0.95] font-extrabold">
              À propos de Maison La Recette : et si on changeait le monde en mangeant ?
            </h1>
            <p className="max-w-[760px] text-lg leading-[1.2] lg:text-[22px]">
              Nourrir, transmettre, créer des liens, préserver sa santé, protéger la planète : notre
              alimentation a un impact immense, et elle donne à chacun·e le pouvoir d&apos;agir avec sa
              fourchette, au service de la transition écologique.
            </p>
          </div>

          <div className="relative mx-auto mt-[6%] aspect-[660/640] w-full max-w-[660px] lg:mt-0">
            <div className="absolute -top-[5.6%] left-[10.5%] aspect-square w-[81.8%] rotate-4 border-2 border-ink shadow-cut">
              <div className="relative size-full overflow-hidden">
                <Image
                  src={microphonePhoto}
                  alt="Julie Van Ossel au micro pendant l'enregistrement d'un épisode du podcast"
                  priority
                  fill
                  sizes="(min-width: 1024px) 30vw, 80vw"
                  className="object-cover object-[92%_50%]"
                />
              </div>
            </div>
            <Image
              src="/deco/bol-podcast.svg"
              alt=""
              width={640}
              height={206}
              className="absolute top-[64.06%] left-0 w-[96.97%]"
            />
          </div>
        </div>

        <SlopeCut color="blanc" />
        <Image
          src="/deco/tomate-illustree.svg"
          alt=""
          width={229}
          height={290}
          className="pointer-events-none absolute -bottom-[90px] -left-8 hidden w-[150px] -rotate-10 sm:block lg:w-[229px]"
        />
      </section>

      {/* 03 — Mission */}
      <section className={slopedSectionClassName}>
        <div className={`${containerClassName} relative flex flex-col gap-14`}>
          <SectionHeading eyebrow="Mission" title="La mission de La Recette : accélérer la transition alimentaire" />
          <ol className="grid gap-8 md:grid-cols-3">
            {missionSteps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 border-t-4 border-ink pt-6">
                <span className="font-display text-5xl leading-none font-extrabold tracking-[-0.02em] text-brand-dark">
                  {twoDigits(index)}
                </span>
                <h3 className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">{step.title}</h3>
                <p className="text-lg leading-[1.55] text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <SlopeCut color="vert-clair" />
      </section>

      {/* 05 — Fondatrice. Positions in the visual are percentages of the 760×640 design box. */}
      <section className={`${slopedSectionClassName} bg-brand-subtle`}>
        <div className={`${containerClassName} relative grid items-center gap-16 lg:grid-cols-[760fr_936fr]`}>
          <div className="relative mx-auto mt-[5%] aspect-[760/640] w-full max-w-[760px] lg:mt-0">
            <div className="absolute -top-[4.4%] left-[11.2%] h-[90.6%] w-[73.7%] -rotate-3 border-2 border-ink shadow-cut">
              <div className="relative size-full overflow-hidden">
                <Image
                  src={workshopPhoto}
                  alt="Julie Van Ossel souriante pendant un évènement culinaire"
                  fill
                  sizes="(min-width: 1024px) 30vw, 80vw"
                  className="object-cover object-[90%_50%]"
                />
              </div>
            </div>
            <Image
              src="/deco/bol-podcast.svg"
              alt=""
              width={640}
              height={206}
              className="absolute top-[67.77%] left-[5.92%] w-[84.21%]"
            />
          </div>
          <div className="flex flex-col gap-8">
            <SectionHeading eyebrow="Qui je suis" title="Journaliste et entrepreneure sociale" />
            <div className="flex flex-col gap-4">
              <p className="text-lg leading-[1.55] text-ink-soft">
                Journaliste, j&apos;ai travaillé pendant 15 ans en télévision, et réalisé de nombreux
                reportages pour Arte, France TV, M6, Euronews, principalement sur des sujets en lien avec
                l&apos;alimentation.
              </p>
              {roles.map((role) => (
                <div key={role.title} className="flex flex-col gap-4">
                  <h3 className="font-display text-2xl leading-[1.25] font-bold">{role.title}</h3>
                  <p className="text-lg leading-[1.55] text-ink-soft">{role.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SlopeCut color="vert" />
      </section>

      {/* 04 — Chiffres */}
      <section className="relative overflow-hidden bg-brand pt-20 pb-[calc(5vw+4rem)] lg:pt-24 lg:pb-[160px]">
        <dl className={`${containerClassName} relative grid items-center gap-10 md:grid-cols-3`}>
          {missionStats.map((stat, index) => (
            <div
              key={stat.value}
              className={`flex flex-col gap-2 border-2 border-ink bg-white px-6 py-7 shadow-cut ${tilts[index % tilts.length]}`}
            >
              <dt className="font-display text-5xl leading-none font-extrabold xl:text-[64px]">{stat.value}</dt>
              <dd className="text-lg leading-[1.2] lg:text-[22px]">{stat.label}</dd>
            </div>
          ))}
        </dl>
        <SlopeCut color="blanc" />
      </section>

      {/* 06 — Valeurs */}
      <section className={slopedSectionClassName}>
        <div className={`${containerClassName} relative flex flex-col gap-14`}>
          <SectionHeading eyebrow="Valeurs" title="Nos valeurs et nos engagements" />
          <ul className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="flex flex-col gap-6 border-2 border-ink bg-white px-10 py-12 shadow-cut">
                <Image src={value.dot} alt="" width={40} height={40} />
                <span className="font-display text-[28px] leading-[1.15] font-bold lg:text-[32px]">{value.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <SlopeCut color="vert-clair" />
      </section>

      {/* 10 — CTA final */}
      <BowlCta theme="illustre" />
    </>
  );
}
