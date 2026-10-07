import type { Metadata } from "next";
import { FormHero } from "@/components/home/FormHero";
import { Section } from "@/components/home/Section";
import { Steps } from "@/components/home/Steps";
import { getQuoteServices } from "@/lib/quote-services";
import { QuoteForm } from "./QuoteForm";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Demande de devis pour une expérience ou une prestation Studio.",
};

// Layout and copy from the Figma wireframe "Contact / Devis — Desktop 1920" (node 14:583).

const steps = [
  {
    title: "Décrivez votre projet",
    text: "Atelier, food tour, team building ou podcast : décrivez votre projet dans le formulaire.",
  },
  { title: "Recevez la confirmation", text: "Merci ! Votre demande est bien envoyée : je vous rappelle sous 48 h." },
  { title: "Échangez par téléphone", text: "Je propose d'abord un rendez-vous téléphonique pour préciser la demande." },
  { title: "Recevez votre devis", text: "J'envoie ensuite une proposition de devis. Je réponds en général sous 48 h." },
];

export default async function QuotePage(props: PageProps<"/devis">) {
  const { experience, studio } = await props.searchParams;
  const services = await getQuoteServices();
  // Coming from an experience or a Studio offer: preselect it, if it is still in the list.
  const preselected = experience ? `experience:${experience}` : `studio:${studio}`;
  const defaultService = services.some((group) =>
    group.options.some((option) => option.value === preselected),
  )
    ? preselected
    : undefined;

  return (
    <>
      {/* 02 — Devis B2B */}
      <FormHero
        title="Contact et demande de devis à Lyon"
        intro="Je propose d'abord un rendez-vous téléphonique pour préciser la demande, puis j'envoie une proposition de devis. Je réponds en général sous 48 h."
        otherLink={{ href: "/contact", label: "Une question, une idée d'invité·e ? Écrivez-nous" }}
        cardTitle="Demander un devis"
        note="* Champs obligatoires. Je vous rappelle pour préciser la demande, en général sous 48 h."
      >
        <QuoteForm services={services} defaultService={defaultService} submitLabel="Demander un devis" />
      </FormHero>

      {/* 03 — Déroulé */}
      <Section title="Comment se passe votre demande de devis ?">
        <Steps items={steps} />
      </Section>
    </>
  );
}
