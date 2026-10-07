import Link from "next/link";
import { buttonClassName, Section } from "@/components/home/Section";

export function CtaSection({
  title,
  text,
  href = "/devis",
  label = "Demander un devis",
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
}) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">{title}</h2>
          <p className="text-lg opacity-80">{text}</p>
        </div>
        <Link href={href} className={buttonClassName}>
          {label}
        </Link>
      </div>
    </Section>
  );
}
