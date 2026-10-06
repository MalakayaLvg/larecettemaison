"use client";

import Script from "next/script";

declare global {
  interface Window {
    luma?: { initCheckout: () => void };
  }
}

// A plain link to the Luma event page. With an event id, Luma's script turns it into a
// button that opens the checkout in an overlay; if the script fails to load, the link still works.
export function LumaCheckoutButton({
  href,
  eventId,
  className,
  children,
}: {
  href: string;
  eventId?: string | null;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-luma-action={eventId ? "checkout" : undefined}
        data-luma-event-id={eventId ?? undefined}
        className={className}
      >
        {children}
      </a>
      {eventId && (
        <Script
          id="luma-checkout"
          src="https://embed.lu.ma/checkout-button.js"
          // The script only scans the DOM when it loads: re-scan after client-side navigations.
          onReady={() => window.luma?.initCheckout()}
        />
      )}
    </>
  );
}
