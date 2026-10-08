import type { Testimonial } from "@/payload-types";

// Each card in its own colours (white, navy with a lime shadow, orange tint).
const styles = [
  { card: "bg-white shadow-cut", author: "text-ink-soft" },
  { card: "bg-ink text-white shadow-[8px_8px_0_0_var(--color-accent)]", author: "" },
  { card: "bg-highlight-tint shadow-cut", author: "text-ink-soft" },
];

// Client testimonials in a row (Figma "Avis" of the Expériences and experience pages).
export function TestimonialCards({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => {
        const style = styles[index % styles.length];
        return (
          <li key={testimonial.id}>
            <figure className={`flex h-full flex-col justify-between gap-6 border-2 border-ink p-8 lg:p-10 ${style.card}`}>
              <blockquote className="text-lg leading-[1.2] lg:text-[22px]">« {testimonial.text} »</blockquote>
              <figcaption className={`text-lg leading-[1.4] font-semibold ${style.author}`}>
                {testimonial.author}
                {testimonial.role && `, ${testimonial.role}`}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
