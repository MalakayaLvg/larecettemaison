import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";

export default async function EpisodePage(
  props: PageProps<"/podcast/[saison]/[slug]">,
) {
  const { saison, slug } = await props.params;
  const match = /^saison-(\d+)$/.exec(saison);
  if (!match) notFound();

  return (
    <PageIntro title={slug}>
      <p>Saison {match[1]} — lecteur audio, résumé, invité·e, liens plateformes.</p>
    </PageIntro>
  );
}
