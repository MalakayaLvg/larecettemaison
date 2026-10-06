import "server-only";
import type { Payload, SendEmailOptions } from "payload";

export function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// "Label: value" lines for the notification emails; empty values are skipped.
export function detailsHtml(rows: [label: string, value: string | number | null | undefined][]) {
  return rows
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)} :</strong><br>${escapeHtml(String(value)).replace(/\n/g, "<br>")}</p>`,
    )
    .join("");
}

// The form data is already saved when emails go out: a failing SMTP server must not turn a
// successful submission into an error for the visitor, so failures are only logged.
export async function sendEmailSafely(payload: Payload, options: SendEmailOptions) {
  try {
    await payload.sendEmail(options);
  } catch (error) {
    payload.logger.error({ err: error, msg: `Échec de l'envoi de l'e-mail « ${options.subject} »` });
  }
}

export const notifyEmail = () => process.env.NOTIFY_EMAIL || "contact@larecette.local";
