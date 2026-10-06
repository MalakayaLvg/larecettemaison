import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PrivacyPage() {
  return (
    <PageIntro title="Politique de confidentialité">
      <p>À compléter.</p>
    </PageIntro>
  );
}
