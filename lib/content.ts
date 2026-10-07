// Marketing copy shared by several pages (from the Figma wireframe).

import type { ExperienceType } from "@/lib/site";

export const missionStats = [
  { value: "Un quart", label: "de notre empreinte carbone est lié à notre alimentation" },
  { value: "20 tonnes", label: "de nourriture jetée chaque minute en France." },
  { value: "1 Français/3", label: "souffre de maladies chroniques directement liées à son alimentation." },
];

export const podcastStats = [
  { value: "4,9/5", label: "sur les plateformes d'écoute (70 avis)" },
  { value: "3 000", label: "auditeur·ices par mois" },
  { value: "+ de 50 000", label: "écoutes, environ 2 500 par épisode" },
  { value: "75 %", label: "Chaque épisode est écouté à 75 % en moyenne" },
];

// The three experience formats (home page "Expériences à la une", /experiences "Formats").
export const experienceFormats: {
  type: ExperienceType;
  title: string;
  longTitle: string;
  image: string;
  text: string;
  price: string;
  cta: string;
}[] = [
  {
    type: "ateliers",
    title: "Ateliers (2 h)",
    longTitle: "Ateliers de cuisine (2 h)",
    image: "Image — Atelier lactofermentation",
    text: "Vivez un atelier collectif et favorisez la cohésion d'équipe. Découvrez, cuisinez et apprenez ensemble aux côtés d'artisan·es et chef·fes engagé·es. Repartez avec des conseils et des recettes !",
    price: "70 € par personne",
    cta: "Voir les ateliers",
  },
  {
    type: "food-tours",
    title: "Food tours (3 h)",
    longTitle: "Food tours à Lyon (3 h)",
    image: "Image — Balade gustative à la Croix-Rousse",
    text: "Embarquez pour une balade gustative à la rencontre de celles et ceux qui façonnent l'alimentation de demain. Rencontrez des passionné·es et explorez les coulisses de nos assiettes : visites, ateliers, dégustations...",
    price: "À partir de 60 € par personne",
    cta: "Voir les food tours",
  },
  {
    type: "immersions",
    title: "Immersions (journées)",
    longTitle: "Immersions à la ferme (journées)",
    image: "Image — Immersion à la ferme",
    text: "Partagez le quotidien et le savoir-faire de producteur·trices locaux. Semez, plantez, récoltez, vinifiez, fabriquez, au rythme des saisons. Tissez des liens et créez des souvenirs marquants.",
    price: "Tarif sur devis pour les entreprises.",
    cta: "Voir les immersions",
  },
];

// Listener reviews from the podcast platforms (not client testimonials, which live in Payload).
export const listenerReviews = [
  {
    text: "Super podcast qui nous donne à entendre des personnes inspirantes qui trouvent des solutions. Les interviews sont bien menées. Bravo et bonne continuation.",
    author: "CKterine",
  },
  {
    text: "Super podcast toujours très informatif avec des invités intéressants. Inspirant ! Continuez comme ça",
    author: "Épicerie Meloco",
  },
  {
    text: "J'adore ce podcast qui donne envie d'avoir faim de bonnes choses… utile, durable et bon",
    author: "Marie-Adeline",
  },
];
