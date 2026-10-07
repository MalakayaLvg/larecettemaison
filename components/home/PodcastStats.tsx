import { containerClassName } from "@/components/home/Section";
import { podcastStats } from "@/lib/content";

// Figma "08 — Chiffres podcast" (node 129:335): lime band with four key figures.
export function PodcastStats() {
  return (
    <section className="bg-accent">
      <dl className={`${containerClassName} grid gap-10 py-20 sm:grid-cols-2 lg:py-24 xl:grid-cols-4 xl:gap-12`}>
        {podcastStats.map((stat) => (
          <div key={stat.value} className="flex flex-col gap-3 border-l-2 border-ink pl-6">
            <dt className="font-display text-5xl leading-none font-extrabold tracking-[-0.03em] xl:text-[64px]">
              {stat.value}
            </dt>
            <dd className="text-lg leading-[1.5] lg:text-[22px]">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
