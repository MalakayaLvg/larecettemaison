import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getQuoteServices } from "@/lib/quote-services";
import { QuoteForm } from "./QuoteForm";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Demande de devis pour une expérience ou une prestation Studio.",
};

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
      <PageIntro title="Demander un devis">
        <p>
          Entreprises, associations, groupes : décrivez-nous votre projet, nous revenons vers
          vous sous 48 h.
        </p>
      </PageIntro>
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <QuoteForm services={services} defaultService={defaultService} />
      </div>
    </>
  );
}
