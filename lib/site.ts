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
