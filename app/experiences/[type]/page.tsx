import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { experienceTypes, isExperienceType } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(experienceTypes).map((type) => ({ type }));
}

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

  return (
    <PageIntro title={experienceTypes[type].label}>
      <p>Liste des {experienceTypes[type].label.toLowerCase()} disponibles.</p>
    </PageIntro>
  );
}
