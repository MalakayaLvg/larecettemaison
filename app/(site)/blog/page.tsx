import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles sur l'alimentation durable.",
};

export default function BlogPage() {
  return (
    <PageIntro title="Blog">
      <p>Articles à venir.</p>
    </PageIntro>
  );
}
