import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { unsubscribeStatus } from "@/lib/newsletter";
import { unsubscribeNewsletter } from "../actions";
import { TokenActionForm } from "../TokenActionForm";

export const metadata: Metadata = {
  title: "Se désinscrire",
  robots: { index: false },
};

const messages = {
  done: "Vous êtes désinscrit·e : vous ne recevrez plus la newsletter.",
  expired: "Ce lien n'est plus valide.",
  invalid: "Ce lien n'est pas valide. Vérifiez qu'il a été copié en entier.",
};

export default async function UnsubscribePage(props: PageProps<"/newsletter/desinscription">) {
  const { token } = await props.searchParams;
  const value = typeof token === "string" ? token : "";
  const status = await unsubscribeStatus(value);

  return (
    <PageIntro title="Newsletter">
      {status === "valid" ? (
        <TokenActionForm
          intro="Vous ne souhaitez plus recevoir la newsletter ?"
          token={value}
          action={unsubscribeNewsletter}
          label="Me désinscrire"
          messages={messages}
        />
      ) : (
        <p>{messages[status]}</p>
      )}
    </PageIntro>
  );
}
