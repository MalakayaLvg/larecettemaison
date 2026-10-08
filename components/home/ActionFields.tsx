import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  accentButtonClassName,
  containerClassName,
  darkButtonClassName,
  SectionHeading,
  SlopeCut,
  slopedSectionClassName,
} from "@/components/home/Section";
import experiencesPhoto from "@/public/images/home/experiences.jpg";
import podcastPhoto from "@/public/images/home/podcast.jpg";
import studioPhoto from "@/public/images/home/studio.jpg";

type Field = {
  /** Card colours (Figma V4): navy, green or white. */
  tone: "dark" | "brand" | "light";
  number: string;
  title: string;
  text: string;
  cta: { href: string; label: string };
  photo: StaticImageData;
  photoAlt: string;
  photoPosition?: string;
};

const podcast: Field = {
  tone: "dark",
  number: "01",
  title: "Podcast",
  text: "Un podcast grand public sur l'alimentation durable, pour partir à la rencontre d'acteur·ices du changement et mettre des solutions concrètes sur la table.",
  cta: { href: "/podcast", label: "Écouter le podcast" },
  photo: podcastPhoto,
  photoAlt: "Deux femmes souriantes enregistrent un épisode du podcast face à leurs micros",
  photoPosition: "50% 29%",
};

const others: Field[] = [
  {
    tone: "brand",
    number: "02",
    title: "Studio",
    text: "Un studio de production de podcasts qui donne de la voix aux organisations engagées dans l'alimentation durable.",
    cta: { href: "/devis", label: "Demander un devis" },
    photo: studioPhoto,
    photoAlt: "Intervenant au micro devant un public lors d'un grand entretien enregistré",
    photoPosition: "83% 50%",
  },
  {
    tone: "light",
    number: "03",
    title: "Expériences",
    text: "Des expériences qui ont du goût (ateliers, immersions, séjours) pour fédérer, engager et sensibiliser à une meilleure alimentation.",
    cta: { href: "/experiences", label: "Découvrir nos expériences" },
    photo: experiencesPhoto,
    photoAlt: "Participant·es attablé·es lors d'un atelier collectif",
  },
];

const cardClassNames = {
  dark: "bg-ink text-white shadow-cut-brand",
  brand: "bg-brand shadow-cut",
  light: "bg-background shadow-cut",
};

// Figma "04 — Champs d'action" (V4, node 186:160): one large card on the left, two horizontal
// cards stacked on the right.
export function ActionFields() {
  return (
    <section className={`${slopedSectionClassName} bg-brand-subtle`}>
      <div className={`${containerClassName} relative space-y-12 lg:space-y-16`}>
        <SectionHeading eyebrow="Maison La Recette" title="Passez à table, passez à l'action : podcast, studio et expériences" />
        <div className="grid gap-8 2xl:grid-cols-[980fr_748fr]">
          <article className={`flex flex-col overflow-hidden border-2 border-ink ${cardClassNames[podcast.tone]}`}>
            <div className="relative h-64 sm:h-[440px]">
              <FieldPhoto field={podcast} sizes="(min-width: 1536px) 51vw, 100vw" />
            </div>
            <FieldContent field={podcast} />
          </article>
          <div className="grid gap-8">
            {others.map((field) => (
              <article
                key={field.number}
                className={`flex flex-col overflow-hidden border-2 border-ink sm:flex-row ${cardClassNames[field.tone]}`}
              >
                <div className="relative h-64 shrink-0 sm:h-auto sm:w-[39%]">
                  <FieldPhoto field={field} sizes="(min-width: 1536px) 15vw, (min-width: 640px) 39vw, 100vw" />
                </div>
                <FieldContent field={field} />
              </article>
            ))}
          </div>
        </div>
      </div>
      <SlopeCut color="blanc" />
    </section>
  );
}

function FieldPhoto({ field, sizes }: { field: Field; sizes: string }) {
  return (
    <Image
      src={field.photo}
      alt={field.photoAlt}
      fill
      sizes={sizes}
      className="object-cover"
      style={{ objectPosition: field.photoPosition }}
    />
  );
}

function FieldContent({ field }: { field: Field }) {
  const dark = field.tone === "dark";
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-4 p-6 sm:p-8">
      <p className={`font-display text-5xl leading-none font-extrabold tracking-[-0.02em] ${dark ? "text-accent" : ""}`}>
        {field.number}
      </p>
      <h3 className="text-[32px] leading-[1.15] font-bold">{field.title}</h3>
      <p className="text-lg leading-[1.55]">{field.text}</p>
      <Link href={field.cta.href} className={`${dark ? accentButtonClassName : darkButtonClassName}`}>
        {field.cta.label}
      </Link>
    </div>
  );
}
