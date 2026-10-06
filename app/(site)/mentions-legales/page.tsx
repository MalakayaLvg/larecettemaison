import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function LegalNoticePage() {
  return (
    <PageIntro title="Mentions légales">
      <p>À compléter.</p>
    </PageIntro>
  );
}
