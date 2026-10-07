import Link from "next/link";
import { buttonClassName, ghostButtonClassName, Section } from "@/components/home/Section";

type Action = { href: string; label: string };

export function CtaSection({
  title,
  text,
  primary = { href: "/devis", label: "Demander un devis" },
  secondary,
}: {
  title: string;
  text?: string;
  primary?: Action;
  secondary?: Action;
}) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">{title}</h2>
          {text && <p className="text-lg opacity-80">{text}</p>}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={primary.href} className={buttonClassName}>
            {primary.label}
          </Link>
          {secondary && (
            <Link href={secondary.href} className={ghostButtonClassName}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}
