import { HONEYPOT_FIELD } from "@/lib/forms";

const controlClassName =
  "w-full rounded-md border border-black/15 bg-transparent px-3 py-2 focus:border-foreground focus:outline-none aria-invalid:border-red-600";

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
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
        {required ? " *" : <span className="font-normal opacity-60"> (facultatif)</span>}
      </label>
      {children(describedBy)}
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-xs opacity-60">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
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
          className={controlClassName}
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
          rows={5}
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
          className={controlClassName}
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

export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-foreground px-6 py-2.5 text-sm text-background hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Envoi…" : children}
    </button>
  );
}
