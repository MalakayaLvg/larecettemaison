import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter Maison La Recette.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Contact">
        <p>
          Une question, une idée d&apos;invité·e pour le podcast, une envie de collaborer ?
          Écrivez-nous. Pour une prestation (entreprise, groupe),{" "}
          <Link href="/devis" className="underline">
            demandez plutôt un devis
          </Link>
          .
        </p>
      </PageIntro>
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <ContactForm />
      </div>
    </>
  );
}
