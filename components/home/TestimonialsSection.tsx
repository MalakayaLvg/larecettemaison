import { containerClassName, h2ClassName } from "@/components/home/Section";
import { getTestimonials } from "@/lib/testimonials";

// Figma "09 — Avis" (node 129:349): the first testimonial large, the next ones in two columns;
// each card slightly tilted, on its own pastel background.
const cardStyles = [
  "rotate-1 bg-highlight-subtle",
  "-rotate-[1.5deg] bg-brand-subtle",
  "rotate-1 bg-accent-subtle",
];

// Hidden while no testimonial has been entered in the admin.
export async function TestimonialsSection() {
  const testimonials = await getTestimonials(3);
  if (testimonials.length === 0) return null;

  return (
    <section className={`${containerClassName} space-y-16 py-20 lg:py-32`}>
      <h2 className={h2ClassName}>Avis de nos client·es</h2>
      <ul className="grid gap-12 md:grid-cols-2 lg:gap-16">
        {testimonials.map((testimonial, index) => {
          const featured = index === 0;
          return (
            <li key={testimonial.id} className={featured ? "md:col-span-2" : undefined}>
              <figure
                className={`flex h-full flex-col gap-8 rounded-lg border-2 border-ink shadow-cut ${cardStyles[index % cardStyles.length]} ${featured ? "p-8 sm:px-24 sm:py-16" : "p-8 sm:p-12"}`}
              >
                <span
                  aria-hidden
                  className={`font-display leading-none font-extrabold text-primary ${featured ? "text-8xl" : "text-[64px]"}`}
                >
                  “
                </span>
                <blockquote
                  className={`font-display font-medium tracking-[-0.01em] ${featured ? "max-w-[1300px] text-[28px] leading-[1.3] lg:text-[38px]" : "text-[22px] leading-[1.4] lg:text-[26px]"}`}
                >
                  « {testimonial.text} »
                </blockquote>
                <figcaption className="mt-auto leading-[1.4] text-ink-soft">
                  {testimonial.author}
                  {testimonial.role && `, ${testimonial.role}`}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
