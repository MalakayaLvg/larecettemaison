import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const id = () => integer().primaryKey().generatedAlwaysAsIdentity();
const createdAt = () => timestamp({ withTimezone: true }).notNull().defaultNow();

export const episodes = pgTable("episodes", {
  id: id(),
  guid: text().notNull().unique(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  season: integer().notNull(),
  number: integer(),
  publishedAt: timestamp({ withTimezone: true }).notNull(),
  durationSeconds: integer(),
  imageUrl: text(),
  audioUrl: text().notNull(),
  // Updated by the RSS sync; `summary` is the hand-edited version and is never touched by the sync.
  rssDescription: text(),
  summary: text(),
  guestName: text(),
  guestRole: text(),
  spotifyUrl: text(),
  appleUrl: text(),
  deezerUrl: text(),
  youtubeUrl: text(),
  featured: boolean().notNull().default(false),
});

// Values match the URL segments under /experiences.
export const experienceType = pgEnum("experience_type", [
  "ateliers",
  "food-tours",
  "immersions",
]);

export const experiences = pgTable("experiences", {
  id: id(),
  slug: text().notNull().unique(),
  type: experienceType().notNull(),
  title: text().notNull(),
  duration: text(),
  excerpt: text(),
  description: text(),
  images: text().array().notNull().default([]),
  lumaUrl: text(),
  onQuote: boolean().notNull().default(true),
});

export const studioOffers = pgTable("studio_offers", {
  id: id(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  description: text(),
});

export const testimonials = pgTable("testimonials", {
  id: id(),
  author: text().notNull(),
  role: text(),
  text: text().notNull(),
});

export const articles = pgTable("articles", {
  id: id(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  excerpt: text(),
  content: text().notNull(),
  coverUrl: text(),
  category: text(),
  publishedAt: timestamp({ withTimezone: true }).notNull(),
});

export const quoteLocation = pgEnum("quote_location", [
  "dans-nos-locaux",
  "chez-un-partenaire",
  "a-definir",
]);

export const requestStatus = pgEnum("request_status", [
  "nouveau",
  "en-cours",
  "traite",
]);

export const quoteRequests = pgTable("quote_requests", {
  id: id(),
  company: text().notNull(),
  contactName: text().notNull(),
  jobTitle: text(),
  email: text().notNull(),
  phone: text().notNull(),
  service: text().notNull(),
  experienceId: integer().references(() => experiences.id, { onDelete: "set null" }),
  studioOfferId: integer().references(() => studioOffers.id, { onDelete: "set null" }),
  participants: integer(),
  desiredDate: text(),
  location: quoteLocation(),
  budget: text(),
  message: text(),
  status: requestStatus().notNull().default("nouveau"),
  createdAt: createdAt(),
});

export const contactMessages = pgTable("contact_messages", {
  id: id(),
  name: text().notNull(),
  email: text().notNull(),
  subject: text().notNull(),
  message: text().notNull(),
  createdAt: createdAt(),
});
