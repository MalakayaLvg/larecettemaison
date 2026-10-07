import Image from "next/image";
import { containerClassName, eyebrowClassName, h2ClassName } from "@/components/home/Section";
import { missionStats } from "@/lib/content";

// Figma "03 — Mission" (node 129:155): title on the left, key figures in a green panel.
export function MissionSection() {
  return (
    <section className={`${containerClassName} grid items-center gap-12 py-20 lg:grid-cols-[640fr_1024fr] lg:gap-24 lg:py-32`}>
      <div className="space-y-4">
        <p className={`${eyebrowClassName} text-primary`}>Mission</p>
        <h2 className={h2ClassName}>La mission de La Recette : accélérer la transition alimentaire</h2>
      </div>

      <div className="relative overflow-hidden rounded-lg bg-brand px-6 py-4 sm:px-16 sm:py-6">
        <Image
          src="/deco/etoile.svg"
          alt=""
          width={143}
          height={136}
          className="absolute -top-[80px] -right-[66px] w-[143px]"
        />
        <Image
          src="/deco/rond-orange.svg"
          alt=""
          width={150}
          height={150}
          className="absolute -right-[50px] -bottom-[60px] w-[100px] sm:-right-[60px] sm:-bottom-[80px] sm:w-[150px]"
        />
        <dl className="relative">
          {missionStats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col gap-2 border-ink py-8 not-first:border-t-2 sm:flex-row sm:items-center sm:gap-8"
            >
              <dt className="font-display text-5xl leading-none font-extrabold tracking-[-0.03em] sm:w-[400px] sm:shrink-0 xl:text-[64px]">
                {stat.value}
              </dt>
              <dd className="text-lg leading-[1.5] lg:text-[22px]">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
