import { Fragment } from "react";

const topics = ["Podcast", "Ateliers", "Food tours", "Immersions", "Studio", "Team building"];

// Figma "02b — Ruban rubriques" (V4, node 186:359): tilted lime ribbon straddling the hero and
// the mission section. Scrolling: the list is rendered twice so the loop is seamless (the copy
// is hidden from screen readers). The negative margins pull it over the neighbouring sections.
export function TopicsBand() {
  return (
    <div className="relative z-10 -mt-[calc(5vw+2rem)] -mb-8 overflow-x-clip py-10">
      <section
        aria-label="Nos rubriques"
        className="-mx-[5%] -rotate-[2.7deg] overflow-hidden border-y-2 border-ink bg-accent py-4 lg:py-6"
      >
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[false, true].map((copy) => (
            <ul key={String(copy)} aria-hidden={copy || undefined} className="flex shrink-0 items-center">
              {topics.map((topic) => (
                <Fragment key={topic}>
                  <li className="pl-8 font-display text-2xl leading-[1.1] font-extrabold tracking-[-0.015em] whitespace-nowrap lg:text-[40px]">
                    {topic}
                  </li>
                  <li aria-hidden className="pl-8 font-display text-xl leading-[1.1] font-black lg:text-4xl">
                    ✺
                  </li>
                </Fragment>
              ))}
            </ul>
          ))}
        </div>
      </section>
    </div>
  );
}
