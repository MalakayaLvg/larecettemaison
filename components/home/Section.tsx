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
            {eyebrow && <p className="font-medium opacity-70">{eyebrow}</p>}
            {title && (
              <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">{title}</h2>
            )}
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

export const cardClassName = "flex flex-col overflow-hidden rounded-lg border border-black/15 bg-background";

export const buttonClassName =
  "inline-flex items-center justify-center rounded-lg border border-black/20 bg-background px-6 py-3 font-medium hover:border-foreground";

export const ghostButtonClassName = "inline-flex items-center justify-center py-3 font-medium opacity-70 hover:opacity-100 hover:underline";
