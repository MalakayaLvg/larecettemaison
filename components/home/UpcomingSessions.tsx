import Link from "next/link";
import { containerClassName, h2ClassName, outlineButtonClassName } from "@/components/home/Section";
import { experienceHref, getHomeExperiences } from "@/lib/experiences";

// Figma "06 — Prochaines sessions" (node 129:274): one row per experience, linking to its
// page. Hidden while no experience exists in the admin.
export async function UpcomingSessions({ allDatesHref }: { allDatesHref?: string }) {
  const experiences = await getHomeExperiences(3);
  if (experiences.length === 0) return null;

  return (
    <section className={`${containerClassName} space-y-12 py-20 lg:py-24`}>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h2 className={h2ClassName}>Prochaines sessions à Lyon</h2>
        {allDatesHref && (
          <Link href={allDatesHref} className={outlineButtonClassName}>
            Voir toutes les dates
          </Link>
        )}
      </div>
      <ul className="space-y-4">
        {experiences.map((experience) => {
          const heading = [experience.title, experience.location, experience.duration].filter(Boolean);
          const details = [experience.availability, experience.price].filter(Boolean);
          return (
            <li key={experience.slug}>
              <Link
                href={experienceHref(experience)}
                className="group flex items-center gap-6 rounded-lg border-2 border-brand bg-background px-6 py-6 hover:border-ink sm:px-8"
              >
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl leading-[1.25] font-bold group-hover:underline">{heading.join(" · ")}</h3>
                  {details.length > 0 && (
                    <p className="text-lg leading-[1.55] text-ink-soft">{details.join(" · ")}</p>
                  )}
                </div>
                <span
                  aria-hidden
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand text-2xl transition-colors group-hover:bg-ink group-hover:text-white"
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
