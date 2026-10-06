// Shared by the Server Actions and the client-side forms (no server-only imports here).

export type FormState<TField extends string> =
  | { status: "idle" }
  | { status: "success" }
  // `values` lets the form show what was typed again: React resets forms after an action.
  | { status: "error"; errors: Partial<Record<TField, string>>; values: Partial<Record<TField, string>> };

export const quoteLocations = [
  { value: "dans-nos-locaux", label: "Dans nos locaux" },
  { value: "chez-un-partenaire", label: "Chez un partenaire" },
  { value: "a-definir", label: "À définir" },
] as const;

export type QuoteLocation = (typeof quoteLocations)[number]["value"];

export const quoteFields = [
  "company",
  "contactName",
  "jobTitle",
  "email",
  "phone",
  "service",
  "participants",
  "desiredDate",
  "location",
  "budget",
  "message",
] as const;

export type QuoteField = (typeof quoteFields)[number];

export const contactFields = ["name", "email", "subject", "message"] as const;

export type ContactField = (typeof contactFields)[number];

// Only the expected text fields: drops the honeypot, React's internal fields and anything else posted.
export function pickFields<TField extends string>(formData: FormData, fields: readonly TField[]) {
  const values: Partial<Record<TField, string>> = {};
  for (const field of fields) {
    const value = formData.get(field);
    if (typeof value === "string") values[field] = value;
  }
  return values;
}

// Name of the hidden field used to catch bots (real visitors never fill it).
export const HONEYPOT_FIELD = "website";

// First validation message of each field, from a Zod error's `issues`.
export function fieldErrors<TField extends string>(
  issues: readonly { path: readonly PropertyKey[]; message: string }[],
) {
  const errors: Partial<Record<TField, string>> = {};
  for (const issue of issues) {
    errors[issue.path[0] as TField] ??= issue.message;
  }
  return errors;
}
