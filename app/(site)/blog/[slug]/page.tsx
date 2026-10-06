import { PageIntro } from "@/components/PageIntro";

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  return (
    <PageIntro title={slug}>
      <p>Contenu de l&apos;article.</p>
    </PageIntro>
  );
}
