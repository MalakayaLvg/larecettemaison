import "server-only";
import Stripe from "stripe";

let client: Stripe | undefined;

// Created on first use so pages without booking still build when STRIPE_SECRET_KEY is missing.
export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY manquant (voir .env.example)");
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}

export const siteUrl = () => (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
