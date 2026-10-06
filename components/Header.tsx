import Link from "next/link";
import { mainNav, siteName } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          {siteName}
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/devis"
          className="rounded-full bg-foreground px-4 py-2 text-sm text-background"
        >
          Demander un devis
        </Link>
      </div>
    </header>
  );
}
