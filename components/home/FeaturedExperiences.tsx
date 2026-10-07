import Image from "next/image";
import Link from "next/link";
import {
  buttonClassName,
  containerClassName,
  cutCardClassName,
  eyebrowClassName,
  h2ClassName,
} from "@/components/home/Section";
import { experienceFormats } from "@/lib/content";

// Figma "05 — Expériences à la une" (node 129:221): one horizontal card per format, photo
// alternating left / right. Each card links to the list of experiences of that type.
export function FeaturedExperiences() {
  return (
    <section className="bg-brand">
      <div className={`${containerClassName} flex flex-col items-center gap-12 py-20 lg:gap-16 lg:py-32`}>
        <div className="w-full space-y-4">
          <p className={eyebrowClassName}>Ateliers, food tours et immersions à Lyon</p>
          <h2 className={h2ClassName}>Des expériences clés en main et sur mesure</h2>
        </div>

        <ul className="grid w-full gap-12">
          {experienceFormats.map((format, index) => (
            <li key={format.type}>
              <Link
                href={`/experiences/${format.type}`}
                className={`${cutCardClassName} group flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="relative h-64 shrink-0 md:h-auto md:min-h-[332px] md:w-[47%]">
                  <Image
                    src={format.photo}
                    alt={format.photoAlt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: format.photoPosition }}
                  />
                </div>
                <div className="flex flex-1 flex-col items-start justify-center gap-4 p-6 sm:p-10 xl:p-16">
                  <h3 className="text-[32px] leading-[1.15] font-bold group-hover:underline">{format.longTitle}</h3>
                  <p className="max-w-[640px] text-lg leading-[1.55]">{format.text}</p>
                  <p className="mt-1 rotate-3 rounded-full border-2 border-ink bg-accent px-4 py-2 leading-[1.4]">
                    {format.price}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/devis" className={buttonClassName}>
          Demander un devis
        </Link>
      </div>
    </section>
  );
}
