import { buttonClassName } from "@/components/home/Section";
import { HONEYPOT_FIELD } from "@/lib/forms";

// Figma "input" (Contact / Devis V4, node 309:799): white, 2px navy border, 16px radius.
export const controlClassName =
  "w-full rounded-2xl border-2 border-ink bg-white px-6 py-3.5 text-lg text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent aria-invalid:border-red-600";

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
};

// Label, control and error message, linked together for screen readers.
function Field({
  name,
  label,
  error,
  required,
  hint,
  className,
  children,
}: FieldProps & { children: (describedBy: string | undefined) => React.ReactNode }) {
  const describedBy = [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block text-lg leading-[1.4] font-semibold">
        {label}
        {required ? " *" : " (facultatif)"}
      </label>
      {children(describedBy)}
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-[15px] leading-[1.45] text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-[15px] font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  type = "text",
  defaultValue,
  autoComplete,
  ...props
}: FieldProps & { type?: string; defaultValue?: string; autoComplete?: string }) {
  return (
    <Field {...props}>
      {(describedBy) => (
        <input
          id={props.name}
          name={props.name}
          type={type}
          required={props.required}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          aria-invalid={props.error ? true : undefined}
          aria-describedby={describedBy}
          className={`${controlClassName} h-14`}
        />
      )}
    </Field>
  );
}

export function TextAreaField({ defaultValue, ...props }: FieldProps & { defaultValue?: string }) {
  return (
    <Field {...props}>
      {(describedBy) => (
        <textarea
          id={props.name}
          name={props.name}
          required={props.required}
          defaultValue={defaultValue}
          rows={4}
          aria-invalid={props.error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClassName}
        />
      )}
    </Field>
  );
}

export function SelectField({
  defaultValue,
  children,
  ...props
}: FieldProps & { defaultValue?: string; children: React.ReactNode }) {
  return (
    <Field {...props}>
      {(describedBy) => (
        <select
          id={props.name}
          name={props.name}
          required={props.required}
          defaultValue={defaultValue ?? ""}
          aria-invalid={props.error ? true : undefined}
          aria-describedby={describedBy}
          className={`${controlClassName} h-14 py-0`}
        >
          {children}
        </select>
      )}
    </Field>
  );
}

// Hidden from people (and screen readers) but filled in by most spam bots.
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px]">
      <label htmlFor={HONEYPOT_FIELD}>Ne pas remplir ce champ</label>
      <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

// Message shown in place of a form once it has been sent.
export function FormSuccess({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="status" className="border-2 border-ink bg-brand-subtle p-6 lg:p-8">
      <h2 className="font-display text-2xl leading-[1.25] font-bold">{title}</h2>
      <p className="mt-2 text-lg leading-[1.55]">{children}</p>
    </div>
  );
}

// Figma "La Recette/Button", primary (orange) version.
export function SubmitButton({
  pending,
  pendingLabel = "Envoi…",
  children,
}: {
  pending: boolean;
  pendingLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="submit" disabled={pending} className={`${buttonClassName} disabled:opacity-50`}>
      {pending ? pendingLabel : children}
    </button>
  );
}
