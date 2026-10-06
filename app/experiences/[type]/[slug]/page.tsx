import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { isExperienceType } from "@/lib/site";

export default async function ExperiencePage(
  props: PageProps<"/experiences/[type]/[slug]">,
) {
  const { type, slug } = await props.params;
  if (!isExperienceType(type)) notFound();

  return (
    <PageIntro title={slug}>
      <p>Contenu, photos, prochaines dates.</p>
      <div className="mt-6 flex flex-wrap gap-4">
        {/* Bouton / embed Luma (URL stockée en base) */}
        <span className="rounded-full border border-black/20 px-4 py-2 text-sm">
          Réserver (Luma)
        </span>
        <Link
          href={`/devis?prestation=${slug}`}
          className="rounded-full bg-foreground px-4 py-2 text-sm text-background"
        >
          Demander un devis
        </Link>
      </div>
    </PageIntro>
  );
}
