export const siteName = "Maison La Recette";

export const mainNav = [
  { href: "/podcast", label: "Podcast" },
  { href: "/experiences", label: "Expériences" },
  { href: "/studio", label: "Studio" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/cgv", label: "CGV" },
] as const;

// `eyebrow` and `others` adapt the experience page's wording (written for workshops in the
// wireframe) to each type.
export const experienceTypes = {
  ateliers: {
    label: "Ateliers",
    duration: "2 h",
    eyebrow: "Nos ateliers culinaires",
    others: "Nos autres ateliers de cuisine à Lyon",
  },
  "food-tours": {
    label: "Food tours",
    duration: "3 h",
    eyebrow: "Nos food tours",
    others: "Nos autres food tours à Lyon",
  },
  immersions: {
    label: "Immersions",
    duration: "1 journée",
    eyebrow: "Nos immersions",
    others: "Nos autres immersions",
  },
} as const;

export type ExperienceType = keyof typeof experienceTypes;

export function isExperienceType(value: string): value is ExperienceType {
  return value in experienceTypes;
}

// Where to listen to the show (from the Ausha show page).
export const podcastPlatforms = [
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/fr/podcast/la-recette/id1673916177" },
  { label: "Spotify", href: "https://open.spotify.com/show/78p9jKRzpoGWQ2sTCfBOof" },
  { label: "Deezer", href: "https://www.deezer.com/show/5771417" },
  { label: "YouTube", href: "https://www.youtube.com/@Larecettepodcast" },
] as const;

// Blog categories (from the Figma wireframe); values are used in /blog?categorie=…
export const articleCategories = {
  "sante-alimentation": "Santé et alimentation",
  "peche-durable": "Pêche durable",
  "cuisine-vegetale": "Cuisine végétale",
  "anti-gaspi": "Anti-gaspi",
} as const;

export type ArticleCategory = keyof typeof articleCategories;

export function isArticleCategory(value: unknown): value is ArticleCategory {
  return typeof value === "string" && value in articleCategories;
}

export const contactEmail = "larecette@ecomail.fr";
