import Image from "next/image";

// Tilted photo on a "bowl" shape (Figma "Visuel", 620×620): `className` places and rotates the
// 520px photo inside the box. Used on the Expériences and experience pages.
export function BowlPhoto({
  src,
  alt,
  className,
  bowl = "/deco/bol-orange.svg",
}: {
  src: React.ComponentProps<typeof Image>["src"];
  alt: string;
  className: string;
  bowl?: string;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      <Image src={bowl} alt="" width={600} height={200} className="absolute top-[64.52%] left-0 w-[96.77%]" />
      <div className={`absolute aspect-square w-[83.9%] overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 28vw, 85vw" className="object-cover" />
      </div>
    </div>
  );
}
