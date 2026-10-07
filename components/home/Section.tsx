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

export const h2ClassName =
  "font-display text-[clamp(2.25rem,3vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.027em]";

// White card with a 2px border and the flat "cut-out" shadow.
export const cutCardClassName = "overflow-hidden rounded-lg border-2 border-ink bg-background shadow-cut";

export const cardClassName = "flex flex-col overflow-hidden rounded-lg border border-black/15 bg-background";

// Pill button (Figma "La Recette/Button"): primary = main action, outline = secondary action
// on a light or green background.
const pillClassName =
  "inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 px-8 text-lg leading-[1.2] whitespace-nowrap transition-colors";

export const buttonClassName = `${pillClassName} border-primary bg-primary text-white hover:border-ink hover:bg-ink`;

// On a navy background.
export const accentButtonClassName = `${pillClassName} border-accent bg-accent text-ink hover:border-white hover:bg-white`;

// On a lime or green background.
export const darkButtonClassName = `${pillClassName} border-ink bg-ink text-white hover:border-primary hover:bg-primary`;

export const outlineButtonClassName = `${pillClassName} border-ink text-ink hover:bg-ink hover:text-white`;

// Full-width page container (1760px content at 1920px, 80px side padding on desktop).
export const containerClassName = "mx-auto w-full max-w-[1920px] px-4 sm:px-10 xl:px-20";

export const ghostButtonClassName = "inline-flex items-center justify-center py-3 font-medium opacity-70 hover:opacity-100 hover:underline";
