import Image from "next/image";
import Link from "next/link";
import { buttonClassName, containerClassName, SectionHeading, SlopeCut, slopedSectionClassName } from "@/components/home/Section";
import { experienceFormats } from "@/lib/content";
import type { ExperienceType } from "@/lib/site";

// Per-format visual from the mockup: the green "bowl" behind each photo and the photo's tilt.
const visuals: Record<ExperienceType, { bowl: string; rotate: string }> = {
  ateliers: { bowl: "/deco/bol-vert-1.svg", rotate: "-rotate-[3.5deg]" },
  "food-tours": { bowl: "/deco/bol-vert-2.svg", rotate: "rotate-[3.5deg]" },
  immersions: { bowl: "/deco/bol-vert-3.svg", rotate: "-rotate-3" },
};

// Figma "05 — Expériences à la une" (V4, node 186:190): one row per format, a tilted photo on
// a green bowl alternating left / right. Each row links to the experiences of that type.
// Positions in the visual are percentages of the 900×348 design box.
export function FeaturedExperiences() {
  return (
    <section className={slopedSectionClassName}>
      <Image
        src="/deco/tomate.svg"
        alt=""
        width={273}
        height={273}
        className="pointer-events-none absolute -top-[63px] -right-[87px] w-[180px] lg:w-[273px]"
      />
      <div className={`${containerClassName} relative flex flex-col items-center gap-12 lg:gap-16`}>
        <SectionHeading
          poster
          eyebrow="Ateliers, food tours et immersions à Lyon"
          title="Des expériences clés en main et sur mesure"
          className="w-full"
        />

        <ul className="grid w-full gap-16 lg:gap-[72px]">
          {experienceFormats.map((format, index) => {
            const visual = visuals[format.type];
            return (
              <li key={format.type}>
                <Link
                  href={`/experiences/${format.type}`}
                  className={`group grid items-center gap-8 md:gap-0 ${index % 2 === 1 ? "md:grid-cols-[860fr_900fr]" : "md:grid-cols-[900fr_860fr]"}`}
                >
                  <div className={`relative aspect-[900/348] ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <Image
                      src={visual.bowl}
                      alt=""
                      width={860}
                      height={266}
                      className="absolute top-[39.7%] left-[-1.1%] w-[95.6%] max-w-none"
                    />
                    <div className={`absolute top-[6.8%] left-[4.4%] h-[86.2%] w-[86.7%] overflow-hidden ${visual.rotate}`}>
                      <Image
                        src={format.photo}
                        alt={format.photoAlt}
                        fill
                        sizes="(min-width: 768px) 42vw, 90vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ objectPosition: format.photoPosition }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-4 md:py-[72px] md:pl-16">
                    <h3 className="text-[32px] leading-[1.15] font-bold group-hover:underline">{format.longTitle}</h3>
                    <p className="max-w-[640px] text-lg leading-[1.55]">{format.text}</p>
                    {/* Figma "Prix" sticker */}
                    <p className="rotate-2 rounded-full border-2 border-ink bg-accent px-4 py-2 text-lg leading-[1.4] font-semibold shadow-cut-sm">
                      {format.price}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/devis" className={`${buttonClassName}`}>
          Demander un devis
        </Link>
      </div>
      <SlopeCut color="vert-clair" />
    </section>
  );
}
