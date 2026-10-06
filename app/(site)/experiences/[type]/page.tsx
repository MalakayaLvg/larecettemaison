import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceCard } from "@/components/ExperienceCard";
import { PageIntro } from "@/components/PageIntro";
import { getExperiencesByType } from "@/lib/experiences";
import { experienceTypes, isExperienceType } from "@/lib/site";

export async function generateMetadata(
  props: PageProps<"/experiences/[type]">,
): Promise<Metadata> {
  const { type } = await props.params;
  return isExperienceType(type) ? { title: experienceTypes[type].label } : {};
}

export default async function ExperienceTypePage(
  props: PageProps<"/experiences/[type]">,
) {
  const { type } = await props.params;
  if (!isExperienceType(type)) notFound();
  const { label } = experienceTypes[type];
  const experiences = await getExperiencesByType(type);

  return (
    <>
      <PageIntro title={label} />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        {experiences.length === 0 ? (
          <p className="opacity-70">
            Aucune expérience de ce type pour le moment.{" "}
            <Link href="/contact" className="underline">
              Contactez-nous
            </Link>{" "}
            pour être tenu·e au courant.
          </p>
        ) : (
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience) => (
              <li key={experience.slug}>
                <ExperienceCard experience={experience} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
