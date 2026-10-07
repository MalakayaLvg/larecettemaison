import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  containerClassName,
  cutCardClassName,
  h2ClassName,
  outlineButtonClassName,
} from "@/components/home/Section";
import experiencesPhoto from "@/public/images/home/experiences.jpg";
import podcastPhoto from "@/public/images/home/podcast.jpg";
import studioPhoto from "@/public/images/home/studio.jpg";

type Field = {
  number: string;
  title: string;
  text: string;
  cta: { href: string; label: string };
  photo: StaticImageData;
  photoAlt: string;
  photoPosition?: string;
};

const podcast: Field = {
  number: "01",
  title: "Podcast",
  text: "Un podcast grand public sur l'alimentation durable, qui part à la rencontre d'acteur·ices du changement et met en lumière des solutions.",
  cta: { href: "/podcast", label: "Écouter le podcast" },
  photo: podcastPhoto,
  photoAlt: "Deux femmes souriantes enregistrent un épisode du podcast face à leurs micros",
  photoPosition: "50% 29%",
};

const others: Field[] = [
  {
    number: "02",
    title: "Studio",
    text: "Un studio de production de podcasts qui aide les organisations engagées dans l'alimentation durable à faire entendre leur voix.",
    cta: { href: "/devis", label: "Demander un devis" },
    photo: studioPhoto,
    photoAlt: "Intervenant au micro devant un public lors d'un grand entretien enregistré",
    photoPosition: "83% 50%",
  },
  {
    number: "03",
    title: "Expériences",
    text: "Des expériences impactantes (ateliers, immersions, séjours) qui fédèrent, engagent et sensibilisent à une meilleure alimentation.",
    cta: { href: "/experiences", label: "Découvrir nos expériences" },
    photo: experiencesPhoto,
    photoAlt: "Participant·es attablé·es lors d'un atelier collectif",
  },
];

// Figma "04 — Champs d'action" (node 129:172): one large card on the left, two horizontal
// cards stacked on the right.
export function ActionFields() {
  return (
    <section className="bg-brand-subtle">
      <div className={`${containerClassName} space-y-12 py-20 lg:space-y-16 lg:py-32`}>
        <h2 className={h2ClassName}>Champs d&apos;action : podcast, studio et expériences</h2>
        <div className="grid gap-8 xl:grid-cols-[980fr_748fr]">
          <article className={`${cutCardClassName} flex flex-col`}>
            <div className="relative h-64 sm:h-[440px]">
              <FieldPhoto field={podcast} sizes="(min-width: 1280px) 51vw, 100vw" />
            </div>
            <FieldContent field={podcast} />
          </article>
          <div className="grid gap-8">
            {others.map((field) => (
              <article key={field.number} className={`${cutCardClassName} flex flex-col sm:flex-row`}>
                <div className="relative h-64 shrink-0 sm:h-auto sm:w-[39%]">
                  <FieldPhoto field={field} sizes="(min-width: 1280px) 15vw, (min-width: 640px) 39vw, 100vw" />
                </div>
                <FieldContent field={field} />
              </article>
            ))}
          </div>
        </div>
      </div>
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
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-4 p-6 sm:p-8">
      <p className="font-display text-5xl leading-none font-extrabold tracking-[-0.02em] text-primary">
        {field.number}
      </p>
      <h3 className="text-[32px] leading-[1.15] font-bold">{field.title}</h3>
      <p className="text-lg leading-[1.55]">{field.text}</p>
      <Link href={field.cta.href} className={outlineButtonClassName}>
        {field.cta.label}
      </Link>
    </div>
  );
}
