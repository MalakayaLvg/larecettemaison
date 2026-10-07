import Link from "next/link";
import { Placeholder } from "@/components/home/Placeholder";
import {
  buttonClassName,
  cardClassName,
  ghostButtonClassName,
  Section,
  StatCard,
} from "@/components/home/Section";
import { episodeHref, formatDuration, getHomeEpisodes } from "@/lib/episodes";
import { experienceHref, getHomeExperiences } from "@/lib/experiences";
import { experienceTypes, type ExperienceType } from "@/lib/site";
import { getTestimonials } from "@/lib/testimonials";

// Layout and copy from the Figma wireframe "Accueil" (node 80:529). Images are lo-fi
// placeholders until the photos are provided.

const missionStats = [
  { value: "Un quart", label: "de notre empreinte carbone est lié à notre alimentation" },
  { value: "20 tonnes", label: "de nourriture jetée chaque minute en France." },
  { value: "1 Français/3", label: "souffre de maladies chroniques directement liées à son alimentation." },
];

const podcastStats = [
  { value: "4,9/5", label: "sur les plateformes d'écoute (70 avis)" },
  { value: "3 000", label: "auditeur·ices par mois" },
  { value: "+ de 50 000", label: "écoutes, environ 2 500 par épisode" },
  { value: "75 %", label: "Chaque épisode est écouté à 75 % en moyenne" },
];

const experienceFormats: {
  type: ExperienceType;
  title: string;
  image: string;
  text: string;
  price: string;
}[] = [
  {
    type: "ateliers",
    title: "Ateliers (2 h)",
    image: "Image — Atelier lactofermentation",
    text: "Vivez un atelier collectif et favorisez la cohésion d'équipe. Découvrez, cuisinez et apprenez ensemble aux côtés d'artisan·es et chef·fes engagé·es. Repartez avec des conseils et des recettes !",
    price: "70 € par personne",
  },
  {
    type: "food-tours",
    title: "Food tours (3 h)",
    image: "Image — Balade gustative à la Croix-Rousse",
    text: "Embarquez pour une balade gustative à la rencontre de celles et ceux qui façonnent l'alimentation de demain. Rencontrez des passionné·es et explorez les coulisses de nos assiettes : visites, ateliers, dégustations...",
    price: "À partir de 60 € par personne",
  },
  {
    type: "immersions",
    title: "Immersions (journées)",
    image: "Image — Immersion à la ferme",
    text: "Partagez le quotidien et le savoir-faire de producteur·trices locaux. Semez, plantez, récoltez, vinifiez, fabriquez, au rythme des saisons. Tissez des liens et créez des souvenirs marquants.",
    price: "Tarif sur devis pour les entreprises.",
  },
];

