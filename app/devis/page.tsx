import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Demande de devis pour une expérience ou une prestation Studio.",
};

export default function QuotePage() {
  return (
    <PageIntro title="Demander un devis">
      <p>Formulaire de devis B2B. Rappel sous 48 h.</p>
    </PageIntro>
  );
}
