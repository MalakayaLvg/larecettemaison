import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter Maison La Recette.",
};

export default function ContactPage() {
  return (
    <PageIntro title="Contact">
      <p>Formulaire de contact (nom, email, sujet, message).</p>
    </PageIntro>
  );
}
