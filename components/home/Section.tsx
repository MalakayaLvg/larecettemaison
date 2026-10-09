import Image from "next/image";

// Home page section: full-width band (white or grey, alternating in the wireframe) with an
// optional eyebrow, title and intro text above the content.
export function Section({
  eyebrow,
  title,
  intro,
  muted = false,
  children,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={muted ? "bg-foreground/[0.04]" : undefined}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        {(eyebrow || title) && (
          <div className="mb-10 max-w-3xl space-y-4 sm:mb-12">
            {eyebrow && <p className={eyebrowClassName}>{eyebrow}</p>}
            {title && <h2 className={h2ClassName}>{title}</h2>}
            {intro && <p className="text-lg opacity-80">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-3 rounded-lg border border-black/15 bg-background p-6">
      <p className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">{value}</p>
      <p className="opacity-80">{label}</p>
    </div>
  );
}

// Figma text styles "La Recette/Label/Eyebrow" and "La Recette/Heading/H2".
export const eyebrowClassName = "text-[15px] leading-[1.2] tracking-[0.08em] uppercase";

export const h2ClassName = "font-display text-[clamp(2.25rem,3vw,3.5rem)] leading-[1.05] font-extrabold";

// Titles set in the "poster" font in the V4 mockup (Bartok there, Montserrat Black here).
export const posterH2ClassName = "font-poster text-[clamp(2rem,2.9vw,3.5rem)] leading-[1.05] font-black";

// White card with a 2px border and the flat "cut-out" shadow.
export const cutCardClassName = "overflow-hidden rounded-lg border-2 border-ink bg-background shadow-cut";

export const cardClassName = "flex flex-col overflow-hidden rounded-lg border border-black/15 bg-background";

// Pill button (Figma "La Recette/Button"): navy border, small cut-out shadow and an arrow drawn
// after the label (public/icons/fleche.svg used as a mask, so it takes the text colour).
// Primary = main action, outline = secondary action on a light or green background.
// On hover the button slides 4px into its own shadow, as if pressed (not when disabled).
const pillBaseClassName =
  "inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-ink px-8 text-lg leading-[1.2] font-bold whitespace-nowrap transition-[color,background-color,box-shadow,translate] duration-150 not-disabled:hover:translate-x-1 not-disabled:hover:translate-y-1 not-disabled:hover:shadow-none motion-reduce:transition-none after:size-4 after:shrink-0 after:bg-current after:content-[''] after:[mask:url(/icons/fleche.svg)_center/contain_no-repeat]";

const pillClassName = `${pillBaseClassName} shadow-cut-sm`;

// "Ombre découpée — petite sur marine": green shadow, for buttons on the navy header and footer.
const pillOnNavyClassName = `${pillBaseClassName} shadow-cut-sm-brand`;

export const buttonClassName = `${pillClassName} bg-primary text-white hover:bg-ink`;

// On a navy background.
export const accentButtonClassName = `${pillClassName} bg-accent text-ink hover:bg-white`;

// On a lime or green background.
export const darkButtonClassName = `${pillClassName} bg-ink text-white hover:bg-primary`;

export const outlineButtonClassName = `${pillClassName} text-ink hover:bg-ink hover:text-white`;

// Lime and orange buttons of the navy header and footer (Figma "01 — Header", "11 — Footer").
export const accentOnNavyButtonClassName = `${pillOnNavyClassName} bg-accent text-ink hover:bg-white`;

export const primaryOnNavyButtonClassName = `${pillOnNavyClassName} bg-primary text-white hover:bg-white hover:text-ink`;

// Full-width page container (1760px content at 1920px, 80px side padding on desktop).
export const containerClassName = "mx-auto w-full max-w-[1920px] px-4 sm:px-10 xl:px-20";

export const ghostButtonClassName = "inline-flex items-center justify-center py-3 font-medium opacity-70 hover:opacity-100 hover:underline";

const stickerTones = {
  accent: "bg-accent text-ink",
  primary: "bg-primary text-white",
  ink: "bg-ink text-white",
};

// Figma "Sticker eyebrow": small tilted label, lime by default (orange or navy on some pages).
export function Sticker({
  children,
  tone = "accent",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "accent" | "primary" | "ink";
  className?: string;
}) {
  return (
    <p
      className={`${eyebrowClassName} inline-block rotate-2 rounded-[4px] border-2 border-ink px-3.5 py-1.5 font-bold ${stickerTones[tone]} ${className}`}
    >
      {children}
    </p>
  );
}

// V4 section heading: eyebrow sticker, title, and the tilted "Souligné" mark under its start.
export function SectionHeading({
  eyebrow,
  title,
  poster = false,
  large = false,
  onDark = false,
  center = false,
  underline = true,
  underlineClassName,
  sticker,
  stickerClassName,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  /** Poster font (Montserrat Black) instead of Alegreya Sans. */
  poster?: boolean;
  /** 64px instead of 56px (reviews and final CTA). */
  large?: boolean;
  onDark?: boolean;
  center?: boolean;
  underline?: boolean;
  /** Colour of the "Souligné" mark, when it differs from the default (green, lime on dark). */
  underlineClassName?: string;
  sticker?: "accent" | "primary" | "ink";
  /** Extra classes for the sticker (e.g. its green shadow on the navy podcast section). */
  stickerClassName?: string;
  className?: string;
}) {
  const titleClassName = poster
    ? large
      ? "font-poster text-[clamp(2.25rem,3.3vw,4rem)] leading-none font-black"
      : posterH2ClassName
    : h2ClassName;
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center text-center" : "items-start"} ${className}`}>
      <Sticker tone={sticker} className={stickerClassName}>
        {eyebrow}
      </Sticker>
      <div className="relative">
        <h2 className={`${titleClassName} relative`}>{title}</h2>
        {underline && (
          <span
            aria-hidden
            className={`absolute -bottom-[18px] -left-1.5 h-3.5 w-[180px] rotate-[1.5deg] rounded-[7px] ${underlineClassName ?? (onDark ? "bg-accent" : "bg-brand")}`}
          />
        )}
      </div>
    </div>
  );
}

// Figma "Coupe — pente logo": slanted bottom edge filled with the next section's colour.
// The parent section must be `relative`; the files are in public/deco/coupe-*.svg.
export function SlopeCut({
  color,
}: {
  color: "blanc" | "blanc-basse" | "vert" | "vert-clair" | "marine" | "jaune" | "jaune-clair" | "jaune-pale" | "orange" | "orange-clair" | "orange-pale";
}) {
  return (
    <Image
      src={`/deco/coupe-${color}.svg`}
      alt=""
      width={1920}
      height={color === "blanc-basse" ? 82 : 96}
      className={`pointer-events-none absolute bottom-0 left-0 w-full ${color === "blanc-basse" ? "h-[4.27vw]" : "h-[5vw]"}`}
    />
  );
}

// Section padding with room for the slope cut (128px at 1920px wide, as in Figma).
export const slopedSectionClassName = "relative overflow-hidden pt-20 pb-[calc(5vw+3rem)] lg:pt-32 lg:pb-[calc(5vw+4rem)]";
