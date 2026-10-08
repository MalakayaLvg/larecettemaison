import type { Metadata } from "next";
import { FormHero } from "@/components/home/FormHero";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter Maison La Recette.",
};

// Same layout as the quote page (Figma "Contact / Devis"), with the plain message form.
export default function ContactPage() {
  return (
    <FormHero
      eyebrow="Contact"
      title="Contact"
      intro="Une question, une idée d'invité·e pour le podcast, une envie de collaborer ? Écrivez-nous, nous vous répondons très vite."
      otherLink={{ href: "/devis", label: "Pour une prestation (entreprise, groupe), demandez plutôt un devis" }}
      cardTitle="Nous écrire"
      note="* Champs obligatoires."
    >
      <ContactForm />
    </FormHero>
  );
}
