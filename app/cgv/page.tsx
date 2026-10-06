import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "CGV",
};

export default function TermsPage() {
  return (
    <PageIntro title="Conditions générales de vente">
      <p>À compléter.</p>
    </PageIntro>
  );
}
