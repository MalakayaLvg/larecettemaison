import { containerClassName, SlopeCut } from "@/components/home/Section";
import { podcastStats } from "@/lib/content";

// Alternating tilt of the cards, as in the mockup.
const tilts = ["rotate-1", "-rotate-1", "rotate-1", "-rotate-1"];

// Figma "08 — Chiffres podcast" (V4, node 186:283): four key figures on white cards, green band.
export function PodcastStats() {
  return (
    <section className="relative overflow-hidden bg-brand pt-20 pb-[calc(4.27vw+4rem)] lg:pt-24 lg:pb-[160px]">
      <PodcastStatsGrid className={`${containerClassName} relative`} />
      <SlopeCut color="blanc-basse" />
    </section>
  );
}

// The cards alone (also on the Studio page's "Audience du podcast").
export function PodcastStatsGrid({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid gap-10 sm:grid-cols-2 xl:grid-cols-[392fr_392fr_473fr_392fr] ${className}`}>
      {podcastStats.map((stat, index) => (
        <div
          key={stat.value}
          className={`flex flex-col gap-2 border-2 border-ink bg-background px-6 py-7 shadow-cut ${tilts[index % tilts.length]}`}
        >
          <dt className="font-poster text-5xl leading-none font-black whitespace-nowrap xl:text-[clamp(2.25rem,3.2vw,4rem)]">{stat.value}</dt>
          <dd className="text-lg leading-[1.2] lg:text-[22px]">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}
