import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "À propos",
  description: "Mission et histoire de Maison La Recette.",
};

export default function AboutPage() {
  return (
    <PageIntro title="À propos">
      <p>Mission et histoire.</p>
    </PageIntro>
  );
}
