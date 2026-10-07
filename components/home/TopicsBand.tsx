import { Fragment } from "react";

const topics = ["Podcast", "Ateliers", "Food tours", "Immersions", "Studio", "Team building"];

// Figma "02b — Bandeau rubriques": scrolling band; the list is rendered twice so the loop is
// seamless (the copy is hidden from screen readers).
export function TopicsBand() {
  return (
    <section aria-label="Nos rubriques" className="overflow-hidden bg-ink py-5 lg:py-6">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[false, true].map((copy) => (
          <ul key={String(copy)} aria-hidden={copy || undefined} className="flex shrink-0 items-center">
            {topics.map((topic) => (
              <Fragment key={topic}>
                <li className="pl-8 font-display text-2xl leading-[1.1] font-extrabold tracking-[-0.015em] whitespace-nowrap text-accent uppercase lg:text-[40px]">
                  {topic}
                </li>
                <li aria-hidden className="pl-8 font-display text-xl leading-[1.1] font-extrabold text-white lg:text-4xl">
                  ✺
                </li>
              </Fragment>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