export default async function HomePage() {
  const [episodes, experiences, testimonials] = await Promise.all([
    getHomeEpisodes(3),
    getHomeExperiences(3),
    getTestimonials(3),
  ]);

  return (
    <>
      {/* 02 — Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="font-medium opacity-70">Maison La recette</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-[72px]">
              Et si on changeait le monde en mangeant ?
            </h1>
            <p className="max-w-[720px] text-lg opacity-80">
              Maison La Recette permet d&apos;explorer l&apos;alimentation de demain, en podcast et
              en vrai : ateliers de cuisine, food tours et immersions aux côtés de chef·fes,
              producteur·ices et artisan·es engagé·es.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/podcast" className={buttonClassName}>
              Écouter le podcast
            </Link>
            <Link href="/experiences" className={ghostButtonClassName}>
              Découvrir les expériences
            </Link>
          </div>
        </div>
        <Placeholder
          label="Image — Photo d'ambiance d'une expérience (atelier ou balade), style coloré, vif, rétro"
          className="h-80 lg:h-[600px]"
        />
      </section>

      {/* 03 — Mission */}
      <Section muted eyebrow="Mission" title="La mission de La Recette : accélérer la transition alimentaire">
        <div className="grid gap-6 md:grid-cols-3">
          {missionStats.map((stat) => (
            <StatCard key={stat.value} {...stat} />
          ))}
        </div>
      </Section>

      {/* 04 — Champs d'action */}
      <Section title="Champs d'action">
        <div className="grid gap-6 md:grid-cols-3">
          <ActionCard
            image="Image — Podcast : enregistrement en présentiel"
            title="Podcast"
            text="Un podcast grand public qui part à la rencontre d'acteur(trice)s du changement et met en lumière des solutions."
            cta={{ href: "/podcast", label: "Écouter le podcast" }}
          />
          <ActionCard
            image="Image — Studio : production audio et vidéo"
            title="Studio"
            text="Un studio de production de podcasts qui aide les organisations engagées dans l'alimentation durable à faire entendre leur voix."
            cta={{ href: "/devis", label: "Demander un devis" }}
          />
          <ActionCard
            image="Image — Expériences : atelier collectif"
            title="Expériences"
            text="Des expériences impactantes (ateliers, immersions, séjours) qui fédèrent, engagent et sensibilisent à une meilleure alimentation."
          />
        </div>
      </Section>

      {/* 05 — Expériences à la une */}
      <Section muted eyebrow="Les expériences" title="Des expériences clés en main et sur mesure">
        <div className="grid gap-6 md:grid-cols-3">
          {experienceFormats.map((format) => (
            <Link key={format.type} href={`/experiences/${format.type}`} className={`${cardClassName} group`}>
              <Placeholder label={format.image} className="h-64 lg:h-80" />
              <div className="flex flex-1 flex-col gap-3 px-6 pt-3 pb-6">
                <h3 className="text-2xl font-black group-hover:underline">{format.title}</h3>
                <p className="flex-1 opacity-80">{format.text}</p>
                <p className="text-lg font-bold">{format.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/devis" className={buttonClassName}>
            Demander un devis
          </Link>
        </div>
      </Section>

      {/* 06 — Prochaines sessions */}
      {experiences.length > 0 && (
        <Section title="Prochaines sessions à Lyon">
          <ul className="grid gap-6 md:grid-cols-3">
            {experiences.map((experience) => (
              <li key={experience.slug} className="space-y-3 border-t border-black/15 pt-6">
                <p className="text-lg font-medium opacity-70">
                  {experience.title} · {experienceTypes[experience.type].label}
                  {experience.duration && ` · ${experience.duration}`}
                </p>
                <Link href={experienceHref(experience)} className="inline-block opacity-80 hover:underline">
                  {experience.lumaUrl ? "Réserver en ligne" : "Voir l'expérience"} →
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/experiences" className={`${ghostButtonClassName} mt-12`}>
            Voir toutes les dates
          </Link>
        </Section>
      )}

      {/* 07 — Podcast à la une */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Placeholder label="Image — Visuel du podcast La recette (logo vert actuel)" className="h-80 lg:h-[560px]" />
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="font-medium opacity-70">Le podcast</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">La recette</h2>
              <p className="text-lg opacity-80">
                La recette est un podcast qui donne la parole à des producteur·ices, chef·fes,
                artisan·es ou entrepreneur·ses engagé·es.
              </p>
            </div>
            {episodes.length > 0 && (
              <ul className="space-y-4">
                {episodes.map((episode) => {
                  const duration = formatDuration(episode.durationSeconds);
                  return (
                    <li key={episode.slug}>
                      <Link href={episodeHref(episode)} className="text-xl font-black hover:underline">
                        {episode.title}
                      </Link>
                      <p className="text-lg opacity-80">
                        Saison {episode.season}
                        {duration && ` · ${duration}`} ·{" "}
                        <time dateTime={episode.publishedAt}>
                          {new Date(episode.publishedAt).toLocaleDateString("fr-FR")}
                        </time>
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
            <Link href="/podcast" className={buttonClassName}>
              Écouter le podcast
            </Link>
          </div>
        </div>
      </Section>

      {/* 08 — Chiffres podcast */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {podcastStats.map((stat) => (
            <StatCard key={stat.value} {...stat} />
          ))}
        </div>
      </Section>

      {/* 09 — Avis */}
      {testimonials.length > 0 && (
        <Section muted title="Avis de nos client·es">
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
      )}

      {/* 10 — CTA final */}
      <Section>
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-[44px] sm:leading-[52px]">
              Un team building écoresponsable pour vos équipes à Lyon
            </h2>
            <p className="text-lg opacity-80">
              Pour tous vos évènements : teambuildings, séminaires, afterworks, déjeuners.
            </p>
          </div>
          <Link href="/devis" className={buttonClassName}>
            Demander un devis
          </Link>
        </div>
      </Section>
    </>
  );
}

function ActionCard({
  image,
  title,
  text,
  cta,
}: {
  image: string;
  title: string;
  text: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className={cardClassName}>
      <Placeholder label={image} className="h-56 lg:h-[280px]" />
      <div className="flex flex-1 flex-col gap-3 px-6 pt-3 pb-6">
        <h3 className="text-2xl font-black">{title}</h3>
        <p className="flex-1 opacity-80">{text}</p>
        {cta && (
          <Link href={cta.href} className={`${ghostButtonClassName} self-start`}>
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
