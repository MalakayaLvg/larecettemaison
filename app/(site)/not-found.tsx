import Link from "next/link";
import { accentButtonClassName, darkButtonClassName } from "@/components/home/Section";
import { StateHero } from "@/components/StateHero";

export default function NotFound() {
  return (
    <StateHero
      eyebrow="Erreur 404"
      title="Page introuvable : cette recette n'existe pas"
      text="Cette page n'existe pas ou a été déplacée."
    >
      <div className="flex flex-wrap gap-4">
        <Link href="/" className={darkButtonClassName}>
          Retour à l&apos;accueil
        </Link>
        <Link href="/experiences" className={accentButtonClassName}>
          Voir les expériences
        </Link>
      </div>
    </StateHero>
  );
}
