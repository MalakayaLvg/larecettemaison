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

export const experienceTypes = {
  ateliers: { label: "Ateliers", duration: "2 h" },
  "food-tours": { label: "Food tours", duration: "3 h" },
  immersions: { label: "Immersions", duration: "1 journée" },
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
