import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { experienceTypes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Expériences",
  description:
    "Ateliers, food tours et immersions à Lyon, pour les particuliers et les entreprises.",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageIntro title="La recette Expériences">
        <p>Des expériences co-construites avec des chef·fes, artisan·es et producteur·ices.</p>
      </PageIntro>
      <ul className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:grid-cols-3">
        {Object.entries(experienceTypes).map(([type, { label, duration }]) => (
          <li key={type}>
            <Link
              href={`/experiences/${type}`}
              className="block rounded-lg border border-black/10 p-6 hover:bg-black/5"
            >
              <h2 className="font-semibold">{label}</h2>
              <p className="mt-2 text-sm opacity-70">{duration}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
