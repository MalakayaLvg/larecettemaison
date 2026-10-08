"use client";

import { useActionState } from "react";
import { darkButtonClassName } from "@/components/home/Section";
import type { TokenStatus } from "@/lib/newsletter";

// One-button form for the links sent by email: the action only runs on an explicit click,
// never when a mail scanner merely opens the link.
export function TokenActionForm({
  intro,
  token,
  action,
  label,
  messages,
}: {
  intro: string;
  token: string;
  action: (state: TokenStatus | null, formData: FormData) => Promise<TokenStatus>;
  label: string;
  messages: Record<Exclude<TokenStatus, "valid">, string>;
}) {
  const [result, formAction, pending] = useActionState(action, null);

  if (result && result !== "valid") {
    return (
      <p role="status" className="max-w-2xl text-lg leading-[1.2] lg:text-[22px]">
        {messages[result]}
      </p>
    );
  }

  return (
    <form action={formAction}>
      <p className="mb-8 text-lg leading-[1.2] lg:text-[22px]">{intro}</p>
      <input type="hidden" name="token" value={token} />
      <button type="submit" disabled={pending} className={`${darkButtonClassName} disabled:opacity-50`}>
        {pending ? "Un instant…" : label}
      </button>
    </form>
  );
}
