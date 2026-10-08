import Image from "next/image";
import { containerClassName, SectionHeading, SlopeCut } from "@/components/home/Section";
import { getTestimonials } from "@/lib/testimonials";

// Figma "09 — Avis" (V4, node 186:298): the first testimonial large, the next ones in two
// columns; each card slightly tilted, in its own colours.
const cardStyles = [
  { card: "rotate-1 bg-brand-subtle shadow-cut", mark: "text-brand-dark" },
  { card: "-rotate-[1.5deg] bg-ink text-white shadow-cut-brand", mark: "text-accent" },
  { card: "rotate-1 bg-brand shadow-cut", mark: "" },
];

// Hidden while no testimonial has been entered in the admin. `home` adds the hexagon and the
// slanted cut of the home page.
export async function TestimonialsSection({ home = false }: { home?: boolean }) {
  const testimonials = await getTestimonials(3);
  if (testimonials.length === 0) return null;

  return (
    <section
      className={`relative overflow-hidden pt-20 lg:pt-32 ${home ? "pb-[calc(5vw+3rem)] lg:pb-[calc(5vw+4rem)]" : "pb-20 lg:pb-32"}`}
    >
      {home && (
        <Image
          src="/deco/legume-lime.svg"
          alt=""
          width={208}
          height={240}
          className="pointer-events-none absolute -top-[100px] -right-[40px] w-[160px] -rotate-12 lg:w-[208px]"
        />
      )}
      <div className={`${containerClassName} relative space-y-16`}>
        <SectionHeading poster large eyebrow="Avis" title="Avis de nos client·es" />
        <ul className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {testimonials.map((testimonial, index) => {
            const featured = index === 0;
            const style = cardStyles[index % cardStyles.length];
            return (
              <li key={testimonial.id} className={featured ? "md:col-span-2" : undefined}>
                <figure
                  className={`flex h-full flex-col gap-8 border-2 border-ink ${style.card} ${featured ? "p-8 sm:px-24 sm:py-16" : "p-8 sm:p-12"}`}
                >
                  <span
                    aria-hidden
                    className={`font-display leading-none font-extrabold ${style.mark} ${featured ? "text-8xl tracking-[-0.02em]" : "text-[64px]"}`}
                  >
                    “
                  </span>
                  <blockquote
                    className={`font-display font-medium ${featured ? "max-w-[1300px] text-[28px] leading-[1.3] tracking-[-0.0025em] lg:text-[38px]" : "text-[22px] leading-[1.4] lg:text-[26px]"}`}
                  >
                    « {testimonial.text} »
                  </blockquote>
                  <figcaption className="mt-auto text-lg leading-[1.4] font-semibold">
                    {testimonial.author}
                    {testimonial.role && `, ${testimonial.role}`}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
      {home && <SlopeCut color="vert-clair" />}
    </section>
  );
}
