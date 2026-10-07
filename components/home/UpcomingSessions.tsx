import Link from "next/link";
import { ghostButtonClassName, Section } from "@/components/home/Section";
import { experienceHref, getHomeExperiences } from "@/lib/experiences";
import { experienceTypes } from "@/lib/site";

// "Prochaines sessions à Lyon": hidden while no experience exists in the admin.
export async function UpcomingSessions({
  muted = false,
  allDatesHref,
}: {
  muted?: boolean;
  allDatesHref?: string;
}) {
  const experiences = await getHomeExperiences(3);
  if (experiences.length === 0) return null;

  return (
    <Section muted={muted} title="Prochaines sessions à Lyon">
      <ul className="grid gap-6 md:grid-cols-3">
        {experiences.map((experience) => (
          <li key={experience.slug} className="space-y-3 border-t border-black/15 pt-6">
            <p className="text-lg font-medium opacity-70">
              {experience.title} · {experienceTypes[experience.type].label}
              {experience.duration && ` · ${experience.duration}`}
            </p>
            <Link href={experienceHref(experience)} className="inline-block opacity-80 hover:underline">
              {experience.lumaUrl ? "Réserver en ligne" : "Voir l'expérience"} →
            </Link>
          </li>
        ))}
      </ul>
      {allDatesHref && (
        <Link href={allDatesHref} className={`${ghostButtonClassName} mt-12`}>
          Voir toutes les dates
        </Link>
      )}
    </Section>
  );
}
