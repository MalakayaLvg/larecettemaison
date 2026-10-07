"use client";

import { usePathname } from "next/navigation";

// Native <details> menu; keyed on the path so it closes after a client-side navigation.
export function MobileMenu({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <details key={pathname} className="group relative lg:hidden">
      <summary className="flex size-14 cursor-pointer list-none items-center justify-center rounded-full border-2 border-ink [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Menu</span>
        <span aria-hidden className="text-2xl leading-none group-open:hidden">☰</span>
        <span aria-hidden className="hidden text-2xl leading-none group-open:inline">✕</span>
      </summary>
      {children}
    </details>
  );
}
