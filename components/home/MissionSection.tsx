import { containerClassName, SectionHeading, SlopeCut, slopedSectionClassName } from "@/components/home/Section";
import { missionStats } from "@/lib/content";

// Figma "03 — Mission" (V4, node 186:141): title on the left, key figures in orange on the right.
export function MissionSection() {
  return (
    <section className={slopedSectionClassName}>
      <div className={`${containerClassName} relative grid items-center gap-12 lg:grid-cols-[640fr_1024fr] lg:gap-24`}>
        <SectionHeading
          eyebrow="Mission"
          sticker="primary"
          underlineClassName="bg-highlight"
          title="Notre mission : accélérer la transition alimentaire, une assiette à la fois"
        />

        <dl className="lg:px-16 lg:py-6">
          {missionStats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col gap-2 border-highlight py-8 not-first:border-t-2 sm:flex-row sm:items-center sm:gap-8"
            >
              <dt className="font-poster text-[clamp(2.5rem,2.9vw,3.5rem)] leading-[1.05] font-black text-primary sm:w-[52%] sm:shrink-0">
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
