import { cardClassName, Section } from "@/components/home/Section";
import { getTestimonials } from "@/lib/testimonials";

// Hidden while no testimonial has been entered in the admin.
export async function TestimonialsSection({ muted = false }: { muted?: boolean }) {
  const testimonials = await getTestimonials(3);
  if (testimonials.length === 0) return null;

  return (
    <Section muted={muted} title="Avis de nos client·es">
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li key={testimonial.id} className={cardClassName}>
            <figure className="space-y-3 p-6">
              <blockquote className="opacity-80">« {testimonial.text} »</blockquote>
              <figcaption className="font-medium opacity-70">
                {testimonial.author}
                {testimonial.role && `, ${testimonial.role}`}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
