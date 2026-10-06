import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";

export default function NotFound() {
  return (
    <PageIntro title="Page introuvable">
      <p>Cette page n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" className="mt-4 inline-block underline">
        Retour à l&apos;accueil
      </Link>
    </PageIntro>
  );
}
