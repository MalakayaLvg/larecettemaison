import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { containerClassName, darkButtonClassName, SectionHeading, SlopeCut } from "@/components/home/Section";
import { formatEuros, formatSessionDate, formatSessionTime, getUpcomingSessions } from "@/lib/bookings";
import { experienceHref, getHomeExperiences } from "@/lib/experiences";

type Row = { key: string; href: string; heading: string; details: string };

// Next bookable sessions; without any, the most recent experiences (as before online booking).
async function getRows(): Promise<Row[]> {
  const sessions = await getUpcomingSessions(3);
  if (sessions.length > 0) {
    return sessions.map(({ id, startsAt, remaining, experience }) => ({
      key: `session-${id}`,
      href:
        remaining > 0
          ? `${experienceHref(experience)}/reserver?session=${id}#coordonnees`
          : experienceHref(experience),
      heading: [experience.title, experience.location, experience.duration].filter(Boolean).join(" · "),
      details: [
        `${formatSessionDate(startsAt)} à ${formatSessionTime(startsAt)}`,
        remaining > 0 ? `${remaining} place${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""}` : "Complet",
        `${formatEuros(experience.bookingPrice ?? 0)} par personne`,
      ].join(" · "),
    }));
  }
  const experiences = await getHomeExperiences(3);
  return experiences.map((experience) => ({
    key: experience.slug,
    href: experienceHref(experience),
    heading: [experience.title, experience.location, experience.duration].filter(Boolean).join(" · "),
    details: [experience.availability, experience.price].filter(Boolean).join(" · "),
  }));
}

// Figma "06 — Prochaines sessions" (V4, node 186:225): one card per session, linking to its
// booking form. Hidden while there is nothing to show. `slope` adds the navy cut of the home page.
export async function UpcomingSessions({ allDatesHref, slope = false }: { allDatesHref?: string; slope?: boolean }) {
  const rows = await getRows();
  if (rows.length === 0) return null;

  return (
    <section
      className={`relative overflow-hidden bg-brand-subtle pt-20 lg:pt-24 ${slope ? "pb-[calc(5vw+3rem)] lg:pb-[calc(5vw+2.75rem)]" : "pb-20 lg:pb-24"}`}
    >
      <div className={`${containerClassName} relative space-y-12`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading poster eyebrow="Où et quand ?" title="Prochaines sessions à Lyon" />
          {allDatesHref && (
            <Link href={allDatesHref} className={`${darkButtonClassName}`}>
              Voir toutes les dates
            </Link>
          )}
        </div>
        <ul className="space-y-8">
          {rows.map((row) => (
            <li key={row.key}>
              <Link
                href={row.href}
                className="group flex items-center gap-6 border-2 border-ink bg-background px-6 py-6 shadow-cut transition-transform hover:-translate-y-0.5 sm:px-8"
              >
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl leading-[1.25] font-bold group-hover:underline">{row.heading}</h3>
                  {row.details && <p className="text-lg leading-[1.55]">{row.details}</p>}
                </div>
                <span
                  aria-hidden
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-primary"
                >
                  <ArrowRightIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {slope && <SlopeCut color="marine" />}
    </section>
  );
}
