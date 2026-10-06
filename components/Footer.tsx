import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { legalNav, mainNav, siteName } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-semibold">{siteName}</p>
          <p className="mt-2 text-sm opacity-70">
            Accélérer la transition alimentaire, depuis Lyon.
          </p>
        </div>
        <nav aria-label="Plan du site">
          <ul className="space-y-1 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-6">
          <NewsletterForm />
          <ul className="space-y-1 text-sm">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
