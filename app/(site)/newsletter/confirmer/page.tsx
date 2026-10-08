import type { Metadata } from "next";
import { StateHero } from "@/components/StateHero";
import { confirmationStatus } from "@/lib/newsletter";
import { confirmNewsletter } from "../actions";
import { TokenActionForm } from "../TokenActionForm";

export const metadata: Metadata = {
  title: "Confirmer l'inscription",
  robots: { index: false },
};

const messages = {
  done: "C'est confirmé, bienvenue ! Vous recevrez nos prochaines nouvelles par email.",
  expired:
    "Ce lien a expiré. Réinscrivez-vous depuis le bas de n'importe quelle page pour en recevoir un nouveau.",
  invalid: "Ce lien n'est pas valide. Vérifiez qu'il a été copié en entier.",
};

export default async function ConfirmNewsletterPage(props: PageProps<"/newsletter/confirmer">) {
  const { token } = await props.searchParams;
  const value = typeof token === "string" ? token : "";
  const status = await confirmationStatus(value);

  return (
    <StateHero eyebrow="Newsletter" title="Confirmer votre inscription">
      {status === "valid" ? (
        <TokenActionForm
          intro="Il ne reste qu'une étape pour recevoir la newsletter."
          token={value}
          action={confirmNewsletter}
          label="Confirmer mon inscription"
          messages={messages}
        />
      ) : (
        <p className="text-lg leading-[1.2] lg:text-[22px]">{messages[status]}</p>
      )}
    </StateHero>
  );
}
