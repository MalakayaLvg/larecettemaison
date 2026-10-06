import "server-only";
import { randomBytes } from "crypto";
import { sendEmailSafely } from "@/lib/emails";
import { getPayloadClient } from "@/lib/payload";

const CONFIRMATION_DELAY_MS = 7 * 24 * 60 * 60 * 1000;

const siteUrl = () => process.env.SITE_URL || "http://localhost:3000";
const newToken = () => randomBytes(32).toString("base64url");

// Double opt-in, step 1: the address stays "en-attente" until the link in the email is used.
// Already confirmed addresses get nothing, so the form can't tell who is subscribed.
export async function requestSubscription(rawEmail: string) {
  const email = rawEmail.trim().toLowerCase();
  const payload = await getPayloadClient();
  const {
    docs: [existing],
  } = await payload.find({ collection: "subscribers", where: { email: { equals: email } }, limit: 1 });
  if (existing?.status === "confirme") return;

  const data = {
    status: "en-attente" as const,
    token: newToken(),
    tokenExpiresAt: new Date(Date.now() + CONFIRMATION_DELAY_MS).toISOString(),
  };
  if (existing) {
    await payload.update({ collection: "subscribers", id: existing.id, data });
  } else {
    await payload.create({ collection: "subscribers", data: { email, ...data } });
  }

  const link = `${siteUrl()}/newsletter/confirmer?token=${data.token}`;
  await sendEmailSafely(payload, {
    to: email,
    subject: "Confirmez votre inscription à la newsletter — Maison La Recette",
    html:
      "<p>Bonjour,</p>" +
      "<p>Pour recevoir la newsletter de Maison La Recette, confirmez votre adresse :</p>" +
      `<p><a href="${link}">Confirmer mon inscription</a></p>` +
      "<p>Ce lien est valable 7 jours. Si vous n'êtes pas à l'origine de cette demande, ignorez ce message : vous ne serez pas inscrit·e.</p>",
  });
}

export type TokenStatus = "valid" | "done" | "expired" | "invalid";

async function findByToken(token: string) {
  if (!token) return undefined;
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "subscribers", where: { token: { equals: token } }, limit: 1 });
  return docs[0];
}

// Read-only check, used to render the confirmation page before the visitor clicks.
export async function confirmationStatus(token: string): Promise<TokenStatus> {
  const subscriber = await findByToken(token);
  if (!subscriber) return "invalid";
  if (subscriber.status === "confirme") return "done";
  if (subscriber.status !== "en-attente") return "invalid";
  if (!subscriber.tokenExpiresAt || new Date(subscriber.tokenExpiresAt) < new Date()) return "expired";
  return "valid";
}

// Double opt-in, step 2. The token is replaced by a new one, which only serves to unsubscribe.
export async function confirmSubscription(token: string): Promise<TokenStatus> {
  const status = await confirmationStatus(token);
  if (status !== "valid") return status;

  const payload = await getPayloadClient();
  const subscriber = (await findByToken(token))!;
  const unsubscribeToken = newToken();
  await payload.update({
    collection: "subscribers",
    id: subscriber.id,
    data: {
      status: "confirme",
      confirmedAt: new Date().toISOString(),
      token: unsubscribeToken,
      tokenExpiresAt: null,
    },
  });

  const link = `${siteUrl()}/newsletter/desinscription?token=${unsubscribeToken}`;
  await sendEmailSafely(payload, {
    to: subscriber.email,
    subject: "Bienvenue dans la newsletter — Maison La Recette",
    html:
      "<p>Bonjour,</p>" +
      "<p>Votre inscription est confirmée : vous recevrez les nouveaux épisodes du podcast et les prochaines expériences.</p>" +
      `<p>Vous pouvez vous désinscrire à tout moment : <a href="${link}">se désinscrire</a>.</p>`,
  });
  return "done";
}

export async function unsubscribeStatus(token: string): Promise<TokenStatus> {
  const subscriber = await findByToken(token);
  if (!subscriber) return "invalid";
  return subscriber.status === "desinscrit" ? "done" : "valid";
}

export async function unsubscribe(token: string): Promise<TokenStatus> {
  const status = await unsubscribeStatus(token);
  if (status !== "valid") return status;
  const payload = await getPayloadClient();
  const subscriber = (await findByToken(token))!;
  await payload.update({ collection: "subscribers", id: subscriber.id, data: { status: "desinscrit" } });
  return "done";
}
