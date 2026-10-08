import Image from "next/image";
import Link from "next/link";
import { buttonClassName, containerClassName, SectionHeading, SlopeCut } from "@/components/home/Section";
import { experienceFormats } from "@/lib/content";
import type { ExperienceType } from "@/lib/site";

// Cut-out photo of each format (Figma "Mask group" exports in public/illustrations), placed on
// the 1760px wide card: x, y and width in cqw (% of the card width) so it scales with the card.
const visuals: Record<ExperienceType, { src: string; width: number; height: number; className: string; tinted: boolean }> = {
  ateliers: {
    src: "/illustrations/experience-ateliers.svg",
    width: 773,
    height: 378,
    className: "md:top-[-3.66cqw] md:left-[53.01cqw] md:w-[43.92cqw]",
    tinted: true,
  },
  "food-tours": {
    src: "/illustrations/experience-food-tours.svg",
    width: 775,
    height: 419,
    className: "md:top-[0.63cqw] md:left-[53.35cqw] md:w-[44.03cqw]",
    tinted: false,
  },
  immersions: {
    src: "/illustrations/experience-immersions.svg",
    width: 695,
    height: 495,
    className: "md:top-[-8.67cqw] md:left-[58.01cqw] md:w-[39.49cqw]",
    tinted: true,
  },
};

// Figma "05 — Expériences à la une" (V4, node 186:190): one row per format (text on the left,
// cut-out photo on the right, overflowing the row), and the orange cut-out pepper at the top
// right, overlapping the previous section. Each row links to the experiences of that type.
export function FeaturedExperiences() {
  return (
    <section className="relative overflow-x-clip pt-20 pb-[calc(5vw+3rem)] lg:pt-32 lg:pb-[calc(5vw+4rem)]">
      {/* "Group 4": 734×622 at x=992, y=-170 of the 1920px wide section. */}
      <Image
        src="/deco/poivron-orange.svg"
        alt=""
        width={734}
        height={622}
        className="pointer-events-none absolute top-[-8.85vw] z-10 left-[51.67%] w-[38.23%] max-md:hidden"
      />
      <div className={`${containerClassName} relative flex flex-col items-center gap-12 lg:gap-16`}>
        <SectionHeading
          poster
          sticker="primary"
          underlineClassName="bg-highlight"
          eyebrow="Ateliers, food tours et immersions à Lyon"
          title={
            <>
              Des expériences clés en main <br className="max-sm:hidden" />
              et sur mesure
            </>
          }
          className="w-full"
        />

        <ul className="grid w-full gap-6">
          {experienceFormats.map((format) => {
            const visual = visuals[format.type];
            return (
              <li key={format.type} className="@container">
                <Link
                  href={`/experiences/${format.type}`}
                  className={`group relative flex flex-col rounded-2xl md:flex-row md:items-center ${visual.tinted ? "bg-highlight-subtle/40" : ""}`}
                >
                  <div className="flex flex-col items-start gap-4 px-6 py-10 md:w-[52.27%] md:py-[72px] md:pr-0 md:pl-16">
                    <h3 className="text-[32px] leading-[1.1] font-extrabold tracking-[-0.015em] group-hover:underline lg:text-[40px]">
                      {format.longTitle}
                    </h3>
                    <p className="text-lg leading-[1.55]">{format.text}</p>
                    {/* Figma "Prix" */}
                    <p className="rotate-2 rounded-[4px] border-2 border-ink bg-highlight px-4 py-2 text-lg leading-[1.4] font-semibold text-white">
                      {format.price}
                    </p>
                  </div>
                  <Image
                    src={visual.src}
                    alt={format.photoAlt}
                    width={visual.width}
                    height={visual.height}
                    className={`pointer-events-none relative w-full max-w-none md:absolute ${visual.className}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/devis" className={buttonClassName}>
          Demander un devis
        </Link>
      </div>
      <SlopeCut color="vert-clair" />
    </section>
  );
}
