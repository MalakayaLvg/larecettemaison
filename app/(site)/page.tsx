import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";

export default function HomePage() {
  return (
    <>
      <PageIntro title="Maison La Recette">
        <p>
          Inspirer, sensibiliser et donner le pouvoir d&apos;agir pour accélérer
          la transition alimentaire.
        </p>
      </PageIntro>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:grid-cols-3">
        <Link href="/podcast" className="rounded-lg border border-black/10 p-6 hover:bg-black/5">
          <h2 className="font-semibold">La recette Podcast</h2>
          <p className="mt-2 text-sm opacity-70">Épisodes à la une</p>
        </Link>
        <Link href="/experiences" className="rounded-lg border border-black/10 p-6 hover:bg-black/5">
          <h2 className="font-semibold">La recette Expériences</h2>
          <p className="mt-2 text-sm opacity-70">Ateliers, food tours, immersions</p>
        </Link>
        <Link href="/studio" className="rounded-lg border border-black/10 p-6 hover:bg-black/5">
          <h2 className="font-semibold">La recette Studio</h2>
          <p className="mt-2 text-sm opacity-70">Sponsoring, production, événements</p>
        </Link>
      </section>
    </>
  );
}
