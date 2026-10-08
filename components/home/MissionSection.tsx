import Image from "next/image";
import { containerClassName, SectionHeading, SlopeCut, slopedSectionClassName } from "@/components/home/Section";
import { missionStats } from "@/lib/content";

// Figma "03 — Mission" (V4, node 186:141): title on the left, key figures on the right.
export function MissionSection() {
  return (
    <section className={slopedSectionClassName}>
      <Image
        src="/deco/rond-vert.svg"
        alt=""
        width={260}
        height={260}
        className="pointer-events-none absolute -top-[110px] -left-[110px] w-[180px] lg:w-[260px]"
      />
      <div className={`${containerClassName} relative grid items-center gap-12 lg:grid-cols-[640fr_1024fr] lg:gap-24`}>
        <SectionHeading eyebrow="Mission" title="La mission de La Recette : accélérer la transition alimentaire" />

        <dl className="lg:px-16 lg:py-6">
          {missionStats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col gap-2 border-ink py-8 not-first:border-t-2 sm:flex-row sm:items-center sm:gap-8"
            >
              <dt className="font-poster text-[clamp(2.5rem,2.9vw,3.5rem)] leading-[1.05] font-black text-brand-dark sm:w-[52%] sm:shrink-0">
                {stat.value}
              </dt>
              <dd className="text-lg leading-[1.2] lg:text-[22px]">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <SlopeCut color="vert-clair" />
    </section>
  );
}
