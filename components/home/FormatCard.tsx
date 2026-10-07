import Link from "next/link";
import { Placeholder } from "@/components/home/Placeholder";
import { cardClassName, ghostButtonClassName } from "@/components/home/Section";
import type { experienceFormats } from "@/lib/content";

// One of the three experience formats, linking to the list of experiences of that type.
export function FormatCard({
  format,
  title,
  cta,
}: {
  format: (typeof experienceFormats)[number];
  title: string;
  cta?: string;
}) {
  return (
    <Link href={`/experiences/${format.type}`} className={`${cardClassName} group`}>
      <Placeholder label={format.image} className="h-64 lg:h-80" />
      <div className="flex flex-1 flex-col gap-3 px-6 pt-3 pb-6">
        <h3 className="text-2xl font-black group-hover:underline">{title}</h3>
        <p className="flex-1 opacity-80">{format.text}</p>
        <p className="text-lg font-bold">{format.price}</p>
        {cta && <span className={`${ghostButtonClassName} self-start`}>{cta}</span>}
      </div>
    </Link>
  );
}
